import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC } from 'react'

type PackageJsonEditorProps = {
  isDark: boolean
  source: string
}

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
}

export const PackageJsonEditor: FC<PackageJsonEditorProps> = ({ source, isDark }) => {
  return (
    <Editor
      height="100%"
      theme={isDark ? 'vs-dark' : 'light'}
      defaultPath="package.json"
      language="json"
      value={source}
      options={editorConfig}
    />
  )
}
