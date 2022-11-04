import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as Home } from '../../md/Home.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="Home" content={Home} />)
