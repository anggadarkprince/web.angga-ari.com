"use client"

import {clsx} from "clsx";
import styles from './DropdownMenu.module.css';
import React, {CSSProperties, PropsWithChildren} from "react";
import {useDropdown} from "@/app/components/Dropdowns/Dropdown";

interface DropdownMenuProp {
  positionRight?: boolean;
  spaceTight?: boolean;
  className?: string;
  style?: CSSProperties;
}
export const DropdownMenu: React.FC<PropsWithChildren<DropdownMenuProp>> = ({positionRight = false, spaceTight = false, className, style, children}) => {
  const { isOpen } = useDropdown();
  return (
    <div className={
      clsx(
        styles.dropdown__menu,
        positionRight && styles.dropdown__menuRight,
        spaceTight && styles.dropdown__menuRight,
        isOpen && styles.open,
        className
      )
    } style={style}>
      {children}
    </div>
  )
}
