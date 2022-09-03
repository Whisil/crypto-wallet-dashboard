import ArrowIndicator from "src/components/Unknown/ArrowIndicator";
import placeholder from "../../../assets/svg/token-placeholder.svg";

import styles from "./styles.module.scss";

interface TokenInfoProps {
  tokenName: string;
  price: number;
  logo: string;
  price24h: any;
}

const TokenInfo = ({ tokenName, price, logo, price24h }: TokenInfoProps) => {
  return (
    <div className={styles.tokenInfo}>
      <div className={styles.token}>
        <img
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholder;
          }}
          width="28"
          height="28"
          src={logo}
          alt="Token avatar"
        />
        <span className={styles.tokenName}>{tokenName}</span>
      </div>
      <ArrowIndicator price={price} price24h={price24h} />
    </div>
  );
};
export default TokenInfo;
