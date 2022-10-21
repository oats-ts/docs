import { css } from '@emotion/css'
import React, { CSSProperties, FC, useState } from 'react'
import { Prism } from 'react-syntax-highlighter'
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { theme } from '../theme'
import { HiClipboard, HiCheck } from 'react-icons/hi2'
import { cloneDeep, isNil, merge, values } from 'lodash'

export type SyntaxHighlighterProps = {
  children: string
  language?: string
}

function createTheme(baseTheme: Record<string, CSSProperties>): Record<string, CSSProperties> {
  const themeOverrides: Record<string, CSSProperties> = {
    'pre[class*="language-"]': {
      backgroundColor: theme.colors.dark1,
      borderRadius: '10px',
      padding: '18px',
      width: '100%',
      maxWidth: '100%',
      borderWidth: '0px',
    },
  }

  const clonedTheme = cloneDeep(baseTheme)
  values(clonedTheme).forEach((field) => {
    delete field.background
    delete field.backgroundColor
    field.textShadow = 'rgb(0 0 0 / 30%) 0px 1px'
  })

  return merge(clonedTheme, themeOverrides)
}

const prismTheme = createTheme(themes.vscDarkPlus)

const copyButtonStyle = css`
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
  font-size: ${theme.font.m};
  background-color: ${theme.colors.dark2};
  color: ${theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 8px;
`

const containerStyle = css`
  position: relative;
  * {
    font-family: 'Source Code Pro', monospace;
    font-size: ${theme.font.code};
  }
`

export const SyntaxHighlighter: FC<SyntaxHighlighterProps> = ({ children, language }) => {
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

  return (
    <div className={containerStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Prism language={language} style={prismTheme}>
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
