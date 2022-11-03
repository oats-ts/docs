import { isNil } from 'lodash'
import { useMemo } from 'react'
import { MarkdownPageName } from '../../../md/markdown'
import { DocumentationItem, DocumentationSection, sections } from '../../../md/sections'
import { useMarkdown } from './useMarkdown'

function getSection(page: MarkdownPageName): DocumentationSection | undefined {
  return sections.find((section) => section.items.some((item) => item.md === page))
}

function getIndex(page: MarkdownPageName, section: DocumentationSection): number {
  return section.items.findIndex((item) => item.md === page)
}

function getDocumentationItem(page: MarkdownPageName, transformIndex: 0 | 1 | -1 = 0): DocumentationItem | undefined {
  const section = getSection(page)
  if (isNil(section)) {
    return undefined
  }
  const index = getIndex(page, section) + transformIndex
  return section.items[index]
}

export function useNeighbours(): [DocumentationItem?, DocumentationItem?, DocumentationItem?] {
  const { page } = useMarkdown()
  const current = useMemo((): DocumentationItem | undefined => getDocumentationItem(page), [page])
  const previous = useMemo((): DocumentationItem | undefined => getDocumentationItem(page, -1), [page])
  const next = useMemo((): DocumentationItem | undefined => getDocumentationItem(page, 1), [page])
  return [previous, current, next]
}
