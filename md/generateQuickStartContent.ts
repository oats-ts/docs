import { flatMap } from 'lodash'
import { resolve } from 'path'
import { factory, ImportDeclaration, NodeFlags, Statement, SyntaxKind } from 'typescript'
import { MarkdownData, QUICKSTART_FOLDER, QUICKSTART_MD_FILE } from './common'
import { getMarkdownContent } from './getMarkdownContent'
import { stringify } from './stringify'
import { promises as fs } from 'fs'
import camelcase from 'camelcase'

function getDescriptiorImport() {
  return factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('QuickStartDescriptor')),
      ]),
    ),
    factory.createStringLiteral('../../../types'),
    undefined,
  )
}

function getMarkdownImport({ fileName, varName }: MarkdownData): ImportDeclaration {
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
    factory.createStringLiteral(`./${fileName}`),
    undefined,
  )
}

function getMarkdownObject(content: MarkdownData[]): Statement {
  return factory.createVariableStatement(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier('quickStart'),
          undefined,
          undefined,
          factory.createObjectLiteralExpression(
            content.map((data) => factory.createShorthandPropertyAssignment(getDescriptorName(data), undefined)),
            true,
          ),
        ),
      ],
      NodeFlags.Const,
    ),
  )
}

function getQuickStartDescriptor(data: MarkdownData): Statement {
  return factory.createVariableStatement(
    [],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(getDescriptorName(data)),
          undefined,
          factory.createTypeReferenceNode(factory.createIdentifier('QuickStartDescriptor'), undefined),
          factory.createObjectLiteralExpression(
            [
              factory.createPropertyAssignment(
                factory.createIdentifier('title'),
                factory.createStringLiteral(data.title),
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier('content'),
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createIdentifier(data.varName),
                        factory.createIdentifier('substring'),
                      ),
                      undefined,
                      [
                        factory.createBinaryExpression(
                          factory.createCallExpression(
                            factory.createPropertyAccessExpression(
                              factory.createIdentifier(data.varName),
                              factory.createIdentifier('indexOf'),
                            ),
                            undefined,
                            [factory.createStringLiteral('\n')],
                          ),
                          factory.createToken(SyntaxKind.PlusToken),
                          factory.createNumericLiteral('1'),
                        ),
                      ],
                    ),
                    factory.createIdentifier('trim'),
                  ),
                  undefined,
                  [],
                ),
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

function getDescriptorName(data: MarkdownData): string {
  return `${camelcase(data.varName)}Descriptor`
}

export async function generateQuickStartContent(): Promise<void> {
  const content = (await getMarkdownContent(resolve(QUICKSTART_FOLDER))).map(
    (data): MarkdownData => ({ ...data, description: '' }),
  )
  const imports = [...flatMap(content, (item) => getMarkdownImport(item)), getDescriptiorImport()]
  const startements = content.map((data) => [getQuickStartDescriptor(data)])
  const source = await stringify([imports, ...startements, [getMarkdownObject(content)]])
  return fs.writeFile(resolve(QUICKSTART_MD_FILE), source, 'utf-8')
}
