import React, { FC, InputHTMLAttributes } from 'react'
import { css, cx } from '@emotion/css'
import { theme } from '../theme'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

const inputStyle = css`
  label: input;
  width: 100%;
  background-color: ${theme.colors.dark1};
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
  border-radius: ${theme.spacing.s};
  padding: ${theme.spacing.m} 16px;
  border-width: ${theme.spacing.zero};
  outline: none;

  &::placeholder {
    color: ${theme.colors.placeholder};
  }
`

export const Input: FC<InputProps> = ({ children, className, ...props }) => {
  return (
    <input className={cx(inputStyle, className)} {...props}>
      {children}
    </input>
  )
}
