import { flatMap, keys } from 'lodash'
import { markdown, MarkdownPageName } from '../../../md/markdown'

export type DocumentationItem = {
  name: string
  md: MarkdownPageName
}

export type DocumentationSection = {
  name: string
  items: DocumentationItem[]
}

const namedSections: DocumentationSection[] = [
  {
    name: 'Guides',
    items: [
      {
        md: 'GettingStarted',
        name: 'Getting started',
      },
      {
        md: 'GeneratedSdk',
        name: 'Using a generated SDK',
      },
      {
        md: 'GeneratedServer',
        name: 'Using a generated server',
      },
      {
        md: 'CustomGenerators',
        name: 'Custom generators',
      },
      {
        md: 'CommonMistakes',
        name: 'Common mistakes',
      },
    ],
  },
  {
    name: 'Api',
    items: [
      {
        md: 'Read',
        name: 'Read',
      },
      {
        md: 'Validate',
        name: 'Validate',
      },
      {
        md: 'Generate',
        name: 'Generate',
      },
      {
        md: 'Write',
        name: 'Write',
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

export const sections: DocumentationSection[] = [
  ...namedSections,
  ...(mixedSection.items.length > 0 ? [mixedSection] : []),
]

export const docs = flatMap(sections, (section) => section.items)
