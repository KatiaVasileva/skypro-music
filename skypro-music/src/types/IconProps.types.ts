import { ReactNode } from "react";

export type IconProps = {
  wrapperClass?: string;
  iconClass?: string;
  name: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: ReactNode;
};
