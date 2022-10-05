import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { OverrideField } from '../../types'

const overrideFields: Partial<Record<OpenAPIGeneratorTarget, OverrideField[]>> = {
  'oats/api-type': ['documentation'],
  'oats/operation': ['documentation', 'validateClientResponses', 'sendCookieHeader', 'parseSetCookieHeaders'],
  'oats/path-type': ['documentation'],
  'oats/query-type': ['documentation'],
  'oats/request-headers-type': ['documentation'],
  'oats/response-headers-type': ['documentation'],
  'oats/sdk-type': ['documentation'],
  'oats/sdk-impl': ['documentation'],
  'oats/type': ['documentation'],
  'oats/request-type': ['sendCookieHeader'],
  'oats/response-type': ['parseSetCookieHeaders'],
  'oats/express-cors-router-factory': [
    'allowedOrigins',
    'allowedMethods',
    'allowedRequestHeaders',
    'allowedResponseHeaders',
    'allowCredentials',
    'maxAge',
  ],
  'oats/express-router-factory': ['allowedOrigins', 'allowedMethods', 'allowedResponseHeaders', 'allowCredentials'],
}
const allOverrideFields: OverrideField[] = [
  'documentation',
  'validateClientResponses',
  'sendCookieHeader',
  'parseSetCookieHeaders',
  'allowedOrigins',
  'allowedMethods',
  'allowCredentials',
  'allowedRequestHeaders',
  'allowedResponseHeaders',
  'maxAge',
]

export function hasOverrideField(field: OverrideField, targets: OpenAPIGeneratorTarget[]): boolean {
  return targets.some((target) => (overrideFields[target] ?? []).includes(field))
}

export function getOverrideFields(targets: OpenAPIGeneratorTarget[]): OverrideField[] {
  return allOverrideFields.filter((field) => hasOverrideField(field, targets))
}
