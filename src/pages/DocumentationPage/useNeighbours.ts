import { isNil } from 'lodash'
import { useMemo } from 'react'
import { MarkdownPageName } from '../../md/markdown'
import { sections } from '../../md/sections'
import { DocumentationSection, MarkdownPageDescriptor } from '../../types'
import { useMarkdown } from './useMarkdown'

function getSection(page: MarkdownPageName): DocumentationSection | undefined {
  return sections.find((section) => section.items.some((item) => item.md === page))
}

function getIndex(page: MarkdownPageName, section: DocumentationSection): number {
  return section.items.findIndex((item) => item.md === page)
}

function getDocumentationItem(
  page: MarkdownPageName,
  transformIndex: 0 | 1 | -1 = 0,
): MarkdownPageDescriptor | undefined {
  const section = getSection(page)
  if (isNil(section)) {
    return undefined
  }
  const index = getIndex(page, section) + transformIndex
  return section.items[index]
}

export function useNeighbours(): [MarkdownPageDescriptor?, MarkdownPageDescriptor?, MarkdownPageDescriptor?] {
  const { page } = useMarkdown()
  const current = useMemo((): MarkdownPageDescriptor | undefined => getDocumentationItem(page), [page])
  const previous = useMemo((): MarkdownPageDescriptor | undefined => getDocumentationItem(page, -1), [page])
  const next = useMemo((): MarkdownPageDescriptor | undefined => getDocumentationItem(page, 1), [page])
  return [previous, current, next]
}
