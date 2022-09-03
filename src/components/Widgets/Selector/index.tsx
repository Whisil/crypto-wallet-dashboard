import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import SelectorItem from "./SelectorItem";

import styles from "./styles.module.scss";

interface SelectorProps {
  onSelect(value: string): void;
  selectedValue: string;
  selectorData: string[];
  className?: string;
}

const Selector = ({ onSelect, selectedValue, selectorData }: SelectorProps) => {
  const [positionOffsetBottom, setPositionOffsetBottom] =
    useState<boolean>(false);

  const selectorRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (
      selectorRef.current &&
      window.innerHeight - selectorRef.current.getBoundingClientRect().bottom <= 0
    ) {
      setPositionOffsetBottom(true);
    }
  }, []);

  return (
    <ul
      className={classNames(
        styles.selector,
        positionOffsetBottom && styles.offsetBottom
      )}
      ref={selectorRef}
    >
      <>
        {selectorData.map((item, i) => (
          <li key={i}>
            <SelectorItem
              onSelect={onSelect}
              value={item}
              selectedValue={selectedValue}
            />
          </li>
        ))}
      </>
    </ul>
  );
};

export default Selector;
