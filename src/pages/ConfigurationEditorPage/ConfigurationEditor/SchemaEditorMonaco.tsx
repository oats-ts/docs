import React, { FC } from 'react'
import { ExactSourceLanguage } from '../../../types'
import Editor, { BeforeMount } from '@monaco-editor/react'
import monaco from 'monaco-editor'
import { css, cx } from '@emotion/css'
import { theme } from '../../../theme'

export type SchemEditorMonacoProps = {
  language: ExactSourceLanguage
  source: string
  onChange: (source: string | undefined) => void
  className?: string
}

const containerStyle = css`
  max-height: calc(100vh - 14rem);
  height: calc(100vh - 14rem);
  overflow: hidden;
  border-radius: ${theme.spacing.xs};
  margin-top: ${theme.spacing.xs};
`

const options: monaco.editor.IStandaloneEditorConstructionOptions = {
  'semanticHighlighting.enabled': true,
  minimap: { enabled: false },
  insertSpaces: true,
  tabSize: 2,
  scrollBeyondLastLine: false,
  renderLineHighlight: 'none',
  padding: { top: 10 },
  fontFamily: theme.fontFamily.monospace,
  fontSize: 17.6,
}

export const SchemEditorMonaco: FC<SchemEditorMonacoProps> = ({ language, source, className, onChange }) => {
  const beforeMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme('oats', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: { 'editor.background': theme.colors.dark1 },
    })
  }

  return (
    <div className={cx(containerStyle, className)}>
      <Editor
        height="100%"
        theme="oats"
        language={language}
        value={source}
        options={options}
        onChange={onChange}
        beforeMount={beforeMount}
      />
    </div>
  )
}
