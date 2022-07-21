import { isNil } from 'lodash'
import React, { FC } from 'react'
import { GeneratorConfiguration, ReaderConfiguration, WriterConfiguration } from '../../../types'
import { useColorMode } from '../../../useColorMode'
import { useGeneratorContext } from '../../model/useGenerator'
import { GeneratorEditor } from './GeneratorEditor'
import { InlineReaderEditor } from './InlineReaderEditor'
import { RemoteReaderEditor } from './RemoteReaderEditor'
import { WriterEditor } from './WriterEditor'

export const ConfigurationEditor: FC = () => {
  const { editorInput, samples, configuration, setConfiguration } = useGeneratorContext()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  if (isNil(editorInput) || editorInput.type !== 'configuration') {
    return null
  }
  switch (editorInput.active) {
    case 'reader': {
      const onChange = (reader: ReaderConfiguration) => setConfiguration({ ...configuration, active: 'reader', reader })
      return editorInput.reader.readerType === 'inline' ? (
        <InlineReaderEditor input={editorInput.reader} isDark={isDark} onChange={onChange} />
      ) : (
        <RemoteReaderEditor input={editorInput.reader} isDark={isDark} onChange={onChange} samples={samples} />
      )
    }
    case 'generator': {
      const onChange = (generator: GeneratorConfiguration) =>
        setConfiguration({ ...configuration, active: 'generator', generator })
      return <GeneratorEditor input={editorInput.generator} isDark={isDark} onChange={onChange} />
    }
    case 'writer': {
      const onChange = (writer: WriterConfiguration) => setConfiguration({ ...configuration, active: 'writer', writer })
      return <WriterEditor isDark={isDark} input={editorInput.writer} onChange={onChange} />
    }
  }
}
