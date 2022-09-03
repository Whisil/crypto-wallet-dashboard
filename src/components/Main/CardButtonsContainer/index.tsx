import classNames from "classnames";
import CardBtn from "../CardButton";
import styles from "./styles.module.scss";

interface ContainerProps {
  column?: boolean;
  large?: boolean;
}

const CardButtonsContainer = ({ column, large }: ContainerProps) => {
  return (
    <div className={classNames(styles.container, column && styles.column, large && styles.largeCard)}>
      <div className={styles.cardContainer}>
        <CardBtn variant="Exchange" />
        <CardBtn variant="Lightning" />
      </div>
      <div className={styles.cardContainer}>
        <CardBtn variant="Bell" />
        <CardBtn variant="Bots" large={large} />
      </div>
    </div>
  );
};

export default CardButtonsContainer;
