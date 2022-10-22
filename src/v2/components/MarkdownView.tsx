import { css } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import Markdown, { uriTransformer, Options } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { markdown } from '../../md/markdown'
import { theme } from '../theme'
import { Link } from './Link'
import { SyntaxHighlighter } from './SyntaxHighlighter'

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

const codeStyle = css`
  font-size: ${theme.fontSize.code};
  color: ${theme.colors.text};
  background-color: ${theme.colors.dark1};
  padding: 2px 4px;
  border-radius: 6px;
`
const tableContainerStyle = css`
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid ${theme.colors.dark1};
  margin: 1px;
`

const tableStyle = css`
  border-collapse: collapse;
`

const headerRowStyle = css`
  background-color: ${theme.colors.dark1};
`

const tdStyle = css`
  padding: 10px;
`

const thStyle = css`
  color: ${theme.colors.text};
  padding: 18px 10px;
  text-align: left;
  border: 2px solid ${theme.colors.dark1};
`

const trStyle = css`
  border: 2px solid ${theme.colors.dark1};
  border-left-width: 0px;
  border-right-width: 0px;
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
    return (
      <div className={tableContainerStyle}>
        <table className={tableStyle}>{children}</table>
      </div>
    )
  },
  tr({ children, isHeader }) {
    return <tr className={isHeader ? headerRowStyle : trStyle}>{children}</tr>
  },
  th({ children }) {
    return <th className={thStyle}>{children}</th>
  },
  td({ children }) {
    return <td className={tdStyle}>{children}</td>
  },
  a({ href, children }) {
    return <Link href={href}>{children}</Link>
  },
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    if (match !== null && !inline) {
      return <SyntaxHighlighter language={match[1]}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
    }
    return (
      <code className={codeStyle} {...props}>
        {children}
      </code>
    )
  },
}

export const MarkdownView: FC<MarkdownViewProps> = ({ page }) => {
  if (isNil(page) || isNil(markdown[page])) {
    return <div>The documentation page you are looking for doesn't exist.</div>
  }
  return (
    <Markdown remarkPlugins={remarkPlugins} components={components} transformLinkUri={customUriTransformer}>
      {markdown[page]}
    </Markdown>
  )
}
