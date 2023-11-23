"use client"

import styles from "./DropdownToggle.module.css";
import React, {CSSProperties, PropsWithChildren} from "react";
import {clsx} from "clsx";
import {useDropdown} from "@/app/components/Dropdowns/Dropdown";
import {Button} from "@/app/components/Buttons";
import {SizeType, VariantType} from "@/app/types";

interface DropdownToggleProp {
  as?: React.ElementType;
  variant?: VariantType,
  size?: SizeType,
  className?: string;
  style?: CSSProperties;
  noArrow?: boolean;
}
export const DropdownToggle = ({variant, size, className, style, noArrow = false, children}: PropsWithChildren<DropdownToggleProp>) => {
  const { onToggle } = useDropdown();
  if (variant) {
    return (
      <Button variant={variant} size={size} onClick={onToggle} className={clsx(!noArrow && styles.arrow, className)} style={style}>
        {children}
      </Button>
    )
  }
  return (
    <button type={"button"} onClick={onToggle} className={clsx(styles.dropdown__toggle, !noArrow && styles.arrow, className)} style={style}>
      {children}
    </button>
  );
}
