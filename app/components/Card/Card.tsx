import styles from './Card.module.css';
import {HTMLAttributes, PropsWithChildren} from "react";
import {clsx} from "clsx";

interface CardType extends HTMLAttributes<HTMLDivElement>{
  color?: 'primary' | 'secondary' | 'aggressive',
}
export const Card = ({color, className, style, children, ...rest}: PropsWithChildren<CardType>) => {
  return (
    <div className={clsx(styles.card, color && `bg-${color} ${styles.colorWhite}`, className)} style={style} {...rest}>
      {children}
    </div>
  )
}

interface CardTitleType extends HTMLAttributes<HTMLTitleElement>{
  color?: 'primary' | 'secondary' | 'aggressive',
}
export const CardTitle = ({color, className, style, children}: PropsWithChildren<CardTitleType>) => {
  return (
    <h1 className={clsx(styles.card__title, 'mb-0-5', color && `color-${color}`, className)} style={style}>
      {children}
    </h1>
  )
}
