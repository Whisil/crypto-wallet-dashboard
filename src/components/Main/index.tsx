import { useEffect, useState } from "react";
import styles from "src/components/Main/index.module.scss";
import ChainColumn from "./ChainColumn";

interface MainProps {
  balances: any[];
  BTCAndETHPrice: string[];
  individualTokens: boolean;
  smallBalances: boolean;
  selectedChains: string[];
}

const Main = ({
  balances,
  BTCAndETHPrice,
  smallBalances,
  individualTokens,
  selectedChains,
}: MainProps) => {
  const [filteredColumns, setFilteredColumns] = useState<
    { chain: string; items: {}[] }[]
  >([]);

  useEffect(() => {
    if (selectedChains.length !== 0) {
      setFilteredColumns(
        balances.filter((item) => selectedChains.includes(item.chain))
      );
    } else {
      setFilteredColumns(balances);
    }
  }, [selectedChains, balances]);

  return (
    <>
      {balances.length !== 0 && (
        <div className={styles.main}>
          <div className={styles.divider} />
          <div>
            {filteredColumns
              .slice(0, (filteredColumns.length + 1) / 2)
              .map((item) => (
                <div className={styles.column} key={item.chain}>
                  <ChainColumn
                    chain={item.chain}
                    tokens={item.items}
                    BTCAndETHPrice={BTCAndETHPrice}
                    individualTokens={individualTokens}
                    smallBalances={smallBalances}
                    selectedChains={selectedChains}
                  />
                </div>
              ))}
          </div>
          <div className={styles.secondColumn}>
            {filteredColumns
              .slice((filteredColumns.length + 1) / 2, filteredColumns.length)
              .map((item) => (
                <div className={styles.column} key={item.chain}>
                  <ChainColumn
                    chain={item.chain}
                    tokens={item.items}
                    BTCAndETHPrice={BTCAndETHPrice}
                    individualTokens={individualTokens}
                    smallBalances={smallBalances}
                    selectedChains={selectedChains}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
