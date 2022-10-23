import isNil from 'lodash/isNil'
import React, { FC } from 'react'
import { useGeneratorContext } from '../../model/useGenerator'
import { NoEditor } from './NoEditor'
import { ReadonlyTypescriptEditor } from './ReadonlyTypescriptEditor'

export const EditorView: FC = () => {
  const { editorInput, isLoading } = useGeneratorContext()

  if (isNil(editorInput)) {
    return <NoEditor />
  }
  switch (editorInput?.type) {
    case 'file': {
      return <ReadonlyTypescriptEditor input={editorInput} isLoading={isLoading} />
    }
    // case 'configuration': {
    //   return <ConfigurationEditorWrapper />
    // }
    // case 'issues': {
    //   return <IssuesPanel isLoading={isLoading} isDark={isDark} node={editorInput} />
    // }
    // case 'generator-source': {
    //   return <ReadonlyGeneratorSourceEditor isDark={isDark} source={editorInput.source} />
    // }
    // case 'package-json': {
    //   return <PackageJsonEditor isDark={isDark} source={editorInput.source} />
    // }
    // case 'folder': {
    //   throw new TypeError(`Unexpected input of type "${editorInput.type}"`)
    // }
  }
  return <NoEditor />
}
