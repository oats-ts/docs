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

function transformNodeLinks(node: rendererNode, importedNodes: Record<string, string>): rendererNode {
  if (node.type === 'text') {
    const value = isNil(node.value) ? undefined : node.value.toString()
    const path = isNil(value) ? undefined : importedNodes[value.trim()]
    if (!isNil(value) && !isNil(path)) {
      return {
        value: undefined,
        type: 'element',
        tagName: 'a',
        children: [node],
        properties: {
          href: `#${path}`,
          className: [codeLinkStyle],
        },
      }
    }
    return node
  } else {
    return { ...node, children: node.children?.map((child) => transformNodeLinks(child, importedNodes)) }
  }
}

export function useTypescriptRenderer(ownPath: string, source: string): (props: rendererProps) => ReactNode {
  const importedNodes = useMemo((): Record<string, string> => {
    const ast = createSourceFile('parsed.ts', source, ScriptTarget.Latest)
    const imports = Array.from(ast.statements.filter(isImportDeclaration))
    const tuples = flatMap(imports, (decl): [string, string][] => {
      const path = (decl.moduleSpecifier as StringLiteral).text
      const spefifiers = Array.from((decl?.importClause?.namedBindings as NamedImports)?.elements ?? [])
        .map((spec) => spec?.name)
        .map((id) => id?.text)
        .filter((name): name is string => !isNil(name))
      return path.startsWith('.') ? spefifiers.map((name) => [name, `${resolve(dirname(ownPath), path)}.ts`]) : []
    })
    return tuples.reduce((nodes, [name, path]) => ({ ...nodes, [name]: path }), {})
  }, [source])

  const renderer = useCallback(
    ({ rows, stylesheet, useInlineStyles }: rendererProps) => {
      return rows.map((row, i) => {
        return createElement({
          node: transformNodeLinks(row, importedNodes),
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
