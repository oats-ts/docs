import React, { FC } from 'react'

import { Route, Routes } from 'react-router-dom'
import { ConfigurationEditorPage } from './pages/ConfigurationEditorPage/ConfigurationEditorPage'
import { DocumentationPage } from './pages/DocumentationPage/DocumentationPage'
import { LandingPage } from './pages/LandingPage/LandingPage'

export const AppV2: FC = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="documentation" element={<DocumentationPage />} />
      <Route path="documentation/:page" element={<DocumentationPage />} />
      <Route path="editor" element={<ConfigurationEditorPage />} />
    </Routes>
  )
}
