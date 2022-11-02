import { useParams } from 'react-router-dom'
import { MarkdownPageName } from '../../../md/markdown'

export function useMarkdownPage(): MarkdownPageName {
  const { page = 'Welcome' } = useParams<{ page: MarkdownPageName }>()
  return page
}
