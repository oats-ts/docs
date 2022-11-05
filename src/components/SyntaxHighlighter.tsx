import { css, cx } from '@emotion/css'
import React, { FC, useState, CSSProperties } from 'react'
import { Prism } from 'react-syntax-highlighter'
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { theme } from '../theme'
import { HiClipboard, HiCheck } from 'react-icons/hi2'
import { isNil } from 'lodash'
import { createPrismTheme } from './createPrismTheme'

export type SyntaxHighlighterProps = {
  children: string
  host: 'docs' | 'editor'
  theme: 'light' | 'medium' | 'dark'
  language?: string
  lineWrap?: boolean
}

const themes: Record<SyntaxHighlighterProps['theme'], Record<string, CSSProperties>> = {
  light: createPrismTheme(vscDarkPlus, theme.colors.dark1),
  medium: createPrismTheme(vscDarkPlus, theme.colors.dark2),
  dark: createPrismTheme(vscDarkPlus, theme.colors.dark4),
}

const copyButtonStyle = css`
  label: syntax-hl-copy;
  top: ${theme.spacing.m};
  right: ${theme.spacing.m};
  position: absolute;
  display: flex;
  gap: ${theme.spacing.s};
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear, opacity 150ms linear;
  padding: ${theme.spacing.s} ${theme.spacing.m};
  border: unset;
  border-radius: ${theme.spacing.s};
  font-weight: 400;
  cursor: pointer;
  font-size: ${theme.fontSize.m};
  background-color: ${theme.colors.dark2};
  color: ${theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) ${theme.spacing.zero} ${theme.spacing.xs} ${theme.spacing.s};
`

const docsContainerStyle = css`
  label: docs-syntax-hl;
  border-radius: ${theme.spacing.m};
  padding: ${theme.spacing.zero};
  /** TODO */
  margin: ${theme.spacing.xm} ${theme.spacing.zero};
  overflow: hidden;
  position: relative;
  * {
    font-family: 'Source Code Pro', monospace;
    font-size: ${theme.fontSize.code};
  }
`

const editorContainerStyle = css`
  position: relative;
  flex-grow: ${theme.flex.grow};
  height: 100vh;

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`

export const SyntaxHighlighter: FC<SyntaxHighlighterProps> = ({ children, language, lineWrap, theme, host }) => {
  const [copied, setCopied] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [resetTimeout, setResetTimeout] = useState<any>(undefined)

  const onMouseEnter = () => {
    setHovering(true)
  }

  const onMouseLeave = () => {
    setHovering(false)
  }

  const onCopy = (_: unknown, result: boolean) => {
    if (!isNil(resetTimeout)) {
      clearTimeout(resetTimeout)
      setResetTimeout(undefined)
    }
    setCopied(result)
    setResetTimeout(
      setTimeout(() => {
        setCopied(false)
      }, 2000),
    )
  }

  const containerStyle = cx(host === 'editor' ? editorContainerStyle : docsContainerStyle)
  const prismTheme = themes[theme]
  const copyButtonFullStyle = cx(copyButtonStyle)
  return (
    <div className={containerStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Prism language={language} style={prismTheme} wrapLongLines={lineWrap} showLineNumbers={host === 'editor'}>
        {children}
      </Prism>
      <CopyToClipboard text={children} onCopy={onCopy}>
        <button className={copyButtonFullStyle} style={{ opacity: hovering ? 1 : 0 }}>
          {copied ? <HiCheck /> : <HiClipboard />}
        </button>
      </CopyToClipboard>
    </div>
  )
}
