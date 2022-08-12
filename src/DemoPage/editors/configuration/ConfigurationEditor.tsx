import { isNil } from 'lodash'
import React, { FC } from 'react'
import {
  GeneratorConfiguration,
  ReaderConfiguration,
  ValidatorConfiguration,
  WriterConfiguration,
} from '../../../types'
import { useColorMode } from '../../../useColorMode'
import { useGeneratorContext } from '../../model/useGenerator'
import { GeneratorEditor } from './GeneratorEditor'
import { InlineReaderEditor } from './InlineReaderEditor'
import { RemoteReaderEditor } from './RemoteReaderEditor'
import { ValidatorEditor } from './ValidatorEditor'
import { WriterEditor } from './WriterEditor'

export const ConfigurationEditor: FC = () => {
  const { editorInput, samples, configuration, isRemoteSampleLoading, setConfiguration, loadRemoteAsInline } =
    useGeneratorContext()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  if (isNil(editorInput) || editorInput.type !== 'configuration') {
    return null
  }
  switch (editorInput.active) {
    case 'reader': {
      const onChange = (reader: ReaderConfiguration) => setConfiguration({ ...configuration, active: 'reader', reader })
      return editorInput.reader.readerType === 'inline' ? (
        <InlineReaderEditor
          isLoading={isRemoteSampleLoading}
          input={editorInput.reader}
          isDark={isDark}
          onChange={onChange}
        />
      ) : (
        <RemoteReaderEditor
          input={editorInput.reader}
          isDark={isDark}
          samples={samples}
          onChange={onChange}
          onLoadRemote={loadRemoteAsInline}
        />
      )
    }
    case 'validator': {
      const onChange = (validator: ValidatorConfiguration) =>
        setConfiguration({ ...configuration, active: 'validator', validator })
      return <ValidatorEditor input={editorInput.validator} onChange={onChange} isDark={isDark} />
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
