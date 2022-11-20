export type MarkdownData = {
  fileName: string
  varName: string
  title: string
  description: string
}
export const MARKDOWN_FOLDER = 'src/md'
export const QUICKSTART_FOLDER = 'src/pages/LandingPage/md'
export const QUICKSTART_MD_FILE = 'src/pages/LandingPage/md/quickStart.ts'
export const MARKDOWN_EXTENSION = '.md'
export const MARKDOWN_ENUM_FILE = 'src/md/markdown.ts'
export const MARKDOWN_PAGES_FILE = 'src/markdownPages.ts'
export const MARKDOWN_BUNDLES_FOLDER = 'src/bundles/documentation'
export const markdownBundleFile = (name: string) => `${MARKDOWN_BUNDLES_FOLDER}/DocumentationBundle_${name}.tsx`
