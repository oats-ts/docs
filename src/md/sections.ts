import { flatMap, keys } from 'lodash'
import { markdown, MarkdownPageName } from './markdown'

export type DocumentationItem = {
  name: string
  md: MarkdownPageName
}

export type DocumentationSection = {
  name?: string
  items: DocumentationItem[]
}

const namedSections: DocumentationSection[] = [
  {
    items: [
      {
        md: 'Welcome',
        name: 'Welcome',
      },
    ],
  },
  {
    name: 'Server Guide',
    items: [
      {
        md: 'ServerGettingStarted',
        name: 'Getting started',
      },
      {
        md: 'ServerTypes',
        name: 'Server related types',
      },
      {
        md: 'ServerSetup',
        name: 'Express server setup',
      },
      {
        md: 'ServerApiImpl',
        name: 'API Example',
      },
      {
        md: 'ServerCors',
        name: 'Add CORS',
      },
    ],
  },
  {
    name: '(Client) SDK Guide',
    items: [
      {
        md: 'SdkGettingStarted',
        name: 'Getting started',
      },
      {
        md: 'SdkTypes',
        name: 'SDK related types',
      },
      {
        md: 'SdkUsage',
        name: 'SDK usage',
      },
      {
        md: 'SdkErrorHandling',
        name: 'Error handling',
      },
    ],
  },
  {
    name: 'Other Guides',
    items: [
      {
        md: 'CommonMistakes',
        name: 'Common mistakes',
      },
    ],
  },
  {
    name: 'Generator api',
    items: [
      {
        md: 'Read',
        name: 'Reader',
      },
      {
        md: 'Validate',
        name: 'Validator',
      },
      {
        md: 'Generate',
        name: 'Generators',
      },
      {
        md: 'CustomGenerators',
        name: 'Custom generators',
      },
      {
        md: 'Write',
        name: 'Writer',
      },
    ],
  },
]

function getMixedItems(): DocumentationItem[] {
  const inNamed: MarkdownPageName[] = flatMap(namedSections, (section) => section.items).map(({ md }) => md)
  const notInNamed = keys(markdown).filter(
    (key: string) => !inNamed.includes(key as MarkdownPageName),
  ) as MarkdownPageName[]
  return notInNamed.map((md) => ({ md, name: md }))
}

const mixedSection: DocumentationSection = {
  name: 'Mixed',
  items: getMixedItems(),
}

export const sections: DocumentationSection[] = [...namedSections, ...(false ? [mixedSection] : [])]

export const docs = flatMap(sections, (section) => section.items)
