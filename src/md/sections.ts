import { flatMap } from 'lodash'
import { markdownPages } from '../markdownPages'
import { DocumentationSection } from '../types'

const namedSections: DocumentationSection[] = [
  {
    items: [markdownPages.welcomePage],
  },
  {
    name: 'Server Guide',
    items: [
      markdownPages.serverGettingStartedPage,
      markdownPages.serverTypesPage,
      markdownPages.serverSetupPage,
      markdownPages.serverApiImplPage,
      markdownPages.serverCorsPage,
    ],
  },
  {
    name: '(Client) SDK Guide',
    items: [
      markdownPages.sdkGettingStartedPage,
      markdownPages.sdkTypesPage,
      markdownPages.sdkUsagePage,
      markdownPages.sdkErrorHandlingPage,
    ],
  },
  {
    name: 'Other Guides',
    items: [markdownPages.commonMistakesPage],
  },
  {
    name: 'Generator api',
    items: [
      markdownPages.readPage,
      markdownPages.validatePage,
      markdownPages.generatePage,
      markdownPages.customGeneratorsPage,
      markdownPages.writePage,
    ],
  },
]

export const sections: DocumentationSection[] = namedSections

export const docs = flatMap(sections, (section) => section.items)
