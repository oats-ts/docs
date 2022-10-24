import Editor from '@monaco-editor/react'
import React, { FC } from 'react'
import { onBeforeMount, readonlyEditorConfig, THEME } from './monacoSettings'

export type ReadonlyTypescriptMonacoProps = {
  path: string
  value: string
}

export const ReadonlyTypescriptMonaco: FC<ReadonlyTypescriptMonacoProps> = ({ path, value }) => {
  return (
    <Editor
      beforeMount={onBeforeMount}
      theme={THEME}
      height="100%"
      path={path}
      language="typescript"
      value={value}
      options={readonlyEditorConfig}
    />
  )
}
