import {PropsWithChildren} from "react";

export const TableColumn = ({children}: PropsWithChildren) => {
  return (
    <th>
      {children}
    </th>
  )
}
