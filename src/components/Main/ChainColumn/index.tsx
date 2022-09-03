import { useEffect, useState } from "react";
import TokenCard from "../TokenCard";
import styles from "./styles.module.scss";

interface ChainColumnProps {
  tokens: any[];
  BTCAndETHPrice: string[];
  individualTokens: boolean;
  smallBalances: boolean;
  selectedChains: string[];
  chain: string;
}

const ChainColumn = ({
  tokens,
  BTCAndETHPrice,
  individualTokens,
  smallBalances,
  selectedChains,
  chain,
}: ChainColumnProps) => {
  const [initialFilteredTokens, setInitialFilteredTokens] = useState<any[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<any[]>([]);
  const [assetsPrice, setAssetsPrice] = useState<number>(0);
  const [uniqueCoins, setUniqueCoins] = useState<number>(0);

  //initial filtreing

  useEffect(() => {
    const filtered = tokens.filter(
      (token) =>
        token.contract_name.length !== 0 &&
        token.contract_ticker_symbol !== `` &&
        token.quote_rate
    );

    setInitialFilteredTokens(filtered);

    setUniqueCoins(filtered.length);
  }, [tokens]);

  //switch filters

  useEffect(() => {
    if (individualTokens) {
      setFilteredTokens(() =>
        initialFilteredTokens.filter((token) => token.native_token)
      );
    } else if (smallBalances) {
      setFilteredTokens(
        initialFilteredTokens.filter((token) => token.quote > 1)
      );
    } else {
      setFilteredTokens(initialFilteredTokens);
    }
  }, [initialFilteredTokens, smallBalances, individualTokens, selectedChains]);

  useEffect(() => {
    if (filteredTokens.length !== 0) {
      setFilteredTokens((filteredTokens) =>
        filteredTokens.sort(
          (a, b) => Number(b.native_token) - Number(a.native_token)
        )
      );
    }
  }, [filteredTokens]);

  //best worst

  useEffect(() => {
    const filteredTokens = tokens.filter(
      (token) => token.contract_name.length !== 0 && token.quote_rate
    );

    //assets price calculation
    setAssetsPrice(
      filteredTokens.reduce((a, b) => {
        return a + b.quote;
      }, 0)
    );
  }, []);

  return (
    <div className={styles.column}>
      {filteredTokens.length !== 0 &&
        filteredTokens.map((item, i) => (
          <TokenCard
            large={item.native_token}
            chainId={item.native_token && chain}
            lastOddChild={
              i + 1 === filteredTokens.length && i % 2 ? true : false
            }
            key={item.contract_address}
            tokenName={item.contract_name}
            tokenTicker={item.contract_ticker_symbol}
            logo={item.logo_url}
            quoteRate={item.quote_rate}
            quoteRateDay={item.quote_rate_24h}
            quote={item.quote}
            balance={item.balance}
            tokenDecimals={item.contract_decimals}
            BTCAndETHPrice={BTCAndETHPrice}
            assetsPrice={item.native_token && assetsPrice}
            uniqueCoins={uniqueCoins}
          />
        ))}
    </div>
  );
};

export default ChainColumn;
