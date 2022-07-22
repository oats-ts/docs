import { css } from '@emotion/css'
import { CommentConfig } from '@oats-ts/typescript-writer'
import React, { FC } from 'react'
import { Button, Checkbox, CheckboxProps, Header } from 'semantic-ui-react'
import { PrettierConfiguration, WriterConfiguration } from '../../../types'
import { defaultPrettierConfig } from '../../model/deafultPrettierConfig'
import { wrapperStyle } from '../commonStyles'
import { CommentsTable } from './CommentsTable'
import { PrettierConfigurationEditor } from './PrettierConfigurationEditor'

export type WriterEditor = {
  isDark: boolean
  input: WriterConfiguration
  onChange: (node: WriterConfiguration) => void
}
const headerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`

const headerLabelStyle = css`
  flex: 1 1 1px;
  margin: 0px !important;
  padding: 0px !important;
`

export const WriterEditor: FC<WriterEditor> = ({ isDark, input, onChange }) => {
  const onPrettierConfigurationChange = (prettier: PrettierConfiguration) => onChange({ ...input, prettier })
  const onPrettierToggled = (_: any, data: CheckboxProps) => {
    onChange({ ...input, useFormatter: Boolean(data.checked) })
  }
  const onPrettierReset = () => {
    onChange({ ...input, prettier: defaultPrettierConfig })
  }
  const onLeadingCommentsChange = (leadingComments: CommentConfig[]) => {
    onChange({ ...input, leadingComments })
  }
  const onTrailingCommentsChange = (trailingComments: CommentConfig[]) => {
    onChange({ ...input, trailingComments })
  }
  return (
    <div className={wrapperStyle}>
      <div className={headerStyle}>
        <Checkbox toggle checked={input.useFormatter} onChange={onPrettierToggled} />
        <Header as="h3" className={headerLabelStyle}>
          Prettier
        </Header>
        <Button size="mini" disabled={!input.useFormatter} secondary onClick={onPrettierReset}>
          Reset
        </Button>
      </div>

      <PrettierConfigurationEditor
        disabled={!input.useFormatter}
        isDark={isDark}
        value={input.prettier}
        onChange={onPrettierConfigurationChange}
      />
      <Header as="h3">Leading comments</Header>
      <CommentsTable value={input.leadingComments} onChange={onLeadingCommentsChange} isDark={isDark} />
      <Header as="h3">Trailing comments</Header>
      <CommentsTable value={input.trailingComments} onChange={onTrailingCommentsChange} isDark={isDark} />
    </div>
  )
}
