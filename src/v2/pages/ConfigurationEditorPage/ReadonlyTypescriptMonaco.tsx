import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC } from 'react'
import { theme } from '../../theme'

export type ReadonlyTypescriptMonacoProps = {
  path: string
  value: string
}

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
  fontSize: 18,
  fontFamily: theme.fontFamily.monospace,
  padding: { top: 20 },
}

export const ReadonlyTypescriptMonaco: FC<ReadonlyTypescriptMonacoProps> = ({ path, value }) => {
  return <Editor height="100%" theme="vs-dark" path={path} language="typescript" value={value} options={editorConfig} />
}
