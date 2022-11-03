import { EntryObject } from 'webpack'
import { MARKDOWN_BUNDLE_FILE } from './markdownCommon'
import { markdown, MarkdownPageName } from './src/md/markdown'

export type OwnBundleName = 'index' | 'editor' | 'documentation'
export type MdBundleName = `documentation-${MarkdownPageName}`
export type VendorBundleName = 'commonDeps' //| 'editorDeps'
export type BundleName = OwnBundleName | VendorBundleName | MdBundleName

export type OwnEntryDescription = EntryObject[string] & {
  dependOn: VendorBundleName[]
}

export const ownEntryPoints: Record<OwnBundleName, OwnEntryDescription> = {
  index: {
    import: './src/v2/pages/bundles/LandingPageBundle.tsx',
    dependOn: ['commonDeps'],
  },
  documentation: {
    import: './src/v2/pages/bundles/DocumentationBundle',
    dependOn: ['commonDeps'],
  },
  editor: {
    import: './src/v2/pages/bundles/ConfigurationEditorPageBundle.tsx',
    dependOn: ['commonDeps'],
  },
}

export const markdownEntryPoints: Record<MdBundleName, OwnEntryDescription> = Object.values(markdown).reduce(
  (cfg, page): Record<MdBundleName, OwnEntryDescription> => {
    const descriptor: OwnEntryDescription = {
      import: `./${MARKDOWN_BUNDLE_FILE(page)}`,
      dependOn: ['commonDeps'],
    }
    return { ...cfg, [`documentation-${page}`]: descriptor }
  },
  {} as Record<MdBundleName, OwnEntryDescription>,
)

export const ownBundles = Object.keys(ownEntryPoints) as OwnBundleName[]

export const vendorEntryPoints: Record<VendorBundleName, string[]> = {
  commonDeps: [
    'react',
    'react-dom',
    'react-dom/client',
    '@emotion/react',
    '@emotion/css',
    '@oats-ts/oats-ts',
    'lodash',
    'react-icons/hi2',
    'react-icons',
    'react-markdown',
    'remark-gfm',
    'react-router-dom',
    'react-syntax-highlighter',
    'react-syntax-highlighter/dist/esm/styles/prism',
    'react-copy-to-clipboard',
  ],
}

export const entryPoints = { ...ownEntryPoints, ...vendorEntryPoints, ...markdownEntryPoints }
