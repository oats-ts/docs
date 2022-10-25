import { css, cx } from '@emotion/css'
import React, { FC, useState } from 'react'
import { Prism } from 'react-syntax-highlighter'
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { theme } from '../theme'
import { HiClipboard, HiCheck } from 'react-icons/hi2'
import { isNil } from 'lodash'
import { createPrismTheme } from './createPrismTheme'

export type SyntaxHighlighterProps = {
  children: string
  kind: 'docs' | 'editor'
  language?: string
}

const docsTheme = createPrismTheme(themes.vscDarkPlus, theme.colors.dark1)
const editorTheme = createPrismTheme(themes.vscDarkPlus, theme.colors.dark4)

const copyButtonStyle = css`
  label: syntax-hl-copy;
  top: 10px;
  right: 10px;
  position: absolute;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear, opacity 150ms linear;
  padding: 8px 12px;
  border: unset;
  border-radius: 8px;
  font-weight: 400;
  cursor: pointer;
  font-size: ${theme.fontSize.m};
  background-color: ${theme.colors.dark2};
  color: ${theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 8px;
`

const docsContainerStyle = css`
  label: docs-syntax-hl;
  border-radius: 10px;
  padding: 0px;
  /** TODO */
  margin: 16px 0px;
  overflow: hidden;
  position: relative;
  * {
    font-family: 'Source Code Pro', monospace;
    font-size: ${theme.fontSize.code};
  }
`

const editorContainerStyle = css`
  overflow: auto;
  position: relative;
  flex-grow: 1 1 1px;
  height: 100vh;
`

export const SyntaxHighlighter: FC<SyntaxHighlighterProps> = ({ children, language, kind }) => {
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

  const containerStyle = cx(kind === 'editor' ? editorContainerStyle : docsContainerStyle)
  const theme = kind === 'editor' ? editorTheme : docsTheme
  return (
    <div className={containerStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Prism language={language} style={theme} wrapLongLines={true} showLineNumbers={kind === 'editor'}>
        {children}
      </Prism>
      <CopyToClipboard text={children} onCopy={onCopy}>
        <button className={copyButtonStyle} style={{ opacity: hovering ? 1 : 0 }}>
          {copied ? <HiCheck /> : <HiClipboard />}
        </button>
      </CopyToClipboard>
    </div>
  )
}
