import { isNil } from 'lodash'
import React, { FC } from 'react'
import { ReaderNode } from '../../../types'
import { useColorMode } from '../../../useColorMode'
import { useGenerator } from '../../model/useGenerator'
import { InlineReaderEditor } from './InlineReaderEditor'
import { RemoteReaderEditor } from './RemoteReaderEditor'

export const InputEditor: FC = () => {
  const { editorInput, setReader, setEditorInput, samples } = useGenerator()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  if (isNil(editorInput)) {
    return null
  }
  switch (editorInput?.type) {
    case 'reader': {
      const onChange = (node: ReaderNode) => {
        setReader(node)
        setEditorInput(node)
      }
      switch (editorInput.readerType) {
        case 'inline': {
          return <InlineReaderEditor input={editorInput} isDark={isDark} onChange={onChange} />
        }
        case 'remote': {
          return <RemoteReaderEditor input={editorInput} isDark={isDark} onChange={onChange} samples={samples} />
        }
      }
    }
    case 'generator': {
      return <div>Generator editor here</div>
    }
    default: {
      throw new TypeError(`Cannot edit ${editorInput?.type} with InputEditor`)
    }
  }
}
