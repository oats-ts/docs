import { MarkdownPageDescriptor } from './types'

const commonMistakesPage: MarkdownPageDescriptor = {
  bundle: 'documentation-CommonMistakes',
  name: 'Common mistakes',
  description:
    'OpenAPI it is an extremely loosely defined spec, that in turn lets you define your API and your schemas in many different ways. In this article Im listing the most common mistakes that you can make, that doesnt make your OpenAPI document invalid, but effectively prevents tooling from outputing usable documentation or code.',
  importPath: 'src/bundles/documentation/DocumentationBundle_CommonMistakes.tsx',
  md: 'CommonMistakes',
}

const customGeneratorsPage: MarkdownPageDescriptor = {
  bundle: 'documentation-CustomGenerators',
  name: 'Custom Generators',
  description: 'Documentation is in progress.',
  importPath: 'src/bundles/documentation/DocumentationBundle_CustomGenerators.tsx',
  md: 'CustomGenerators',
}

const generatePage: MarkdownPageDescriptor = {
  bundle: 'documentation-Generate',
  name: 'Generate',
  description:
    'The generator step is responsible for taking the validated output of the [reader](OpenAPI-Reader), and turning it into an intermediate representation (Typescript [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) in this case), that can be then turned into source code. The OpenAPI generator itself doesnt do much, the work is distributed to single responsiblity generators, that are responsible for generating one thing (like types from the JSON schemas, or serializers for parameters). They also provide means for other generators to access references to their generated content.',
  importPath: 'src/bundles/documentation/DocumentationBundle_Generate.tsx',
  md: 'Generate',
}

const gettingStartedPage: MarkdownPageDescriptor = {
  bundle: 'documentation-GettingStarted',
  name: 'Getting Started',
  description: 'In this guide youll learn how to set up and generate with Oats.',
  importPath: 'src/bundles/documentation/DocumentationBundle_GettingStarted.tsx',
  md: 'GettingStarted',
}

const homePage: MarkdownPageDescriptor = {
  bundle: 'documentation-Home',
  name: '\uD83C\uDF31 oats',
  description:
    'This project aims to provide a solution for generating quality Typescript code from API-describing documents. The only supported format currently is [OpenAPI 3.x](https://www.openapis.org), but there are plans to introduce generators for [AsyncAPI](https://www.asyncapi.com/) as well.',
  importPath: 'src/bundles/documentation/DocumentationBundle_Home.tsx',
  md: 'Home',
}

const readPage: MarkdownPageDescriptor = {
  bundle: 'documentation-Read',
  name: 'Read',
  description: 'The reader step is responsible for',
  importPath: 'src/bundles/documentation/DocumentationBundle_Read.tsx',
  md: 'Read',
}

const sdkErrorHandlingPage: MarkdownPageDescriptor = {
  bundle: 'documentation-SdkErrorHandling',
  name: 'Error handling',
  description:
    'Oats generated SDKs dont `throw` (or rather reject, as we are dealing with `Promise`s), unless the response is invalid according to the source OpenAPI document.',
  importPath: 'src/bundles/documentation/DocumentationBundle_SdkErrorHandling.tsx',
  md: 'SdkErrorHandling',
}

const sdkGettingStartedPage: MarkdownPageDescriptor = {
  bundle: 'documentation-SdkGettingStarted',
  name: 'Getting started (SDK)',
  description:
    'In this guide youll learn how to generate an SDK and (necessary related code) based on your OpenAPI document. As for all examples, we are going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example (so its recommended you try using this first, if you are unfamiliar with Oats)!',
  importPath: 'src/bundles/documentation/DocumentationBundle_SdkGettingStarted.tsx',
  md: 'SdkGettingStarted',
}

const sdkTypesPage: MarkdownPageDescriptor = {
  bundle: 'documentation-SdkTypes',
  name: 'SDK related types',
  description:
    'This guide will showcase the main types generated for the client side. A big chunk of the generated types is the same as for the server side (JSON schema based types and parameter types), so in this chapter Im highlighting the differences.',
  importPath: 'src/bundles/documentation/DocumentationBundle_SdkTypes.tsx',
  md: 'SdkTypes',
}

