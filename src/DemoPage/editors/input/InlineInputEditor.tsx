import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC } from 'react'
import { InlineOpenAPINode } from '../../../types'

const HeightSub = 130

type InlineInputEditorProps = {
  isDark: boolean
  input: InlineOpenAPINode
  onChange: (node: InlineOpenAPINode) => void
}

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
}

export const InlineInputEditor: FC<InlineInputEditorProps> = ({ input, isDark, onChange }) => {
  const handleSourceChange = (value: string | undefined) => {
    onChange({ ...input, content: value ?? '' })
  }
  return (
    <Editor
      height={`calc(100vh - ${HeightSub}px)`}
      theme={isDark ? 'vs-dark' : 'light'}
      defaultPath={`openapi.${input.language}`}
      language={input.language}
      value={input.content}
      onChange={handleSourceChange}
      options={editorConfig}
    />
  )
}
