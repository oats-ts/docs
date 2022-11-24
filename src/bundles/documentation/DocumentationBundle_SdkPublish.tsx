import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as SdkPublish } from '../../md/SdkPublish.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="SdkPublish" content={SdkPublish} />)
