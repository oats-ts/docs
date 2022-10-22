import { css } from '@emotion/css'
import React, { FC } from 'react'
import { AppContainer } from '../../components/AppContainer'
import { SideBar } from '../../components/SideBar'
import { SideBarLogo } from '../../components/SideBarLogo'

const containerStyle = css`
  overflow: hidden;
`

export const ConfigurationEditorPage: FC = () => {
  return (
    <AppContainer direction="horizontal" className={containerStyle}>
      <SideBar>
        <SideBarLogo name="editor" />
      </SideBar>
    </AppContainer>
  )
}
