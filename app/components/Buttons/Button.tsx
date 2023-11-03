import React, {ButtonHTMLAttributes, PropsWithChildren} from "react";
import styles from './Button.module.css';
import {clsx} from "clsx";
import Link from "next/link";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'error' | 'success' | 'white',
  size?: 'small' | 'medium' | 'large',
  full?: boolean,
  href?: string,
  target?: string,
  active?: boolean
}
export const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
    size = 'medium',
    active = false,
    full = false,
    className,
    href,
    target,
    children,
    ...rest
  } = props;

  const wrapperProps = {
    className: clsx(
      styles.button,
      className,
      full && 'width-full',
      styles[`button__${variant}`],
      styles[`button__${size}`],
      active && 'active',
      rest.disabled && 'disabled',
    ),
    ...rest,
  }
  let Wrapper: React.FC<PropsWithChildren> = ({children}) => <button {...wrapperProps}>{children}</button>
  if (href) {
    Wrapper = ({children}) => (
      <Link href={href} target={target} className={wrapperProps.className} style={rest.style}>
        {children}
      </Link>
    )
  }
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}
