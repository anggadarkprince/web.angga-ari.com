"use client"

import styles from "./Dropdown.module.css";
import React, {createContext, CSSProperties, PropsWithChildren, useContext, useEffect, useRef, useState} from "react";
import {clsx} from "clsx";

interface DropdownProp {
  isOpenDefault?: boolean,
  className?: string;
  style?: CSSProperties;
}
export const Dropdown: React.FC<PropsWithChildren<DropdownProp>> = ({className, style, isOpenDefault = false, children}) => {
  const [dropdownOpen, setDropdownOpen] = useState(isOpenDefault);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref?.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [ref]);

  const onToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <DropdownContext.Provider value={{ isOpen: dropdownOpen, onToggle }}>
      <div className={clsx(styles.dropdown, dropdownOpen && styles.open, className)} style={style} ref={ref}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
Dropdown.displayName = 'Dropdown';

interface DropdownContextValue {
  isOpen: boolean;
  onToggle: () => void;
}

export const DropdownContext = createContext<DropdownContextValue>({
  isOpen: false,
  onToggle: () => {}
});

export const useDropdown = () => useContext(DropdownContext);
