import { mainPages } from './src/mainPages'
import { markdownPages } from './src/markdownPages'
import {
  VendorBundleType,
  MainPageDescriptor,
  MarkdownPageDescriptor,
  MainBundleType,
  MarkdownBundleType,
} from './src/types'

type _EntryObject<T extends string> = Record<T, { import: string; dependOn: string[] }>

export const mainEntryPoints = Object.values(mainPages).reduce(
  (entryPoints: _EntryObject<MainBundleType>, page: MainPageDescriptor): _EntryObject<MainBundleType> => ({
    ...entryPoints,
    [page.bundle]: { import: `./${page.importPath}`, dependOn: ['commonDeps'] },
  }),
  {} as _EntryObject<MainBundleType>,
)

export const markdownEntryPoints = Object.values(markdownPages).reduce(
  (entryPoints: _EntryObject<MarkdownBundleType>, page: MarkdownPageDescriptor): _EntryObject<MarkdownBundleType> => {
    return {
      ...entryPoints,
      [page.bundle]: { import: `./${page.importPath}`, dependOn: ['commonDeps'] },
    }
  },
  {} as _EntryObject<MarkdownBundleType>,
)

export const vendorEntryPoints: Record<VendorBundleType, string[]> = {
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

export const entryPoints = { ...mainEntryPoints, ...vendorEntryPoints, ...markdownEntryPoints }
