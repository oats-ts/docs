import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { theme } from '../theme'
import { breakpoints } from '../css'

type QuickStartItemProps = PropsWithChildren & {
  index: number
  title: string
}

const containerStyle = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 40px;
  width: 100%;
`

const circleStyle = css`
  ${breakpoints.phone} {
    /* TODO */
    display: none;
  }
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  margin-top: 12px;
  border-radius: 50%;
  border: 1px solid ${theme.colors.text};
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.font.l};
`

const titleStyle = css`
  font-size: ${theme.font.m};
  color: ${theme.colors.text};
  text-transform: uppercase;
`

const contentStyle = css`
  color: ${theme.colors.muted};
  font-size: ${theme.font.m};
`

const contentContainerStyle = css`
  width: 100%;
`

export const QuickStartItem: FC<QuickStartItemProps> = ({ children, index, title }) => {
  return (
    <div className={containerStyle}>
      <div className={circleStyle}>{index}</div>
      <div className={contentContainerStyle}>
        <h3 className={titleStyle}>{title}</h3>
        <div className={contentStyle}>{children}</div>
      </div>
    </div>
  )
}
