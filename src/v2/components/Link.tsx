import React, { FC, AnchorHTMLAttributes } from 'react'
import { css, cx } from '@emotion/css'
import { theme } from '../theme'
import { isNil } from 'lodash'

const linkStyle = css`
  label: link;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  gap: ${theme.spacing.s};
  align-items: center;
  transition: color 150ms linear;
  text-decoration: underline;
  color: ${theme.colors.muted};

  &:hover {
    text-decoration: none;
    color: ${theme.colors.text};
  }
`

export const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, className, onClick, ...props }) => {
  if (isNil(onClick)) {
    return (
      <a className={cx(linkStyle, className)} {...props}>
        {children}
      </a>
    )
  }
  return (
    <span className={cx(linkStyle, className)} onClick={onClick} {...props}>
      {children}
    </span>
  )
}
