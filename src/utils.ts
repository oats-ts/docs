import { MainPageDescriptor, MarkdownPageDescriptor, PageDescriptor, SchemaItem } from './types'

export function isMarkdownPageDescriptor(page: PageDescriptor): page is MarkdownPageDescriptor {
  return Boolean((page as any).md)
}

export function isMainPageDescriptor(page: PageDescriptor): page is MainPageDescriptor {
  return !Boolean((page as any).md)
}

export function customSchemaItem(url: string): SchemaItem {
  return {
    url,
    name: 'Custom URL',
    description: `"${url}"`,
    provider: 'user-provided',
    image: 'https://oats-ts.github.io/docs/logo.png',
  }
}
