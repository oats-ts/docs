import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as ServerApiImpl } from '../../md/ServerApiImpl.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="ServerApiImpl" content={ServerApiImpl} />)
