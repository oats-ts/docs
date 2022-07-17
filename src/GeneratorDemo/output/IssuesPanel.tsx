import { css } from '@emotion/css'
import React, { FC, useContext } from 'react'
import { Header, Icon, Table } from 'semantic-ui-react'
import { GeneratorContext } from '../GeneratorContext'

const issuesContainerStyle = css`
  height: calc(100vh - 168px);
  overflow-y: auto;
  padding: 16px;
`

const headerRowStyle = css`
  display: flex;
  flex-direction: row;
`

const headerStyle = css`
  flex: 1 1 1px;
  margin-bottom: 0px !important;
`

const pathCellStyle = css`
  max-width: 200px;
  word-break: break-word;
`

export const IssuesPanel: FC = () => {
  const { result, setIssuesPanelOpen } = useContext(GeneratorContext)
  const { issues } = result
  return (
    <div className={issuesContainerStyle}>
      <div className={headerRowStyle}>
        <Header className={headerStyle}>
          {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
        </Header>
        <div onClick={() => setIssuesPanelOpen(false)}>
          <Icon name="close" />
        </div>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Severity</Table.HeaderCell>
            <Table.HeaderCell>Path</Table.HeaderCell>
            <Table.HeaderCell>Message</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row error={issue.severity === 'error'} warning={issue.severity === 'warning'}>
                <Table.Cell>{issue.severity}</Table.Cell>
                <Table.Cell className={pathCellStyle}>{issue.path}</Table.Cell>
                <Table.Cell>{issue.message}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}
