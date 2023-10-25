import React, {PropsWithChildren} from "react";

export const ItemWrapper = ({ wrapper, children }: PropsWithChildren<{wrapper: (children: React.ReactNode) => React.ReactNode}>) => wrapper(children);
