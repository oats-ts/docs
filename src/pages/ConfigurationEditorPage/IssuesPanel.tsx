import { css } from '@emotion/css'
import { Severity } from '@oats-ts/validators'
import React, { FC } from 'react'
import { HiExclamationCircle, HiInformationCircle, HiXCircle } from 'react-icons/hi2'
import { Table, THead, TBody, Tr, Th, Td } from '../../components/Table'
import { IssuesNode } from '../../types'
import { theme } from '../../theme'
import { IssuePath } from './IssuePath'

const issuesContainerStyle = css`
  padding: ${theme.spacing.m} ${theme.spacing.xxm};
`

const iconCellStyle = css`
  font-size: 1.4rem;
  vertical-align: middle;
`

const titleStyle = css`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.l};
  margin-top: ${theme.spacing.zero};
`

const SeverityIcon: FC<{ severity: Severity }> = ({ severity }) => {
  switch (severity) {
    case 'error':
      return <HiXCircle />
    case 'warning':
      return <HiExclamationCircle />
    case 'info':
      return <HiInformationCircle />
  }
}

export type IssuesPanelProps = {
  isLoading: boolean
  node: IssuesNode
}

export const IssuesPanel: FC<IssuesPanelProps> = ({ node }) => {
  return (
    <div className={issuesContainerStyle}>
      <h1 className={titleStyle}>Issues ({node.issues.length})</h1>
      <Table>
        <THead>
          <Tr isHeader={true}>
            <Th></Th>
            <Th>Path</Th>
            <Th>Message</Th>
          </Tr>
        </THead>
        <TBody>
          {node.issues.length > 0 ? (
            node.issues.map((issue, index) => {
              return (
                <Tr key={index}>
                  <Td className={iconCellStyle}>
                    <SeverityIcon severity={issue.severity} />
                  </Td>
                  <Td>
                    <IssuePath path={issue.path} />
                  </Td>
                  <Td>{issue.message}</Td>
                </Tr>
              )
            })
          ) : (
            <Tr aria-colspan={3}>
              <Td>No issues</Td>
            </Tr>
          )}
        </TBody>
      </Table>
    </div>
  )
}
