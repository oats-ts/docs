import { createContext, useContext } from 'react'
import { MarkdownPageName } from '../../../md/markdown'

export type MarkdownContextType = {
  content: string
  page: MarkdownPageName
}

export const MarkdownContext = createContext<MarkdownContextType>({
  content: '',
  page: 'Welcome',
})


export const useMarkdown = () => useContext(MarkdownContext)