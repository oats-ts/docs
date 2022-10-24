import { CommentConfig } from '@oats-ts/typescript-writer'
import React, { FC, useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'
import { CommentsTable } from '../../../components/CommentsTable'
import { FormGroup } from '../../../components/FormGroup'
import { FormSection } from '../../../components/FormSection'
import { Switch } from '../../../components/Switch'
import { WriterConfiguration } from '../../../model/types'

export type WriterConfigurationEditorProps = {
  input: WriterConfiguration
  onChange: (node: WriterConfiguration) => void
}

const hints = {
  useFormatter: 'When enabled, Prettier will be used to format the generated output',
  leadingComments:
    'Comments added to the beginning of each generated file. Great for enabling/disabling linters, that the file should not be edited.',
  trailingComments: 'Comments added to the end of each generated file.',
}

export const WriterConfigurationEditor: FC<WriterConfigurationEditorProps> = ({ input, onChange }) => {
  const [isShowingAdvanced, setShowAdvanced] = useState(false)

  const toggleAdvanced = () => setShowAdvanced(!isShowingAdvanced)

  const onUseFormatterChanged = (useFormatter: boolean) => {
    onChange({ ...input, useFormatter })
  }
  const onLeadingCommentsChange = (leadingComments: CommentConfig[]) => {
    onChange({ ...input, leadingComments })
  }
  const onTrailingCommentsChange = (trailingComments: CommentConfig[]) => {
    onChange({ ...input, trailingComments })
  }
  return (
    <FormGroup
      name="Writer"
      bottomAttachmentLabel={isShowingAdvanced ? 'Hide advanced' : 'Show advanced'}
      bottomAttachmentIcon={isShowingAdvanced ? HiChevronUp : HiChevronDown}
      onAttachmentClick={toggleAdvanced}
    >
      <FormSection name="Use Prettier?" description={hints.useFormatter}>
        <Switch value={input.useFormatter} onChange={onUseFormatterChanged} />
      </FormSection>
      {isShowingAdvanced && (
        <>
          <FormSection name="Leading comments" description={hints.leadingComments}>
            <CommentsTable value={input.leadingComments} onChange={onLeadingCommentsChange} />
          </FormSection>
          <FormSection name="Trailing comments" description={hints.trailingComments}>
            <CommentsTable value={input.trailingComments} onChange={onTrailingCommentsChange} />
          </FormSection>
        </>
      )}
    </FormGroup>
  )
}
