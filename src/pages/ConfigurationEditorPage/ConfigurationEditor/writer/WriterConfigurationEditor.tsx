import { CommentConfig } from '@oats-ts/typescript-writer'
import React, { FC } from 'react'
import { HiArrowUturnLeft, HiChevronDown, HiChevronUp } from 'react-icons/hi2'
import { CommentsTable } from '../../../../components/CommentsTable'
import { ConfigurationFormGroup } from '../../../../components/ConfigurationFormGroup'
import { ConfigurationFormGroupAttachment } from '../../../../components/ConfigurationFormGroupAttachment'
import { ConfigurationFormGroupTitleButton } from '../../../../components/ConfigurationFormGroupTitleButton'
import { FormSection } from '../../../../components/FormSection'
import { Link } from '../../../../components/Link'
import { Switch } from '../../../../components/Switch'
import { defaults } from '../../../../model/defaults'
import { WriterConfiguration } from '../../../../types'

export type WriterConfigurationEditorProps = {
  input: WriterConfiguration
  isAdvancedOpen: boolean
  onChange: (node: WriterConfiguration) => void
  setAdvancedOpen: (isOpen: boolean) => void
}

const hints = {
  useFormatter: (
    <>
      When enabled,{' '}
      <Link href="https://prettier.io" target="_blank">
        Prettier
      </Link>{' '}
      will be used to format the generated output
    </>
  ),
  leadingComments:
    'Comments added to the beginning of each generated file. Great for enabling/disabling linters, warn that the file should not be edited by hand, etc.',
  trailingComments: 'Comments added to the end of each generated file.',
}

export const WriterConfigurationEditor: FC<WriterConfigurationEditorProps> = ({
  input,
  isAdvancedOpen,
  onChange,
  setAdvancedOpen,
}) => {
  const toggleAdvanced = () => setAdvancedOpen(!isAdvancedOpen)

  const onUseFormatterChanged = (useFormatter: boolean) => {
    onChange({ ...input, useFormatter })
  }
  const onLeadingCommentsChange = (leadingComments: CommentConfig[]) => {
    onChange({ ...input, leadingComments })
  }
  const onTrailingCommentsChange = (trailingComments: CommentConfig[]) => {
    onChange({ ...input, trailingComments })
  }
  const onReset = () => onChange(defaults.writerConfiguration)
  return (
    <ConfigurationFormGroup
      name="Writer"
      bottomAttachment={
        <ConfigurationFormGroupAttachment.Bottom
          label={isAdvancedOpen ? 'Hide advanced' : 'Show advanced'}
          icon={isAdvancedOpen ? HiChevronUp : HiChevronDown}
          onClick={toggleAdvanced}
        />
      }
      titleAttachment={<ConfigurationFormGroupTitleButton label="Reset" icon={HiArrowUturnLeft} onClick={onReset} />}
    >
      <FormSection name="Use Prettier?" description={hints.useFormatter}>
        <Switch value={input.useFormatter} onChange={onUseFormatterChanged} />
      </FormSection>
      {isAdvancedOpen && (
        <>
          <FormSection name="Leading comments" description={hints.leadingComments}>
            <CommentsTable value={input.leadingComments} onChange={onLeadingCommentsChange} />
          </FormSection>
          <FormSection name="Trailing comments" description={hints.trailingComments}>
            <CommentsTable value={input.trailingComments} onChange={onTrailingCommentsChange} />
          </FormSection>
        </>
      )}
    </ConfigurationFormGroup>
  )
}
