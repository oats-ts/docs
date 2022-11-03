import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../DocumentationPage/DocumentationPage'
import { default as CustomGenerators } from '../../../../md/CustomGenerators.md'

createRoot(document.getElementById('root')!).render(
  <DocumentationPage page="CustomGenerators" content={CustomGenerators} />,
)
