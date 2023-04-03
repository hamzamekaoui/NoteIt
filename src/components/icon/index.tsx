import { PropsWithChildren } from "react";

export const Icon = ({ children }: PropsWithChildren) => (
  <span className="material-icons">{children}</span>
);
