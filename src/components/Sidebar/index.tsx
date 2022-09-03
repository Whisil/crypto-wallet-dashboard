import { useEffect, useState } from "react";
import classNames from "classnames";
import { useResize } from "src/hooks/useResize";
import {
  LendingLoadsSvg,
  NaaSDaaSSvg,
  NFTsSvg,
  NodesSvg,
  SidebarCollapseSvg,
  SummarySvg,
  WalletSvg,
} from "./SidebarSvg";
import icons from "src/constants/icons";
import ArrowIndicator from "../Unknown/ArrowIndicator";
import InfoLine from "../Unknown/InfoLine";
import BestWorst from "../Unknown/BestWorst";

import styles from "./index.module.scss";

interface SidebarProps {
  showSidebar: boolean;
  handleClose(): void;
  walletHistory: {}[];
}

const Sidebar = ({
  showSidebar = false,
  handleClose,
  walletHistory,
}: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isDataOpen, setIsDataOpen] = useState<boolean>(true);
  const [isAbsolute, setIsAbsolute] = useState<boolean>(
    window.innerWidth <= 992 ? true : false
  );
  const [uniqueCoins, setUniqueCoins] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalValue24h, setTotalValue24h] = useState<number>(0);
  const [totalValue7d, setTotalValue7d] = useState<number>(0);
  const [sortedBestWorst, setSortedBestWorst] = useState<any[]>([]);

  const handleResize = () => {
    if (!isAbsolute && window.innerWidth <= 992) {
      setIsAbsolute(true);
    }
    if (isAbsolute && window.innerWidth > 992) {
      setIsAbsolute(false);
    }
    if (isSidebarOpen && window.innerWidth <= 992) {
      setIsSidebarOpen(true);
    }
  };

  useResize(isAbsolute, handleResize);

  useEffect(() => {
    if (walletHistory.length !== 0) {
      setSortedBestWorst(
        walletHistory.sort(
          (a: any, b: any) =>
            (b.holdings[0].quote_rate - b.holdings[6].quote_rate) /
              b.holdings[6].quote_rate -
            (a.holdings[0].quote_rate - a.holdings[6].quote_rate) /
              a.holdings[6].quote_rate
        )
      );
      setUniqueCoins(walletHistory.length);
      setTotalValue(
        walletHistory.reduce((a: any, b: any) => {
          return a + b.holdings[0].close.quote;
        }, 0)
      );
      setTotalValue24h(
        walletHistory.reduce((a: any, b: any) => {
          return a + b.holdings[1].close.quote;
        }, 0)
      );
      setTotalValue7d(
        walletHistory.reduce((a: any, b: any) => {
          return a + b.holdings[6].close.quote;
        }, 0)
      );
    }
  }, [walletHistory]);

  return (
    <div
      className={classNames(
        styles.sidebar,
        !isSidebarOpen && styles.sidebarClosed,
        showSidebar && styles.showMenu
      )}
    >
      <div className={styles.header}>
        {!isAbsolute && (
          <>
            {isSidebarOpen && (
              <div className={styles.logo}>
                <img src={icons.logo} alt="Logo" />
                <div className={styles.logoText}>
                  <h4 className={styles.logoTextTitle}>DeFi Oracle</h4>
                  <span className={styles.logoTextSubtitle}>
                    Your one stop crypto hub
                  </span>
                </div>
              </div>
            )}

            <div
              className={styles.sidebarHeaderCollapseBtn}
              onClick={() => {
                !isAbsolute &&
                  setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
              }}
            >
              <SidebarCollapseSvg />
            </div>
          </>
        )}
        {isAbsolute && (
          <div className={styles.closeBtn} onClick={handleClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.7815 6.28033C19.0744 5.98744 19.0744 5.51256 18.7815 5.21967C18.4886 4.92678 18.0137 4.92678 17.7208 5.21967L12.0006 10.9399L6.28033 5.21967C5.98744 4.92678 5.51256 4.92678 5.21967 5.21967C4.92678 5.51256 4.92678 5.98744 5.21967 6.28033L10.9399 12.0006L5.21967 17.7208C4.92678 18.0137 4.92678 18.4886 5.21967 18.7815C5.51256 19.0744 5.98744 19.0744 6.28033 18.7815L12.0006 13.0612L17.7208 18.7815C18.0137 19.0744 18.4886 19.0744 18.7815 18.7815C19.0744 18.4886 19.0744 18.0137 18.7815 17.7208L13.0612 12.0006L18.7815 6.28033Z"
                fill="#838487"
              />
            </svg>
          </div>
        )}
      </div>
      <ul className={styles.navigation}>
        <li className={styles.navigationBtn}>
          <SummarySvg />
          {isSidebarOpen && (
            <span className={styles.navigationBtnTitle}>Summary</span>
          )}
        </li>
        <li
          className={
            isDataOpen ? styles.navigationBtnActive : styles.navigationBtn
          }
          onClick={() => setIsDataOpen((isDataOpen) => !isDataOpen)}
        >
          <WalletSvg />
          {isSidebarOpen && (
            <span className={styles.navigationBtnTitle}>Wallet</span>
          )}
        </li>
        <li>
          {isDataOpen && isSidebarOpen && (
            <ul className={styles.infoBlock}>
              <li className={styles.infoBlockItem}>
                <InfoLine
                  sidebarVariant
                  title="Total value"
                  info={`$${totalValue.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}`}
                />
              </li>

              <li className={styles.infoBlockItem}>
                <InfoLine
                  sidebarVariant
                  title="Unique coins"
                  info={uniqueCoins}
                />
              </li>

              <li className={styles.infoBlockItem}>
                <InfoLine
                  sidebarVariant
                  title="24h"
                  info={
                    totalValue && (
                      <ArrowIndicator
                        sidebarVariant
                        price={totalValue}
                        price24h={totalValue24h}
                      />
                    )
                  }
                />
              </li>

              <li className={styles.infoBlockItem}>
                <InfoLine
                  sidebarVariant
                  title="7d"
                  info={
                    totalValue && (
                      <ArrowIndicator
                        sidebarVariant
                        price={totalValue}
                        price24h={totalValue7d}
                      />
                    )
                  }
                />
              </li>

              {sortedBestWorst.length !== 0 && (
                <li className={styles.infoBlockItem}>
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
                </li>
              )}
            </ul>
          )}
        </li>

        <li className={styles.navigationBtn}>
          <NFTsSvg />
          {isSidebarOpen && (
            <span className={styles.navigationBtnTitle}>NFTs</span>
          )}
        </li>
        <li className={styles.navigationBtn}>
          <NaaSDaaSSvg />
          {isSidebarOpen && (
            <span className={styles.navigationBtnTitle}>NaaS/DaaS</span>
          )}
        </li>
        <li className={styles.navigationBtn}>
          <NodesSvg />
          {isSidebarOpen && (
            <span className={styles.navigationBtnTitle}>Nodes</span>
          )}
        </li>
        <li className={styles.navigationBtn}>
          <LendingLoadsSvg />
          {isSidebarOpen && (
            <span className={styles.navigationBtnTitle}>Lending/Loads</span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
