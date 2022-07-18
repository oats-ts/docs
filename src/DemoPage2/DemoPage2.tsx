import { css, cx } from '@emotion/css'
import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { FC, useEffect } from 'react'
import { Segment, SegmentGroup } from 'semantic-ui-react'
import { GeneratorContext } from '../DemoPage/GeneratorContext'
import { useGenerator } from '../DemoPage/useGenerator'
import { useColorMode } from '../useColorMode'
import { ExplorerTree } from './ExplorerTree'

const segmentGroupStyle = css`
  height: calc(100vh - 86px);
`

const treeContainerStyle = css`
  width: 300px;
  min-width: 300px !important;
  height: 100%;
  overflow: auto;
`

const mainSegmentStyle = css`
  padding: 0px !important;
`

const darkSegmentStyle = css`
  background-color: #1b1c1d !important;
  border-color: #373838 !important;
`

const darkSegmentGroupStyle = css`
  background-color: #1b1c1d !important;
  border: none !important;
  border-radius: 4px !important;
  overflow: hidden !important;
`

const editorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
}

export const DemoPage2: FC = () => {
  const { colorMode } = useColorMode()
  const context = useGenerator()
  useEffect(() => {
    context.setSourceBySample(
      'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/generated-schemas/bodies.json',
    )
  }, [])
  const groupStyle = cx(segmentGroupStyle, colorMode === 'dark' ? darkSegmentGroupStyle : undefined)
  const fileMenuStyle = cx(treeContainerStyle, colorMode === 'dark' ? darkSegmentStyle : undefined)
  const codeContainerStyle = cx(mainSegmentStyle, colorMode === 'dark' ? darkSegmentStyle : undefined)

  return (
    <GeneratorContext.Provider value={context}>
      <SegmentGroup horizontal className={groupStyle}>
        <Segment inverted={colorMode === 'dark'} compact className={fileMenuStyle}>
          <ExplorerTree />
        </Segment>
        <Segment inverted={colorMode === 'dark'} className={codeContainerStyle}>
          <Editor
            height="100%"
            theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
            defaultPath={context.editorInput?.path ?? '/____dummy___'}
            language="typescript"
            value={context.editorInput?.content ?? ''}
            options={editorConfig}
          />
        </Segment>
      </SegmentGroup>
    </GeneratorContext.Provider>
  )
}
