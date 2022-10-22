import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC } from 'react'
import { theme } from '../../theme'

export type ReadonlyTypescriptMonacoProps = {
  path: string
  value: string
  height: string
}

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
  fontSize: 18,
  fontFamily: theme.fontFamily.monospace,
}

export const ReadonlyTypescriptMonaco: FC<ReadonlyTypescriptMonacoProps> = ({ path, value, height }) => {
  return (
    <Editor height={height} theme="vs-dark" path={path} language="typescript" value={value} options={editorConfig} />
  )
}
