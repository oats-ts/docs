import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'

const generatorsMap: Record<OpenAPIGeneratorTarget, boolean> = {
  'oats/type': true,
  'oats/type-guard': true,
  'oats/type-validator': true,
  'oats/api-type': true,
  'oats/express-cors-middleware': true,
  'oats/express-route': true,
  'oats/express-route-factory': true,
  'oats/express-routes-type': true,
  'oats/operation': true,
  'oats/path-deserializer': true,
  'oats/path-serializer': true,
  'oats/path-type': true,
  'oats/query-deserializer': true,
  'oats/query-serializer': true,
  'oats/query-type': true,
  'oats/request-body-validator': true,
  'oats/request-headers-deserializer': true,
  'oats/request-headers-serializer': true,
  'oats/request-headers-type': true,
  'oats/request-server-type': true,
  'oats/request-type': true,
  'oats/response-body-validator': true,
  'oats/response-headers-deserializer': true,
  'oats/response-headers-serializer': true,
  'oats/response-headers-type': true,
  'oats/response-type': true,
  'oats/sdk-impl': true,
  'oats/sdk-type': true,
}

export const allGenerators = Object.keys(generatorsMap) as OpenAPIGeneratorTarget[]
