import React, {ButtonHTMLAttributes, PropsWithChildren} from "react";
import styles from './Button.module.css';
import {clsx} from "clsx";
import Link from "next/link";
import {SizeType, VariantType} from "@/app/types";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType,
  size?: SizeType,
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
    type = "button",
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

  if (href) {
    return (
      <Link href={href} target={target} className={wrapperProps.className} style={rest.style}>
        {children}
      </Link>
    )
  } else {
    return <button type={type} {...wrapperProps}>{children}</button>;
  }
}
Button.displayName = 'Button';
