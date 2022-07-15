import React, { FC } from 'react'
import Editor from '@monaco-editor/react'

export const SampleEditor: FC = () => {
  return (
    <Editor
      height="calc(100vh - 188px)"
      defaultLanguage="typescript"
      defaultValue="const x: string = 'asd'"
      theme="light"
      defaultPath="foo.ts"
      options={{ minimap: { enabled: false } }}
    />
  )
}
