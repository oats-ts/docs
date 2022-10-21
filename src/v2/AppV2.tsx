import React, { FC } from 'react'

import { Route, Routes } from 'react-router-dom'
import { DocumentationPage } from './pages/DocumentationPage/DocumentationPage'
import { LandingPage } from './pages/LandingPage/LandingPage'

export const AppV2: FC = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="documentation" element={<DocumentationPage />} />
    </Routes>
  )
}
