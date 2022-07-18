import 'semantic-ui-css/semantic.min.css'

import React, { FC } from 'react'

import { css } from '@emotion/css'
import { Route, Routes } from 'react-router-dom'
import { DemoPage } from './DemoPage/DemoPage'
import { DocumentationPage } from './DocumentationPage/DocumentationPage'
import { HomePage } from './HomePage/HomePage'
import { AppMenu } from './AppMenu'
import { ColorModeContext } from './ColorModeContext'
import { useWatchColorMode } from './useColorMode'
import { ColorMode } from './types'

const appContainerStyle = (colorMode: ColorMode) => css`
  background-color: ${colorMode === 'dark' ? '#252525' : '#fefefe'};
  padding: 16px 16px 0px 16px;
  height: 100vh;
`

export const App: FC = () => {
  const colorCtx = useWatchColorMode()
  return (
    <ColorModeContext.Provider value={colorCtx}>
      <div className={appContainerStyle(colorCtx.colorMode)}>
        <AppMenu />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="demo" element={<DemoPage />} />
          <Route path="docs" element={<DocumentationPage />} />
          <Route path="docs/:page" element={<DocumentationPage />} />
        </Routes>
      </div>
    </ColorModeContext.Provider>
  )
}
