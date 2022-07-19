import { css } from '@emotion/css'
import { Severity } from '@oats-ts/validators'
import React, { FC, useContext } from 'react'
import { Icon, Table } from 'semantic-ui-react'
import { useColorMode } from '../../useColorMode'
import { GeneratorContext } from '../GeneratorContext'

const issuesContainerStyle = css`
  height: calc(100vh - 168px);
  overflow-y: auto;
  padding: 16px;
`

const pathCellStyle = css`
  max-width: 200px;
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

export const IssuesPanel: FC = () => {
  const { colorMode } = useColorMode()
  const { results } = useContext(GeneratorContext)
  const { issues } = results
  return (
    <div className={issuesContainerStyle}>
      <Table inverted={colorMode === 'dark'}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Severity</Table.HeaderCell>
            <Table.HeaderCell>Path</Table.HeaderCell>
            <Table.HeaderCell>Message</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <SeverityIcon severity={issue.severity} /> {issue.severity}
                </Table.Cell>
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
