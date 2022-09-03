import ArrowIndicator from "../ArrowIndicator";
import styles from "./styles.module.scss";

interface BestWorstProps {
  bestToken: string;
  worstToken: string;
  lg?: boolean;
  priceChangePreCalcBest: number;
  priceChangePreCalcWorst: number;
  tokenLogoBest: string;
  tokenLogoWorst: string;
}

const BestWorst = ({
  bestToken,
  worstToken,
  lg,
  priceChangePreCalcBest,
  priceChangePreCalcWorst,
  tokenLogoBest,
  tokenLogoWorst,
}: BestWorstProps) => {
  let key = Math.random();

  return (
    <div
      className={styles.bestWorst}
      key={
        key + priceChangePreCalcBest
          ? priceChangePreCalcBest
          : priceChangePreCalcWorst
      }
    >
      <span className={styles.title}>Best/Worst 7d</span>
      <div className={styles.tokens}>
        <ArrowIndicator
          token={bestToken}
          lg={lg}
          tokenLogo={tokenLogoBest}
          priceChangePreCalc={priceChangePreCalcBest}
        />
        {worstToken && (
          <ArrowIndicator
            token={worstToken}
            lg={lg}
            tokenLogo={tokenLogoWorst}
            priceChangePreCalc={priceChangePreCalcWorst}
          />
        )}
      </div>
    </div>
  );
};

export default BestWorst;
