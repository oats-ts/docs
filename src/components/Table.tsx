import { css, cx } from '@emotion/css'
import React, { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'

const tableContainerStyle = css`
  border-radius: ${theme.spacing.m};
  border: ${theme.spacing.xxxs} solid ${theme.colors.dark1};
  margin: 1px;
`

const tableStyle = css`
  border-collapse: collapse;
  width: 100%;
  border-width: ${theme.spacing.zero};
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

const trStyle = css`
  border: ${theme.spacing.xxxs} solid ${theme.colors.dark1};
  border-left-width: ${theme.spacing.zero};
  border-right-width: ${theme.spacing.zero};
  &:last-of-type {
    border-bottom-width: ${theme.spacing.zero};
  }
`

const headerTrStyle = css`
  background-color: ${theme.colors.dark1};
  border-width: ${theme.spacing.zero};
  border-radius: ${theme.spacing.m};
`

export const Tr: FC<HTMLAttributes<HTMLTableRowElement> & { isHeader?: boolean }> = ({
  children,
  isHeader,
  className,
  ...props
}) => {
  const clsName = cx(isHeader ? headerTrStyle : trStyle, className)
  return (
    <tr {...props} className={clsName}>
      {children}
    </tr>
  )
}

const thStyle = css`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
  padding: ${theme.spacing.xxm} ${theme.spacing.m};
  text-align: left;
  &:first-of-type {
    border-top-left-radius: ${theme.spacing.xs};
  }
  &:last-of-type {
    border-top-right-radius: ${theme.spacing.xs};
  }
`

export const Th: FC<HTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => {
  return (
    <th {...props} className={cx(thStyle, className)}>
      {children}
    </th>
  )
}

const tdStyle = css`
  padding: ${theme.spacing.m};
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.muted};
`

export const Td: FC<HTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => {
  return (
    <td {...props} className={cx(tdStyle, className)}>
      {children}
    </td>
  )
}

const tHeadStyle = css`
  border-width: ${theme.spacing.zero};
`

export const THead: FC<HTMLAttributes<HTMLTableSectionElement>> = ({ children, className, ...props }) => {
  return (
    <thead {...props} className={cx(tHeadStyle, className)}>
      {children}
    </thead>
  )
}

const tBodyStyle = css`
  border-width: ${theme.spacing.zero};
`

export const TBody: FC<HTMLAttributes<HTMLTableSectionElement>> = ({ children, className, ...props }) => {
  return (
    <tbody {...props} className={cx(tBodyStyle, className)}>
      {children}
    </tbody>
  )
}
