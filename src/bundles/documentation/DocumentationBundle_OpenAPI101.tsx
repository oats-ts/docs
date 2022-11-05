import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as OpenAPI101 } from '../../md/OpenAPI101.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="OpenAPI101" content={OpenAPI101} />)
