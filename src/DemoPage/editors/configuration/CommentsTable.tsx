import { CommentConfig, CommentType } from '@oats-ts/typescript-writer'
import React, { FC } from 'react'
import {
  Button,
  Dropdown,
  DropdownProps,
  Icon,
  Input,
  InputOnChangeData,
  StrictDropdownItemProps,
  Table,
} from 'semantic-ui-react'

export type CommentsTableProps = {
  value: CommentConfig[]
  isDark: boolean
  onChange: (value: CommentConfig[]) => void
}

type CommentTypeDropdownItemProps = StrictDropdownItemProps & { value: CommentType }

const commentTypeOptions: CommentTypeDropdownItemProps[] = [
  { value: 'line', text: 'Line comment (// ...)' },
  { value: 'block', text: 'Block comment (/* ... */)' },
  { value: 'jsdoc', text: 'JSDoc comment (/** ... */)' },
]

export const CommentsTable: FC<CommentsTableProps> = ({ value, isDark, onChange }) => {
  const onAddComment = () => onChange([...value, { text: '', type: 'line' }])
  const onCommentDeleted = (index: number) => () => onChange(value.filter((_, i) => i !== index))
  const onTextChange = (index: number) => (_: any, data: InputOnChangeData) =>
    onChange(value.map((comment, i): CommentConfig => (i === index ? { ...comment, text: data.value } : comment)))
  const onTypeChange = (index: number) => (_: any, data: DropdownProps) => {
    const type = data.value! as CommentType
    onChange(value.map((comment, i): CommentConfig => (i === index ? { ...comment, type } : comment)))
  }

  return (
    <Table inverted={isDark}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="10">Type</Table.HeaderCell>
          <Table.HeaderCell width="10">Text</Table.HeaderCell>
          <Table.HeaderCell width="1">
            <Button size="mini" primary icon onClick={onAddComment}>
              <Icon name="add circle" />
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {value.length === 0 ? (
          <Table.Row aria-colspan={3}>
            <Table.Cell>No comments</Table.Cell>
          </Table.Row>
        ) : (
          value.map((comment, index) => (
            <Table.Row key={`${index}_${comment.type}_${comment.text}`}>
              <Table.Cell>
                <Input placeholder="Text" fluid onChange={onTextChange(index)} value={comment.text} />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  placeholder="Type"
                  fluid
                  selection
                  options={commentTypeOptions}
                  onChange={onTypeChange(index)}
                  value={comment.type}
                />
              </Table.Cell>
              <Table.Cell>
                <Button size="mini" color="red" icon onClick={onCommentDeleted(index)}>
                  <Icon name="remove circle" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  )
}
