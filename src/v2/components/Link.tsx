import React, { FC, AnchorHTMLAttributes } from 'react'
import { css, cx } from '@emotion/css'
import { theme } from '../theme'

const linkStyle = css`
  label: link;
  position: relative;
  text-decoration: none;
  gap: 8px;
  align-items: center;
  transition: color 150ms linear;
  text-decoration: underline;
  color: ${theme.colors.muted};

  &:hover {
    text-decoration: none;
    color: ${theme.colors.text};
  }
`

export const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, className, ...props }) => {
  return (
    <a className={cx(linkStyle, className)} {...props}>
      {children}
    </a>
  )
}
