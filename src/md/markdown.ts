import { default as Home } from './Home.md'
import { default as Generate } from './Generate.md'
import { default as Read } from './Read.md'
import { default as Validate } from './Validate.md'
import { default as Workflow } from './Workflow.md'
import { default as Write } from './Write.md'
import { default as CustomGenerators } from './CustomGenerators.md'
import { default as GettingStarted } from './GettingStarted.md'
import { default as GeneratedSdk } from './GeneratedSdk.md'
import { default as GeneratedServer } from './GeneratedServer.md'
import { default as CommonMistakes } from './CommonMistakes.md'

export type MarkdowPageName = keyof typeof markdown

export const markdown = {
  Home,
  Generate,
  Read,
  Validate,
  Workflow,
  Write,

  GettingStarted,
  GeneratedSdk,
  GeneratedServer,
  CustomGenerators,
  CommonMistakes,
} as const
