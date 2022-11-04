import { css } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import Markdown, { uriTransformer, Options } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { markdownPages } from '../markdownPages'
import { links } from '../links'
import { theme } from '../theme'
import { Code } from './Code'
import { Link } from './Link'
import { SyntaxHighlighter } from './SyntaxHighlighter'
import { Table, Td, Th, Tr } from './Table'

const h1Style = css`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.l};
  margin-top: ${theme.spacing.zero};
`
const h2Style = css`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.xm};
`
const h3Style = css`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
`
const containerStyle = css`
  margin: ${theme.spacing.l};
`

export type MarkdownViewProps = {
  content: string
}

const pages = Object.values(markdownPages)

const customUriTransformer: Options['transformLinkUri'] = (uri: string) => {
  const page = pages.find((page) => uri.startsWith(page.md))
  if (!isNil(page)) {
    return links.doc(page.md)
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

export const MarkdownView: FC<MarkdownViewProps> = ({ content }) => {
  return (
    <Markdown
      remarkPlugins={remarkPlugins}
      components={components}
      transformLinkUri={customUriTransformer}
      className={containerStyle}
    >
      {content ?? ''}
    </Markdown>
  )
}
