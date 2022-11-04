import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as SdkTypes } from '../../md/SdkTypes.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="SdkTypes" content={SdkTypes} />)
