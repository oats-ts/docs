export const markdown = {
  CustomGenerators: 'CustomGenerators',
  Generate: 'Generate',
  OpenAPI101: 'OpenAPI101',
  Read: 'Read',
  SdkErrorHandling: 'SdkErrorHandling',
  SdkGettingStarted: 'SdkGettingStarted',
  SdkPublish: 'SdkPublish',
  SdkTypes: 'SdkTypes',
  SdkUsage: 'SdkUsage',
  ServerApiExample: 'ServerApiExample',
  ServerCors: 'ServerCors',
  ServerGettingStarted: 'ServerGettingStarted',
  ServerSetup: 'ServerSetup',
  ServerTypes: 'ServerTypes',
  Validate: 'Validate',
  Welcome: 'Welcome',
  Write: 'Write',
} as const

export type MarkdownPageName = keyof typeof markdown
