import { css } from '@emotion/css'
import React, { FC, PropsWithChildren, MouseEventHandler } from 'react'
import { IconType } from 'react-icons'
import { theme } from '../theme'
import { Link } from './Link'

const titleButtonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.xs};
`

type ConfigurationFormGroupTitleButtonProps = PropsWithChildren & {
  label: string
  onClick?: MouseEventHandler
  icon?: IconType
}

export const ConfigurationFormGroupTitleButton: FC<ConfigurationFormGroupTitleButtonProps> = ({
  label,
  onClick,
  icon: Icon,
}) => {
  return (
    <Link className={titleButtonStyle} onClick={onClick}>
      {Icon ? <Icon /> : null}
      {label}
    </Link>
  )
}
