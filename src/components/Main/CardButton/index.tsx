import classNames from "classnames";
import { useRef, useState } from "react";
import BotsWidget from "src/components/Widgets/Bots";
import { useClickOutside } from "src/hooks/useClickOutside";
import { Exchange, Lightning, Bell, Bots } from "./CardButtonSvg";

import styles from "./styles.module.scss";

interface CardBtnProps {
  variant: "Exchange" | "Lightning" | "Bell" | "Bots";
  large?: boolean;
}

const CardBtn = ({ variant, large }: CardBtnProps) => {
  const [showBotsWidget, setShowBotsWidget] = useState<boolean>(false);
  const [exchangeSelected, setExchangeSelected] = useState<boolean>(false);
  const [lightningSelected, setLightningSelected] = useState<boolean>(false);
  const [bellSelected, setBellSelected] = useState<boolean>(false);

  const botsWidgetRef = useRef<HTMLDivElement>(null);

  useClickOutside(botsWidgetRef, () => {
    setShowBotsWidget(false);
  });

  let key = Math.random();
  
  return (
    <div
      className={classNames(
        variant === "Exchange"
          ? styles.btn
          : variant === "Lightning" || variant === "Bell"
          ? styles.greenAccent
          : variant === "Bots"
          ? styles.redAccent
          : ``,
        exchangeSelected && styles.regularSelect,
        lightningSelected && styles.greenSelect,
        bellSelected && styles.greenSelect,
        showBotsWidget && styles.redSelect
      )}
    >
      {variant === "Exchange" ? (
        <>
          <label htmlFor={`exchangeBtn${key}`} className={styles.label}>
            <Exchange className={styles.icon} />
          </label>
          <input
            type="checkbox"
            id={`exchangeBtn${key}`}
            checked={exchangeSelected}
            onChange={() => setExchangeSelected((prev) => !prev)}
          />
        </>
      ) : variant === "Lightning" ? (
        <>
          <label htmlFor={`lightningBtn${key}`} className={styles.label}>
            <Lightning className={styles.icon} />
          </label>
          <input
            type="checkbox"
            id={`lightningBtn${key}`}
            onChange={() => setLightningSelected((prev) => !prev)}
          />
        </>
      ) : variant === "Bell" ? (
        <>
          <label htmlFor={`bellBtn${key}`} className={styles.label}>
            <Bell className={styles.icon} />
          </label>
          <input
            type="checkbox"
            id={`bellBtn${key}`}
            onChange={() => setBellSelected((prev) => !prev)}
          />
        </>
      ) : variant === "Bots" ? (
        <div className={styles.bots} ref={botsWidgetRef}>
          <label
            htmlFor={`botsBtn${key}`}
            onClick={() => setShowBotsWidget((prevState) => !prevState)}
            className={styles.label}
          >
            <Bots className={styles.icon} />
          </label>
          <input type="checkbox" id={`botsBtn${key}`} />
          <div>{showBotsWidget && <BotsWidget large={large} />}</div>
        </div>
      ) : null}
    </div>
  );
};

export default CardBtn;
