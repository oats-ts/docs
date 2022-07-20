import React, { FC } from 'react'
import { ReadonlyTypescriptMonaco } from './ReadonlyTypescriptMonaco'

const HeightSub = 130

type ReadonlyGeneratorSourceEditorProps = {
  isDark: boolean
  source: string
}

export const ReadonlyGeneratorSourceEditor: FC<ReadonlyGeneratorSourceEditorProps> = ({ source, isDark }) => {
  return (
    <ReadonlyTypescriptMonaco
      height={`calc(100vh - ${HeightSub}px)`}
      isDark={isDark}
      path={'generate.ts'}
      value={source}
    />
  )
}
