import React, {CSSProperties, PropsWithChildren} from "react";
import {useCollapse} from "@/app/components/Collapse/Collapse";
import {clsx} from "clsx";

interface CollapseItemProps {
  as?: 'div' | 'section' | 'nav',
  className?: string,
  style?: CSSProperties,
}
export const CollapseItem = ({as: Component, className, style, children}: PropsWithChildren<CollapseItemProps>) => {
  const {isCollapse} = useCollapse();
  if (Component) {
    return (
      <Component className={clsx(className, isCollapse && 'collapse')} style={style}>
        {children}
      </Component>
    )
  }
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        className: clsx(child.props.className, isCollapse && 'collapse')
      })
    }
    return child;
  });
}
