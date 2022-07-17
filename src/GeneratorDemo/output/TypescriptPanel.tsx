import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC, useContext } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { codeEditorSegmentStyle } from '../commonCss'
import { GeneratorContext } from '../GeneratorContext'
import { IssuesItem } from './IssuesItem'
import { IssuesPanel } from './IssuesPanel'
import { StatusItem } from './StatusItem'

const HeightSub = 168

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
}

export const TypescriptPanel: FC = () => {
  const { result, isIssuesPanelOpen } = useContext(GeneratorContext)
  const { data, status } = result
  return (
    <>
      <Menu attached="top" secondary>
        <Menu.Item header>Typescript output</Menu.Item>
      </Menu>
      <Segment raised attached className={codeEditorSegmentStyle} loading={status === 'working'}>
        {isIssuesPanelOpen ? (
          <IssuesPanel />
        ) : (
          <Editor
            height={`calc(100vh - ${HeightSub}px)`}
            language="typescript"
            theme="light"
            defaultPath="output.ts"
            value={data}
            options={editorConfig}
          />
        )}
      </Segment>
      <Menu attached="bottom" secondary>
        <StatusItem />
        <div style={{ flex: '1 1 1px' }}></div>
        <IssuesItem />
      </Menu>
    </>
  )
}
