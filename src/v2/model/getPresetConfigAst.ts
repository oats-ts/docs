import { isNil } from 'lodash'
import { factory, PropertyAssignment, Expression, ParameterDeclaration, SyntaxKind } from 'typescript'
import { PresetConfig, GeneratorPreset } from '../../types'
import { CorsConfigurationGeneratorConfig } from '@oats-ts/openapi-generators'
import { getLogicalExpression } from '@oats-ts/typescript-common'
import { needsCors } from './configUtils'

type CorsKey = keyof CorsConfigurationGeneratorConfig
type PropertyAstFactory = (config: Partial<PresetConfig>) => PropertyAssignment[]

function p(name: string): ParameterDeclaration {
  return factory.createParameterDeclaration([], [], undefined, name, undefined, undefined, undefined)
}

function createFunctionPropertyAssignment(
  name: CorsKey,
  parameters: string[],
  returnExpr: Expression,
): PropertyAssignment {
  return factory.createPropertyAssignment(
    name,
    factory.createArrowFunction(
      [],
      [],
      parameters.map(p),
      undefined,
      factory.createToken(SyntaxKind.EqualsGreaterThanToken),
      returnExpr,
    ),
  )
}

function booleanOrStringArray(input: boolean | string[]): Expression {
  if (typeof input === 'boolean') {
    return input === true ? factory.createTrue() : factory.createFalse()
  }
  return factory.createArrayLiteralExpression(input.map((e) => factory.createStringLiteral(e)))
}

function booleanOrIncludes(
  inputName: string,
  input: boolean | string[],
  transform: (input: string) => string = (a) => a,
): Expression {
  if (typeof input === 'boolean') {
    return input === true ? factory.createTrue() : factory.createFalse()
  }
  return getLogicalExpression(
    SyntaxKind.BarBarToken,
    input
      .map(transform)
      .map((value) =>
        factory.createBinaryExpression(
          factory.createIdentifier(inputName),
          SyntaxKind.EqualsEqualsEqualsToken,
          factory.createStringLiteral(value),
        ),
      ),
  )
}

const allowedOriginsAssignment: PropertyAstFactory = (config) => {
  if (isNil(config.allowedOrigins)) {
    return []
  }
  return [
    createFunctionPropertyAssignment(
      'getAllowedOrigins',
      ['_path', '_method', '_operation'],
      booleanOrStringArray(config.allowedOrigins),
    ),
  ]
}

const allowedMethodsAssignment: PropertyAstFactory = (config) => {
  if (isNil(config.allowedMethods)) {
    return []
  }
  return [
    createFunctionPropertyAssignment(
      'isMethodAllowed',
      ['_path', typeof config.allowedMethods === 'boolean' ? '_method' : 'method', '_operation'],
      booleanOrIncludes('method', config.allowedMethods),
    ),
  ]
}

const allowedRequestHeadersAssignment: PropertyAstFactory = (config) => {
  if (isNil(config.allowedRequestHeaders)) {
    return []
  }
  return [
    createFunctionPropertyAssignment(
      'isRequestHeaderAllowed',
      [typeof config.allowedRequestHeaders === 'boolean' ? '_header' : 'header', '_path', '_method', '_operation'],
      booleanOrIncludes('header', config.allowedRequestHeaders, (header) => header.toLowerCase()),
    ),
  ]
}

const allowedResponseHeadersAssignment: PropertyAstFactory = (config) => {
  if (isNil(config.allowedResponseHeaders)) {
    return []
  }
  return [
    createFunctionPropertyAssignment(
      'isResponseHeaderAllowed',
      [typeof config.allowedResponseHeaders === 'boolean' ? '_header' : 'header', '_path', '_method', '_operation'],
      booleanOrIncludes('header', config.allowedResponseHeaders, (header) => header.toLowerCase()),
    ),
  ]
}

const maxAgeAssignment: PropertyAstFactory = (config) => {
  if (isNil(config.maxAge)) {
    return []
  }
  return [
    createFunctionPropertyAssignment(
      'getMaxAge',
      ['_path', '_method', '_operation'],
      factory.createNumericLiteral(config.maxAge),
    ),
  ]
}

const allowedCredentialsAssignment: PropertyAstFactory = (config) => {
  if (isNil(config.allowCredentials)) {
    return []
  }
  return [
    createFunctionPropertyAssignment(
      'isCredentialsAllowed',
      ['_path', '_method', '_operation'],
      config.allowCredentials === true ? factory.createTrue() : factory.createFalse(),
    ),
  ]
}

function getCorsPropertyAssignment(config: Partial<PresetConfig>): PropertyAssignment | undefined {
  if (!needsCors(config)) {
    return undefined
  }
  const properties = [
    ...allowedOriginsAssignment(config),
    ...allowedMethodsAssignment(config),
    ...allowedRequestHeadersAssignment(config),
    ...allowedResponseHeadersAssignment(config),
    ...allowedCredentialsAssignment(config),
    ...maxAgeAssignment(config),
  ]

  return factory.createPropertyAssignment('cors', factory.createObjectLiteralExpression(properties, true))
}

function booleanProp(name: string, value: boolean | undefined): PropertyAssignment | undefined {
  if (isNil(value)) {
    return undefined
  }
  return factory.createPropertyAssignment(name, value ? factory.createTrue() : factory.createFalse())
}

export function getPresetConfigAst(config: Partial<PresetConfig>, preset: GeneratorPreset): PropertyAssignment[] {
  const documentationProp = booleanProp('documentation', config.documentation)
  const validateProp = booleanProp('validateResponses', config.validateResponses)
  const debugCookiesProp = booleanProp('debugCookies', config.debugCookies)
  const corsProp = getCorsPropertyAssignment(config)

  const propMap: Record<GeneratorPreset, (PropertyAssignment | undefined)[]> = {
    client: [documentationProp, validateProp, debugCookiesProp],
    server: [documentationProp, corsProp],
    fullStack: [documentationProp, validateProp, corsProp, debugCookiesProp],
  }

  const properties = propMap[preset].filter((prop): prop is PropertyAssignment => !isNil(prop))

  return properties
}
