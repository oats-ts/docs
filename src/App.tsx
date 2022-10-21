import React, { FC } from 'react'

import { Route, Routes } from 'react-router-dom'
import { DocumentationPage } from './DocumentationPage/DocumentationPage'
import { ColorModeContext } from './ColorModeContext'
import { useColorModeContext } from './useColorMode'
import { DemoPage } from './DemoPage/DemoPage'
import { LandingPage } from './LandingPage/LandingPage'

export const App: FC = () => {
  const colorCtx = useColorModeContext()
  return (
    <ColorModeContext.Provider value={colorCtx}>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="demo" element={<DemoPage />} />
        <Route path="docs" element={<DocumentationPage />} />
        <Route path="docs/:page" element={<DocumentationPage />} />
      </Routes>
    </ColorModeContext.Provider>
  )
}
