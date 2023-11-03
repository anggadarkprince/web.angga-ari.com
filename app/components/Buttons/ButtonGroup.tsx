import styles from './ButtonGroup.module.css';
import {clsx} from "clsx";
import React, {CSSProperties, PropsWithChildren} from "react";
import {ButtonProps} from "@/app/components/Buttons/Button";

export const ButtonGroup = ({className, style, children}: PropsWithChildren<{ className?: string, style?: CSSProperties }>) => {
  return (
    <div className={clsx(styles.button__group, className)} style={style}>
      {
        React.Children.map(children, (child) => {
          if (React.isValidElement<ButtonProps>(child)) {
            return React.cloneElement(child, {
              ...child.props,
              className: clsx(child.props.className, styles.button)
            });
          }
        })
      }
    </div>
  )
}
