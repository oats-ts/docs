import { css, cx } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { theme } from '../theme'

type ButtonProps = PropsWithChildren & {
  variant?: 'primary' | 'secondary'
  className?: string
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
  display: flex;
  gap: 8px;
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  padding: 12px 20px;
  border: unset;
  border-radius: 14px;
  position: relative;
  font-weight: 400;
  cursor: pointer;
  font-size: ${theme.font.m};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 8px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 18px;
  }
`

export const Button: FC<ButtonProps> = ({ children, variant, className }) => {
  const clsName = cx(buttonStyle, variant === 'primary' ? primaryButtonStyle : secondaryButtonStyle, className)
  return <button className={clsName}>{children}</button>
}
