export const markdown = {
  CommonMistakes: 'CommonMistakes',
  CustomGenerators: 'CustomGenerators',
  Generate: 'Generate',
  GettingStarted: 'GettingStarted',
  Home: 'Home',
  Read: 'Read',
  SdkErrorHandling: 'SdkErrorHandling',
  SdkGettingStarted: 'SdkGettingStarted',
  SdkTypes: 'SdkTypes',
  SdkUsage: 'SdkUsage',
  ServerApiImpl: 'ServerApiImpl',
  ServerCors: 'ServerCors',
  ServerGettingStarted: 'ServerGettingStarted',
  ServerSetup: 'ServerSetup',
  ServerTypes: 'ServerTypes',
  Validate: 'Validate',
  Welcome: 'Welcome',
  Workflow: 'Workflow',
  Write: 'Write',
} as const

export type MarkdownPageName = keyof typeof markdown
