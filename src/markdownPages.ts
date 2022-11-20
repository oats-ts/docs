import { MarkdownPageDescriptor } from './types'

const customGeneratorsPage: MarkdownPageDescriptor = {
  bundle: 'documentation-CustomGenerators',
  name: 'Custom Generators',
  description: "In this guide you'll learn how to create custom generators using Oats",
  importPath: 'src/bundles/documentation/DocumentationBundle_CustomGenerators.tsx',
  md: 'CustomGenerators',
}

const generatePage: MarkdownPageDescriptor = {
  bundle: 'documentation-Generate',
  name: 'Generate',
  description: "In this guide you'll learn how the generator step works.",
  importPath: 'src/bundles/documentation/DocumentationBundle_Generate.tsx',
  md: 'Generate',
}

const openApi101Page: MarkdownPageDescriptor = {
  bundle: 'documentation-OpenAPI101',
  name: 'OpenAPI 101',
  description: "In this guide I'll share some DOs and DON'Ts, when constructing an OpenAPI document.",
  importPath: 'src/bundles/documentation/DocumentationBundle_OpenAPI101.tsx',
  md: 'OpenAPI101',
}

const readPage: MarkdownPageDescriptor = {
  bundle: 'documentation-Read',
  name: 'Read',
  description: "In this guide you'll learn how the reader step works.",
  importPath: 'src/bundles/documentation/DocumentationBundle_Read.tsx',
  md: 'Read',
}

const sdkErrorHandlingPage: MarkdownPageDescriptor = {
  bundle: 'documentation-SdkErrorHandling',
  name: 'Error handling',
  description: "In this example you'll learn the recommended approach to handle errors when using the generated SDK.",
  importPath: 'src/bundles/documentation/DocumentationBundle_SdkErrorHandling.tsx',
  md: 'SdkErrorHandling',
}

const sdkGettingStartedPage: MarkdownPageDescriptor = {
  bundle: 'documentation-SdkGettingStarted',
  name: 'Getting started',
  description:
    "In this guide you'll learn how to generate an SDK and (necessary related code) based on your OpenAPI document.",
  importPath: 'src/bundles/documentation/DocumentationBundle_SdkGettingStarted.tsx',
  md: 'SdkGettingStarted',
}

const sdkTypesPage: MarkdownPageDescriptor = {
  bundle: 'documentation-SdkTypes',
  name: 'SDK related types',
  description: 'This guide will showcase the main types generated for the client side.',
  importPath: 'src/bundles/documentation/DocumentationBundle_SdkTypes.tsx',
  md: 'SdkTypes',
}

const sdkUsagePage: MarkdownPageDescriptor = {
  bundle: 'documentation-SdkUsage',
  name: 'SDK usage',
  description: "In this guide you'll learn the basic usage of the generated SDK.",
  importPath: 'src/bundles/documentation/DocumentationBundle_SdkUsage.tsx',
  md: 'SdkUsage',
}

const serverApiExamplePage: MarkdownPageDescriptor = {
  bundle: 'documentation-ServerApiExample',
  name: 'Example API',
  description: "In this guide you'll see a basic API implementation using the book store example.",
  importPath: 'src/bundles/documentation/DocumentationBundle_ServerApiExample.tsx',
  md: 'ServerApiExample',
}

const serverCorsPage: MarkdownPageDescriptor = {
  bundle: 'documentation-ServerCors',
  name: 'Implement CORS',
  description: "In this guide you'll learn how to make your Oats and express based server CORS enabled.",
  importPath: 'src/bundles/documentation/DocumentationBundle_ServerCors.tsx',
  md: 'ServerCors',
}

const serverGettingStartedPage: MarkdownPageDescriptor = {
  bundle: 'documentation-ServerGettingStarted',
  name: 'Getting started',
  description: 'This guide will help you getting started with generating server side code using Oats.',
  importPath: 'src/bundles/documentation/DocumentationBundle_ServerGettingStarted.tsx',
  md: 'ServerGettingStarted',
}

const serverSetupPage: MarkdownPageDescriptor = {
  bundle: 'documentation-ServerSetup',
  name: 'Express server setup',
  description:
    "In this guide you'll learn how to set up generated Oats code with your existing [express](https://expressjs.com) backend.",
  importPath: 'src/bundles/documentation/DocumentationBundle_ServerSetup.tsx',
  md: 'ServerSetup',
}

const serverTypesPage: MarkdownPageDescriptor = {
  bundle: 'documentation-ServerTypes',
  name: 'Server types',
  description: 'This guide will showcase the main types generated for the server side.',
  importPath: 'src/bundles/documentation/DocumentationBundle_ServerTypes.tsx',
  md: 'ServerTypes',
}

const validatePage: MarkdownPageDescriptor = {
  bundle: 'documentation-Validate',
  name: 'Validate',
  description: "In this guide you'll learn how the validator step works.",
  importPath: 'src/bundles/documentation/DocumentationBundle_Validate.tsx',
  md: 'Validate',
}

const welcomePage: MarkdownPageDescriptor = {
  bundle: 'documentation-Welcome',
  name: 'Welcome to the docs!',
  description:
    'Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.',
  importPath: 'src/bundles/documentation/DocumentationBundle_Welcome.tsx',
  md: 'Welcome',
}

const writePage: MarkdownPageDescriptor = {
  bundle: 'documentation-Write',
  name: 'Write',
  description: "In this guide you'll learn how the writer step works.",
  importPath: 'src/bundles/documentation/DocumentationBundle_Write.tsx',
  md: 'Write',
}

export const markdownPages = {
  customGeneratorsPage,
  generatePage,
  openApi101Page,
  readPage,
  sdkErrorHandlingPage,
  sdkGettingStartedPage,
  sdkTypesPage,
  sdkUsagePage,
  serverApiExamplePage,
  serverCorsPage,
  serverGettingStartedPage,
  serverSetupPage,
  serverTypesPage,
  validatePage,
  welcomePage,
  writePage,
} as const
