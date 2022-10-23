import Editor from '@monaco-editor/react'
import React, { FC } from 'react'
import { readonlyEditorConfig } from './monacoSettings'

type PackageJsonEditorProps = {
  source: string
}

export const PackageJsonEditor: FC<PackageJsonEditorProps> = ({ source }) => {
  return (
    <Editor
      height="100%"
      theme={'vs-dark'}
      defaultPath="package.json"
      language="json"
      value={source}
      options={readonlyEditorConfig}
    />
  )
}
