import { Global } from '@emotion/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { App } from './App'
import { darkThemeFixes } from './darkThemeFixes'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Global styles={darkThemeFixes} />
    <App />
  </HashRouter>,
)
