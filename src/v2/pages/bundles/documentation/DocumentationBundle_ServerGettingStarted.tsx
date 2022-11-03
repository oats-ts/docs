import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../DocumentationPage/DocumentationPage'
import { default as ServerGettingStarted } from '../../../../md/ServerGettingStarted.md'

createRoot(document.getElementById('root')!).render(
  <DocumentationPage page="ServerGettingStarted" content={ServerGettingStarted} />,
)
