import { css } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import Markdown, { uriTransformer, Options } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { markdown } from '../../md/markdown'
import { theme } from '../theme'
import { Code } from './Code'
import { Link } from './Link'
import { SyntaxHighlighter } from './SyntaxHighlighter'
import { Table, Td, Th, Tr } from './Table'

const h1Style = css`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.l};
  margin-top: 0px;
`
const h2Style = css`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
`
const h3Style = css`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
`
const containerStyle = css`
  margin: 14px;
`

export type MarkdownViewProps = {
  page?: keyof typeof markdown
}

const markdownKeys = Object.keys(markdown)

const customUriTransformer: Options['transformLinkUri'] = (uri: string) => {
  if (markdownKeys.some((key) => uri.startsWith(key))) {
    if (uri === 'Home') {
      return '#'
    }
    return `#/docs/${uri}`
  }
  return uriTransformer(uri)
}

const remarkPlugins: Options['remarkPlugins'] = [remarkGfm]

const components: Options['components'] = {
  h1({ children }) {
    return <h1 className={h1Style}>{children}</h1>
  },
  h2({ children }) {
    return <h2 className={h2Style}>{children}</h2>
  },
  h3({ children }) {
    return <h3 className={h3Style}>{children}</h3>
  },
  table({ children }) {
    return <Table>{children}</Table>
  },
  tr({ children, isHeader }) {
    return <Tr isHeader={isHeader}>{children}</Tr>
  },
  th({ children }) {
    return <Th>{children}</Th>
  },
  td({ children }) {
    return <Td>{children}</Td>
  },
  a({ href, children }) {
    return <Link href={href}>{children}</Link>
  },
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    if (match !== null && !inline) {
      return (
        <SyntaxHighlighter language={match[1]} kind="docs">
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      )
    }
    return <Code {...props}>{children}</Code>
  },
}

export const MarkdownView: FC<MarkdownViewProps> = ({ page }) => {
  if (isNil(page) || isNil(markdown[page])) {
    return <div>The documentation page you are looking for doesn't exist.</div>
  }
  return (
    <Markdown
      remarkPlugins={remarkPlugins}
      components={components}
      transformLinkUri={customUriTransformer}
      className={containerStyle}
    >
      {markdown[page]}
    </Markdown>
  )
}
