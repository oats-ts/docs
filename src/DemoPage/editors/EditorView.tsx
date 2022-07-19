import isNil from 'lodash/isNil'
import React, { FC } from 'react'
import YAML from 'yamljs'
import { useGenerator } from '../useGenerator'
import { OpenAPIInputNode, SourceLanguage } from '../../types'
import { useColorMode } from '../../useColorMode'
import { OpenAPIInputEditor } from './input/OpenAPIInputEditor'
import { NoEditor } from './NoEditor'
import { ReadonlyTypescriptEditor } from './ReadonlyTypescriptEditor'
import { IssuesPanel } from './IssuesPanel'

export const EditorView: FC = () => {
  const { editorInput, samples, inlineSource, remoteSource, source, isLoading, setSource, setEditorInput } =
    useGenerator()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  if (isNil(editorInput)) {
    return <NoEditor isDark={isDark} isLoading={isLoading} />
  }
  switch (editorInput?.type) {
    case 'file': {
      return <ReadonlyTypescriptEditor input={editorInput} isDark={isDark} isLoading={isLoading} />
    }
    case 'inline-openapi':
    case 'remote-openapi': {
      const onChange = (node: OpenAPIInputNode) => {
        setSource(node)
        setEditorInput(node)
      }
      const onSourceTypeChange = (type: OpenAPIInputNode['type']) => {
        const node = type === 'inline-openapi' ? inlineSource : remoteSource
        setSource(node)
        setEditorInput(node)
      }
      const onInlineInputLanguageChange = (language: SourceLanguage) => {
        if (source.type !== 'inline-openapi') {
          return
        }
        if (language !== source.language) {
          if (language === 'json') {
            try {
              setSource({
                ...source,
                content: JSON.stringify(YAML.parse(source.content), null, 2),
                language: 'json',
              })
            } catch (e) {
              console.log(e)
            }
          } else if (language === 'yaml') {
            try {
              setSource({
                ...source,
                content: YAML.stringify(JSON.parse(source.content), 10000, 2),
                language: 'yaml',
              })
            } catch (e) {
              console.log(e)
            }
          }
        }
      }

      return (
        <OpenAPIInputEditor
          input={editorInput}
          isDark={isDark}
          samples={samples}
          onChange={onChange}
          onSourceTypeChange={onSourceTypeChange}
          onInlineInputLanguageChange={onInlineInputLanguageChange}
        />
      )
    }
    case 'issues': {
      return <IssuesPanel isLoading={isLoading} isDark={isDark} node={editorInput} />
    }
    default:
      throw new TypeError(`Unexpected input of type "${editorInput.type}"`)
  }
}
