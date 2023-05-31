import React, { FC, useMemo } from 'react'
import { HiArrowUturnLeft, HiChevronDown, HiChevronUp, HiPencil } from 'react-icons/hi2'
import { ConfigurationFormGroup } from '../../../../components/ConfigurationFormGroup'
import { FormSection } from '../../../../components/FormSection'
import { ReaderConfiguration, SchemaItem } from '../../../../types'
import { defaults } from '../../../../model/defaults'
import { ConfigurationFormGroupAttachment } from '../../../../components/ConfigurationFormGroupAttachment'
import { ConfigurationFormGroupTitleButton } from '../../../../components/ConfigurationFormGroupTitleButton'
import { InlineReaderAdvanced } from './InlineReaderAdvanced'
import { RemoteReaderAdvanced } from './RemoteReaderAdvanced'
import { readerHints } from './readerHints'
import { SchemEditorMonaco } from './SchemaEditorMonaco'
import { css } from '@emotion/css'
import { theme } from '../../../../theme'
import { Button } from '../../../../components/Button'
import { LabeledSwitch } from '../../../../components/LabeledSwitch'
import { capitalize, isNil } from 'lodash'
import { oatsSchemas } from '../../../../oatsSchemas'
import { UrlAutocomplete } from '../../../../components/UrlAutocomplete'
import { customSchemaItem } from '../../../../utils'

const extraBottomMarginStyle = css`
  margin-bottom: ${theme.spacing.s};
`

const pathContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.s};
`

type ReaderConfigurationEditorProps = {
  input: ReaderConfiguration
  isAdvancedOpen: boolean
  samples: string[]
  setAdvancedOpen: (isOpen: boolean) => void
  onChange: (node: ReaderConfiguration) => void
  loadRemoteAsInline: () => void
}

const schemas: SchemaItem[] = [...oatsSchemas]

export const ReaderConfigurationEditor: FC<ReaderConfigurationEditorProps> = ({
  input,
  isAdvancedOpen,
  setAdvancedOpen,
  onChange,
  loadRemoteAsInline,
}) => {
  const toggleAdvanced = () => setAdvancedOpen(!isAdvancedOpen)

  const handlePathChange = (item: SchemaItem) => {
    onChange({ ...input, remotePath: item?.url })
  }

  const handleSourceChange = (inlineSource: string | undefined) => {
    onChange({ ...input, inlineSource: inlineSource ?? '' })
  }

  const handleTypeChange = () => {
    onChange({ ...input, type: input.type === 'remote' ? 'inline' : 'remote' })
  }

  const onReset = () => onChange(defaults.readerConfiguration)

  const urlValue = useMemo<SchemaItem>(() => {
    const item = schemas.find((s) => s.url === input.remotePath)
    return isNil(item) ? customSchemaItem(input.remotePath) : item
  }, [input.remotePath])

  return (
    <ConfigurationFormGroup
      name="Reader"
      bottomAttachment={
        <ConfigurationFormGroupAttachment.Bottom
          label={isAdvancedOpen ? 'Hide advanced' : 'Show advanced'}
          icon={isAdvancedOpen ? HiChevronUp : HiChevronDown}
          onClick={toggleAdvanced}
        />
      }
      titleAttachment={
        <>
          <LabeledSwitch
            left="inline"
            right="remote"
            value={input.type}
            onChange={handleTypeChange}
            stringify={capitalize}
          />
          <ConfigurationFormGroupTitleButton label="Reset" icon={HiArrowUturnLeft} onClick={onReset} />
        </>
      }
    >
      {input.type === 'remote' ? (
        <FormSection name="URI" description={readerHints.path}>
          <div className={pathContainerStyle}>
            <UrlAutocomplete items={schemas} value={urlValue} onChange={handlePathChange} />
            <Button onClick={loadRemoteAsInline}>
              <HiPencil /> Edit
            </Button>
          </div>
        </FormSection>
      ) : (
        <FormSection name="OpenAPI source" description={readerHints.inline}>
          <SchemEditorMonaco
            language={input.inlineLanguage}
            source={input.inlineSource}
            className={isAdvancedOpen ? extraBottomMarginStyle : undefined}
            onChange={handleSourceChange}
          />
        </FormSection>
      )}
      {isAdvancedOpen &&
        (input.type === 'inline' ? (
          <InlineReaderAdvanced input={input} onChange={onChange} />
        ) : (
          <RemoteReaderAdvanced input={input} onChange={onChange} />
        ))}
    </ConfigurationFormGroup>
  )
}
