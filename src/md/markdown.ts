import { default as Home } from './Home.md'
import { default as OpenAPI_Generate } from './OpenAPI_Generate.md'
import { default as OpenAPI_Read } from './OpenAPI_Read.md'
import { default as OpenAPI_Validate } from './OpenAPI_Validate.md'
import { default as OpenAPI_Workflow } from './OpenAPI_Workflow.md'
import { default as Typescript_Write } from './Typescript_Write.md'

export type MarkdowPageName = keyof typeof markdown

export const markdown = {
  Home,
  OpenAPI_Generate,
  OpenAPI_Read,
  OpenAPI_Validate,
  OpenAPI_Workflow,
  Typescript_Write,
} as const
