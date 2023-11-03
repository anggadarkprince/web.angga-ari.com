import React, {createContext, PropsWithChildren, useContext, useState} from "react";

export const Collapse = ({collapsed = true, children}: PropsWithChildren<{collapsed?: boolean}>) => {
  const [isCollapse, setIsCollapse] = useState(collapsed);
  const onToggle = (e: MouseEvent) => {
    e.preventDefault();
    setIsCollapse((prev) => !prev);
  };
  return (
    <CollapseContext.Provider value={{ isCollapse: isCollapse, onToggle }}>
      {children}
    </CollapseContext.Provider>
  );
}

interface CollapseContextValue {
  isCollapse: boolean;
  onToggle: (e: MouseEvent) => void;
}

export const CollapseContext = createContext<CollapseContextValue>({
  isCollapse: false,
  onToggle: () => {}
});

export const useCollapse = () => useContext(CollapseContext);
