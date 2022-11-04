import { factory, ImportDeclaration } from 'typescript'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { MarkdownData, markdownBundleFile } from './common'
import { stringify } from './stringify'

export function createMarkdownImport({ fileName, varName }: MarkdownData): ImportDeclaration {
  return factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(false, factory.createIdentifier('default'), factory.createIdentifier(varName)),
      ]),
    ),
    factory.createStringLiteral(`../../../../md/${fileName}`),
    undefined,
  )
}

function createMarkdownBundleImports(data: MarkdownData): ImportDeclaration[] {
  return [
    factory.createImportDeclaration(
      undefined,
      undefined,
      factory.createImportClause(false, factory.createIdentifier('React'), undefined),
      factory.createStringLiteral('react'),
      undefined,
    ),
    factory.createImportDeclaration(
      undefined,
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([
          factory.createImportSpecifier(false, undefined, factory.createIdentifier('createRoot')),
        ]),
      ),
      factory.createStringLiteral('react-dom/client'),
      undefined,
    ),
    factory.createImportDeclaration(
      undefined,
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([
          factory.createImportSpecifier(false, undefined, factory.createIdentifier('DocumentationPage')),
        ]),
      ),
      factory.createStringLiteral('../../DocumentationPage/DocumentationPage'),
      undefined,
    ),
    createMarkdownImport(data),
  ]
}

function createMarkdownBundleRender(data: MarkdownData) {
  return factory.createExpressionStatement(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createCallExpression(factory.createIdentifier('createRoot'), undefined, [
          factory.createNonNullExpression(
            factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier('document'),
                factory.createIdentifier('getElementById'),
              ),
              undefined,
              [factory.createStringLiteral('root')],
            ),
          ),
        ]),
        factory.createIdentifier('render'),
      ),
      undefined,
      [
        factory.createJsxSelfClosingElement(
          factory.createIdentifier('DocumentationPage'),
          undefined,
          factory.createJsxAttributes([
            factory.createJsxAttribute(factory.createIdentifier('page'), factory.createStringLiteral(data.varName)),
            factory.createJsxAttribute(
              factory.createIdentifier('content'),
              factory.createJsxExpression(undefined, factory.createIdentifier(data.varName)),
            ),
          ]),
        ),
      ],
    ),
  )
}

async function generateMarkdownBundle(data: MarkdownData) {
  return fs.writeFile(
    resolve(markdownBundleFile(data.varName)),
    await stringify([createMarkdownBundleImports(data), [createMarkdownBundleRender(data)]]),
    'utf-8',
  )
}

export async function generateMarkdownBundles(data: MarkdownData[]) {
  for (const d of data) {
    await generateMarkdownBundle(d)
  }
}
