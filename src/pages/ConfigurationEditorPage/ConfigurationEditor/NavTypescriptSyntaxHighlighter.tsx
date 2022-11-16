import React, { FC } from 'react'
import { SyntaxHighlighter } from '../../../components/SyntaxHighlighter'
import { useTypescriptRenderer } from './useTypescriptRenderer'

type NavTypescriptSyntaxHighlighterProps = {
  ownPath: string
  source: string
}

export const NavTypescriptSyntaxHighlighter: FC<NavTypescriptSyntaxHighlighterProps> = ({ ownPath, source }) => {
  const renderer = useTypescriptRenderer(ownPath, source)

  return (
    <SyntaxHighlighter host="editor" language="typescript" theme="dark" renderer={renderer}>
      {source}
    </SyntaxHighlighter>
  )
}
