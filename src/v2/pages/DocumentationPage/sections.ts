import { flatMap } from 'lodash'
import { MarkdowPageName } from '../../../md/markdown'

export type DocumentationItem = {
  name: string
  md: MarkdowPageName
}

export type DocumentationSection = {
  name: string
  items: DocumentationItem[]
}

export const sections: DocumentationSection[] = [
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

export const docs = flatMap(sections, (section) => section.items)
