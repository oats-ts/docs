import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../DocumentationPage/DocumentationPage'
import { default as Welcome } from '../../../md/Welcome.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="Welcome" content={Welcome} />)
