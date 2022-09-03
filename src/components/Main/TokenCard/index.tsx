import { useEffect, useState } from "react";
import { useResize } from "src/hooks/useResize";
import BestWorst from "src/components/Unknown/BestWorst";
import InfoLine from "src/components/Unknown/InfoLine";
import CardButtonsContainer from "src/components/Main/CardButtonsContainer";
import Graph from "src/components/Main/Graph";
import TokenInfo from "../TokenInfo";
import classNames from "classnames";
import API from "src/api";
import { getWallet } from "src/redux/actions/auth";

import styles from "./styles.module.scss";

interface TokenCardProps {
  large: boolean;
  tokenName: string;
  tokenTicker: string;
  logo: string;
  quoteRate: number;
  quoteRateDay: number;
  quote: number;
  lastOddChild: boolean;
  balance: string;
  tokenDecimals: number;
  BTCAndETHPrice: string[];
  assetsPrice: number;
  uniqueCoins: number;
  chainId: string;
}

const TokenCard = ({
  large,
  tokenName,
  tokenTicker,
  logo,
  quoteRate,
  quoteRateDay,
  quote,
  balance,
  lastOddChild,
  tokenDecimals,
  BTCAndETHPrice,
  assetsPrice,
  uniqueCoins,
  chainId,
}: TokenCardProps) => {
  const [largeCardResponsive, setLargeCardResponsive] = useState<boolean>(
    large && window.innerWidth <= 992
  );
  const [walletHistory, setWalletHistory] = useState<{}[]>([]);
  const [sortedBestWorst, setSortedBestWorst] = useState<any[]>([]);

  const handleResize = () => {
    if (large) {
      if (window.innerWidth <= 992 && !largeCardResponsive) {
        setLargeCardResponsive(true);
      }
      if (window.innerWidth > 992 && largeCardResponsive) {
        setLargeCardResponsive(false);
      }
    }
  };

  const largeCardHistyoryFetch = async () => {
    const wallet = await getWallet();

    const API_KEY = process.env.REACT_APP_API_KEY;

    API.get(`/history?wallet=${wallet}&apikey=${API_KEY}&chains=${chainId}`)
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

  useEffect(() => {
    if (large) {
      largeCardHistyoryFetch();
    }
  }, []);

  useEffect(() => {
    if (large && walletHistory.length !== 0) {
      setSortedBestWorst(
        walletHistory.sort(
          (a: any, b: any) =>
            (b.holdings[0].quote_rate - b.holdings[6].quote_rate) /
              b.holdings[6].quote_rate -
            (a.holdings[0].quote_rate - a.holdings[6].quote_rate) /
              a.holdings[6].quote_rate
        )
      );
    }
  }, [walletHistory]);

  useResize(largeCardResponsive, handleResize);

  return (
    <div
      className={classNames(
        styles.card,
        large && styles.cardLarge,
        lastOddChild && styles.lastOddChild
      )}
    >
      <div className={styles.infoWrapper}>
        <div className={styles.btnsMedia}>
          <TokenInfo
            logo={logo}
            tokenName={
              large ? `${tokenName + " (" + tokenTicker + ")"}` : tokenTicker
            }
            price={quoteRate}
            price24h={quoteRateDay ? quoteRateDay : 0}
          />

          {large && largeCardResponsive && <CardButtonsContainer />}
        </div>
        {large && !largeCardResponsive ? (
          <div className={styles.graphBlockLarge}>
            <div className={styles.btns}>
              <CardButtonsContainer column large={large} />
            </div>
            <Graph large />
          </div>
        ) : !large ? (
          <div className={styles.bottom}>
            <div className={styles.numbers}>
              <span className={styles.balance}>
                Balance: <br />
                <span>
                  {tokenTicker}{" "}
                  {(parseFloat(balance) / Math.pow(10, tokenDecimals)).toFixed(
                    2
                  )}
                </span>
              </span>
              <span className={styles.prices}>
                $ {quote.toFixed(2)} <br />
                BTC {(quote / parseFloat(BTCAndETHPrice[0])).toFixed(4)} /{" "}
                <span>
                  ETH {(quote / parseFloat(BTCAndETHPrice[1])).toFixed(2)}
                </span>
              </span>
            </div>
          </div>
        ) : null}
      </div>

      {large ? (
        <div className={styles.info}>
          <div className={styles.numbers}>
            <span className={styles.balance}>
              Balance:{" "}
              <span>
                {tokenTicker}{" "}
                {(parseFloat(balance) / Math.pow(10, tokenDecimals)).toFixed(2)}
              </span>
            </span>
            <span className={styles.prices}>
              <span>$ {quote.toFixed(2)}</span>
              <span className={styles.divider}> / </span>
              <span>
                BTC {(quote / parseFloat(BTCAndETHPrice[0])).toFixed(4)}
              </span>
              <span className={styles.divider}> / </span>
              <span>
                ETH {(quote / parseFloat(BTCAndETHPrice[1])).toFixed(2)}
              </span>
            </span>
          </div>

          <div className={styles.chainInfo}>
            <span className={styles.chainInfoTitle}>Chain info:</span>
            <div className={styles.info}>
              <div className={styles.infoLine}>
                <InfoLine title="Assets" info={`$${assetsPrice.toFixed(2)}`} />
              </div>
              <div className={styles.infoLine}>
                <InfoLine title="Unique coins" info={uniqueCoins} />
              </div>
            </div>
          </div>

          {sortedBestWorst.length !== 0 && (
            <BestWorst
              bestToken={sortedBestWorst[0].contract_ticker_symbol}
              worstToken={
                sortedBestWorst[sortedBestWorst.length - 1]
                  .contract_ticker_symbol
              }
              priceChangePreCalcBest={
                ((sortedBestWorst[0].holdings[0].quote_rate -
                  sortedBestWorst[0].holdings[6].quote_rate) /
                  sortedBestWorst[0].holdings[6].quote_rate) *
                100
              }
              priceChangePreCalcWorst={
                ((sortedBestWorst[sortedBestWorst.length - 1].holdings[0]
                  .quote_rate -
                  sortedBestWorst[sortedBestWorst.length - 1].holdings[6]
                    .quote_rate) /
                  sortedBestWorst[sortedBestWorst.length - 1].holdings[6]
                    .quote_rate) *
                100
              }
              tokenLogoBest={sortedBestWorst[0].logo_url}
              tokenLogoWorst={
                sortedBestWorst[sortedBestWorst.length - 1].logo_url
              }
            />
          )}

          {large && largeCardResponsive && (
            <div className={styles.graphLargeResponsive}>
              <Graph large />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.graphBlock}>
          <CardButtonsContainer large={large} />
          <Graph />
        </div>
      )}
    </div>
  );
};

export default TokenCard;
