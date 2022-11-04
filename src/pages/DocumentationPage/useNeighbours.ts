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
  section: DocumentationSection | undefined,
  page: MarkdownPageName,
  transformIndex: 0 | 1 | -1 = 0,
): MarkdownPageDescriptor | undefined {
  if (isNil(section) || (transformIndex !== 0 && !section.useNavigation)) {
    return undefined
  }
  const index = getIndex(page, section) + transformIndex
  return section.items[index]
}

export function useNeighbours(): [MarkdownPageDescriptor?, MarkdownPageDescriptor?, MarkdownPageDescriptor?] {
  const { page } = useMarkdown()
  const section = useMemo(() => getSection(page), [page])
  const current = useMemo(
    (): MarkdownPageDescriptor | undefined => getDocumentationItem(section, page),
    [page, section],
  )
  const previous = useMemo(
    (): MarkdownPageDescriptor | undefined => getDocumentationItem(section, page, -1),
    [page, section],
  )
  const next = useMemo(
    (): MarkdownPageDescriptor | undefined => getDocumentationItem(section, page, 1),
    [page, section],
  )
  return [previous, current, next]
}
