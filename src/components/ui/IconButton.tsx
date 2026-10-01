import type { ReactNode } from "react";
import { Button, type ButtonProps } from "./Button";

type IconButtonProps = Omit<ButtonProps, "children" | "size"> & {
  "aria-label": string;
  children: ReactNode;
};

/** El nombre accesible es obligatorio para botones sin texto visible. */
export function IconButton(props: IconButtonProps) {
  return <Button size="icon" {...props} />;
}
