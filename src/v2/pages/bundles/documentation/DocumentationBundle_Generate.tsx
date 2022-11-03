import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../DocumentationPage/DocumentationPage'
import { default as Generate } from '../../../../md/Generate.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="Generate" content={Generate} />)
