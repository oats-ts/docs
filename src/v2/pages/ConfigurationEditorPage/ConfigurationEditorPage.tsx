import { css } from '@emotion/css'
import React, { FC } from 'react'
import { AppContainer } from '../../components/AppContainer'
import { SideBar } from '../../components/SideBar'
import { SideBarLogo } from '../../components/SideBarLogo'
import { GeneratorContext } from '../../model/GeneratorContext'
import { useGenerator } from '../../model/useGenerator'
import { ExplorerTree } from './ExplorerTree'
import { ReadonlyTypescriptMonaco } from './ReadonlyTypescriptMonaco'

const containerStyle = css`
  overflow: hidden;
`

const titleWrapper = css`
  padding: 14px 14px 0px 14px;
`

const monacoWrapper = css`
  flex: 1 1 1px;
`

export const ConfigurationEditorPage: FC = () => {
  const context = useGenerator()
  return (
    <GeneratorContext.Provider value={context}>
      <AppContainer direction="horizontal" className={containerStyle}>
        <SideBar>
          <div className={titleWrapper}>
            <SideBarLogo name="editor" />
          </div>
          <ExplorerTree />
        </SideBar>
        <div className={`no-font-override ${monacoWrapper}`}>
          <ReadonlyTypescriptMonaco height="100%" path="/foo" value="const x = 10;" />
        </div>
      </AppContainer>
    </GeneratorContext.Provider>
  )
}
