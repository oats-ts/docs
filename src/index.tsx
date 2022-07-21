import { css, Global } from '@emotion/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { App } from './App'

const globalStyles = css`
  .ui.loading.inverted.segment:before {
    background-color: rgba(255, 255, 255, 0.1) !important;
    z-index: 10000;
  }
  .ui.inverted h3 {
    color: #fff;
  }
`

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Global styles={globalStyles} />
    <App />
  </HashRouter>,
)
