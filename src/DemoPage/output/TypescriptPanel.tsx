import { cx } from '@emotion/css'
import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC, useContext } from 'react'
import { Icon, Menu, Segment } from 'semantic-ui-react'
import { useColorMode } from '../../useColorMode'
import { codeEditorSegmentStyle, darkCodeContainerSegmentStyle, darkMenuStyle } from '../commonCss'
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
  const { result, isIssuesPanelOpen, setIssuesPanelOpen } = useContext(GeneratorContext)
  const { data, issues, status } = result
  const { colorMode } = useColorMode()
  return (
    <>
      <Menu
        attached="top"
        secondary
        inverted={colorMode === 'dark'}
        className={colorMode === 'dark' ? darkMenuStyle : undefined}
      >
        <Menu.Item header>{isIssuesPanelOpen ? `Issues (${issues.length})` : 'Typescript output'}</Menu.Item>
        <div style={{ flex: '1 1 1px' }}></div>
        {isIssuesPanelOpen && (
          <Menu.Item onClick={() => setIssuesPanelOpen(false)}>
            <Icon name="close" fitted />
          </Menu.Item>
        )}
      </Menu>
      <Segment
        attached
        className={cx(codeEditorSegmentStyle, colorMode === 'dark' ? darkCodeContainerSegmentStyle : undefined)}
        loading={status === 'working'}
        inverted={colorMode === 'dark'}
      >
        {isIssuesPanelOpen ? (
          <IssuesPanel />
        ) : (
          <Editor
            height={`calc(100vh - ${HeightSub}px)`}
            language="typescript"
            theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
            defaultPath="output.ts"
            value={data}
            options={editorConfig}
          />
        )}
      </Segment>
      <Menu
        attached="bottom"
        secondary
        inverted={colorMode === 'dark'}
        className={colorMode === 'dark' ? darkMenuStyle : undefined}
      >
        <StatusItem />
        <div style={{ flex: '1 1 1px' }}></div>
        <IssuesItem />
      </Menu>
    </>
  )
}
