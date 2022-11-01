import { default as CommonMistakes } from './CommonMistakes.md'
import { default as CustomGenerators } from './CustomGenerators.md'
import { default as Generate } from './Generate.md'
import { default as GettingStarted } from './GettingStarted.md'
import { default as Home } from './Home.md'
import { default as Read } from './Read.md'
import { default as SdkErrorHandling } from './SdkErrorHandling.md'
import { default as SdkGenerate } from './SdkGenerate.md'
import { default as SdkTypes } from './SdkTypes.md'
import { default as SdkUsage } from './SdkUsage.md'
import { default as ServerApiImpl } from './ServerApiImpl.md'
import { default as ServerCors } from './ServerCors.md'
import { default as ServerGenerate } from './ServerGenerate.md'
import { default as ServerSetup } from './ServerSetup.md'
import { default as ServerTypes } from './ServerTypes.md'
import { default as Validate } from './Validate.md'
import { default as Workflow } from './Workflow.md'
import { default as Write } from './Write.md'

export const markdown = {
  CommonMistakes,
  CustomGenerators,
  Generate,
  GettingStarted,
  Home,
  Read,
  SdkErrorHandling,
  SdkGenerate,
  SdkTypes,
  SdkUsage,
  ServerApiImpl,
  ServerCors,
  ServerGenerate,
  ServerSetup,
  ServerTypes,
  Validate,
  Workflow,
  Write,
} as const

export type MarkdownPageName = keyof typeof markdown
