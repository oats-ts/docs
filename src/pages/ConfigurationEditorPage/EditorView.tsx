import { isNil } from 'lodash'
import React, { FC } from 'react'
import { HiDocument } from 'react-icons/hi2'
import { NotFoundPage } from '../../components/NotFoundPage'
import { SyntaxHighlighter } from '../../components/SyntaxHighlighter'
import { useGeneratorContext } from '../../model/useGenerator'
import { ConfigurationEditor } from './ConfigurationEditor/ConfigurationEditor'
import { IssuesPanel } from './IssuesPanel'

export const EditorView: FC = () => {
  const { editorInput, isLoading } = useGeneratorContext()

  if (isNil(editorInput)) {
    return <NotFoundPage icon={HiDocument} text="Loading..." />
  }
  switch (editorInput?.type) {
    case 'file': {
      return (
        <SyntaxHighlighter host="editor" language="typescript" theme="dark">
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
        <SyntaxHighlighter host="editor" language="typescript" theme="dark">
          {editorInput.source}
        </SyntaxHighlighter>
      )
    }
    case 'package-json': {
      return (
        <SyntaxHighlighter host="editor" language="json" theme="dark">
          {editorInput.source}
        </SyntaxHighlighter>
      )
    }
    case 'folder': {
      throw new TypeError(`Unexpected input of type "${editorInput.type}"`)
    }
    default:
      return <NotFoundPage icon={HiDocument} text="Loading..." />
  }
}
