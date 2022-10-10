import {
  ConfigurationNode,
  GeneratorConfiguration,
  ReaderConfiguration,
  SourceLanguage,
  WriterConfiguration,
} from '../../types'
import {
  createPrinter,
  factory,
  NewLineKind,
  NodeFlags,
  Statement,
  SyntaxKind,
  addSyntheticLeadingComment,
  Node,
} from 'typescript'
import typescriptParser from 'prettier/parser-typescript'
import prettier from 'prettier/standalone'
import { isNil } from 'lodash'
import { CommentConfig } from '@oats-ts/typescript-writer'
import { defaultPrettierConfig } from './deafultPrettierConfig'
import YAML from 'yamljs'
import { getPresetConfigAst } from './getPresetConfigAst'

function comment<T extends Node>(node: T, comment: string): T {
  return addSyntheticLeadingComment(node, SyntaxKind.SingleLineCommentTrivia, ` ${comment}`, true)
}

function getReaderComment(reader: ReaderConfiguration): string {
  const language = reader.readerType === 'inline' ? reader.inlineLanguage : reader.remoteLanguage
  const docText = language === 'mixed' ? `document` : `${language.toUpperCase()} document`
  const commonTxt = `resolves it's references, structurally validates it, and exposes it for the next step.`
  if (reader.readerType === 'inline') {
    return `Reads your inline ${docText}, ${commonTxt}`
  }
  switch (reader.remoteProtocol) {
    case 'file':
      return `Reads your document from the file system, ${commonTxt}`
    case 'mixed':
      return `Reads your ${docText}, ${commonTxt}`
    default:
      return `Reads your ${docText} from ${reader.remoteProtocol.toUpperCase()}, ${commonTxt}`
  }
}

function getCompressedSource(source: string, language: SourceLanguage): string {
  try {
    if (language === 'yaml') {
      return YAML.stringify(YAML.parse(source))
    } else if (language === 'json') {
      return JSON.stringify(JSON.parse(source))
    }
  } catch (e) {
    console.error(e)
  }
  return source
}

function getInlineVariable(reader: ReaderConfiguration) {
  const compressedSource = getCompressedSource(reader.inlineContent, reader.inlineLanguage)
  return comment(
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier(`${reader.inlineLanguage}Source`),
            undefined,
            undefined,
            factory.createNoSubstitutionTemplateLiteral(compressedSource, compressedSource),
          ),
        ],
        NodeFlags.Const,
      ),
    ),
    `The source of your inline OpenAPI document in ${reader.inlineLanguage.toUpperCase()} format.`,
  )
}

function getInlineReaderAst(reader: ReaderConfiguration) {
  const inlinePath = `inline.${reader.inlineLanguage}`
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createPropertyAccessExpression(
        factory.createPropertyAccessExpression(factory.createIdentifier('readers'), factory.createIdentifier('memory')),
        factory.createIdentifier('mixed'),
      ),
      factory.createIdentifier(reader.inlineLanguage),
    ),
    undefined,
    [
      comment(factory.createStringLiteral(inlinePath), `The URI to the main inline document.`),
      comment(
        factory.createObjectLiteralExpression([
          factory.createPropertyAssignment(
            factory.createStringLiteral(inlinePath),
            factory.createIdentifier(`${reader.inlineLanguage}Source`),
          ),
        ]),
        `The mapping between inline document URI and content. Documents can reference each outher by the key URI.`,
      ),
    ],
  )
}

function getRemoteReaderAst(reader: ReaderConfiguration) {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier('readers'),
        factory.createIdentifier(reader.remoteProtocol),
      ),
      factory.createIdentifier(reader.remoteLanguage),
    ),
    undefined,
    [factory.createStringLiteral(reader.remotePath)],
  )
}

function getReaderAst(reader: ReaderConfiguration) {
  if (reader.readerType === 'inline') {
    return getInlineReaderAst(reader)
  } else {
    return getRemoteReaderAst(reader)
  }
}

function getGenerators(generator: GeneratorConfiguration) {
  return factory.createArrayLiteralExpression(
    generator.generators.map((target) => {
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier('generators'),
          factory.createIdentifier('create'),
        ),
        undefined,
        [factory.createStringLiteral(target)],
      )
    }),
    true,
  )
}

