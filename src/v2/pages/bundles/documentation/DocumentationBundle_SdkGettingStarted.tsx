import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../DocumentationPage/DocumentationPage'
import { default as SdkGettingStarted } from '../../../../md/SdkGettingStarted.md'

createRoot(document.getElementById('root')!).render(
  <DocumentationPage page="SdkGettingStarted" content={SdkGettingStarted} />,
)
