The generator step is responsible for taking the validated output of the [reader](OpenAPI-Reader), and turning it into an intermediate representation (Typescript [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) in this case), that can be then turned into source code. The OpenAPI generator itself doesn't do much, the work is distributed to single responsiblity generators, that are responsible for generating one thing (like types from the JSON schemas, or serializers for parameters). They also provide means for other generators to access references to their generated content.

The generators that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-generators](https://www.npmjs.com/package/@oats-ts/openapi-generators) package.

## Examples

### Using individual generators

You can configure your generator from a set of code generators of your choosing. For this approach, it's the easiest to use `generators.create` from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi) package. You can use the generator names (see below) as the first argument, and optionally the approriate configuration object as the second argument (autocomplete will help with this).

```ts
import { generator, nameProviders, pathProviders, generators } from '@oats-ts/openapi'

const withGenerators = generator({
  nameProvider: nameProviders.default(),
  pathProvider: pathProviders.default('src/generated'),
  children: [
    generators.create('json-schema/type', { documentation: false }),
    generators.create('json-schema/type-guard'),
    generators.create('json-schema/type-validator'),
  ],
})
```

### Using presets

You can also use presets (I'd recommend starting with presets). Presets are a set of generators grouped toghether. The ones available currently are `presets.client()`, `presets.server()` and `presets.fullStack()`. The simplest way is to use the preset without any configuration:

```ts
import { generator, nameProviders, pathProviders, presets } from '@oats-ts/openapi'

const withDefaults = generator({
  nameProvider: nameProviders.default(),
  pathProvider: pathProviders.default('src/generated'),
  children: presets.client(),
})
```

In case the preset mostly suits your needs, but you'd like to override some configurations, you can do that as well:

```ts
const withOverrides = generator({
  nameProvider: nameProviders.default(),
  pathProvider: pathProviders.default('src/generated'),
  children: presets.client({
    overrides: {
      // Overriding the default configuration of a given generator
      'json-schema/type': { documentation: false },
      // Turn off a generator you don't need (only possible if nothing depends on it)
      'json-schema/type-guard': false,
    },
  }),
})
```

### Mixing presets and generators

Presets and individual generators can be used together:

```ts
const withPresetsAndGenerators = generator({
  nameProvider: nameProviders.default(),
  pathProvider: pathProviders.default('src/generated'),
  children: [presets.client(), generators.create('openapi/express-cors-middleware')],
})
```

## Configuration

The main `generator` function can be configured with an object having the following properties:

- `nameProvider: (input: any, originalName: string | undefined, target: string) => string` - A function that determines how each generated artifact is called. For reasonable, convention respecting names use `nameProviders.default()`
  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).
  - `originalName` optionally appears for pieces of the OpenAPI document, where the name is not part of the object itself (eg.: Schema object).
  - `target` is one of the names listed below.
- `pathProvider: (input: any, name: NameProvider, target: string) => string` - A function that determines where in the disk each artifact is written to (`SourceFile#fileName`). Check `pathProviders.*` for options.
  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).
  - `name` is a simplified function that takes the `input` and the `target` and delegates to the `nameProvider`.
  - `target` is one of the names listed below.
- `children: OpenAPIGenerator | OpenAPIGenerator[]` - A single generator or a list of generators. See available ones below.
- `noEmit?: boolean = false` - When `true`, the generators return no output `SourceFile`s.
- `name?: string = 'root'` - The name of the root generator, shows up in logs.

## Available generators

There are a number of code generators available. These are part of certain presets, but can also be used individually, using `generators.create`.

| **Name**                              | **Preset**                | **Uses**                                                                                                                   | **Creates**                                                                                                                                        |
| ------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| json-schema/type-guard                | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | [Type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) based on JSON schemas                     |
| json-schema/type-validator            | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on JSON schemas                                                   |
| json-schema/type                      | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | Typescript types based on JSON schemas                                                                                                             |
| openapi/api-type                      | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Type encapsulating server behaviour                                                                                                                |
| openapi/express-cors-middleware       | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | [Express](https://expressjs.com) middleware for adding CORS headers                                                                                |
| openapi/express-route-factory         | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) encapsulating the app.        |
| openapi/express-route                 | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Individual [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) for operations                                   |
| openapi/express-routes-type           | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Object type, with all [Express](https://expressjs.com) [Routers](https://expressjs.com/en/guide/routing.html)                                      |
| openapi/operation                     | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of making an HTTP requests, based on operations                                                                                 |
| openapi/path-deserializer             | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations              |
| openapi/path-serializer               | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                |
| openapi/path-type                     | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [path parameters](https://swagger.io/docs/specification/serialization/#path) for operations                                       |
| openapi/query-deserializer            | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations            |
| openapi/query-serializer              | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations              |
| openapi/query-type                    | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [query parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                     |
| openapi/request-body-validator        | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on request bodies of operations                                   |
| openapi/request-headers-deserializer  | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations  |
| openapi/request-headers-serializer    | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations    |
| openapi/request-headers-type          | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting request [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                            |
| openapi/request-server-type           | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all inputs for operations (server variant, inputs wrappedn in [Try](https://www.npmjs.com/package/@oats-ts/try)s)                 |
| openapi/request-type                  | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all inputs for operations                                                                                                         |
| openapi/response-body-validator       | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on response bodies of operations                                  |
| openapi/response-headers-deserializer | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations |
| openapi/response-headers-serializer   | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations   |
| openapi/response-headers-type         | client, server, fullStack | Status code + [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject) | Types collecting response [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                           |
| openapi/response-type                 | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all outputs for operations                                                                                                        |
| openapi/sdk-impl                      | client                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Implementation of `openapi/sdk-impl` utilizing `openapi/operation`                                                                                 |
| openapi/sdk-type                      | client                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Type collecting all operations a client might call                                                                                                 |

## Extending generators

In case you want to dig deeper, and extend certain generators, check out the [source](https://github.com/oats-ts/oats-ts/tree/master/projects/openapi-generators).
