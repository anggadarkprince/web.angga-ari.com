import React, {ReactNode} from "react";
import {useCollapse} from "@/app/components/Collapse/Collapse";

interface CollapseToggleProps {
  children: ReactNode | ReadonlyArray<ReactNode> | ((isCollapse: boolean) => ReactNode)
}
export const CollapseToggle = ({children}: CollapseToggleProps) => {
  const { onToggle, isCollapse } = useCollapse();
  const toggleElement = typeof children === 'function' ? children(isCollapse) : children;
  return React.Children.map(toggleElement, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        onClick: onToggle
      })
    }
    return child;
  });
}
