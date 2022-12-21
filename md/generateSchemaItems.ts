import { isNil } from 'lodash'
import { factory, ImportDeclaration, NodeFlags, Statement, SyntaxKind } from 'typescript'
import { SchemaItem } from '../src/types'
import { stringify } from './stringify'
import fs from 'fs/promises'
import { resolve } from 'path'

function getSchemaItemsStatement(items: SchemaItem[], name: string): Statement {
  return factory.createVariableStatement(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(name),
          undefined,
          factory.createArrayTypeNode(
            factory.createTypeReferenceNode(factory.createIdentifier('SchemaItem'), undefined),
          ),
          factory.createArrayLiteralExpression(
            items.map((item) =>
              factory.createObjectLiteralExpression([
                ...(isNil(item.name)
                  ? []
                  : [
                      factory.createPropertyAssignment(
                        factory.createIdentifier('name'),
                        factory.createStringLiteral(item.name),
                      ),
                    ]),
                ...(isNil(item.description)
                  ? []
                  : [
                      factory.createPropertyAssignment(
                        factory.createIdentifier('description'),
                        factory.createStringLiteral(item.description),
                      ),
                    ]),
                factory.createPropertyAssignment(
                  factory.createIdentifier('image'),
                  factory.createStringLiteral(item.image),
                ),
                factory.createPropertyAssignment(
                  factory.createIdentifier('url'),
                  factory.createStringLiteral(item.url),
                ),
                factory.createPropertyAssignment(
                  factory.createIdentifier('provider'),
                  factory.createStringLiteral(item.provider),
                ),
              ]),
            ),
          ),
        ),
      ],
      NodeFlags.Const,
    ),
  )
}

function getImports(): ImportDeclaration[] {
  return [
    factory.createImportDeclaration(
      undefined,
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([
          factory.createImportSpecifier(false, undefined, factory.createIdentifier('SchemaItem')),
        ]),
      ),
      factory.createStringLiteral('./types'),
      undefined,
    ),
  ]
}

export async function generateSchemaItems(items: SchemaItem[], name: string, path: string) {
  const statment = getSchemaItemsStatement(items, name)
  const source = await stringify([getImports(), [statment]])
  return fs.writeFile(resolve(path), source, 'utf-8')
}
