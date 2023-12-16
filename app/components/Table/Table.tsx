"use client"

import {createContext, CSSProperties, PropsWithChildren, useContext, useState} from "react";
import styles from './Table.module.css';
import {clsx} from "clsx";

interface TableProps<T> {
  size?: 'small' | 'medium' | 'large'
  bordered?: boolean,
  responsive?: boolean,
  className?: string;
  style?: CSSProperties;
  columns?: Array<{key: string, label: string}>,
  items?: Array<T>,
}
export const Table = ({size, bordered = true, responsive = true, children, columns: tableColumn, items: tableRows, className}: PropsWithChildren<TableProps<any>>) => {
  const [rows, setRows] = useState(tableRows || []);
  const [columns, setColumns] = useState<Array<{key: string, label: string}>>(tableColumn || []);

  const setColumnValue = (columnData: Array<{key: string, label: string}>) => {
    setColumns(columnData);
  }

  return (
    <TableContext.Provider value={{ rows: rows, columns: columns, setColumns: setColumnValue }}>
      <table className={
        clsx(
          styles.table,
          size && styles[`table__${size}`],
          bordered && styles.table__border,
          responsive && styles.table__responsive,
          className
        )
      }>
        {children}
      </table>
    </TableContext.Provider>
  )
}

interface TableContextValue<T> {
  columns: Array<{key: string, label: string}>;
  rows : Array<T>;
  setColumns: (columns: Array<{key: string, label: string}>) => void;
}
export const TableContext = createContext<TableContextValue<any>>({
  columns: [],
  rows: [],
  setColumns: (columns) => {}
});

export const useTable = () => useContext(TableContext);
