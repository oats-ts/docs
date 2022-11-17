import { css } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC, PropsWithChildren } from 'react'
import { ReactNode } from 'react-markdown/lib/ast-to-react'
import { theme } from '../theme'

export type SideBarSectionProps = PropsWithChildren & {
  title?: string
  attachment?: ReactNode
}

const titleContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.m} ${theme.spacing.m};
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.text};
  gap: ${theme.spacing.s};
`

const sectionTitleStyle = css`
  text-transform: uppercase;
  font-weight: bold;
  flex: ${theme.flex.grow};
`

const sectionContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing.xxm};
`

export const SideBarSection: FC<SideBarSectionProps> = ({ children, attachment, title }) => {
  const hideTitle = isNil(title) && isNil(attachment)
  return (
    <>
      {hideTitle ? null : (
        <div className={titleContainerStyle}>
          <span className={sectionTitleStyle}>{title}</span>
          {attachment}
        </div>
      )}
      <div className={sectionContainerStyle}>{children}</div>
    </>
  )
}
