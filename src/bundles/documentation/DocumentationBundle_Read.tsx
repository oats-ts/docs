import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as Read } from '../../md/Read.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="Read" content={Read} />)
