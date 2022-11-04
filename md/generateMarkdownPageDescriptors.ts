import { factory, NodeFlags, SyntaxKind, Statement, ImportDeclaration } from 'typescript'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { markdownBundleFile, MarkdownData, MARKDOWN_PAGES_FILE } from './common'
import { stringify } from './stringify'
import camelCase from 'camelcase'

function getImports(): ImportDeclaration[] {
  return [
    factory.createImportDeclaration(
      undefined,
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([
          factory.createImportSpecifier(false, undefined, factory.createIdentifier('MarkdownPageDescriptor')),
        ]),
      ),
      factory.createStringLiteral('./types'),
      undefined,
    ),
  ]
}

function createMarkdownDescriptor(data: MarkdownData): Statement {
  return factory.createVariableStatement(
    [],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(markdownPageVarName(data)),
          undefined,
          factory.createTypeReferenceNode(factory.createIdentifier('MarkdownPageDescriptor'), undefined),
          factory.createObjectLiteralExpression(
            [
              factory.createPropertyAssignment(
                factory.createIdentifier('bundle'),
                factory.createStringLiteral(`documentation-${data.varName}`),
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier('name'),
                factory.createStringLiteral(data.title),
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier('description'),
                factory.createStringLiteral(data.description),
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier('importPath'),
                factory.createStringLiteral(markdownBundleFile(data.varName)),
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier('md'),
                factory.createStringLiteral(data.varName),
              ),
            ],
            true,
          ),
        ),
      ],
      NodeFlags.Const,
    ),
  )
}

function markdownPageVarName(data: MarkdownData): string {
  return `${camelCase(data.varName)}Page`
}

function createPagesStatment(data: MarkdownData[]): Statement {
  return factory.createVariableStatement(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier('markdownPages'),
          undefined,
          undefined,
          factory.createAsExpression(
            factory.createObjectLiteralExpression(
              data.map((d) =>
                factory.createShorthandPropertyAssignment(factory.createIdentifier(markdownPageVarName(d)), undefined),
              ),
              true,
            ),
            factory.createTypeReferenceNode(factory.createIdentifier('const'), undefined),
          ),
        ),
      ],
      NodeFlags.Const,
    ),
  )
}

export async function generateMarkdownPageDescriptors(content: MarkdownData[]) {
  return fs.writeFile(
    resolve(MARKDOWN_PAGES_FILE),
    await stringify([
      getImports(),
      ...content.map((data) => [createMarkdownDescriptor(data)]),
      [createPagesStatment(content)],
    ]),
    'utf-8',
  )
}
