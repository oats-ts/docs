import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'

const generatorsMap: Record<OpenAPIGeneratorTarget, boolean> = {
  'json-schema/type': true,
  'json-schema/type-guard': true,
  'json-schema/type-validator': true,
  'openapi/api-type': true,
  'openapi/express-cors-middleware': true,
  'openapi/express-route': true,
  'openapi/express-route-factory': true,
  'openapi/express-routes-type': true,
  'openapi/operation': true,
  'openapi/path-deserializer': true,
  'openapi/path-serializer': true,
  'openapi/path-type': true,
  'openapi/query-deserializer': true,
  'openapi/query-serializer': true,
  'openapi/query-type': true,
  'openapi/request-body-validator': true,
  'openapi/request-headers-deserializer': true,
  'openapi/request-headers-serializer': true,
  'openapi/request-headers-type': true,
  'openapi/request-server-type': true,
  'openapi/request-type': true,
  'openapi/response-body-validator': true,
  'openapi/response-headers-deserializer': true,
  'openapi/response-headers-serializer': true,
  'openapi/response-headers-type': true,
  'openapi/response-type': true,
  'openapi/sdk-impl': true,
  'openapi/sdk-type': true,
}

export const generators = Object.keys(generatorsMap) as OpenAPIGeneratorTarget[]
