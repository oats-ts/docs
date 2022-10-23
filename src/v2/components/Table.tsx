import { css, cx } from '@emotion/css'
import React, { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'

const tableContainerStyle = css`
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid ${theme.colors.dark1};
  margin: 1px;
`

const tableStyle = css`
  border-collapse: collapse;
  width: 100%;
`

export const Table: FC<HTMLAttributes<HTMLTableElement>> = ({ children, className, ...props }) => {
  return (
    <div className={tableContainerStyle}>
      <table className={cx(tableStyle, className)} {...props}>
        {children}
      </table>
    </div>
  )
}

const headerTrStyle = css`
  background-color: ${theme.colors.dark1};
`

const trStyle = css`
  border: 2px solid ${theme.colors.dark1};
  border-left-width: 0px;
  border-right-width: 0px;
`

export const Tr: FC<HTMLAttributes<HTMLTableRowElement> & { isHeader?: boolean }> = ({
  children,
  isHeader,
  className,
  ...props
}) => {
  const clsName = cx(isHeader ? headerTrStyle : trStyle, className)
  return (
    <tr className={clsName} {...props}>
      {children}
    </tr>
  )
}

const thStyle = css`
  color: ${theme.colors.text};
  border: 2px solid ${theme.colors.dark1};
  font-size: ${theme.fontSize.m};
  padding: 18px 10px;
  text-align: left;
`

export const Th: FC<HTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => {
  return (
    <th className={cx(thStyle, className)} {...props}>
      {children}
    </th>
  )
}

const tdStyle = css`
  padding: 10px;
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.muted};
`

export const Td: FC<HTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => {
  return (
    <td className={cx(tdStyle, className)} {...props}>
      {children}
    </td>
  )
}

export const THead: FC<HTMLAttributes<HTMLTableSectionElement>> = ({ children, ...props }) => {
  return <thead {...props}>{children}</thead>
}

export const TBody: FC<HTMLAttributes<HTMLTableSectionElement>> = ({ children, ...props }) => {
  return <tbody {...props}>{children}</tbody>
}
