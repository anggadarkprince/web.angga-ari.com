"use client"

import styles from "./DropdownToggle.module.css";
import React, {CSSProperties, PropsWithChildren} from "react";
import {clsx} from "clsx";
import {useDropdown} from "@/app/components/Dropdowns/Dropdown";

interface DropdownToggleProp {
  className?: string;
  style?: CSSProperties;
  noArrow?: boolean;
}
export const DropdownToggle = ({className, style, noArrow = false, children}: PropsWithChildren<DropdownToggleProp>) => {
  const { onToggle } = useDropdown();
  return (
    <button type={"button"} onClick={onToggle} className={clsx(styles.dropdown__toggle, noArrow && 'no-arrow', className)} style={style}>
      {children}
    </button>
  );
}
