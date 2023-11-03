"use client"

import {ReactNode} from "react";
import {useTable} from "@/app/components/Table/Table";

type RenderFunction = (column: {key: string, label: string}) => ReactNode;
interface TableHeaderProps {
  render?: RenderFunction,
  children?: ReactNode | RenderFunction
}
export const TableHeader = ({render, children}: TableHeaderProps) => {
  const {columns} = useTable();
  const renderFunction = typeof children === 'function' ? children : render;
  return (
    <thead>
      <tr>
        {typeof renderFunction === 'function' && columns.map(column => renderFunction(column))}
        {!renderFunction && typeof children !== 'function' && children}
      </tr>
    </thead>
  )
}
