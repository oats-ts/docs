import React, { FC } from 'react'
import Editor from '@monaco-editor/react'

export const SampleEditor: FC = () => {
  return <Editor height="90vh" defaultLanguage="typescript" defaultValue="const x: string = 100" theme="vs-dark" />
}
