import { MainPageDescriptor, MarkdownPageDescriptor, PageDescriptor } from './types'

export function isMarkdownPageDescriptor(page: PageDescriptor): page is MarkdownPageDescriptor {
  return Boolean((page as any).md)
}

export function isMainPageDescriptor(page: PageDescriptor): page is MainPageDescriptor {
  return !Boolean((page as any).md)
}
