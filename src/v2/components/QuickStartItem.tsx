import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { theme } from '../theme'
import { breakpoints } from '../breakpoints'

type QuickStartItemProps = PropsWithChildren & {
  index: number
  title: string
}

const containerStyle = css`
  label: quick-start-item;
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.xxm};
  margin-top: ${theme.spacing.xxxl};
  width: 100%;
`

const circleStyle = css`
  label: quick-start-item-circle;
  @media ${breakpoints.phone} {
    /* TODO */
    display: none;
  }
  width: ${theme.spacing.xh};
  height: ${theme.spacing.xh};
  min-width: ${theme.spacing.xh};
  min-height: ${theme.spacing.xh};
  margin-top: ${theme.spacing.m};
  border-radius: 50%;
  border: ${theme.spacing.xxxs} solid ${theme.colors.text};
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.l};
`

const titleStyle = css`
  label: quick-start-item-title;
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.text};
  text-transform: uppercase;
`

const contentStyle = css`
  label: quick-start-item-content;
  color: ${theme.colors.muted};
  font-size: ${theme.fontSize.m};
`

const contentContainerStyle = css`
  label: quick-start-item-container;
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
