import Editor from '@monaco-editor/react'
import { Issue, stringify } from '@oats-ts/validators'
import { editor } from 'monaco-editor'
import React, { FC } from 'react'
import { Dropdown, Icon, Menu, Segment, Message } from 'semantic-ui-react'
import { codeEditorSegmentStyle } from '../commonCss'
import { GeneratorStatus, Result } from '../../types'

export type TypescriptPanelProps = Result

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
}

const StatusItem: FC<{ status: GeneratorStatus }> = ({ status }) => {
  switch (status) {
    case 'working':
      return (
        <Menu.Item>
          <Icon name="circle notch" /> Working...
        </Menu.Item>
      )
    case 'success':
      return (
        <Menu.Item>
          <Icon name="check circle" color="green" /> Success
        </Menu.Item>
      )
    case 'failure':
      return (
        <Menu.Item>
          <Icon name="exclamation circle" color="red" /> Failure
        </Menu.Item>
      )
  }
}

const IssuesItem: FC<{ issues: Issue[] }> = ({ issues }) => {
  if (issues.length === 0) {
    return <Menu.Item name="No issues" />
  }
  return (
    <Dropdown
      item
      text={`${issues.length} ${issues.length === 1 ? 'issue' : 'issues'}`}
      position="right"
      direction="left"
    >
      <Dropdown.Menu>
        {issues.map((issue, index) => (
          <Message error key={index}>
            <Icon name="exclamation circle" /> {stringify(issue)}
          </Message>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export const TypescriptPanel: FC<TypescriptPanelProps> = ({ data, status, issues }) => {
  return (
    <>
      <Menu attached="top" secondary>
        <Menu.Item header>Typescript output</Menu.Item>
      </Menu>
      <Segment raised attached className={codeEditorSegmentStyle} loading={status === 'working'}>
        <Editor
          height="calc(100vh - 157px)"
          language="typescript"
          theme="light"
          defaultPath="output.ts"
          value={data}
          options={editorConfig}
        />
      </Segment>
      <Menu attached="bottom" secondary>
        <StatusItem status={status} />
        <div style={{ flex: '1 1 1px' }}></div>
        <IssuesItem issues={issues} />
      </Menu>
    </>
  )
}
