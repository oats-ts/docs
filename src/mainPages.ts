import { MainPageDescriptor } from './types'

const indexPage: MainPageDescriptor = {
  bundle: 'index',
  name: 'Oats',
  description: 'Generate TypeScript from OpenAPI, that makes sense.',
  importPath: 'src/bundles/LandingPageBundle.tsx',
}

const documentationPage: MainPageDescriptor = {
  bundle: 'documentation',
  name: 'Oats - Documentation',
  description: 'Oats documentation page',
  importPath: 'src/bundles/DocumentationBundle.tsx',
}

const editorPage: MainPageDescriptor = {
  bundle: 'editor',
  name: 'Oats - Config editor',
  description: 'Oats configuration editor tool',
  importPath: 'src/bundles/ConfigurationEditorPageBundle.tsx',
}
const notFoundPage: MainPageDescriptor = {
  bundle: 'notFound',
  name: 'Oats - 404',
  description: "The page doesn't exist",
  importPath: 'src/bundles/NotFoundPageBundle.tsx',
}

export const mainPages = {
  indexPage,
  editorPage,
  documentationPage,
  notFoundPage,
} as const
