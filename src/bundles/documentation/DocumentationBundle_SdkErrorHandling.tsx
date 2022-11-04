import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as SdkErrorHandling } from '../../md/SdkErrorHandling.md'

createRoot(document.getElementById('root')!).render(
  <DocumentationPage page="SdkErrorHandling" content={SdkErrorHandling} />,
)
