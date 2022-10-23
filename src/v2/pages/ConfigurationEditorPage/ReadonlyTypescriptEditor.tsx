import React, { FC } from 'react'
import { FileNode } from '../../model/types'
import { ReadonlyTypescriptMonaco } from './ReadonlyTypescriptMonaco'

type ReadonlyTypescriptEditorProps = {
  isLoading: boolean
  input: FileNode
}

export const ReadonlyTypescriptEditor: FC<ReadonlyTypescriptEditorProps> = ({ input }) => {
  return <ReadonlyTypescriptMonaco height="100%" path={input.path} value={input.content} />
}
