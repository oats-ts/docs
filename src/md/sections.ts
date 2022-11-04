import { flatMap } from 'lodash'
import { markdownPages } from '../markdownPages'
import { DocumentationSection } from '../types'

const namedSections: DocumentationSection[] = [
  {
    useNavigation: false,
    items: [markdownPages.welcomePage, markdownPages.commonMistakesPage],
  },
  {
    name: 'Server Guide',
    useNavigation: true,
    items: [
      markdownPages.serverGettingStartedPage,
      markdownPages.serverTypesPage,
      markdownPages.serverSetupPage,
      markdownPages.serverApiExamplePage,
      markdownPages.serverCorsPage,
    ],
  },
  {
    name: '(Client) SDK Guide',
    useNavigation: true,
    items: [
      markdownPages.sdkGettingStartedPage,
      markdownPages.sdkTypesPage,
      markdownPages.sdkUsagePage,
      markdownPages.sdkErrorHandlingPage,
    ],
  },
  {
    name: 'Generator api',
    useNavigation: true,
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
