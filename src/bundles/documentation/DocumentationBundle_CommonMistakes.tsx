import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as CommonMistakes } from '../../md/CommonMistakes.md'

createRoot(document.getElementById('root')!).render(
  <DocumentationPage page="CommonMistakes" content={CommonMistakes} />,
)
