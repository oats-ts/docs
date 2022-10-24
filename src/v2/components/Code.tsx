import { cx, css } from '@emotion/css'
import React, { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'

const codeStyle = css`
  font-size: ${theme.fontSize.code};
  color: ${theme.colors.text};
  background-color: ${theme.colors.dark1};
  padding: 2px 4px;
  border-radius: 6px;
`

export const Code: FC<HTMLAttributes<HTMLElement>> = ({ className, children, ...props }) => {
  return (
    <code className={cx(codeStyle, className)} {...props}>
      {children}
    </code>
  )
}
