import { useRef, useEffect, useState } from "react";
import icons from "src/constants/icons";

import styles from "./styles.module.scss";

interface SelectorItemProps {
  onSelect(value: string): void;
  value: string;
  selectedValue: string;
}

const SelectorItem = ({
  onSelect,
  value,
  selectedValue,
}: SelectorItemProps) => {
  const [selected, setSelected] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current?.value === selectedValue) {
      setSelected(true);
    }
  }, []);

  return (
    <label className={styles.selectorItem}>
      <input
        checked={selected}
        type="checkbox"
        value={value}
        ref={inputRef}
        onChange={() => onSelect(value)}
      />
      <div className={styles.check}>
        <img src={icons.check} alt="check" />
      </div>
      <span className={styles.value}>{value}</span>
    </label>
  );
};

export default SelectorItem;
