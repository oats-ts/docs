import React, { FC } from 'react'
import { ReadonlyTypescriptMonaco } from './ReadonlyTypescriptMonaco'

type ReadonlyGeneratorSourceEditorProps = {
  isDark: boolean
  source: string
}

export const ReadonlyGeneratorSourceEditor: FC<ReadonlyGeneratorSourceEditorProps> = ({ source, isDark }) => {
  return <ReadonlyTypescriptMonaco height="100%" isDark={isDark} path={'generate.ts'} value={source} />
}
