import { MouseEventHandler, PropsWithChildren } from "react";
import "./styles.scss";

export type Props = {
  active?: boolean;
  hover?: boolean;
  onMouseDown: MouseEventHandler<HTMLSpanElement>;
};

export const Button = ({
  active,
  hover,
  onMouseDown,
  children,
}: PropsWithChildren<Props>) => {
  let className = "button"
    .concat(active ? " active" : "")
    .concat(hover ? " hover-able" : "");
  return (
    <span className={className} onMouseDown={onMouseDown}>
      {children}
    </span>
  );
};
