import { css } from '@emotion/css'
import React, { FC } from 'react'
import { theme } from '../theme'
import { breakpoints } from '../breakpoints'
import { QuickStartDescriptor } from '../types'
import { MarkdownView } from './MarkdownView'
import { SyntaxHighlighterProps } from './SyntaxHighlighter'

type QuickStartItemProps = {
  index: number
  descriptor: QuickStartDescriptor
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

const syntaxHighlighterProps: Partial<SyntaxHighlighterProps> = {
  theme: 'light',
  host: 'docs',
  lineWrap: true,
}

export const QuickStartItem: FC<QuickStartItemProps> = ({ index, descriptor }) => {
  return (
    <div className={containerStyle}>
      <div className={circleStyle}>{index}</div>
      <div className={contentContainerStyle}>
        <h3 className={titleStyle}>{descriptor.title}</h3>
        <div className={contentStyle}>
          <MarkdownView content={descriptor.content} syntaxHighlighterProps={syntaxHighlighterProps} />
        </div>
      </div>
    </div>
  )
}
