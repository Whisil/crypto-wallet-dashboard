import BotsPair from "./BotsPair";
import icons from "src/constants/icons";
import Selector from "../Selector";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { Toggles } from "src/components/TopBar/TopBarSvg";
import ToggleSwitch from "src/components/TopBar/ToggleSwitch";

import styles from "./styles.module.scss";
import { useClickOutside } from "src/hooks/useClickOutside";

const BotsWidget = ({ large }: { large?: boolean }) => {
  const selectorData = [
    `KuCoin DCA`,
    `Binance DCA`,
    `ByBit DCA`,
    `Coinbase DCA`,
    `Kraken DCA`,
  ];

  const [selectorValue, setSelectorValue] = useState<string>(`KuCoin DCA`);
  const [showSelector, setShowSelector] = useState<boolean>(false);
  const [showToggles, setShowToggles] = useState<boolean>(false);
  const [positionOffsetRight, setPositionOffsetRight] =
    useState<boolean>(false);
  const [smallBalancesChecked, setSmallBalancesChecked] =
    useState<boolean>(false);
  const [individualTokensChecked, setIndividulaTokensChecked] =
    useState<boolean>(false);

  const selectorRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const togglesRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectorRef, () => setShowSelector(false));
  useClickOutside(togglesRef, () => setShowToggles(false));

  const handleOnSelect = (value: string) => {
    setSelectorValue(value);
    setShowSelector(false);
  };

  useEffect(() => {
    if (
      mainRef.current &&
      window.innerWidth - mainRef.current.getBoundingClientRect().right <= 0
    ) {
      setPositionOffsetRight(true);
    }
  }, []);

  return (
    <div
      className={classNames(
        styles.bots,
        large && styles.cardLarge,
        positionOffsetRight && styles.botsOffsetRight
      )}
      ref={mainRef}
    >
      <div className={styles.upperRow}>
        <h4 className={styles.title}>Manage bots</h4>
        <div ref={togglesRef}>
          <div
            className={classNames(
              styles.filterBtn,
              showToggles && styles.filterBtnActive
            )}
            onClick={() => setShowToggles((showToggles) => !showToggles)}
          >
            <Toggles />
          </div>
          {showToggles && (
            <div className={styles.switchFilter}>
              <ToggleSwitch
                text="individual tokens"
                onClick={() =>
                  setIndividulaTokensChecked((checked) => !checked)
                }
                checked={individualTokensChecked}
              />
              <ToggleSwitch
                text="Small balances"
                onClick={() => setSmallBalancesChecked((checked) => !checked)}
                checked={smallBalancesChecked}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.scrollTitle}>
        <span className={styles.title}>Name</span>
        <div className={styles.rightSide}>
          <span className={styles.title}>Runtime</span>
          <span className={styles.title}>Profit</span>
        </div>
      </div>

      <ul className={styles.pairList}>
        <BotsPair green pair="DAG/DCA" />
        <BotsPair red pair="LTX/ETH" />
        <BotsPair zero pair="AVAX/USDT" />
        <BotsPair green pair="DAG/DCA" />
        <BotsPair red pair="LTX/ETH" />
        <BotsPair zero pair="AVAX/USDT" />
        <BotsPair green pair="DAG/DCA" />
        <BotsPair red pair="LTX/ETH" />
        <BotsPair zero pair="AVAX/USDT" />
      </ul>

      <div className={styles.bottomRow}>
        <div ref={selectorRef} className={styles.selectorFlexContainer}>
          <div
            className={classNames(
              styles.select,
              showSelector && styles.selectActive
            )}
            onClick={() => setShowSelector((showSelector) => !showSelector)}
          >
            <span className={styles.selectText}>{selectorValue}</span>
            <img src={icons.dropdown} alt="dropdown" />
          </div>
          <div className={styles.selectorContainer}>
            {showSelector && (
              <Selector
                selectorData={selectorData}
                selectedValue={selectorValue}
                onSelect={handleOnSelect}
              />
            )}
          </div>
        </div>
        <button className={styles.createBtn}>Create</button>
      </div>
    </div>
  );
};

export default BotsWidget;
