import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../DocumentationPage/DocumentationPage'
import { default as ServerSetup } from '../../../../md/ServerSetup.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="ServerSetup" content={ServerSetup} />)
