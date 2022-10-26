import { css } from '@emotion/css'
import React, { FC } from 'react'
import { BreakPoint } from '../../breakpoints'
import { DocContainer } from '../../components/DocContainer'
import { MobileContext, useProvideMobileContext } from '../../components/MobileContext'
import { MobileHeaderWithOverlay } from '../../components/MobileHeaderWithOverlay'
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

const NAME = 'editor'

const MobileTitleBar: FC = () => {
  const ctx = useProvideMobileContext()
  return (
    <MobileContext.Provider value={ctx}>
      <MobileHeaderWithOverlay name={NAME}>
        <ExplorerTree />
      </MobileHeaderWithOverlay>
    </MobileContext.Provider>
  )
}

export const ConfigurationEditorPage: FC = () => {
  const context = useGenerator()
  return (
    <GeneratorContext.Provider value={context}>
      <DocContainer>
        <SideBar>
          <SideBarLogo name={NAME} />
          <ExplorerTree />
        </SideBar>
        <div className={editorContainerStyle}>
          <BreakPoint Component={MobileTitleBar} breakpoint="phone" />
          <EditorView />
        </div>
      </DocContainer>
    </GeneratorContext.Provider>
  )
}