function getPreset(generator: GeneratorConfiguration) {
  const props = getPresetConfigAst(generator.presetConfig, generator.preset)
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier('presets'),
      factory.createIdentifier(generator.preset),
    ),
    undefined,
    props.length > 0 ? [factory.createObjectLiteralExpression(props, true)] : [],
  )
}

function getGeneratorChildren(generator: GeneratorConfiguration) {
  return generator.configurationStyle === 'preset' ? getPreset(generator) : getGenerators(generator)
}

function getGeneratorAst(generator: GeneratorConfiguration) {
  return factory.createCallExpression(factory.createIdentifier('generator'), undefined, [
    factory.createObjectLiteralExpression(
      [
        comment(
          factory.createPropertyAssignment(
            factory.createIdentifier('nameProvider'),
            factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier('nameProviders'),
                factory.createIdentifier('default'),
              ),
              undefined,
              [],
            ),
          ),
          `Provides a name for each generated artifact.`,
        ),
        comment(
          factory.createPropertyAssignment(
            factory.createIdentifier('pathProvider'),
            factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier('pathProviders'),
                factory.createIdentifier(generator.pathProviderType),
              ),
              undefined,
              [factory.createStringLiteral(generator.rootPath)],
            ),
          ),
          `Provides a path in the file system for each generated artifact with "${generator.rootPath}" as root.`,
        ),
        comment(
          factory.createPropertyAssignment(factory.createIdentifier('children'), getGeneratorChildren(generator)),
          `${
            generator.configurationStyle === 'preset' ? 'Generator preset' : 'Individual generators'
          } responsible for generating the output AST.`,
        ),
      ],
      true,
    ),
  ])
}

function getLiteral(input: number | string | boolean) {
  switch (typeof input) {
    case 'boolean':
      return input ? factory.createTrue() : factory.createFalse()
    case 'number':
      return factory.createNumericLiteral(input)
    case 'string':
      return factory.createStringLiteral(input)
  }
}

function getFormatterAst(writer: WriterConfiguration) {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier('formatters'),
      factory.createIdentifier('prettier'),
    ),
    undefined,
    [
      factory.createObjectLiteralExpression(
        [
          factory.createPropertyAssignment(
            factory.createIdentifier('parser'),
            factory.createStringLiteral('typescript'),
          ),
          ...Object.entries(writer.prettier)
            .filter(([key, value]) => !isNil(value) && value !== (defaultPrettierConfig as Record<string, any>)[key])
            .map(([key, value]) => factory.createPropertyAssignment(factory.createIdentifier(key), getLiteral(value))),
        ],
        true,
      ),
    ],
  )
}

function getLeadingOrTrailingCommentsAst(comments: CommentConfig[]) {
  return factory.createArrayLiteralExpression(
    comments.map((comment) =>
      factory.createObjectLiteralExpression(
        [
          factory.createPropertyAssignment(factory.createIdentifier('type'), factory.createStringLiteral(comment.type)),
          factory.createPropertyAssignment(factory.createIdentifier('text'), factory.createStringLiteral(comment.text)),
        ],
        false,
      ),
    ),
  )
}

function getCommentsAst(comments: WriterConfiguration) {
  return factory.createObjectLiteralExpression(
    [
      ...(comments.leadingComments.length > 0
        ? [
            comment(
              factory.createPropertyAssignment(
                factory.createIdentifier('leadingComments'),
                getLeadingOrTrailingCommentsAst(comments.leadingComments),
              ),
              `Comment(s) appearing in the beginning of the file, before the first statement.`,
            ),
          ]
        : []),
      ...(comments.trailingComments.length > 0
        ? [
            comment(
              factory.createPropertyAssignment(
                factory.createIdentifier('trailingComments'),
                getLeadingOrTrailingCommentsAst(comments.trailingComments),
              ),
              `Comment(s) appearing in the end of the file, after the last statement.`,
            ),
          ]
        : []),
    ],
    true,
  )
}

