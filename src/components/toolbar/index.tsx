import { PropsWithChildren } from "react";
import { Menu } from "../menu";
import { BaseProps } from "../../types";

export const Toolbar = ({
  className,
  children,
}: PropsWithChildren<BaseProps>) => {
  return (
    <Menu className={`toolbar ${className || ""}`.trim()}>{children}</Menu>
  );
};
