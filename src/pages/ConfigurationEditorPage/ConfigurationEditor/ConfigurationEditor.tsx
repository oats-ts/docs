import { css } from '@emotion/css'
import React, { FC } from 'react'
import {
  ReaderConfiguration,
  ValidatorConfiguration,
  GeneratorConfiguration,
  WriterConfiguration,
} from '../../../types'
import { useGeneratorContext } from '../../../model/useGenerator'
import { theme } from '../../../theme'
import { GeneratorConfigurationEditor } from './GeneratorConfigurationEditor'
import { ValidatorConfigurationEditor } from './ValidatorConfigurationEditor'
import { WriterConfigurationEditor } from './WriterConfigurationEditor'
import { ReaderConfigurationEditor } from './ReaderConfigurationEditor'

const wrapperStyle = css`
  padding: ${theme.spacing.l};
  padding-top: ${theme.spacing.zero};
`

const contentContainerStyle = css`
  padding-top: ${theme.spacing.xxm};
`

export const ConfigurationEditor: FC = () => {
  const { configuration, samples, setConfiguration } = useGeneratorContext()
  const { advancedOpen } = configuration

  const onReaderChange = (reader: ReaderConfiguration) =>
    setConfiguration({ ...configuration, active: 'reader', reader })
  const onValidatorChange = (validator: ValidatorConfiguration) =>
    setConfiguration({ ...configuration, active: 'validator', validator })
  const onGeneratorChange = (generator: GeneratorConfiguration) =>
    setConfiguration({ ...configuration, active: 'generator', generator })
  const onWriterChange = (writer: WriterConfiguration) =>
    setConfiguration({ ...configuration, active: 'writer', writer })

  const onReaderToggle = (reader: boolean) =>
    setConfiguration({ ...configuration, advancedOpen: { ...configuration.advancedOpen, reader } })
  const onWriterToggle = (writer: boolean) =>
    setConfiguration({ ...configuration, advancedOpen: { ...configuration.advancedOpen, writer } })
  const onGeneratorToggle = (generator: boolean) =>
    setConfiguration({ ...configuration, advancedOpen: { ...configuration.advancedOpen, generator } })

  return (
    <div className={wrapperStyle}>
      <div className={contentContainerStyle}>
        <ReaderConfigurationEditor
          isAdvancedOpen={advancedOpen.reader}
          input={configuration.reader}
          samples={samples}
          setAdvancedOpen={onReaderToggle}
          onChange={onReaderChange}
        />
        <ValidatorConfigurationEditor input={configuration.validator} onChange={onValidatorChange} />
        <GeneratorConfigurationEditor
          isAdvancedOpen={advancedOpen.generator}
          input={configuration.generator}
          setAdvancedOpen={onGeneratorToggle}
          onChange={onGeneratorChange}
        />
        <WriterConfigurationEditor
          isAdvancedOpen={advancedOpen.writer}
          input={configuration.writer}
          setAdvancedOpen={onWriterToggle}
          onChange={onWriterChange}
        />
      </div>
    </div>
  )
}
