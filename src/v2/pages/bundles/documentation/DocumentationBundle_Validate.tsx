import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../DocumentationPage/DocumentationPage'
import { default as Validate } from '../../../../md/Validate.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="Validate" content={Validate} />)
