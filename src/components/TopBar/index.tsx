import { useState, useRef, useEffect } from "react";
import { useResize } from "src/hooks/useResize";
import icons from "src/constants/icons";
import ChainFilter from "./ChainFilter";
import classNames from "classnames";
import { useClickOutside } from "src/hooks/useClickOutside";
import ToggleSwitch from "./ToggleSwitch";
import { Toggles, Chains } from "./TopBarSvg";

import styles from "./index.module.scss";

interface TopBarProps {
  tokensSwitchClick(): void;
  smallBalancesSwitchClick(): void;
  balances: { chain: string; items: {}[] }[];
  handlePassChains(passedChains: string[]): void;
}

const TopBar = ({
  tokensSwitchClick,
  smallBalancesSwitchClick,
  balances,
  handlePassChains,
}: TopBarProps) => {
  const [showToggles, setShowToggles] = useState<boolean>(false);
  const [showNull, setShowNull] = useState<boolean>(false);
  const [showSmallVariant, setShowSmallVariant] = useState<boolean>(
    window.innerWidth <= 992 ? true : false
  );
  const [selectedChains, setSelectedChains] = useState<
    { chain: string; label: string }[]
  >([]);
  const [smallBalancesChecked, setSmallBalancesChecked] =
    useState<boolean>(false);
  const [individualTokensChecked, setIndividulaTokensChecked] =
    useState<boolean>(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const togglesRef = useRef<HTMLDivElement>(null);

  useClickOutside(filterRef, () => setShowNull(false));

  useClickOutside(togglesRef, () => setShowToggles(false));

  const handleResize = () => {
    if (window.innerWidth <= 992) {
      setShowSmallVariant(true);
    }
    if (window.innerWidth > 992) {
      setShowSmallVariant(false);
    }
  };

  useResize(showSmallVariant, handleResize);

  useEffect(() => {
    if (selectedChains.length !== 0) {
      const selectedChainsId = selectedChains.map((item) => item.chain);
      if (selectedChainsId.length !== 0) {
        handlePassChains(selectedChainsId);
      }
    } else {
      handlePassChains([]);
    }
  }, [selectedChains]);

  //chain select handle functions

  const handleChainSelect = (
    chainId: string,
    label: string,
    remove: boolean
  ) => {
    if (!remove) {
      setSelectedChains((selectedChains) => [
        ...selectedChains,
        { chain: chainId, label: label },
      ]);
    } else {
      setSelectedChains((selectedChains) =>
        selectedChains.filter((chain) => chain.chain !== chainId)
      );
    }
  };

  const handleRemoveAllSelected = () => {
    setSelectedChains([]);
  };

  //toggles responsive check functions
  const handleIndividualTokens = () => {
    tokensSwitchClick();
    setIndividulaTokensChecked(!individualTokensChecked);
  };

  const handleSmallBalances = () => {
    smallBalancesSwitchClick();
    setSmallBalancesChecked(!smallBalancesChecked);
  };

  return (
    <div className={styles.topBar}>
      {showSmallVariant ? (
        <div className={styles.topBarSmall}>
          <h4 className={styles.title}>Wallet</h4>
          <div className={styles.btns}>
            <div
              className={classNames(
                styles.filterBtn,
                showNull && styles.filterBtnActive,
                selectedChains.length !== 0 && styles.filterBtnSelected
              )}
            >
              <div
                className={classNames(
                  styles.filterBtnInner,
                  showNull && styles.disable
                )}
                onClick={() => {
                  if (!showNull) {
                    setShowNull(true);
                  }
                }}
              >
                <Chains />
              </div>
            </div>

            <div ref={togglesRef}>
              <div
                className={classNames(
                  styles.filterBtn,
                  showToggles && styles.filterBtnActive,
                  styles.togglesBtn
                )}
                onClick={() => setShowToggles((showToggles) => !showToggles)}
              >
                <Toggles />
              </div>
              {showToggles && (
                <div className={styles.switchFilter}>
                  <ToggleSwitch
                    text="individual tokens"
                    onClick={handleIndividualTokens}
                    checked={individualTokensChecked}
                  />
                  <ToggleSwitch
                    text="Small balances"
                    onClick={handleSmallBalances}
                    checked={smallBalancesChecked}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className={classNames(
              styles.selectBtn,
              styles.filterBtn,
              showNull && styles.filterBtnActive,
              selectedChains.length !== 0 && styles.filterBtnSelected
            )}
          >
            <div
              className={classNames(
                styles.filterBtnInner,
                showNull && styles.disable
              )}
              onClick={() => {
                if (!showNull) {
                  setShowNull(true);
                }
              }}
            >
              <div>
                {selectedChains.length !== 0 ? (
                  <>
                    {selectedChains.slice(0, 2).map((item, i) => (
                      <span key={item.chain} className={styles.chainName}>
                        {i !== 0
                          ? `, ` + item.label
                          : i === 0
                          ? item.label
                          : null}
                      </span>
                    ))}
                    {selectedChains.length > 2 && (
                      <span className={styles.chainName}>
                        {" "}
                        +{selectedChains.length - 2}
                      </span>
                    )}
                  </>
                ) : (
                  <span className={styles.chainName}>All Chains</span>
                )}
              </div>
              <img src={icons.dropdown} alt="open" />
            </div>
          </div>
          <ToggleSwitch
            text="Individual tokens"
            onClick={handleIndividualTokens}
          />
          <ToggleSwitch text="Small balances" onClick={handleSmallBalances} />
        </>
      )}
      <div className={styles.filterListWrapper} ref={filterRef}>
        <ChainFilter
          balances={balances}
          handleChainSelect={handleChainSelect}
          handleRemoveAllSelected={handleRemoveAllSelected}
          showNull={showNull}
        />
      </div>
    </div>
  );
};

export default TopBar;
