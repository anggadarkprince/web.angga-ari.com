import styles from './DropdownItem.module.css';
import {clsx} from "clsx";
import React, {CSSProperties, MouseEventHandler, PropsWithChildren} from "react";
import Link from "next/link";

interface DropdownItemProp {
  title?: string;
  icon?: string;
  href?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}
export const DropdownItem = ({title, icon, href, onClick, className, style, children}: PropsWithChildren<DropdownItemProp>) => {
  const onClickItem: MouseEventHandler<HTMLElement> = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  }

  const props = {
    className: clsx(styles.dropdown__item, className),
    style
  };
  let Wrapper: React.FC<PropsWithChildren> = ({children}) => (
    <div {...props}>{children}</div>
  );

  if (onClick) {
    Wrapper = ({children}) => (
      <button type={'button'} onClick={onClickItem} {...props}>{children}</button>
    )
  }
  if (href) {
    Wrapper = ({children}) => (
      <Link href={href} {...props}>{children}</Link>
    )
  }

  return (
    <Wrapper>
      {children ? children : (
        <>
          {icon && <i className={clsx(icon, title && 'mr-0-25')}></i>}
          {title}
        </>
      )}
    </Wrapper>
  )
}
