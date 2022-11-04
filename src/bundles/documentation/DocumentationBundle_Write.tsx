import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as Write } from '../../md/Write.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="Write" content={Write} />)
