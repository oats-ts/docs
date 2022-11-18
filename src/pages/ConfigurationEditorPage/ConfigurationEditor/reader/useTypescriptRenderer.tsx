import { css } from '@emotion/css'
import { flatMap, isNil } from 'lodash'
import { dirname, resolve } from 'path'
import { ReactNode, useCallback, useMemo } from 'react'
import { createElement } from 'react-syntax-highlighter'
import { createSourceFile, isImportDeclaration, NamedImports, ScriptTarget, StringLiteral } from 'typescript'

const codeLinkStyle = css`
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

function spaceNode(spaces: number): rendererNode | undefined {
  if (spaces === 0) {
    return undefined
  }
  return {
    type: 'text',
    value: ' '.repeat(spaces),
  }
}

function replaceNameNode(value: string, path: string): rendererNode[] {
  const leadingSpaceCount = value.length - value.trimStart().length
  const trailingSpaceCount = value.length - value.trimEnd().length
  const trimmedValue = value.trim()

  const trimmedNode: rendererNode = {
    value: trimmedValue,
    type: 'text',
  }

  const leadingSpaceNode = spaceNode(leadingSpaceCount)
  const trailingSpaceNode = spaceNode(trailingSpaceCount)

  const anchorNode: rendererNode = {
    value: undefined,
    type: 'element',
    tagName: 'a',
    children: [trimmedNode],
    properties: {
      href: `#${path}`,
      className: [codeLinkStyle],
    },
  }

  return [leadingSpaceNode, anchorNode, trailingSpaceNode].filter((node): node is rendererNode => !isNil(node))
}

function replaceImportPath(value: string, path: string): rendererNode[] {
  const textNode: rendererNode = {
    value: value,
    type: 'text',
  }
  const anchorNode: rendererNode = {
    value: undefined,
    type: 'element',
    tagName: 'a',
    children: [textNode],
    properties: {
      href: `#${path}`,
      className: [codeLinkStyle],
    },
  }

  return [anchorNode]
}

function getAbsolutePath(ownPath: string, path: string): string {
  return `${resolve(dirname(ownPath), path)}.ts`
}

function transformNodeLinks(
  node: rendererNode,
  importedNames: Record<string, string>,
  importedPaths: Record<string, string>,
): rendererNode {
  if (node.type === 'element' && node.children?.length === 1) {
    const child = node.children[0]!
    const value = child.value
    if (child.type === 'text' && !isNil(value) && typeof value === 'string') {
      const importedPathByName = importedNames[value.trim()]
      const importedPathByPath = importedPaths[value.slice(1, value.length - 1)]
      if (typeof importedPathByName === 'string') {
        return {
          ...node,
          children: replaceNameNode(value, importedPathByName),
        }
      }
      if (typeof importedPathByPath === 'string') {
        return {
          ...node,
          children: replaceImportPath(value, importedPathByPath),
        }
      }
    }
    return node
  } else {
    return {
      ...node,
      children: node.children?.map((child) => transformNodeLinks(child, importedNames, importedPaths)),
    }
  }
}

export function useTypescriptRenderer(ownPath: string, source: string): (props: rendererProps) => ReactNode {
  const [importedNames, importedPaths] = useMemo((): [Record<string, string>, Record<string, string>] => {
    const ast = createSourceFile('parsed.ts', source, ScriptTarget.Latest)
    const imports = Array.from(ast.statements.filter(isImportDeclaration))

    const nameToPath = flatMap(imports, (decl): [string, string][] => {
      const path = (decl.moduleSpecifier as StringLiteral).text
      const spefifiers = Array.from((decl?.importClause?.namedBindings as NamedImports)?.elements ?? [])
        .map((spec) => spec?.name)
        .map((id) => id?.text)
        .filter((name): name is string => !isNil(name))
      return path.startsWith('.') ? spefifiers.map((name) => [name, getAbsolutePath(ownPath, path)]) : []
    }).reduce((nodes, [name, path]) => ({ ...nodes, [name]: path }), {})

    const specifierToPath = imports
      .map((decl) => (decl.moduleSpecifier as StringLiteral).text)
      .filter((path) => path.startsWith('.'))
      .reduce((nodes, path) => ({ ...nodes, [path]: getAbsolutePath(ownPath, path) }), {})

    return [nameToPath, specifierToPath]
  }, [source, ownPath])

  const renderer = useCallback(
    ({ rows, stylesheet, useInlineStyles }: rendererProps) => {
      return rows.map((row, i) => {
        return createElement({
          node: transformNodeLinks(row, importedNames, importedPaths),
          stylesheet,
          useInlineStyles,
          key: `code-segement${i}`,
        })
      })
    },
    [source, ownPath],
  )
  return renderer
}
