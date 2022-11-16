import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ConfigurationEditorPage } from '../pages/ConfigurationEditorPage/ConfigurationEditorPage'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <ConfigurationEditorPage />
  </HashRouter>,
)
