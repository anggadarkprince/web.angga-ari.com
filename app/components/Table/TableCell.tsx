import {ReactNode} from "react";

interface TableCellProps {
  children: ReactNode | (() => ReactNode)
}
export const TableCell = ({children}: TableCellProps) => {
  return (
    <td>
      {typeof children === 'function' ? children() : children}
    </td>
  )
}
