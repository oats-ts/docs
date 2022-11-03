import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../DocumentationPage/DocumentationPage'
import { default as Workflow } from '../../../../md/Workflow.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="Workflow" content={Workflow} />)
