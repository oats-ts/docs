import { css } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { theme } from '../theme'

export type SideBarSectionProps = PropsWithChildren & {
  title: string
}

const sectionTitleStyle = css`
  font-size: ${theme.font.m};
  color: ${theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: 10px 14px;
`

const sectionContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
`

export const SideBarSection: FC<SideBarSectionProps> = ({ children, title }) => {
  return (
    <>
      <div className={sectionTitleStyle}>{title}</div>
      <div className={sectionContainerStyle}>{children}</div>
    </>
  )
}
