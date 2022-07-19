import { cx } from '@emotion/css'
import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC } from 'react'
import { Segment } from 'semantic-ui-react'
import { FileNode } from '../../types'
import { darkSegmentStyle, segmentStyle } from '../commonStyles'

type ReadonlyTypescriptEditorProps = {
  isLoading: boolean
  isDark: boolean
  input: FileNode
}

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
}

export const ReadonlyTypescriptEditor: FC<ReadonlyTypescriptEditorProps> = ({ input, isLoading, isDark }) => {
  const fullSegmentStyle = cx(segmentStyle, isDark ? darkSegmentStyle : undefined)
  return (
    <Segment loading={isLoading} inverted={isDark} className={fullSegmentStyle}>
      <Editor
        height="100%"
        theme={isDark ? 'vs-dark' : 'light'}
        path={input.path}
        language="typescript"
        value={input.content}
        options={editorConfig}
      />
    </Segment>
  )
}
