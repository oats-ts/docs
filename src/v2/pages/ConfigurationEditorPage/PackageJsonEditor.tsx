import Editor from '@monaco-editor/react'
import React, { FC } from 'react'
import { onBeforeMount, readonlyEditorConfig, THEME } from './monacoSettings'

type PackageJsonEditorProps = {
  source: string
}

export const PackageJsonEditor: FC<PackageJsonEditorProps> = ({ source }) => {
  return (
    <Editor
      beforeMount={onBeforeMount}
      theme={THEME}
      height="100%"
      defaultPath="package.json"
      language="json"
      value={source}
      options={readonlyEditorConfig}
    />
  )
}
