import SelectorItem from "./SelectorItem";

import styles from "./styles.module.scss";

interface SelectorProps {
  onSelect(value: string): void;
  selectedValue: string;
  selectorData: string[];
  className?: string;
}

const Selector = ({ onSelect, selectedValue, selectorData }: SelectorProps) => {
  return (
    <ul className={styles.selector}>
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
