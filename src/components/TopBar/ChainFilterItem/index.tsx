import { useEffect, useState } from "react";
import icons from "src/constants/icons";
import placeholder from "../../../assets/svg/token-placeholder.svg";
import chainsInfo from "src/constants/chainsInfo";

import styles from "./styles.module.scss";

interface ChainFilterItem {
  chain: string;
  balance: any;
  onSelect?({}, chain: string): void;
  onRemove?(selectedChain: string): void;
  checked: boolean;
  handleChainSelect(chainId: string, label: string, remove: boolean): void;
}

const ChainFilterItem = ({
  chain,
  balance,
  onSelect,
  checked,
  onRemove,
  handleChainSelect,
}: ChainFilterItem) => {
  const [chainValue, setChainValue] = useState<number>(0);
  const [chainInfo, setChainInfo] = useState<{ label: string; logo: string }>({
    label: ``,
    logo: ``,
  });

  //setting initial and selected chain value

  useEffect(() => {
    if (typeof balance === `number`) {
      setChainValue(balance);
    } else {
      const filteredBalance = balance.filter(
        (token: any) => token.contract_name.length !== 0 && token.quote_rate
      );
      filteredBalance.forEach((token: any) =>
        setChainValue((value) => value + token.quote)
      );
    }
  }, [balance]);

  //hardcoding chain logo and name

  useEffect(() => {
    const findObj = chainsInfo.find((obj) => obj.chainId === parseFloat(chain));
    if (chainInfo.label === `` && findObj) {
      setChainInfo({ label: findObj?.label, logo: findObj?.logo });
    }
  }, [chain]);

  return (
    <label className={styles.item}>
      <input
        type="checkbox"
        onChange={() => {
          if (checked && onRemove) {
            onRemove(chain);
            handleChainSelect(chain, chainInfo.label, true);
          } else if (!checked && onSelect) {
            handleChainSelect(chain, chainInfo.label, false);
            onSelect(
              {
                label: chainInfo.label,
                logo: chainInfo.logo,
                value: chainValue,
                chain: chain,
              },
              chain
            );
          }
        }}
        checked={checked}
      />
      <div className={styles.checkbox}>
        <img className={styles.check} src={icons.check} alt="check" />
      </div>
      <div className={styles.token}>
        <img
          width="20"
          height="20"
          src={chainInfo.logo}
          alt={chainInfo.label}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholder;
          }}
        />
        <span className={styles.tokenName}>{chainInfo.label ? chainInfo.label : chain}</span>
      </div>
      <span className={styles.price}>${chainValue.toFixed(2)}</span>
    </label>
  );
};

export default ChainFilterItem;
