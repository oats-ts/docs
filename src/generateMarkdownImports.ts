import { factory, ImportDeclaration, NodeFlags, SyntaxKind, createPrinter, NewLineKind, Statement } from 'typescript'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { parse } from 'path'
import { format, Options } from 'prettier'

type MarkdownData = {
  fileName: string
  varName: string
}

function createImport({ fileName, varName }: MarkdownData): ImportDeclaration {
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
                factory.createShorthandPropertyAssignment(factory.createIdentifier(varName), undefined),
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

async function getMarkdownContent(): Promise<MarkdownData[]> {
  return (await fs.readdir(resolve('src/md')))
    .map((fileName) => parse(fileName))
    .filter(({ ext }) => ext === '.md')
    .map(({ base, name }) => ({ fileName: base, varName: name }))
}

async function generateMarkdownImports() {
  const content = await getMarkdownContent()
  const statements: Statement[][] = [
    content.map((data) => createImport(data)),
    [createMarkdownObject(content)],
    [createMarkdownType()],
  ]
  const prettierOptions = JSON.parse(await fs.readFile(resolve('.prettierrc'), 'utf-8')) as Options
  const source = statements
    .map((stmnts) => factory.createSourceFile(stmnts, factory.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None))
    .map((file) => createPrinter({ removeComments: false, newLine: NewLineKind.LineFeed }).printFile(file))
    .join('\n\n')
  const formattedSource = format(source, prettierOptions)
  return fs.writeFile(resolve('src/md/markdown.ts'), formattedSource, 'utf-8')
}

generateMarkdownImports()
