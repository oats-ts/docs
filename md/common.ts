export type MarkdownData = {
  fileName: string
  varName: string
  title: string
  description: string
}
export const MARKDOWN_FOLDER = 'src/md'
export const MARKDOWN_EXTENSION = '.md'
export const MARKDOWN_ENUM_FILE = 'src/md/markdown.ts'
export const MARKDOWN_PAGES_FILE = 'src/markdownPages.ts'
export const MARKDOWN_BUNDLES_FOLDER = 'src/v2/pages/bundles/documentation'
export const markdownBundleFile = (name: string) => `${MARKDOWN_BUNDLES_FOLDER}/DocumentationBundle_${name}.tsx`
