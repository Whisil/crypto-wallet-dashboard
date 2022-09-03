import placeholder from "../../../assets/svg/token-placeholder.svg";
import icons from "src/constants/icons";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

interface ArrowIndicatorProps {
  token?: string;
  price?: number;
  price24h?: number;
  lg?: boolean;
  tokenLogo?: string;
  priceChangePreCalc?: number;
  sidebarVariant?: boolean;
}

const ArrowIndicator = ({
  token,
  tokenLogo,
  priceChangePreCalc,
  price,
  lg,
  price24h,
  sidebarVariant,
}: ArrowIndicatorProps) => {
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    if (priceChangePreCalc) {
      setPriceChange(priceChangePreCalc === Infinity ? 0 : priceChangePreCalc);
    } else if (price && price24h && price24h > 0) {
      setPriceChange(((price - price24h) / price24h) * 100);
    }
  }, [price, price24h]);

  return (
    <span
      className={
        token && token.length !== 0
          ? styles.tokenVariant
          : price
          ? styles.priceVariant
          : styles.regularVariant
      }
    >
      {price && !sidebarVariant && (
        <span className={styles.price}>
          ${" "}
          {price < 0.01
            ? `<0.01`
            : price.toString().match(/^-?\d+(?:\.\d{0,2})?/)}
        </span>
      )}
      {token && token.length !== 0 && (
        <span className={styles.token}>
          <img
            width={`${lg ? 16 : 12}`}
            height={lg ? 16 : 12}
            src={tokenLogo}
            alt={token}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeholder;
            }}
          />
          <span className={classNames(styles.tokenName, lg && styles.lgName)}>
            {token}
          </span>
        </span>
      )}

      <span
        className={classNames(
          styles.number,
          priceChange < 0 && styles.redAccent,
          parseFloat(priceChange.toFixed(2)) === 0 && styles.priceNeutral,
          lg && styles.lgNumber
        )}
      >
        {priceChange < 0 ? (
          <img src={icons.arrowDown} alt="arrow down" height={8} width={8} />
        ) : parseFloat(priceChange.toFixed(2)) === 0 ? (
          <img
            src={icons.arrowNeutral}
            alt="arrow neutral"
            height={8}
            width={8}
          />
        ) : (
          <img src={icons.arrowUp} alt="arrow Up" height={8} width={8} />
        )}
        {priceChange >= 0
          ? priceChange.toFixed(2)
          : priceChange.toFixed(2).substring(1)}
        %
      </span>
    </span>
  );
};

export default ArrowIndicator;
