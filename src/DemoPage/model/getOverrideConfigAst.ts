import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { ExpressCorsRouterFactoryGeneratorConfig } from '@oats-ts/openapi-generators'
import { getLogicalExpression } from '@oats-ts/typescript-common'
import { flatMap, isNil } from 'lodash'
import {
  Expression,
  factory,
  ObjectLiteralExpression,
  ParameterDeclaration,
  PropertyAssignment,
  SyntaxKind,
} from 'typescript'
import { GeneratorOverrides } from '../../types'

type ConfigAstFactory = (config: Partial<GeneratorOverrides>) => ObjectLiteralExpression | undefined
type PropertyAstFactory = (config: Partial<GeneratorOverrides>) => PropertyAssignment[]
type CorsKey = keyof ExpressCorsRouterFactoryGeneratorConfig
type BooleanProp = 'documentation' | 'sendCookieHeader' | 'parseSetCookieHeaders' | 'validateClientResponses'

function p(name: string): ParameterDeclaration {
  return factory.createParameterDeclaration([], [], undefined, name, undefined, undefined, undefined)
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

const booleanPropertyAssignment =
  (name: BooleanProp, propName: string = name): PropertyAstFactory =>
  (config) => {
    const value = config[name]
    if (isNil(value)) {
      return []
    }
    return [factory.createPropertyAssignment(propName, value ? factory.createTrue() : factory.createFalse())]
  }

const documentationAssignment = booleanPropertyAssignment('documentation')
const parseSetCookieHeadersAssignment = booleanPropertyAssignment('parseSetCookieHeaders')
const requestCookiesAssignment = booleanPropertyAssignment('sendCookieHeader', 'cookies')
const responseCookiesAssignment = booleanPropertyAssignment('parseSetCookieHeaders', 'cookies')
const sendCookieHeaderAssignment = booleanPropertyAssignment('sendCookieHeader')
const validateAssignment = booleanPropertyAssignment('validateClientResponses', 'validate')
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

const config =
  (...properties: PropertyAstFactory[]): ConfigAstFactory =>
  (config) => {
    const assignments = flatMap(properties, (propertyAssignment) => propertyAssignment(config))
    return assignments.length === 0 ? undefined : factory.createObjectLiteralExpression(assignments, true)
  }

const configOverrideAstFactories: Partial<Record<OpenAPIGeneratorTarget, ConfigAstFactory>> = {
  'oats/api-type': config(documentationAssignment),
  'oats/operation': config(
    documentationAssignment,
    validateAssignment,
    sendCookieHeaderAssignment,
    parseSetCookieHeadersAssignment,
  ),
  'oats/path-type': config(documentationAssignment),
  'oats/query-type': config(documentationAssignment),
  'oats/request-headers-type': config(documentationAssignment),
  'oats/response-headers-type': config(documentationAssignment),
  'oats/sdk-type': config(documentationAssignment),
  'oats/sdk-impl': config(documentationAssignment),
  'oats/type': config(documentationAssignment),
  'oats/request-type': config(requestCookiesAssignment),
  'oats/response-type': config(responseCookiesAssignment),
  'oats/express-cors-router-factory': config(
    allowedOriginsAssignment,
    allowedMethodsAssignment,
    allowedRequestHeadersAssignment,
    allowedResponseHeadersAssignment,
    allowedCredentialsAssignment,
    maxAgeAssignment,
  ),
  'oats/express-router-factory': config(
    allowedOriginsAssignment,
    allowedMethodsAssignment,
    allowedResponseHeadersAssignment,
    allowedCredentialsAssignment,
  ),
}

export function getOverrideConfigAst(
  target: OpenAPIGeneratorTarget,
  config: Partial<GeneratorOverrides>,
): Expression | undefined {
  return (configOverrideAstFactories[target] ?? (() => undefined))(config)
}
