import { cx } from '@emotion/css'
import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC } from 'react'
import { Segment } from 'semantic-ui-react'
import { darkSegmentStyle, segmentStyle } from '../commonStyles'

type PackageJsonEditorProps = {
  isDark: boolean
  source: string
}

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
}

export const PackageJsonEditor: FC<PackageJsonEditorProps> = ({ source, isDark }) => {
  const fullSegmentStyle = cx(segmentStyle, isDark ? darkSegmentStyle : undefined)
  return (
    <Segment inverted={isDark} className={fullSegmentStyle}>
      <Editor
        height="100%"
        theme={isDark ? 'vs-dark' : 'light'}
        defaultPath="package.json"
        language="json"
        value={source}
        options={editorConfig}
      />
    </Segment>
  )
}
