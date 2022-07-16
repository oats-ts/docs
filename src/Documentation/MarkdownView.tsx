import { isNil } from 'lodash'
import React, { FC } from 'react'
import Markdown, { uriTransformer, Options } from 'react-markdown'
import { Message } from 'semantic-ui-react'
import { Prism } from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'
import { markdown } from '../md/markdown'

export type MarkdownViewProps = {
  page?: keyof typeof markdown
}

const markdownKeys = Object.keys(markdown)

const customUriTransformer = (uri: string) => {
  if (markdownKeys.some((key) => uri.startsWith(key))) {
    console.log(uri)
    if (uri === 'Home') {
      return '#'
    }
    return `#/docs/${uri}`
  }
  return uriTransformer(uri)
}

const remarkPlugins: Options['remarkPlugins'] = [remarkGfm]
const components: Options['components'] = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <Prism
        style={undefined as any}
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
}

export const MarkdownView: FC<MarkdownViewProps> = ({ page }) => {
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
    <Markdown remarkPlugins={remarkPlugins} components={components} transformLinkUri={customUriTransformer}>
      {markdown[page]}
    </Markdown>
  )
}
