import { ChangeEventHandler } from "react";
import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
    max: number;
    value: number;
    step: number;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

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
