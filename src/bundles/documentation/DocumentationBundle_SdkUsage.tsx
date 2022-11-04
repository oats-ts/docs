import React from 'react'
import { createRoot } from 'react-dom/client'
import { DocumentationPage } from '../../pages/DocumentationPage/DocumentationPage'
import { default as SdkUsage } from '../../md/SdkUsage.md'

createRoot(document.getElementById('root')!).render(<DocumentationPage page="SdkUsage" content={SdkUsage} />)
