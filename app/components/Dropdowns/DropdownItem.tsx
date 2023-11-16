import styles from './DropdownItem.module.css';
import {clsx} from "clsx";
import React, {CSSProperties, MouseEventHandler, PropsWithChildren} from "react";
import Link from "next/link";
import {useDropdown} from "@/app/components/Dropdowns/Dropdown";

interface DropdownItemProp {
  title?: string;
  icon?: string;
  href?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}
export const DropdownItem = ({title, icon, href, onClick, className, style, children}: PropsWithChildren<DropdownItemProp>) => {
  const { onToggle } = useDropdown();

  const onClickItem: MouseEventHandler<HTMLElement> = (e) => {
    onToggle();
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  }

  const content = children ? children : (
    <>
      {icon && <i className={clsx(icon, title && 'mr-0-25')}></i>}
      {title}
    </>
  );

  const props = {
    className: clsx(styles.dropdown__item, className),
    style
  };
  let dropdownItem = <div {...props}>{content}</div>;

  if (onClick) {
    dropdownItem = <button type={'button'} onClick={onClickItem} {...props}>{content}</button>
  }
  if (href) {
    dropdownItem = <Link href={href} onClick={onClickItem} {...props}>{content}</Link>
  }

  return (
    dropdownItem
  )
}
DropdownItem.displayName = 'DropdownItem';