function getWriterAst(writer: WriterConfiguration) {
  const formatter = comment(
    factory.createPropertyAssignment(factory.createIdentifier('format'), getFormatterAst(writer)),
    `Formats each generated source using prettier.`,
  )
  const comments = comment(
    factory.createPropertyAssignment(factory.createIdentifier('comments'), getCommentsAst(writer)),
    `Adds leading/trailing comments to each generated file. Ideal for disabling linters or warning not to edit these files.`,
  )
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier('writers'),
        factory.createIdentifier('typescript'),
      ),
      factory.createIdentifier(writer.writerType),
    ),
    undefined,
    [
      factory.createObjectLiteralExpression(
        [
          ...(writer.useFormatter ? [formatter] : []),
          ...(writer.leadingComments.length > 0 || writer.trailingComments.length > 0 ? [comments] : []),
        ],
        true,
      ),
    ],
  )
}

function getGenerateCallAst(config: ConfigurationNode) {
  return factory.createExpressionStatement(
    factory.createCallExpression(factory.createIdentifier('generate'), undefined, [
      factory.createObjectLiteralExpression(
        [
          comment(
            factory.createPropertyAssignment(
              factory.createIdentifier('logger'),
              factory.createCallExpression(
                factory.createPropertyAccessExpression(
                  factory.createIdentifier('loggers'),
                  factory.createIdentifier('simple'),
                ),
                undefined,
                [],
              ),
            ),
            `Logs generator events as they happen. Use logger.verbose() for more detailed log output.`,
          ),
          comment(
            factory.createPropertyAssignment(factory.createIdentifier('reader'), getReaderAst(config.reader)),
            getReaderComment(config.reader),
          ),
          ...(config.validator.enabled
            ? [
                comment(
                  factory.createPropertyAssignment(
                    factory.createIdentifier('validator'),
                    factory.createCallExpression(factory.createIdentifier('validator'), undefined, []),
                  ),
                  `Takes the output of the read step, and semantically validates it.`,
                ),
              ]
            : []),
          comment(
            factory.createPropertyAssignment(factory.createIdentifier('generator'), getGeneratorAst(config.generator)),
            `Takes the ${
              config.validator.enabled ? 'validated ' : ''
            }output of the read step, and coordinates child code generators.`,
          ),
          comment(
            factory.createPropertyAssignment(factory.createIdentifier('writer'), getWriterAst(config.writer)),
            `Takes the output of generator step, stringifies it, and ${
              config.writer.writerType === 'memory' ? 'returns it' : 'writes it to the disk'
            }.`,
          ),
        ],
        true,
      ),
    ]),
  )
}

function getImportDeclarations({ writer, validator, generator }: ConfigurationNode) {
  const openApiImports = [
    'formatters',
    'generator',
    'generators',
    'loggers',
    'nameProviders',
    'pathProviders',
    'presets',
    'readers',
    'validator',
    'writers',
  ]
    .filter((name) => (name === 'formatters' ? writer.useFormatter : true))
    .filter((name) => (name === 'validator' ? validator.enabled : true))
    .filter((name) => (generator.configurationStyle === 'generators' ? name !== 'presets' : name !== 'generators'))
    .map((name) => factory.createImportSpecifier(false, undefined, factory.createIdentifier(name)))

  const openApiImport = factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(false, undefined, factory.createNamedImports(openApiImports)),
    factory.createStringLiteral('@oats-ts/openapi'),
    undefined,
  )

  const generateImport = factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('generate')),
      ]),
    ),
    factory.createStringLiteral('@oats-ts/oats-ts'),
    undefined,
  )

  return [generateImport, openApiImport]
}

export function getGeneratorSource(config: ConfigurationNode): string {
  const contents: Statement[][] = [
    getImportDeclarations(config),
    config.reader.readerType === 'inline' ? [getInlineVariable(config.reader)] : [],
    [getGenerateCallAst(config)],
  ]

  const sourceFiles = contents
    .filter((statements) => statements.length > 0)
    .map((statements) =>
      factory.createSourceFile(statements, factory.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None),
    )

  const printer = createPrinter({
    newLine: NewLineKind.LineFeed,
    removeComments: false,
  })

  return prettier.format(sourceFiles.map((file) => printer.printFile(file)).join('\n\n'), {
    parser: 'typescript',
    plugins: [typescriptParser],
  })
}
