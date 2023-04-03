import { Descendant } from "slate";

export interface Note {
  id: string;
  title: string;
  content: Descendant[];
}

export interface BaseProps {
  className?: string;
  [key: string]: unknown;
}
