import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as ServerApiExample } from '../../md/ServerApiExample.md'

createRoot(document.getElementById('root')!).render(
  <DocumentationPage page="ServerApiExample" content={ServerApiExample} />,
)
