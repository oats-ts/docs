import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as GettingStarted } from '../../md/GettingStarted.md'

createRoot(document.getElementById('root')!).render(
  <DocumentationPage page="GettingStarted" content={GettingStarted} />,
)
