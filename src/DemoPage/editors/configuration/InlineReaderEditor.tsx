import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC } from 'react'
import { ReaderConfiguration } from '../../../types'
import { HeightSub } from '../commonStyles'

type InlineReaderEditorProps = {
  isDark: boolean
  isLoading: boolean
  input: ReaderConfiguration
  onChange: (node: ReaderConfiguration) => void
}

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  tabSize: 2,
}

export const InlineReaderEditor: FC<InlineReaderEditorProps> = ({ input, isDark, onChange }) => {
  const handleSourceChange = (value: string | undefined) => {
    onChange({ ...input, inlineContent: value ?? '' })
  }
  return (
    <Editor
      height={`calc(100vh - ${HeightSub}px)`}
      theme={isDark ? 'vs-dark' : 'light'}
      defaultPath={`openapi.${input.inlineLanguage}`}
      language={input.inlineLanguage}
      value={input.inlineContent}
      onChange={handleSourceChange}
      options={editorConfig}
    />
  )
}
