import { css, cx } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC, PropsWithChildren } from 'react'
import { theme } from '../theme'

export type ButtonVariant = 'primary' | 'secondary'

export type ButtonSize = 'default' | 'mini'

type ButtonProps = PropsWithChildren & {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  href?: string
  title?: string
  onClick?: () => void
}

const buttonStyle = css`
  label: button;
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  border: unset;
  position: relative;
  font-weight: 400;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) ${theme.spacing.zero} ${theme.spacing.xs} ${theme.spacing.s};
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) ${theme.spacing.zero} ${theme.spacing.xs} ${theme.spacing.xxm};
  }
`

const variants: Record<ButtonVariant, string> = {
  secondary: css`
    label: secondary-button;
    color: ${theme.colors.text};
    background-color: ${theme.colors.dark1};

    &:hover {
      background-color: ${theme.colors.buttonHover};
    }
  `,
  primary: css`
    label: primary-button;
    color: ${theme.colors.text};
    background-color: ${theme.colors.green};

    &:hover {
      background-color: #2ea043;
    }
  `,
}

const sizes: Record<ButtonSize, string> = {
  default: css`
    gap: ${theme.spacing.s};
    padding: ${theme.spacing.m} ${theme.spacing.xm};
    border-radius: ${theme.spacing.s};
    font-size: ${theme.fontSize.m};
  `,
  mini: css`
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.xs} ${theme.spacing.m};
    border-radius: ${theme.spacing.xs};
    font-size: ${theme.fontSize.xxs};
  `,
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'default',
  className,
  href,
  title,
  onClick,
}) => {
  const clsName = cx(buttonStyle, variants[variant], sizes[size], className)
  if (!isNil(href)) {
    return (
      <a className={clsName} onClick={onClick} href={href} title={title}>
        {children}
      </a>
    )
  }
  return (
    <button className={clsName} onClick={onClick} title={title}>
      {children}
    </button>
  )
}
