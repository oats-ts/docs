import { factory, NodeFlags, SyntaxKind, Statement } from 'typescript'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { MarkdownData, MARKDOWN_ENUM_FILE } from './common'
import { stringify } from './stringify'

function createMarkdownObject(data: MarkdownData[]): Statement {
  return factory.createVariableStatement(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier('markdown'),
          undefined,
          undefined,
          factory.createAsExpression(
            factory.createObjectLiteralExpression(
              data.map(({ varName }) =>
                factory.createPropertyAssignment(
                  factory.createIdentifier(varName),
                  factory.createStringLiteral(varName),
                ),
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

function createMarkdownType() {
  return factory.createTypeAliasDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createIdentifier('MarkdownPageName'),
    undefined,
    factory.createTypeOperatorNode(
      SyntaxKind.KeyOfKeyword,
      factory.createTypeQueryNode(factory.createIdentifier('markdown'), undefined),
    ),
  )
}

export async function generateMarkdownType(content: MarkdownData[]) {
  return fs.writeFile(
    resolve(MARKDOWN_ENUM_FILE),
    await stringify([[createMarkdownObject(content)], [createMarkdownType()]]),
    'utf-8',
  )
}
