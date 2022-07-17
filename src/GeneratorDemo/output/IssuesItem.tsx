import React, { FC, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { GeneratorContext } from '../GeneratorContext'

export const IssuesItem: FC = () => {
  const { result, isIssuesPanelOpen, setIssuesPanelOpen } = useContext(GeneratorContext)
  const { issues } = result
  if (issues.length === 0) {
    return <Menu.Item name="No issues" />
  }
  return (
    <Menu.Item onClick={() => setIssuesPanelOpen(!isIssuesPanelOpen)}>
      {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
    </Menu.Item>
  )
}
