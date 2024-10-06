import { ChangeEventHandler } from "react";

export type ProgressBarProps = {
  max: number;
  value: number;
  step: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
