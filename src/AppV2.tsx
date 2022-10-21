import React, { FC } from 'react'

import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './LandingPage/LandingPage'

export const AppV2: FC = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
    </Routes>
  )
}
