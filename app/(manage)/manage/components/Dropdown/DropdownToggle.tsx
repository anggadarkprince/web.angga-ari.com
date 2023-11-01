"use client"

import styles from "./DropdownToggle.module.css";
import React, {CSSProperties, MouseEventHandler, PropsWithChildren} from "react";
import {clsx} from "clsx";
import {useDropdown} from "@/app/(manage)/manage/components/Dropdown/Dropdown";

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
