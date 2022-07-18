import 'semantic-ui-css/semantic.min.css'

import React, { FC } from 'react'

import { css } from '@emotion/css'
import { Route, Routes } from 'react-router-dom'
import { DemoPage } from './DemoPage/DemoPage'
import { DocumentationPage } from './DocumentationPage/DocumentationPage'
import { HomePage } from './HomePage/HomePage'
import { AppMenu } from './AppMenu'

const appContainerStyle = css`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 16px 16px 0px 16px;
  height: 100vh;
`

export const App: FC = () => {
  return (
    <div className={appContainerStyle}>
      <AppMenu />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="demo" element={<DemoPage />} />
        <Route path="docs" element={<DocumentationPage />} />
        <Route path="docs/:page" element={<DocumentationPage />} />
      </Routes>
    </div>
  )
}
