import { cx } from '@emotion/css'
import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC } from 'react'
import { Segment } from 'semantic-ui-react'
import { InlineOpenAPINode } from '../../types'
import { darkSegmentStyle, segmentStyle } from '../commonStyles'

const HeightSub = 128

type ReadonlyTypescriptEditorProps = {
  isLoading: boolean
  isDark: boolean
  input: InlineOpenAPINode
  onChange: (node: InlineOpenAPINode) => void
}

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
}

export const OpenAPIInputEditor: FC<ReadonlyTypescriptEditorProps> = ({ input, isLoading, isDark, onChange }) => {
  const fullSegmentStyle = cx(segmentStyle, isDark ? darkSegmentStyle : undefined)
  const handleSourceChange = (value: string | undefined) => {
    onChange({ ...input, content: value ?? '' })
  }
  return (
    <Segment loading={isLoading} inverted={isDark} className={fullSegmentStyle}>
      <Editor
        height={`calc(100vh - ${HeightSub}px)`}
        theme={isDark ? 'vs-dark' : 'light'}
        defaultPath={`openapi.${input.language}`}
        language={input.language}
        value={input.content}
        onChange={handleSourceChange}
        options={editorConfig}
      />
    </Segment>
  )
}
