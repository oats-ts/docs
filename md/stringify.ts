import { factory, NodeFlags, SyntaxKind, createPrinter, NewLineKind, Statement } from 'typescript'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { format, Options } from 'prettier'

export async function stringify(statements: Statement[][]) {
  const prettierOptions = JSON.parse(await fs.readFile(resolve('.prettierrc'), 'utf-8')) as Options
  const source = statements
    .map((stmnts) => factory.createSourceFile(stmnts, factory.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None))
    .map((file) => createPrinter({ removeComments: false, newLine: NewLineKind.LineFeed }).printFile(file))
    .join('\n\n')
  return format(source, prettierOptions)
}
