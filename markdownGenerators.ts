import { factory, ImportDeclaration, NodeFlags, SyntaxKind, createPrinter, NewLineKind, Statement } from 'typescript'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { parse } from 'path'
import { format, Options } from 'prettier'

type MarkdownData = {
  fileName: string
  varName: string
}

const MARKDOWN_ENUM_FILE = 'src/md/markdown.ts'
const MARKDOWN_BUNDLES_FOLDER = 'src/v2/pages/bundles/documentation'

export const MARKDOWN_BUNDLE_FILE = (name: string) => `${MARKDOWN_BUNDLES_FOLDER}/DocumentationBundle_${name}.tsx`

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

async function getMarkdownContent(): Promise<MarkdownData[]> {
  return (await fs.readdir(resolve('src/md')))
    .map((fileName) => parse(fileName))
    .filter(({ ext }) => ext === '.md')
    .map(({ base, name }) => ({ fileName: base, varName: name }))
}

async function generateMarkdownImports(content: MarkdownData[]) {
  const statements: Statement[][] = [[createMarkdownObject(content)], [createMarkdownType()]]
  const prettierOptions = JSON.parse(await fs.readFile(resolve('.prettierrc'), 'utf-8')) as Options
  const source = statements
    .map((stmnts) => factory.createSourceFile(stmnts, factory.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None))
    .map((file) => createPrinter({ removeComments: false, newLine: NewLineKind.LineFeed }).printFile(file))
    .join('\n\n')
  const formattedSource = format(source, prettierOptions)
  return fs.writeFile(resolve(MARKDOWN_ENUM_FILE), formattedSource, 'utf-8')
}

async function generateMarkdownBundle(data: MarkdownData) {
  const statements: Statement[][] = [createMarkdownBundleImports(data), [createMarkdownBundleRender(data)]]
  const prettierOptions = JSON.parse(await fs.readFile(resolve('.prettierrc'), 'utf-8')) as Options
  const source = statements
    .map((stmnts) => factory.createSourceFile(stmnts, factory.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None))
    .map((file) => createPrinter({ removeComments: false, newLine: NewLineKind.LineFeed }).printFile(file))
    .join('\n\n')
  const formattedSource = format(source, prettierOptions)
  return fs.writeFile(resolve(MARKDOWN_BUNDLE_FILE(data.varName)), formattedSource, 'utf-8')
}

async function generateMarkdownBundles(data: MarkdownData[]) {
  for (const d of data) {
    await generateMarkdownBundle(d)
  }
}

async function generateAll() {
  const data = await getMarkdownContent()
  await fs.rm(resolve(MARKDOWN_BUNDLES_FOLDER), { force: true, recursive: true })
  await fs.mkdir(resolve(MARKDOWN_BUNDLES_FOLDER))
  await generateMarkdownImports(data)
  await generateMarkdownBundles(data)
}

generateAll()
