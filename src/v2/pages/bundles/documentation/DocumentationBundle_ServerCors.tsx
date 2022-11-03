import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../DocumentationPage/DocumentationPage'
import { default as ServerCors } from '../../../../md/ServerCors.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="ServerCors" content={ServerCors} />)
