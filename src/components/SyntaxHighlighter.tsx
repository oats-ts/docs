import { css } from '@emotion/css'
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
  renderer?: (props: rendererProps) => React.ReactNode
}

const themes: Record<SyntaxHighlighterProps['theme'], Record<string, CSSProperties>> = {
  light: createPrismTheme(vscDarkPlus, theme.colors.dark1),
  medium: createPrismTheme(vscDarkPlus, theme.colors.dark2),
  dark: createPrismTheme(vscDarkPlus, theme.colors.dark4),
}

const copyButtonColors: Record<SyntaxHighlighterProps['theme'], string> = {
  light: theme.colors.dark2,
  medium: theme.colors.dark4,
  dark: theme.colors.dark1,
}

const copyButtonStyle = (color: string) => css`
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
  background-color: ${color};
  color: ${theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) ${theme.spacing.zero} ${theme.spacing.xs} ${theme.spacing.s};
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
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

  pre {
    min-height: 100%;
  }

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`

export const SyntaxHighlighter: FC<SyntaxHighlighterProps> = ({
  children,
  language,
  lineWrap,
  theme,
  host,
  renderer,
}) => {
  const [copied, setCopied] = useState(false)
  const [resetTimeout, setResetTimeout] = useState<any>(undefined)

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

  const containerStyle = host === 'editor' ? editorContainerStyle : docsContainerStyle
  return (
    <div className={containerStyle}>
      <Prism
        language={language}
        style={themes[theme]}
        wrapLongLines={lineWrap}
        showLineNumbers={host === 'editor'}
        {...(isNil(renderer) ? {} : { renderer })}
      >
        {children}
      </Prism>
      <CopyToClipboard text={children} onCopy={onCopy}>
        <button className={copyButtonStyle(copyButtonColors[theme])}>{copied ? <HiCheck /> : <HiClipboard />}</button>
      </CopyToClipboard>
    </div>
  )
}
