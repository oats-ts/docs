import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { theme } from '../theme'

export type SideBarSectionProps = PropsWithChildren & {
  title: string
}

const sectionTitleStyle = css`
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: ${theme.spacing.m} ${theme.spacing.m};
`

const sectionContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing.xxm};
`

export const SideBarSection: FC<SideBarSectionProps> = ({ children, title }) => {
  return (
    <>
      <div className={sectionTitleStyle}>{title}</div>
      <div className={sectionContainerStyle}>{children}</div>
    </>
  )
}
