import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../DocumentationPage/DocumentationPage'
import { default as ServerTypes } from '../../../../md/ServerTypes.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="ServerTypes" content={ServerTypes} />)