const sdkUsagePage: MarkdownPageDescriptor = {
  bundle: 'documentation-SdkUsage',
  name: 'SDK usage',
  description:
    'To start using the SDK, you will need an implementation of the previously described SDK type. Oats generates an SDK implementation class (`BookStoreSdkImpl` in our case), that you can find next to the SDK type (in `src/generated/sdk`).',
  importPath: 'src/bundles/documentation/DocumentationBundle_SdkUsage.tsx',
  md: 'SdkUsage',
}

const serverApiImplPage: MarkdownPageDescriptor = {
  bundle: 'documentation-ServerApiImpl',
  name: 'Example API implementation',
  description:
    'Lets go back to `BookStoreApiImpl` and implement some simple logic. In this guide Im going to store data in memory, but since all API methods return `Promise`s, you can use whatever data storage you choose.',
  importPath: 'src/bundles/documentation/DocumentationBundle_ServerApiImpl.tsx',
  md: 'ServerApiImpl',
}

const serverCorsPage: MarkdownPageDescriptor = {
  bundle: 'documentation-ServerCors',
  name: 'Implement CORS',
  description: 'In this guide youll learn how to make your Oats+express based server CORS enabled.',
  importPath: 'src/bundles/documentation/DocumentationBundle_ServerCors.tsx',
  md: 'ServerCors',
}

const serverGettingStartedPage: MarkdownPageDescriptor = {
  bundle: 'documentation-ServerGettingStarted',
  name: 'Getting started (Server)',
  description:
    'This guide will help you getting started with generating server side code using Oats. As for all examples, we are going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example (so its recommended you try using this first, if you are unfamiliar with Oats)!',
  importPath: 'src/bundles/documentation/DocumentationBundle_ServerGettingStarted.tsx',
  md: 'ServerGettingStarted',
}

const serverSetupPage: MarkdownPageDescriptor = {
  bundle: 'documentation-ServerSetup',
  name: 'Express server setup',
  description:
    'Before we write any business logic, lets create a functional server that exposes the appropriate endpoints, and we can test it locally. This involves the following steps:',
  importPath: 'src/bundles/documentation/DocumentationBundle_ServerSetup.tsx',
  md: 'ServerSetup',
}

const serverTypesPage: MarkdownPageDescriptor = {
  bundle: 'documentation-ServerTypes',
  name: 'Server types',
  description:
    'This guide will showcase the main types generated for the server side. A big chunk of the generated types is the same as for the client side (JSON schema based types and parameter types), so in this chapter Im highlighting the differences.',
  importPath: 'src/bundles/documentation/DocumentationBundle_ServerTypes.tsx',
  md: 'ServerTypes',
}

const validatePage: MarkdownPageDescriptor = {
  bundle: 'documentation-Validate',
  name: 'Validate',
  description:
    'The valididator step is responsible for taking the output of the [reader](OpenAPI-Reader) step, and checking for structural and semantic errors.',
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

const workflowPage: MarkdownPageDescriptor = {
  bundle: 'documentation-Workflow',
  name: 'Workflow',
  description: 'This guide will walk you through on how to get started with oats and OpenAPI.',
  importPath: 'src/bundles/documentation/DocumentationBundle_Workflow.tsx',
  md: 'Workflow',
}

const writePage: MarkdownPageDescriptor = {
  bundle: 'documentation-Write',
  name: 'Write',
  description:
    'The writer step is responsible for taking the output of the [generator step](OpenAPI-Generator) and writing its outputs to the disk. The typescript writer takes typescript `SourceFile`s (this is Typescripts in-memory representation of an AST + file location) and writes them to the desired location.',
  importPath: 'src/bundles/documentation/DocumentationBundle_Write.tsx',
  md: 'Write',
}

export const markdownPages = {
  commonMistakesPage,
  customGeneratorsPage,
  generatePage,
  gettingStartedPage,
  homePage,
  readPage,
  sdkErrorHandlingPage,
  sdkGettingStartedPage,
  sdkTypesPage,
  sdkUsagePage,
  serverApiImplPage,
  serverCorsPage,
  serverGettingStartedPage,
  serverSetupPage,
  serverTypesPage,
  validatePage,
  welcomePage,
  workflowPage,
  writePage,
} as const
