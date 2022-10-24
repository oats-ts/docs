import { css } from '@emotion/css'
import { CommentConfig, CommentType } from '@oats-ts/typescript-writer'
import React, { ChangeEvent, FC } from 'react'
import { HiPlusCircle, HiXCircle } from 'react-icons/hi2'
import { theme } from '../theme'
import { dd, DropdownItem } from './dropdownDefaults'
import { Input } from './Input'
import { Select } from './Select'
import { Table, THead, TBody, Td, Tr, Th } from './Table'

export type CommentsTableProps = {
  value: CommentConfig[]
  onChange: (value: CommentConfig[]) => void
}

const commentTypeOptions: DropdownItem<CommentType>[] = [
  { value: 'line', key: 'line', label: 'Line comment', description: 'Example: // Your comment' },
  { value: 'block', key: 'block', label: 'Block comment', description: 'Example: /* Your comment */' },
  { value: 'jsdoc', key: 'jsdoc', label: 'JSDoc comment', description: 'Example: /** Your comment */' },
]

const linkButtonStyle = css`
  color: ${theme.colors.muted};
  font-size: ${theme.fontSize.m};
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 6px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: ${theme.colors.text};
  }
`

const fullWidthCell = css`
  width: 50%;
`

const buttonCell = css`
  min-width: 150px;
`

export const CommentsTable: FC<CommentsTableProps> = ({ value, onChange }) => {
  const onAddComment = () => onChange([...value, { text: '', type: 'line' }])
  const onCommentDeleted = (index: number) => () => onChange(value.filter((_, i) => i !== index))
  const onTextChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) =>
    onChange(value.map((comment, i): CommentConfig => (i === index ? { ...comment, text: e.target.value } : comment)))
  const onTypeChange =
    (index: number) =>
    ({ value: type }: DropdownItem<CommentType>) => {
      onChange(value.map((comment, i): CommentConfig => (i === index ? { ...comment, type } : comment)))
    }

  return (
    <Table>
      <THead>
        <Tr isHeader={true}>
          <Th className={fullWidthCell}>Type</Th>
          <Th className={fullWidthCell}>Text</Th>
          <Th className={buttonCell}>
            <span className={linkButtonStyle} onClick={onAddComment}>
              <HiPlusCircle /> Add new
            </span>
          </Th>
        </Tr>
      </THead>
      <TBody>
        {value.length === 0 ? (
          <Tr aria-colspan={3}>
            <Td>No comments</Td>
          </Tr>
        ) : (
          value.map((comment, index) => (
            <Tr key={index}>
              <Td>
                <Input placeholder="Text" onChange={onTextChange(index)} value={comment.text} />
              </Td>
              <Td>
                <Select
                  placeholder="Type"
                  items={commentTypeOptions}
                  onChange={onTypeChange(index)}
                  value={commentTypeOptions.find((o) => o.value === comment.type)}
                  getDescription={dd.getDescription}
                  getKey={dd.getKey}
                  getValue={dd.getValue}
                />
              </Td>
              <Td>
                <span className={linkButtonStyle} onClick={onCommentDeleted(index)}>
                  <HiXCircle /> Delete
                </span>
              </Td>
            </Tr>
          ))
        )}
      </TBody>
    </Table>
  )
}
