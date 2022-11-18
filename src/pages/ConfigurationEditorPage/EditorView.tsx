import { isNil } from 'lodash'
import React, { FC } from 'react'
import { HiDocument, HiLink } from 'react-icons/hi2'
import { NotFoundPage } from '../../components/NotFoundPage'
import { SyntaxHighlighter } from '../../components/SyntaxHighlighter'
import { useGeneratorContext } from '../../model/useGenerator'
import { ConfigurationEditor } from './ConfigurationEditor/ConfigurationEditor'
import { NavTypescriptSyntaxHighlighter } from './NavTypescriptSyntaxHighlighter'
import { IssuesPanel } from './IssuesPanel'

export const EditorView: FC = () => {
  const { editorInput, isLoading } = useGeneratorContext()
  if (isNil(editorInput)) {
    return <NotFoundPage icon={HiDocument} text="Loading..." />
  }
  switch (editorInput?.type) {
    case 'file': {
      return <NavTypescriptSyntaxHighlighter source={editorInput.content} ownPath={editorInput.path} />
    }
    case 'issues': {
      return <IssuesPanel isLoading={isLoading} node={editorInput} />
    }
    case 'configuration': {
      return <ConfigurationEditor />
    }
    case 'oats.js': {
      return <NavTypescriptSyntaxHighlighter source={editorInput.source} ownPath="/" />
    }
    case 'package.json': {
      return (
        <SyntaxHighlighter host="editor" language="json" theme="dark">
          {editorInput.source}
        </SyntaxHighlighter>
      )
    }
    case 'folder': {
      throw new TypeError(`Unexpected input of type "${editorInput.type}"`)
    }
    case '404': {
      return <NotFoundPage icon={HiLink} text="404 - The page doesn't exist" logo={true} />
    }
    default:
      return <NotFoundPage icon={HiDocument} text="Loading..." />
  }
}
