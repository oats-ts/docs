import { css } from '@emotion/css'
import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { links } from '../links'
import { theme } from '../theme'
import { Logo } from './Logo'

const containerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.l};
  font-size: ${theme.fontSize.l};
  color: ${theme.colors.muted};
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
`

const textContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.s};
`

export type NotFoundPageProps = {
  text: string
  icon: IconType
  logo?: boolean
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ text, logo, icon: Icon }) => {
  return (
    <div className={containerStyle}>
      {logo && <Logo href={links.index()} />}
      <div className={textContainerStyle}>
        <Icon />
        <span>{text}</span>
      </div>
    </div>
  )
}
