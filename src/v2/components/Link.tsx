import React, { FC, AnchorHTMLAttributes } from 'react'
import { css, cx } from '@emotion/css'
import { theme } from '../theme'

const linkStyle = css`
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

  /* &:hover {
    color: ${theme.colors.text};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    opacity: 1;
    background-color: ${theme.colors.muted};
    transition: opacity 300ms, transform 300ms;
    transform: translate3d(0, 2px, 0);
    transform: scale(1);
  }

  &:hover::after {
    opacity: 0;
    transform: scale(0);
    transform-origin: center;
  } */
`

export const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, className, ...props }) => {
  return (
    <a className={cx(linkStyle, className)} {...props}>
      {children}
    </a>
  )
}
