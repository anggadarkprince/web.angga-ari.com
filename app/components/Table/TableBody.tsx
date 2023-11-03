import {ReactNode} from "react";
import {useTable} from "@/app/components/Table/Table";

type RenderFunction<T> = (item: T, index: number) => ReactNode;
interface TableBodyProps<T> {
  render?: RenderFunction<T>,
  children?: ReactNode | RenderFunction<T>
}
export const TableBody = ({render, children}: TableBodyProps<any>) => {
  const {rows} = useTable();
  const renderFunction = typeof children === 'function' ? children : render;
  return (
    <tbody>
      {typeof renderFunction === 'function' && rows.map((item, index) => renderFunction(item, index))}
      {!renderFunction && typeof children !== 'function' && children}
    </tbody>
  )
}
