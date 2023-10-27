import {PropsWithChildren} from "react";
import {clsx} from "clsx";
import Link from "next/link";

interface ButtonType {
  type?: 'button' | 'submit',
  className?: string
}
export const Button = ({type = 'button', className, children}: PropsWithChildren<ButtonType>) => {
  return (
    <button type={type} className={clsx('button', className)}>
      {children}
    </button>
  )
}

interface ButtonLinkType {
  href: string,
  target?: string,
  className?: string
}
export const ButtonLink = ({href, target, className, children}: PropsWithChildren<ButtonLinkType>) => {
  return (
    <Link href={href} target={target} className={clsx('button', className)}>
      {children}
    </Link>
  )
}
