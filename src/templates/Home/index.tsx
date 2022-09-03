import Sidebar from "src/components/Sidebar";
import Main from "../../components/Main";
import Header from "../../components/Header";
import TopBar from "../../components/TopBar";
import { store } from "src/redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "src/api";
import { getWallet } from "src/redux/actions/auth";

import styles from "./index.module.scss";

const Home: React.FC = () => {
  const [state, setState] = useState<
    undefined | { authReducer: { walletData: { balances: {}[] } } }
  >(undefined);
  const [showSidebar, setShowSidebar] = useState(false);
  const [walletBalances, setWalletBalances] = useState<
    { chain: string; items: {}[] }[]
  >([]);
  const [chains, setChains] = useState<string[]>([]);
  const [BTCAndETHPrice, setBTCAndETHPrice] = useState<string[]>([]);
  const [individualTokens, setIndividulaTokens] = useState<boolean>(false);
  const [smallBalances, setSmallBalances] = useState<boolean>(true);
  const [walletHistory, setWalletHistory] = useState<{}[]>([]);

  const API_KEY = process.env.REACT_APP_API_KEY;

  //BTC and ETH prices fetch links

  const endpoints = [
    "https://api.binance.com/api/v3/avgPrice?symbol=BTCBUSD",
    "https://api.binance.com/api/v3/avgPrice?symbol=ETHBUSD",
  ];

  //Wallet balances and history

  const apiReq = async (state: any) => {
    const filteredBalances = state.authReducer.walletData.balances.filter(
      (balance: { chain: string; items: {}[] }) => balance.items.length > 0
    );
    setWalletBalances(filteredBalances);

    const wallet = await getWallet();

    const availableChains = filteredBalances.map(
      (item: { chain: string; items: {}[] }) => item.chain
    );

    API.get(
      `/history?wallet=${wallet}&apikey=${API_KEY}&chains=${availableChains.map(
        (item: string) => item
      )}`
    )
      .then((res) => {
        setWalletHistory(
          res.data.history
            .map((obj: { chain: string; items: any }) => obj.items)
            .map((el: any) =>
              el.filter(
                (token: any) =>
                  token.contract_ticker_symbol !== `` &&
                  token.contract_name &&
                  token.holdings[0].close.quote &&
                  token.holdings[0].close.quote !== 0
              )
            )
            .flat()
        );
      })

      .catch((error) => {
        throw error;
      });
  };

  //working with redux store

  useEffect(() => {
    if (state) {
      return;
    } else {
      store.subscribe(() => setState(store.getState()));
    }
  }, [store]);

  useEffect(() => {
    if (
      state &&
      state.authReducer.walletData.balances &&
      state.authReducer.walletData.balances.length !== 0
    ) {
      apiReq(state);
      axios
        .all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then((res) =>
          setBTCAndETHPrice([res[0].data.price, res[1].data.price])
        );
    } else {
      return;
    }
  }, [state]);

  const handlePassChains = (passedChains: string[]) => {
    setChains(passedChains);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <Sidebar
          showSidebar={showSidebar}
          handleClose={() => setShowSidebar(false)}
          walletHistory={walletHistory}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.sticky}>
          <Header handleShowSidebar={() => setShowSidebar(true)} />
          <TopBar
            tokensSwitchClick={() =>
              setIndividulaTokens((individualTokens) => !individualTokens)
            }
            smallBalancesSwitchClick={() =>
              setSmallBalances((smallBalances) => !smallBalances)
            }
            balances={walletBalances}
            handlePassChains={handlePassChains}
          />
        </div>
        <div className={styles.mainWrapper}>
          <Main
            balances={walletBalances}
            BTCAndETHPrice={BTCAndETHPrice}
            smallBalances={smallBalances}
            individualTokens={individualTokens}
            selectedChains={chains}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
