
import styles from './styles.module.scss';

interface ToggleSwitchProps {
  text: string;
  onClick(): void;
  checked?: boolean;
}

const ToggleSwitch = ({text, onClick, checked}: ToggleSwitchProps) => {
  return (
    <label className={styles.checkbox}>
      <input className={styles.checkboxInput} checked={checked && checked} type="checkbox" onChange={onClick} />
      <div className={styles.checkboxDiv}></div>
      <span className={styles.checkboxText}>{text}</span>
    </label>
  );
};

export default ToggleSwitch;
