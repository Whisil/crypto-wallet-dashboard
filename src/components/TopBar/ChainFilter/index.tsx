import { useEffect, useState } from "react";
import ChainFilterItem from "../ChainFilterItem";

import styles from "./styles.module.scss";

interface ChainFilterProps {
  balances: { chain: string; items: {}[] }[];
  handleChainSelect(chainId: string, label: string, remove: boolean): void;
  handleRemoveAllSelected(): void;
  showNull: boolean;
}

const ChainFilter = ({
  balances,
  handleChainSelect,
  handleRemoveAllSelected,
  showNull,
}: ChainFilterProps) => {
  const [selectedChains, setSelectedChains] = useState<
    { label: string; logo: string; value: number; chain: string }[]
  >([]);
  const [selectedChainsId, setSelectedChainsId] = useState<string[]>([]);
  const [chains, setChains] = useState<any[]>(balances);
  const [search, setSearch] = useState<string>(``);

  //handle remove and select functions

  const handleSelect = (
    info: { label: string; logo: string; value: number; chain: string },
    chain: string
  ) => {
    setSelectedChains((selectedChains) => [...selectedChains, info]);
    setSelectedChainsId((selectedChainsId) => [...selectedChainsId, chain]);
  };

  const handleRemove = (selectedChain: string) => {
    setSelectedChains((selectedChains) =>
      selectedChains.filter((chain) => chain.chain !== selectedChain)
    );
    setSelectedChainsId((selectedChainsId) =>
      selectedChainsId.filter((chainId) => chainId !== selectedChain)
    );
  };

  //chains filtreing on select and remove

  useEffect(() => {
    if (selectedChains.length !== 0) {
      setChains(() =>
        balances.filter((item) => !selectedChainsId.includes(item.chain))
      );
    } else {
      setChains(balances);
    }
  }, [selectedChainsId, search, balances]);

  useEffect(() => {
    if(search.length !==  0){

    }
  }, [search])

  return (
    <>
      {!showNull ? null : (
        <ul className={styles.filterList}>
          {selectedChains.length !== 0 && (
            <>
              {selectedChains.map((item) => (
                <li key={item.chain}>
                  <ChainFilterItem
                    chain={item.chain}
                    balance={item.value}
                    onRemove={handleRemove}
                    checked={true}
                    handleChainSelect={handleChainSelect}
                  />
                </li>
              ))}
              <li
                className={styles.clearBtn}
                onClick={() => {
                  setSelectedChains([]);
                  setSelectedChainsId([]);
                  handleRemoveAllSelected();
                }}
              >
                Clear all{" "}
              </li>
              <li className={styles.divider} />
            </>
          )}
          {chains.map((item: { chain: string; items: {}[] }) => (
            <li key={item.chain}>
              <ChainFilterItem
                chain={item.chain}
                balance={item.items}
                onSelect={handleSelect}
                checked={false}
                handleChainSelect={handleChainSelect}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ChainFilter;
