import { css } from '@emotion/css'
import React, { FC } from 'react'
import {
  ReaderConfiguration,
  ValidatorConfiguration,
  GeneratorConfiguration,
  WriterConfiguration,
} from '../../../model/types'
import { useGeneratorContext } from '../../../model/useGenerator'
import { theme } from '../../../theme'
import { GeneratorConfigurationEditor } from './GeneratorConfigurationEditor'
import { ReaderConfigurationEditor } from './ReaderConfigurationEditor'
import { ValidatorConfigurationEditor } from './ValidatorConfigurationEditor'
import { WriterConfigurationEditor } from './WriterConfigurationEditor'

const wrapperStyle = css`
  padding: ${theme.spacing.xxm};
  padding-top: ${theme.spacing.zero};
`

const contentContainerStyle = css`
  padding-top: ${theme.spacing.xxm};
`

export const ConfigurationEditor: FC = () => {
  const { configuration, samples, setConfiguration } = useGeneratorContext()

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
        <ReaderConfigurationEditor input={configuration.reader} samples={samples} onChange={onReaderChange} />
        <ValidatorConfigurationEditor input={configuration.validator} onChange={onValidatorChange} />
        <GeneratorConfigurationEditor input={configuration.generator} onChange={onGeneratorChange} />
        <WriterConfigurationEditor input={configuration.writer} onChange={onWriterChange} />
      </div>
    </div>
  )
}
