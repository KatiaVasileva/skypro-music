import styles from "./ProgressBar.module.css";
import { ProgressBarProps } from "@/types/Player.types";

function ProgressBar({ max, value, step, onChange }: ProgressBarProps) {
  return (
    <input
      className={styles.progressBar}
      type="range"
      min="0"
      max={max}
      value={value}
      step={step}
      onChange={onChange}
    />
  );
}

export default ProgressBar;
