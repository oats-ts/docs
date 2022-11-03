export type MarkdownData = {
  fileName: string
  varName: string
}
export const MARKDOWN_ENUM_FILE = 'src/md/markdown.ts'
export const MARKDOWN_BUNDLES_FOLDER = 'src/v2/pages/bundles/documentation'
export const MARKDOWN_BUNDLE_FILE = (name: string) => `${MARKDOWN_BUNDLES_FOLDER}/DocumentationBundle_${name}.tsx`
