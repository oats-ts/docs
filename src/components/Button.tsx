import { css, cx } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC, PropsWithChildren } from 'react'
import { theme } from '../theme'

type ButtonProps = PropsWithChildren & {
  variant?: 'primary' | 'secondary'
  className?: string
  href?: string
  onClick?: () => void
}

const secondaryButtonStyle = css`
  label: secondary-button;
  color: ${theme.colors.text};
  background-color: ${theme.colors.dark1};

  &:hover {
    background-color: ${theme.colors.buttonHover};
  }
`

const primaryButtonStyle = css`
  label: primary-button;
  color: ${theme.colors.text};
  background-color: ${theme.colors.green};

  &:hover {
    background-color: #2ea043;
  }
`

const buttonStyle = css`
  label: button;
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  gap: ${theme.spacing.s};
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  border: unset;
  border-radius: ${theme.spacing.s};
  padding: ${theme.spacing.m} ${theme.spacing.xm};
  position: relative;
  font-weight: 400;
  cursor: pointer;
  font-size: ${theme.fontSize.m};
  box-shadow: rgba(0, 0, 0, 0.05) ${theme.spacing.zero} ${theme.spacing.xs} ${theme.spacing.s};
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) ${theme.spacing.zero} ${theme.spacing.xs} ${theme.spacing.xxm};
  }
`

export const Button: FC<ButtonProps> = ({ children, variant, className, href, onClick }) => {
  const clsName = cx(buttonStyle, variant === 'primary' ? primaryButtonStyle : secondaryButtonStyle, className)
  if (!isNil(href)) {
    return (
      <a className={clsName} onClick={onClick} href={href}>
        {children}
      </a>
    )
  }
  return (
    <button className={clsName} onClick={onClick}>
      {children}
    </button>
  )
}
