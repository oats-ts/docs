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
        md: 'OpenAPI_GettingStarted',
        name: 'Getting started',
      },
      {
        md: 'OpenAPI_Sdk',
        name: 'Using a generated SDK',
      },
      {
        md: 'OpenAPI_Server',
        name: 'Using a generated server',
      },
      {
        md: 'OpenAPI_CustomGenerator',
        name: 'Custom generators',
      },
    ],
  },
  {
    name: 'Api',
    items: [
      {
        md: 'OpenAPI_Read',
        name: 'Read',
      },
      {
        md: 'OpenAPI_Validate',
        name: 'Validate',
      },
      {
        md: 'OpenAPI_Generate',
        name: 'Generate',
      },
      {
        md: 'Typescript_Write',
        name: 'Write',
      },
    ],
  },
]

export const docs = flatMap(sections, (section) => section.items)
