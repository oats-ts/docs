import { ConfigurationNode, GeneratorConfiguration, ReaderConfiguration } from '../../types'
import { createPrinter, factory, NewLineKind, NodeFlags, SyntaxKind } from 'typescript'
import typescriptParser from 'prettier/parser-typescript'
import prettier from 'prettier/standalone'

function getInlineReaderAst(reader: ReaderConfiguration) {
  const dummyPath = `dummy.${reader.inlineLanguage}`
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createPropertyAccessExpression(factory.createIdentifier('readers'), factory.createIdentifier('test')),
      factory.createIdentifier(reader.inlineLanguage),
    ),
    undefined,
    [
      factory.createObjectLiteralExpression(
        [
          factory.createPropertyAssignment(factory.createIdentifier('path'), factory.createStringLiteral(dummyPath)),
          factory.createPropertyAssignment(
            factory.createIdentifier('content'),
            factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createNewExpression(factory.createIdentifier('Map'), undefined, []),
                factory.createIdentifier('set'),
              ),
              undefined,
              [
                factory.createStringLiteral(dummyPath),
                factory.createStringLiteral(`<${reader.inlineLanguage.toUpperCase()} source>`),
              ],
            ),
          ),
        ],
        true,
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
    generator.generators.map((target) =>
      factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier('generators'),
          factory.createIdentifier('create'),
        ),
        undefined,
        [factory.createStringLiteral(target)],
      ),
    ),
    true,
  )
}

function getPreset(generator: GeneratorConfiguration) {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier('presets'),
      factory.createIdentifier(generator.preset),
    ),
    undefined,
    [],
  )
}

function getGeneratorChildren(generator: GeneratorConfiguration) {
  return generator.configurationStyle === 'preset' ? getPreset(generator) : getGenerators(generator)
}

function getGeneratorAst(generator: GeneratorConfiguration) {
  return factory.createCallExpression(factory.createIdentifier('generator'), undefined, [
    factory.createObjectLiteralExpression(
      [
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
        factory.createPropertyAssignment(factory.createIdentifier('children'), getGeneratorChildren(generator)),
      ],
      true,
    ),
  ])
}

function getWriterAst() {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier('writers'),
        factory.createIdentifier('typescript'),
      ),
      factory.createIdentifier('memory'),
    ),
    undefined,
    [
      factory.createObjectLiteralExpression(
        [
          factory.createPropertyAssignment(
            factory.createIdentifier('format'),
            factory.createCallExpression(
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
                  ],
                  false,
                ),
              ],
            ),
          ),
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
          factory.createPropertyAssignment(
            factory.createIdentifier('validator'),
            factory.createCallExpression(factory.createIdentifier('validator'), undefined, []),
          ),
          factory.createPropertyAssignment(factory.createIdentifier('reader'), getReaderAst(config.reader)),
          factory.createPropertyAssignment(factory.createIdentifier('generator'), getGeneratorAst(config.generator)),
          factory.createPropertyAssignment(factory.createIdentifier('writer'), getWriterAst()),
        ],
        true,
      ),
    ]),
  )
}

function getImportDeclarations(config: ConfigurationNode) {
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
    .filter((name) =>
      config.generator.configurationStyle === 'generators' ? name !== 'presets' : name !== 'generators',
    )
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
  const imports = factory.createSourceFile(
    getImportDeclarations(config),
    factory.createToken(SyntaxKind.EndOfFileToken),
    NodeFlags.None,
  )

  const fnCall = factory.createSourceFile(
    [getGenerateCallAst(config)],
    factory.createToken(SyntaxKind.EndOfFileToken),
    NodeFlags.None,
  )

  const printer = createPrinter({
    newLine: NewLineKind.LineFeed,
    removeComments: false,
  })

  return prettier.format([printer.printFile(imports), printer.printFile(fnCall)].join('\n\n'), {
    parser: 'typescript',
    plugins: [typescriptParser],
  })
}
