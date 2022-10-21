import { Global } from '@emotion/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AppV2 } from './Appv2'
import { globalStyles } from './globalStyles'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Global styles={globalStyles} />
    <AppV2 />
  </HashRouter>,
)
