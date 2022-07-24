import { isNil } from 'lodash'
import React, { FC } from 'react'
import Markdown, { uriTransformer, Options } from 'react-markdown'
import { Message, Table } from 'semantic-ui-react'
import { Prism } from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'
import { markdown } from '../md/markdown'
import { ColorMode } from '../types'
import { useColorMode } from '../useColorMode'
import { vs, a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export type MarkdownViewProps = {
  page?: keyof typeof markdown
}

const markdownKeys = Object.keys(markdown)

const customUriTransformer = (uri: string) => {
  if (markdownKeys.some((key) => uri.startsWith(key))) {
    if (uri === 'Home') {
      return '#'
    }
    return `#/docs/${uri}`
  }
  return uriTransformer(uri)
}

const remarkPlugins: Options['remarkPlugins'] = [remarkGfm]
const components = (colorMode: ColorMode): Options['components'] => ({
  table({ className, children }) {
    return (
      <Table celled striped className={className}>
        {children}
      </Table>
    )
  },
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <Prism
        style={(colorMode === 'dark' ? a11yDark : vs) as any}
        children={String(children).replace(/\n$/, '')}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
})

export const MarkdownView: FC<MarkdownViewProps> = ({ page }) => {
  const { colorMode } = useColorMode()
  if (isNil(page) || isNil(markdown[page])) {
    return (
      <Message
        icon="exclamation triangle"
        size="large"
        header="404"
        content="The documentation page you are looking for doesn't exist."
      />
    )
  }
  return (
    <Markdown remarkPlugins={remarkPlugins} components={components(colorMode)} transformLinkUri={customUriTransformer}>
      {markdown[page]}
    </Markdown>
  )
}
