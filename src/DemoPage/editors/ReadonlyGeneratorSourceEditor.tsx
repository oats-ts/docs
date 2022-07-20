import React, { FC } from 'react'
import { HeightSub } from './commonStyles'
import { ReadonlyTypescriptMonaco } from './ReadonlyTypescriptMonaco'

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
