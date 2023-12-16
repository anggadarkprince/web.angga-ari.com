import {ReactNode} from "react";
import {useTable} from "@/app/components/Table";

type RenderFunction = (columnKey: string) => ReactNode;
interface TableRowProps {
  render?: RenderFunction,
  children?: ReactNode | RenderFunction
}
export const TableRow = ({render, children}: TableRowProps) => {
  const {columns} = useTable();
  const renderFunction = typeof children === 'function' ? children : render;
  return (
    <tr>
      {typeof renderFunction === 'function' && columns.map(column => renderFunction(column.key))}
      {!renderFunction && typeof children !== 'function' && children}
    </tr>
  )
}
