import isNil from 'lodash/isNil'
import React, { FC } from 'react'
import { SyntaxHighlighter } from '../../components/SyntaxHighlighter'
import { useGeneratorContext } from '../../model/useGenerator'
import { ConfigurationEditor } from './ConfigurationEditor/ConfigurationEditor'
import { IssuesPanel } from './IssuesPanel'
import { NoEditor } from './NoEditor'

export const EditorView: FC = () => {
  const { editorInput, isLoading } = useGeneratorContext()

  if (isNil(editorInput)) {
    return <NoEditor />
  }
  switch (editorInput?.type) {
    case 'file': {
      return (
        <SyntaxHighlighter kind="editor" language="typescript">
          {editorInput.content}
        </SyntaxHighlighter>
      )
    }
    case 'issues': {
      return <IssuesPanel isLoading={isLoading} node={editorInput} />
    }
    case 'configuration': {
      return <ConfigurationEditor />
    }
    case 'generator-source': {
      return (
        <SyntaxHighlighter kind="editor" language="typescript">
          {editorInput.source}
        </SyntaxHighlighter>
      )
    }
    case 'package-json': {
      return (
        <SyntaxHighlighter kind="editor" language="json">
          {editorInput.source}
        </SyntaxHighlighter>
      )
    }
    case 'folder': {
      throw new TypeError(`Unexpected input of type "${editorInput.type}"`)
    }
    default:
      return <NoEditor />
  }
}
