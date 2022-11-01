import { default as CommonMistakes } from './CommonMistakes.md'
import { default as CustomGenerators } from './CustomGenerators.md'
import { default as Generate } from './Generate.md'
import { default as GeneratedSdk } from './GeneratedSdk.md'
import { default as GeneratedServer } from './GeneratedServer.md'
import { default as GettingStarted } from './GettingStarted.md'
import { default as Home } from './Home.md'
import { default as Read } from './Read.md'
import { default as Validate } from './Validate.md'
import { default as Workflow } from './Workflow.md'
import { default as Write } from './Write.md'

export const markdown = {
  CommonMistakes,
  CustomGenerators,
  Generate,
  GeneratedSdk,
  GeneratedServer,
  GettingStarted,
  Home,
  Read,
  Validate,
  Workflow,
  Write,
} as const

export type MarkdownPageName = keyof typeof markdown
