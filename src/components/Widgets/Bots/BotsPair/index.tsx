import classNames from "classnames";

import styles from "./styles.module.scss";

interface BotsPairProps {
  red?: boolean;
  green?: boolean;
  zero?: boolean;
  pair?: string;
}

const BotsPair = ({ red, green, zero, pair }: BotsPairProps) => {
  return (
    <li className={styles.pair}>
      <span className={styles.title}>{pair}</span>
      <div className={styles.rightSide}>
        <span className={styles.title}>3d 14h</span>
        <span
          className={classNames(
            styles.title,
            green && styles.priceGreen,
            red && styles.priceRed,
            zero && styles.priceZero
          )}
        >
          {red ? `-` : `+`}$2.24
        </span>
      </div>
    </li>
  );
};

export default BotsPair;
