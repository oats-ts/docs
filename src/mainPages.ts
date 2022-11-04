import { MainPageDescriptor } from './types'

const indexPage: MainPageDescriptor = {
  bundle: 'index',
  name: 'Oats',
  description: 'Oats index page',
  importPath: 'src/v2/pages/bundles/LandingPageBundle.tsx',
}

const documentationPage: MainPageDescriptor = {
  bundle: 'documentation',
  name: 'Oats - Documentation',
  description: 'Oats documentation page',
  importPath: 'src/v2/pages/bundles/DocumentationBundle.tsx',
}

const editorPage: MainPageDescriptor = {
  bundle: 'editor',
  name: 'Oats - Config editor',
  description: 'Oats configuration editor tool',
  importPath: 'src/v2/pages/bundles/ConfigurationEditorPageBundle.tsx',
}
const notFoundPage: MainPageDescriptor = {
  bundle: 'notFound',
  name: 'Oats - 404',
  description: "The page doesn't exist",
  importPath: 'src/v2/pages/bundles/NotFoundPageBundle.tsx',
}

export const mainPages = {
  indexPage,
  editorPage,
  documentationPage,
  notFoundPage
} as const
