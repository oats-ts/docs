import { css } from '@emotion/css'
import React, { FC } from 'react'
import { AppContainer } from '../../components/AppContainer'
import { SideBar } from '../../components/SideBar'
import { SideBarLogo } from '../../components/SideBarLogo'
import { GeneratorContext } from '../../model/GeneratorContext'
import { useGenerator } from '../../model/useGenerator'
import { theme } from '../../theme'
import { EditorView } from './EditorView'
import { ExplorerTree } from './ExplorerTree'

const containerStyle = css`
  overflow: hidden;
`

const editorContainerStyle = css`
  flex: 1 1 1px;
  background-color: ${theme.colors.dark3};
  overflow: auto;
`

export const ConfigurationEditorPage: FC = () => {
  const context = useGenerator()
  return (
    <GeneratorContext.Provider value={context}>
      <AppContainer direction="horizontal" className={containerStyle}>
        <SideBar>
          <SideBarLogo name="editor" />
          <ExplorerTree />
        </SideBar>
        <div className={editorContainerStyle}>
          <EditorView />
        </div>
      </AppContainer>
    </GeneratorContext.Provider>
  )
}
