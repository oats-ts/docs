import { default as Home } from './Home.md'
import { default as OpenAPI_Generator } from './OpenAPI_Generator.md'
import { default as OpenAPI_Reader } from './OpenAPI_Reader.md'
import { default as OpenAPI_Validator } from './OpenAPI_Validator.md'
import { default as OpenAPI_Workflow } from './OpenAPI_Workflow.md'
import { default as Typescript_Writer } from './Typescript_Writer.md'

export type MarkdowPageName = keyof typeof markdown

export const markdown = {
  Home,
  OpenAPI_Generator,
  OpenAPI_Reader,
  OpenAPI_Validator,
  OpenAPI_Workflow,
  Typescript_Writer,
} as const
