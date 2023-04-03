import { PropsWithChildren } from "react";
import { BaseProps } from "../../types";
import "./styles.scss";

export const Menu = ({ className, ...props }: PropsWithChildren<BaseProps>) => {
  return <div {...props} className={`menu ${className}`} />;
};
