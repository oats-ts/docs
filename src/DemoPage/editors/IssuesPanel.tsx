import { css, cx } from '@emotion/css'
import { Severity } from '@oats-ts/validators'
import React, { FC } from 'react'
import { Icon, Segment, Table } from 'semantic-ui-react'
import { IssuesNode } from '../../types'
import { darkSegmentStyle } from '../commonStyles'

const issuesContainerStyle = css`
  height: 100%;
  flex: 1 1 1px;
  overflow-y: auto;
  padding: 16px !important;
`

const pathCellStyle = css`
  /* max-width: 200px; */
  word-break: break-word;
`

const SeverityIcon: FC<{ severity: Severity }> = ({ severity }) => {
  switch (severity) {
    case 'error':
      return <Icon name="close" color="red" />
    case 'warning':
      return <Icon name="exclamation triangle" color="yellow" />
    case 'info':
      return <Icon name="info" color="blue" />
  }
}

export type IssuesPanelProps = {
  isDark: boolean
  isLoading: boolean
  node: IssuesNode
}

export const IssuesPanel: FC<IssuesPanelProps> = ({ isDark, isLoading, node }) => {
  const fullSegmentStyle = cx(issuesContainerStyle, isDark ? darkSegmentStyle : undefined)
  return (
    <Segment loading={isLoading} inverted={isDark} className={fullSegmentStyle}>
      <Table inverted={isDark}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Severity</Table.HeaderCell>
            <Table.HeaderCell>Path</Table.HeaderCell>
            <Table.HeaderCell>Message</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {node.issues.length > 0 ? (
            node.issues.map((issue, index) => {
              const path = issue.path.includes('#') ? `#${issue.path.split('#')[1]}` : issue.path
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <SeverityIcon severity={issue.severity} /> {issue.severity}
                  </Table.Cell>
                  <Table.Cell className={pathCellStyle}>{path}</Table.Cell>
                  <Table.Cell>{issue.message}</Table.Cell>
                </Table.Row>
              )
            })
          ) : (
            <Table.Row aria-colspan={3}>
              <Table.Cell>No issues</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Segment>
  )
}
