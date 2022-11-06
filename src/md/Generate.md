# Generate

In this guide you'll learn how the generator step works.

The generator step is responsible for taking the validated output of the [reader](Reader) step, and turning it into an intermediate representation (Typescript [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)), that can be then turned into source code. The work is distributed to single responsiblity generators, that are responsible for generating one thing (like types from the JSON schemas, or serializers for parameters). They also provide means for other generators to access references to their generated content.

The generators that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), package but it originates from the [@oats-ts/openapi-generators](https://www.npmjs.com/package/@oats-ts/openapi-generators) package.

## Examples

### Using individual generators

You can configure your generator from a set of code generators of your choosing. For this approach, it's the easiest to use `generators.create` from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi) package. You can use the generator names (see below) as the first argument, and optionally the approriate configuration object as the second argument (autocomplete will help with this).

```ts
const oats = require('@oats-ts/openapi')

const withGenerators = oats.generator({
  nameProvider: oats.nameProviders.default(),
  pathProvider: oats.pathProviders.default('src/generated'),
  children: [
    oats.generators.create('oats/type', { documentation: false }),
    oats.generators.create('oats/type-guard'),
    oats.generators.create('oats/type-validator'),
  ],
})
```

### Using presets

You can also use presets (I would in fact recommend starting with presets). Presets are a set of generators grouped toghether. The ones available currently are `presets.client()`, `presets.server()` and `presets.fullStack()`. The simplest way is to use the preset without any configuration:

```ts
const oats = require('@oats-ts/openapi')

const withDefaults = oats.generator({
  nameProvider: oats.nameProviders.default(),
  pathProvider: oats.pathProviders.default('src/generated'),
  children: oats.presets.client(),
})
```

Presets offer configuration options, that affect possibly multiple individual generators. In this case we are disabling the `documentation` for all the generators that support this option:

```ts
const oats = require('@oats-ts/openapi')

const withOverrides = oats.generator({
  nameProvider: oats.nameProviders.default(),
  pathProvider: oats.pathProviders.default('src/generated'),
  children: oats.presets.client({
    documentation: false,
  }),
})
```

In case you want to fine tune presets, you can override the configuration for individual generators as well. In this case we are only generating documentation for types:

```ts
const oats = require('@oats-ts/openapi')

const withOverrides = oats.generator({
  nameProvider: nameProviders.default(),
  pathProvider: pathProviders.default('src/generated'),
  children: presets
    .client({ documentation: false })
    .override({ 'oats/type': { documentation: true } }),
})
```

### Mixing presets and generators

Presets and individual generators can be used together, this works well if you have additional custom generators on top of what Oats provides, and you want to use references to the outputs of the provided generators:

```ts
const oats = require('@oats-ts/openapi')

const withPresetsAndGenerators = oats.generator({
  nameProvider: oats.nameProviders.default(),
  pathProvider: oats.pathProviders.default('src/generated'),
  children: [
    oats.presets.client(),
    oats.generators.create('oats/express-cors-router-factory'),
  ],
})
```

## Configuration

The main `generator` function can be configured with an object having the following properties:

- `nameProvider: (input: any, target: string, helper: NameProviderHelper) => string` - A function that determines how each generated artifact is called. For reasonable, convention respecting names use `nameProviders.default()`
  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).
  - `target` is one of the names listed below.
  - `helper` object with helper methods for schema traversal.
- `pathProvider: (input: any, target: string, helper: PathProviderHelper) => string` - A function that determines where in the disk each artifact is written to (`SourceFile#fileName`). Check `pathProviders.*` for options.
  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).
  - `target` is one of the names listed below.
  - `helper` object with helper methods for schema traversal and for retrieving the name provided by the `nameProvider`.
- `children: OpenAPIGenerator | OpenAPIGenerator[]` - A single generator or a list of generators. See available ones below.
- `noEmit?: boolean = false` - When `true`, the generators return no output `SourceFile`s.
- `name?: string = 'root'` - The name of the root generator, shows up in logs.

## Available generators

There are a number of code generators available. These are part of certain presets, but can also be used individually, using `generators.create`. In case you want to see them in action, check the [demo](#/demo) page!

| **Name**                             | **Preset**                | **Uses**                                                                                | **Creates**                                                                                                                                                                 |
| ------------------------------------ | ------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oats/type-guard                      | client, server, fullStack | [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)                     | [Type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) based on JSON schemas                                              |
| oats/type-guard                      | client, server, fullStack | [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)                     | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on JSON schemas                                                                            |
| oats/type                            | client, server, fullStack | [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)                     | Typescript types based on JSON schemas                                                                                                                                      |
| oats/api-type                        | server                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Type encapsulating server behaviour                                                                                                                                         |
| oats/express-cors-router-factory     | server                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) handling CORS headers.                                 |
| oats/express-router-factory          | server                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) encapsulating the app.                                 |
| oats/express-app-router-factory      | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) for each operations.                                   |
| oats/express-router-factories-type   | server                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Object type, with all [Express](https://expressjs.com) [Routers](https://expressjs.com/en/guide/routing.html)                                                               |
| oats/express-context-handler-factory | server                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Factory function, creating an [Express](https://expressjs.com) handler for exposing OATS configuration for all routers                                                      |
| oats/operation                       | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of making an HTTP requests, based on operations                                                                                                          |
| oats/path-deserializer               | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                       |
| oats/path-serializer                 | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                         |
| oats/path-type                       | client, server, fullStack | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting [path parameters](https://swagger.io/docs/specification/serialization/#path) for operations                                                                |
| oats/query-deserializer              | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                     |
| oats/query-serializer                | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                       |
| oats/query-type                      | client, server, fullStack | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting [query parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                              |
| oats/cookie-deserializer             | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing client side Cookie headers for [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations    |
| oats/cookie-serializer               | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing client side Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations       |
| oats/set-cookie-deserializer         | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations |
| oats/set-cookie-serializer           | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations   |
| oats/cookies-type                    | client, server, fullStack | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie) for operations                                                            |
| oats/request-body-validator          | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on request bodies of operations                                                            |
| oats/request-headers-deserializer    | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                           |
| oats/request-headers-serializer      | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                             |
| oats/request-headers-type            | client, server, fullStack | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting request [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                     |
| oats/request-server-type             | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting all inputs for operations (server variant, inputs wrappedn in [Try](https://www.npmjs.com/package/@oats-ts/try)s)                                          |
| oats/request-type                    | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting all inputs for operations                                                                                                                                  |
| oats/response-body-validator         | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on response bodies of operations                                                           |
| oats/response-headers-deserializer   | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                          |
| oats/response-headers-serializer     | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                            |
| oats/response-headers-type           | client, server, fullStack | Status code + [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object) | Types collecting response [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                    |
| oats/response-type                   | client, server, fullStack | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting all outputs for operations                                                                                                                                 |
| oats/sdk-impl                        | client                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Implementation of `oats/sdk-impl` utilizing `oats/operation`                                                                                                                |
| oats/sdk-type                        | client                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Type collecting all operations a client might call                                                                                                                          |

## Extending generators

In case you want to dig deeper, and extend certain generators, check out the [source](https://github.com/oats-ts/oats-ts/tree/master/projects/openapi-generators).
