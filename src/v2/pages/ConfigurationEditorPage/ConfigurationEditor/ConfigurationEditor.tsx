import { css } from '@emotion/css'
import React, { FC } from 'react'
import {
  ReaderConfiguration,
  ValidatorConfiguration,
  GeneratorConfiguration,
  WriterConfiguration,
} from '../../../model/types'
import { useGeneratorContext } from '../../../model/useGenerator'
import { GeneratorConfigurationEditor } from './GeneratorConfigurationEditor'
import { RemoteReaderEditor } from './RemoteReaderEditor'
import { ValidatorConfigurationEditor } from './ValidatorConfigurationEditor'
import { WriterConfigurationEditor } from './WriterConfigurationEditor'

const wrapperStyle = css`
  padding: 20px;
  padding-top: 0px;
`

const contentContainerStyle = css`
  padding-top: 18px;
`

export const ConfigurationEditor: FC = () => {
  const { configuration, samples, setConfiguration, loadRemoteAsInline } = useGeneratorContext()

  const onReaderChange = (reader: ReaderConfiguration) =>
    setConfiguration({ ...configuration, active: 'reader', reader })
  const onValidatorChange = (validator: ValidatorConfiguration) =>
    setConfiguration({ ...configuration, active: 'validator', validator })
  const onGeneratorChange = (generator: GeneratorConfiguration) =>
    setConfiguration({ ...configuration, active: 'generator', generator })
  const onWriterChange = (writer: WriterConfiguration) =>
    setConfiguration({ ...configuration, active: 'writer', writer })
  return (
    <div className={wrapperStyle}>
      <div className={contentContainerStyle}>
        <RemoteReaderEditor
          input={configuration.reader}
          samples={samples}
          onChange={onReaderChange}
          onLoadRemote={loadRemoteAsInline}
        />
        <ValidatorConfigurationEditor input={configuration.validator} onChange={onValidatorChange} />
        <GeneratorConfigurationEditor input={configuration.generator} onChange={onGeneratorChange} />
        <WriterConfigurationEditor input={configuration.writer} onChange={onWriterChange} />
      </div>
    </div>
  )
}
