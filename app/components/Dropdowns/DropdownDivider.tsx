import styles from "./DropdownDivider.module.css";
import React, {CSSProperties} from "react";
import {clsx} from "clsx";

interface DropdownDividerProp {
  className?: string;
  style?: CSSProperties;
}
export const DropdownDivider = ({className, style}: DropdownDividerProp) => {
  return (
    <div className={clsx(styles.dropdown__divider, className)} style={style}></div>
  );
}
