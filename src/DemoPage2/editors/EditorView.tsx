import isNil from 'lodash/isNil'
import React, { FC } from 'react'
import { useGenerator } from '../../DemoPage/useGenerator'
import { useColorMode } from '../../useColorMode'
import { NoEditor } from './NoEditor'
import { ReadonlyTypescriptEditor } from './ReadonlyTypescriptEditor'

export const EditorView: FC = () => {
  const { editorInput, results } = useGenerator()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const isLoading = results.status === 'working'

  if (isNil(editorInput)) {
    return <NoEditor isDark={isDark} isLoading={isLoading} />
  }
  switch (editorInput?.type) {
    case 'file':
      return <ReadonlyTypescriptEditor input={editorInput} isDark={isDark} isLoading={isLoading} />
  }
}
