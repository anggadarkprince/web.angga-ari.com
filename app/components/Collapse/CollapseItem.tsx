import React, {PropsWithChildren} from "react";
import {useCollapse} from "@/app/components/Collapse/Collapse";
import {clsx} from "clsx";

export const CollapseItem = ({children}: PropsWithChildren) => {
  const {isCollapse} = useCollapse();
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
