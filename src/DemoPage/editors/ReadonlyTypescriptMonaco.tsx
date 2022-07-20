import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC } from 'react'

export type ReadonlyTypescriptMonacoProps = {
  isDark: boolean
  path: string
  value: string
  height: string
}

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
}

export const ReadonlyTypescriptMonaco: FC<ReadonlyTypescriptMonacoProps> = ({ isDark, path, value, height }) => {
  return (
    <Editor
      height={height}
      theme={isDark ? 'vs-dark' : 'light'}
      path={path}
      language="typescript"
      value={value}
      options={editorConfig}
    />
  )
}
