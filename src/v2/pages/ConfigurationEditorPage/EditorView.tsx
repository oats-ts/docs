import isNil from 'lodash/isNil'
import React, { FC } from 'react'
import { useGeneratorContext } from '../../model/useGenerator'
import { ConfigurationEditor } from './ConfigurationEditor/ConfigurationEditor'
import { IssuesPanel } from './IssuesPanel'
import { NoEditor } from './NoEditor'
import { PackageJsonEditor } from './PackageJsonEditor'
import { ReadonlyTypescriptMonaco } from './ReadonlyTypescriptMonaco'

export const EditorView: FC = () => {
  const { editorInput, isLoading } = useGeneratorContext()

  if (isNil(editorInput)) {
    return <NoEditor />
  }
  switch (editorInput?.type) {
    case 'file': {
      return <ReadonlyTypescriptMonaco value={editorInput.content} path={editorInput.path} />
    }
    case 'issues': {
      return <IssuesPanel isLoading={isLoading} node={editorInput} />
    }
    case 'configuration': {
      return <ConfigurationEditor />
    }
    case 'generator-source': {
      return <ReadonlyTypescriptMonaco value={editorInput.source} path="package.json" />
    }
    case 'package-json': {
      return <PackageJsonEditor source={editorInput.source} />
    }
    case 'folder': {
      throw new TypeError(`Unexpected input of type "${editorInput.type}"`)
    }
  }
  return <NoEditor />
}
