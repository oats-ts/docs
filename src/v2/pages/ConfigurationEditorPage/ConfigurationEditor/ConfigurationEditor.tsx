import { isNil } from 'lodash'
import React, { FC } from 'react'
import { GeneratorConfiguration, ReaderConfiguration } from '../../../model/types'
import { useGeneratorContext } from '../../../model/useGenerator'
import { GeneratorConfigurationEditor } from './GeneratorConfigurationEditor'
import { RemoteReaderEditor } from './RemoteReaderEditor'

export const ConfigurationEditor: FC = () => {
  const { editorInput, samples, configuration, setConfiguration, loadRemoteAsInline } = useGeneratorContext()
  if (isNil(editorInput) || editorInput.type !== 'configuration') {
    return null
  }

  switch (editorInput.active) {
    case 'reader': {
      const onChange = (reader: ReaderConfiguration) => setConfiguration({ ...configuration, active: 'reader', reader })
      return editorInput.reader.readerType === 'inline' ? (
        <div>TODO Inline editor</div>
      ) : (
        <RemoteReaderEditor
          input={editorInput.reader}
          samples={samples}
          onChange={onChange}
          onLoadRemote={loadRemoteAsInline}
        />
      )
    }
    case 'generator': {
      const onChange = (generator: GeneratorConfiguration) =>
        setConfiguration({ ...configuration, active: 'generator', generator })
      return <GeneratorConfigurationEditor input={editorInput.generator} onChange={onChange} />
    }
    default:
      return <div>TODO rest of the editors</div>
  }
}
