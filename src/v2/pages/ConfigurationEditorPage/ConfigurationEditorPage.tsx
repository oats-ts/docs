import { css } from '@emotion/css'
import React, { FC } from 'react'
import { DocContainer } from '../../components/DocContainer'
import { SideBar } from '../../components/SideBar'
import { SideBarLogo } from '../../components/SideBarLogo'
import { GeneratorContext } from '../../model/GeneratorContext'
import { useGenerator } from '../../model/useGenerator'
import { theme } from '../../theme'
import { EditorView } from './EditorView'
import { ExplorerTree } from './ExplorerTree'

const editorContainerStyle = css`
  flex: 1 1 1px;
  background-color: ${theme.colors.dark4};
  overflow: auto;
`

export const ConfigurationEditorPage: FC = () => {
  const context = useGenerator()
  return (
    <GeneratorContext.Provider value={context}>
      <DocContainer>
        <SideBar>
          <SideBarLogo name="editor" />
          <ExplorerTree />
        </SideBar>
        <div className={editorContainerStyle}>
          <EditorView />
        </div>
      </DocContainer>
    </GeneratorContext.Provider>
  )
}
