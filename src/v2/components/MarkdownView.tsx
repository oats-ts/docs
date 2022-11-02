import { css } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import { HiNoSymbol } from 'react-icons/hi2'
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

const container404Style = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
  text-align: center;
  font-size: ${theme.fontSize.l};
  color: ${theme.colors.muted};
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.l};
`

const icon404Style = css`
  font-size: 8rem;
`

export type MarkdownViewProps = {
  page?: keyof typeof markdown
}

const markdownKeys = Object.keys(markdown)

const customUriTransformer: Options['transformLinkUri'] = (uri: string) => {
  console.log({ uri })
  if (markdownKeys.some((key) => uri.startsWith(key))) {
    return `#/documentation/${uri}`
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
    return (
      <div className={container404Style}>
        <HiNoSymbol className={icon404Style} />
        <span>The documentation page you are looking for doesn't exist.</span>
      </div>
    )
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
