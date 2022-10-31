(()=>{var e,t,n,r={78788:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="# 🌱 oats\n\nThis project aims to provide a solution for generating quality Typescript code from API-describing documents. The only supported format currently is [OpenAPI 3.x](https://www.openapis.org), but there are plans to introduce generators for [AsyncAPI](https://www.asyncapi.com/) as well.\n\nThe goal is to minimize the boilerplate a human developer has to write, to reduce the tedium around keeping a client and a server in sync, and to allow devs to focus on just displaying or moving data, without worrying about the structural correctness of that data.\n\n## why?\n\nWhy does this project exists? There are countless OpenAPI generators out there.\n\nThe main goals/differences are:\n\n- Make it work for 1 language (Typescript), and do that well.\n- Make every part of the API replaceable (without forking the project) in case it doesn't suit your needs.\n- Make it easy to customize, to suit a wide variety of use cases out of the box.\n- Make the generated code as easy to read, as if a dev would have written it by hand (or get as close to this as possible).\n\n## get started with OpenAPI\n\n- Check out the [docs](OpenAPI_Workflow) to get started!\n- The [demo](#/demo) page lets you experiment with oats, right here in the browser\n- If you find any issues, I'd greatly appreciate if you [report](https://github.com/oats-ts/oats-ts/issues) it!\n"},68556:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="# Common mistakes\n\nOpenAPI it is an extremely loosely defined spec, that in turn lets you define your API and your schemas in many different ways. In this article I'm listing the most common \"mistakes\" that you can make, that doesn't make your OpenAPI document invalid, but effectively prevents tooling from outputing usable documentation or code.\n\n## TODO"},12537:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="# Custom Generators\n\nTODO"},15316:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="# Generate\n\nThe generator step is responsible for taking the validated output of the [reader](OpenAPI-Reader), and turning it into an intermediate representation (Typescript [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) in this case), that can be then turned into source code. The OpenAPI generator itself doesn't do much, the work is distributed to single responsiblity generators, that are responsible for generating one thing (like types from the JSON schemas, or serializers for parameters). They also provide means for other generators to access references to their generated content.\n\nThe generators that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-generators](https://www.npmjs.com/package/@oats-ts/openapi-generators) package.\n\n## Examples\n\n### Using individual generators\n\nYou can configure your generator from a set of code generators of your choosing. For this approach, it's the easiest to use `generators.create` from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi) package. You can use the generator names (see below) as the first argument, and optionally the approriate configuration object as the second argument (autocomplete will help with this).\n\n```ts\nimport { generator, nameProviders, pathProviders, generators } from '@oats-ts/openapi'\n\nconst withGenerators = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: [\n    generators.create('oats/type', { documentation: false }),\n    generators.create('oats/type-guard'),\n    generators.create('oats/type-validator'),\n  ],\n})\n```\n\n### Using presets\n\nYou can also use presets (I'd recommend starting with presets). Presets are a set of generators grouped toghether. The ones available currently are `presets.client()`, `presets.server()` and `presets.fullStack()`. The simplest way is to use the preset without any configuration:\n\n```ts\nimport { generator, nameProviders, pathProviders, presets } from '@oats-ts/openapi'\n\nconst withDefaults = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client(),\n})\n```\n\nPresets offer configuration options, that affect possibly multiple individual generators. In this case we are disabling the documentation for all the generators that support this option:\n\n```ts\nconst withOverrides = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client({\n    documentation: false,\n    validateResponses: false,\n  }),\n})\n```\n\nIn case you want to really fine tune presets, you can override the configuration for individual generators as well. In this case we are only generating documentation for types:\n\n```ts\nconst withOverrides = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client({ documentation: false }).override({ 'oats/type': { documentation: true } }),\n})\n```\n\n### Mixing presets and generators\n\nPresets and individual generators can be used together:\n\n```ts\nconst withPresetsAndGenerators = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: [presets.client(), generators.create('oats/express-cors-router-factory')],\n})\n```\n\n## Configuration\n\nThe main `generator` function can be configured with an object having the following properties:\n\n- `nameProvider: (input: any, originalName: string | undefined, target: string) => string` - A function that determines how each generated artifact is called. For reasonable, convention respecting names use `nameProviders.default()`\n  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).\n  - `originalName` optionally appears for pieces of the OpenAPI document, where the name is not part of the object itself (eg.: Schema object).\n  - `target` is one of the names listed below.\n- `pathProvider: (input: any, name: NameProvider, target: string) => string` - A function that determines where in the disk each artifact is written to (`SourceFile#fileName`). Check `pathProviders.*` for options.\n  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).\n  - `name` is a simplified function that takes the `input` and the `target` and delegates to the `nameProvider`.\n  - `target` is one of the names listed below.\n- `children: OpenAPIGenerator | OpenAPIGenerator[]` - A single generator or a list of generators. See available ones below.\n- `noEmit?: boolean = false` - When `true`, the generators return no output `SourceFile`s.\n- `name?: string = 'root'` - The name of the root generator, shows up in logs.\n\n## Available generators\n\nThere are a number of code generators available. These are part of certain presets, but can also be used individually, using `generators.create`. In case you want to see them in action, check the [demo](#/demo) page!\n\n| **Name**                             | **Preset**                | **Uses**                                                                                                                   | **Creates**                                                                                                                                                                 |\n| ------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| oats/type-guard                      | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | [Type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) based on JSON schemas                                              |\n| oats/type-guard                      | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on JSON schemas                                                                            |\n| oats/type                            | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | Typescript types based on JSON schemas                                                                                                                                      |\n| oats/api-type                        | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Type encapsulating server behaviour                                                                                                                                         |\n| oats/express-cors-router-factory     | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) handling CORS headers.                                 |\n| oats/express-router-factory          | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) encapsulating the app.                                 |\n| oats/express-app-router-factory      | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) for each operations.                                   |\n| oats/express-router-factories-type   | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Object type, with all [Express](https://expressjs.com) [Routers](https://expressjs.com/en/guide/routing.html)                                                               |\n| oats/express-context-handler-factory | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) handler for exposing OATS configuration for all routers                                                      |\n| oats/operation                       | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of making an HTTP requests, based on operations                                                                                                          |\n| oats/path-deserializer               | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                       |\n| oats/path-serializer                 | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                         |\n| oats/path-type                       | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [path parameters](https://swagger.io/docs/specification/serialization/#path) for operations                                                                |\n| oats/query-deserializer              | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                     |\n| oats/query-serializer                | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                       |\n| oats/query-type                      | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [query parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                              |\n| oats/cookie-deserializer             | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing client side Cookie headers for [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations    |\n| oats/cookie-serializer               | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing client side Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations       |\n| oats/set-cookie-deserializer         | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations |\n| oats/set-cookie-serializer           | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations   |\n| oats/cookies-type                    | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie) for operations                                                            |\n| oats/request-body-validator          | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on request bodies of operations                                                            |\n| oats/request-headers-deserializer    | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                           |\n| oats/request-headers-serializer      | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                             |\n| oats/request-headers-type            | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting request [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                     |\n| oats/request-server-type             | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all inputs for operations (server variant, inputs wrappedn in [Try](https://www.npmjs.com/package/@oats-ts/try)s)                                          |\n| oats/request-type                    | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all inputs for operations                                                                                                                                  |\n| oats/response-body-validator         | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on response bodies of operations                                                           |\n| oats/response-headers-deserializer   | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                          |\n| oats/response-headers-serializer     | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                            |\n| oats/response-headers-type           | client, server, fullStack | Status code + [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject) | Types collecting response [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                    |\n| oats/response-type                   | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all outputs for operations                                                                                                                                 |\n| oats/sdk-impl                        | client                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Implementation of `oats/sdk-impl` utilizing `oats/operation`                                                                                                                |\n| oats/sdk-type                        | client                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Type collecting all operations a client might call                                                                                                                          |\n\n## Extending generators\n\nIn case you want to dig deeper, and extend certain generators, check out the [source](https://github.com/oats-ts/oats-ts/tree/master/projects/openapi-generators).\n"},68114:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="# Using a generated SDK\n\nIn this guide you'll learn how to use a generated Oats SDK. If you followed the [\"Getting started\"](OpenAPI_GettingStarted) guide, now you sould have a `generated` folder in `src`, that contains a bunch of subfolders, and some generated code in them. The most important folder for us is `src/generated/sdk`, where you'll find a file called `BookStoreSdk.ts` and `BookStoreSdkImpl.ts`.\n\n## The SDK type\n\nThe content of `BookStoreSdk.ts` will be something like this (obviously with `import`s and optionally documentation):\n\n```typescript\nexport type BookStoreSdk = {\n  getBooks(request: GetBooksRequest): Promise<GetBooksResponse>\n  addBook(request: AddBookRequest): Promise<AddBookResponse>\n  getBook(request: GetBookRequest): Promise<GetBookResponse>\n}\n```\n\nThis type has a method for each [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object) under `paths` defined in your source OpenAPI document, with which you can execute each request the OpenAPI document defines.\n\nThe aim is to expose **clear functions with no extra nonsense**. When you want to make a request:\n\n- You have to provide a strictly typed input parameter (`request`), with all the user input encapsulated.\n- And when you run it, you get a strictly typed response, with everything relevant from the response encapsulated.\n\n## The SDK implementation\n\nThe SDK implementation implements the above type as a `class` implementation. To actually start using it, you need to instantiate this class, with an input parameter called `adapter` of type `ClientAdapter`. This adapter is responsible for bridiging the generated code with a request library. Oats comes with a single client adapter based on the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API. So instantiation looks something like this:\n\n```typescript\nimport { FetchClientAdapter } from '@oats-ts/openapi-fetch-client-adapter'\nimport { BookStoreSdkImpl } from './generated/sdk/BookStoreSdkImpl'\n\n// Instantiate adapter with a base URL, where your spec compliant server is running\nconst adapter = new FetchClientAdapter({ url: 'http://localhost:3000' })\n// Instantiate the SDK with the adapter\nconst sdk = new BookStoreSdkImpl(adapter)\n\n// Use the SDK\nconst booksResponse = await sdk.getBooks({ query: { offset: 0 } })\n```\n\n## The responses\n\nResponse types aim to encapsulate the responses defined in your source OpenAPI document without ambiguity. As an example, let's look at the response type used for the `getBooks` operation, called `GetBooksResponse`:\n\n```typescript\nexport type GetBooksResponse =\n  | {\n      statusCode: 200\n      mimeType: 'application/json'\n      body: Book[]\n      headers: GetBooks200ResponseHeaderParameters\n    }\n  | {\n      statusCode: 400\n      mimeType: 'application/json'\n      body: AppError[]\n    }\n  | {\n      statusCode: 500\n      mimeType: 'application/json'\n      body: AppError[]\n    }\n```\n\nIt is a union type of all the different responses, and they are discriminated by the `statusCode` and `mimeType` fields. This way, when you get a `GetBooksResponse`, checking the `statusCode` (and the `mimeType` in case you have multiple of those), `headers` and `body` types will not be a guesswork anymore:\n\nA practical example:\n\n```typescript\nconst resp = await sdk.getBook({ path: { bookId: 42 } })\n// In case the statusCode is 200 (and you use a type guard like so)\nif (resp.statusCode === 200) {\n  // The body is known to be of Book type, and you can safely access fields on it:\n  console.log(resp.body.title)\n} else {\n  // Otherwise status is 400 or 500, for both of which the body is an array of AppErrors:\n  resp.body.forEach((err) => console.error(err.message))\n}\n```\n\n# When does it throw?\n\nOats generated SDKs don't `throw` (or rather reject, as we are dealing with `Promise`s), unless the response is invalid according to the source OpenAPI document. Examples of rejections:\n\n- The `statusCode` doesn't match any of the statuses defined in the source OpenAPI document (eg.: it defines `200`, `400` and `500` but the response has a `403` status code).\n- The `mimeType` doesn't match any of the mime types defined for the given Operation and status code, defined in the source OpenAPI document (eg.: it defines `application/json` and `text/plain` but we get `application/xml`)\n- The response `body` doesn't validate against the schema described in the OpenAPI document\n\nIn all of these cases the server doesn't respect the same OpenAPI document we are working against, this is considered an unexpected situation, hence Oats throws.\n\nHowever, documented non `2xx` responses will not reject, the responses will be properly parsed, validated, etc, as according to the source OpenAPI document they are to be expected.\n\nThis gives you a flexible and easy to use way of error handling, that doesn't hide anything, but rather transparently reflects the servers described behaviour.\n"},92350:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="# Using a generated server\n\nTODO\n"},67404:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="# Getting Started\n\nIn this guide you'll learn how to set up and generate with Oats.\n\n## Prepare your OpenAPI document\n\nTo get started you'll need a valid OpenAPI document. If you are unsure about how to put together an OpenAPI document, a few pointers:\n\n- The [latest specification](https://spec.openapis.org/oas/latest.html)\n- Guide about [common mistakes](OpenAPI_CommonMistakes), when defining your OpenAPI document\n\nOats works with both remotely hosted OpenAPI documents - accessible using the HTTP(S) protocol - and local documents in your file system. In these guides I'm going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example:\n\n```text\nhttps://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json\n```\n\n## Install Oats generator modules\n\nTo get generating, you'll need the main Oats module. This simply contains all that you need to generate, but you won't need anything from this module, when using the generated code:\n\n```text\nnpm i @oats-ts/openapi\n```\n\n## Configure Oats\n\nOats borrows its configuration philosophy from Webpack, meaning code is configuration. Let's create a file called `oats.js` (you can call it whatever you want), and add a basic Oats configuration:\n\n```javascript\nconst oats = require('@oats-ts/openapi')\n\noats.generate({\n  logger: oats.loggers.simple(),\n  reader: oats.readers.https.json(\n    'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',\n  ),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    // Use presets.client() or presets.server() for just client/server side code\n    children: oats.presets.fullStack(),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n})\n```\n\nEach part of this code can be customized or even fully replaced. The main components are:\n\n- `generate` - The main generator harness function\n- `reader` - Reads the input, resolves it's dependencies, and structuraly validates it\n- `validator` - Semantically validates the resolved document\n- `generator` - Runs a set of code generators, either as a list of individual generators, or presets\n- `writer` - Writes the generator output to the disk\n- `logger` - Event-driven logger that logs important generator events\n\n## Run Oats\n\nNow that we have the generator set up, you can run it like any node.js script:\n\n```text\nnode ./oats.js\n```\n\n**NOTE:** In this example we are using Javascript for configuring and running the generator, even though the project is built in and for Typescript. In case you want to define your configuration in Typescript, you can, but you'll need to solve running it, for which the simplest solution is [`ts-node`](https://www.npmjs.com/package/ts-node). However in a decent IDE (like VSCode) you will still have good content assist in Javascript, when putting together this configuration, because of the type definitions exposed by the Oats packages.\n\n## Verify results\n\nIn case Oats successfully ran, you will see something like this in the terminal:\n\n```text\n✔ reader step completed using \"@oats-ts/openapi-reader\"\n✔ validator step completed using \"@oats-ts/openapi-validator\"\n✔ generator step completed using \"@oats-ts/openapi-generators\"\ni some outputs have runtime dependencies:\n  npm i \\\n    @oats-ts/openapi-express-server-adapter@0.0.43 \\\n    @oats-ts/openapi-fetch-client-adapter@0.0.43 \\\n    @oats-ts/openapi-runtime@0.0.43 \\\n    express@^4.18.1\n✔ writer step completed using \"@oats-ts/typescript-writer\"\n```\n\nSome generated outputs might have runtime dependencies (eg.: you generated `express` routers, therefore the generated code has a runtime depdency on `express`). These dependencies are summarized as a convenient `npm install` command after the generator step completes (on line `5` in this example).\n\nGrab this command, and run it:\n\n```text\nnpm i \\\n  @oats-ts/openapi-express-server-adapter@0.0.43 \\\n  @oats-ts/openapi-fetch-client-adapter@0.0.43 \\\n  @oats-ts/openapi-runtime@0.0.43 \\\n  express@^4.18.1\n```\n\n## Using the generated code\n\nDepending on what you generated (`client`, `server` or `fullStack` - meaning both), check out these guides highlighting how to use the generator output for each:\n\n- [Using the generated SDK](OpenAPI_GeneratedSdk)\n- [Using the generated server](OpenAPI_GeneratedServer)\n"},6926:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="# Read\n\nThe reader step is responsible for\n\n- Reading your OpenAPI 3.x document\n- Parsing it\n- Structurally validating it\n- Resolving it's internal and external [references](https://swagger.io/docs/specification/using-ref)\n- And exposing it to the next step\n\nThe reader that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-reader](https://www.npmjs.com/package/@oats-ts/openapi-reader) package.\n\n## Examples\n\n```ts\nimport { readers } from '@oats-ts/openapi'\n\n// Reads from the local file system, in json format\nconst jsonFileReader = readers.file.json('oa.json')\n\n// Reads from the local file system, in json format\nconst httpsYamlReader = readers.https.yaml('https://asd.com/oa.yaml')\n\n// Reads from any source in any format\nconst mixedReader = readers.mixed.mixed('http://localhost:3000/oa.json')\n```\n\n## Configuration\n\n### Read\n\nThe reader can be configured to read inputs a few different ways:\n\n- `http` - Reads main input document (and all possible references) from http. Will fail if the main input (or any of the references) are not accessible through http (https, local file system etc).\n- `https` - Reads main input document (and all possible references) from https. Will fail if the main input (or any of the references) are not accessible through https (http, local file, etc).\n- `file` - Reads main input document (and all possible references) from your local file system. Will fail if the main input (or any of the references) are not on your file system.\n- `mixed` - Reads main input document (and all possible references) from any of the sources above. You can have for example a main document in your local file system, that can reference a document through http, which references another document through https.\n- `test` - Reads main input document (and all possible references) from memory. Ideal for testing custom generators end-to-end.\n\n### Parse\n\nFor parsing the document that has been read, there are also a few different built-in solutions:\n\n- `json` - Parses the document(s) using [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).\n- `yaml` - Parses the document(s) using [yamljs](https://github.com/jeremyfa/yaml.js)\n- `mixed` - First tries to parse the document using `json`, then if that fails, it tries parsing using `yaml`. If both fail, the parsing is considered failed.\n\n## Advanced usage\n\nIn case the solutions above don't suit your needs, you can use the `readers.custom` function, to wich you need to provide a configuration object, with the following properties:\n\n- `path: string` - the entry point where the main document is\n- `sanitize: (path: string) => Try<string>` - Turns `path` into [fully qualified URI](https://www.ietf.org/rfc/rfc2396.txt)\n- `read: (uri: string) => Promise<Try<string>>` - Reads a document based on a fully qualified URI\n- `parse: (uri: string, input: string) => Promise<Try<OpenAPIObject>>` - Parses the result of a `read` into an `OpenAPIObject` (typings can be found in [@oats-ts/openapi-model](https://www.npmjs.com/package/@oats-ts/openapi-model))\n"},19029:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="# Validate\n\nThe valididator step is responsible for taking the output of the [reader](OpenAPI-Reader) step, and checking for structural and semantic errors.\n\nThe validator that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-validator](https://www.npmjs.com/package/@oats-ts/openapi-validator) package.\n\n## Examples\n\n```ts\nimport { validator } from '@oats-ts/openapi';\n\n// Default validator\nconst defaultValidator = validator();\n```\n\n## Configuration\n\nThe validator can be used configuration free. This is the default behaviour, and it ensures that the generators maintained as part of the oats project run correctly with your OpenAPI document.\n\nConfiguring the validator to suit your needs is possible, but currently experimental, docs are TBD, as the internal APIs might change.\n"},74709:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="# Workflow\n\nThis guide will walk you through on how to get started with oats and OpenAPI.\n\n## Set up the code generator\n\n### Dependencies\n\nLet's assume that you already have a Typescript project. The first thing you'll need is the core oats package (`@oats-ts/oats-ts`), and the OpenAPI specific libararies for oats (`@oats-ts/openapi`). Additionally we are going to write the generator's configuration in typescript as well, and to make it easy to run it, we are going to add `ts-node` to the project as well:\n\n```bash\nnpm i ts-node @oats-ts/oats-ts @oats-ts/openapi\n```\n\n### Generator configuration\n\nNext we need to put together the generator configuration, and we need to run this code.\n\nLet's assume, that your code lives in the `src` folder. Let's create a `generate.ts` file here (it's an ordinary typescript file, you can call it whatever you like):\n\n```ts\n// src/generate.ts\n\nimport { generate } from '@oats-ts/oats-ts'\nimport {\n  nameProviders,\n  generator,\n  pathProviders,\n  presets,\n  readers,\n  writers,\n  formatters,\n  loggers,\n  validator,\n} from '@oats-ts/openapi'\n\nimport prettierConfig from './.prettierrc.json'\n\ngenerate({\n  logger: loggers.simple(),\n  reader: readers.https.json('https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json'),\n  validator: validator(),\n  generator: generator({\n    nameProvider: nameProviders.default(),\n    pathProvider: pathProviders.default('src/generated'),\n    children: presets.fullStack(),\n  }),\n  writer: writers.typescript({\n    format: formatters.prettier(prettierConfig),\n  }),\n})\n```\n\n### Breakdown\n\n- `generate` - The main generator harness. Responsible for coordinating the generator steps.\n  - `logger` - Logs the generator events as they happen. Can be either `simple` or `verbose`. If ommited, you will have no feedback about what's happening, so it's recommended to use a logger.\n  - `reader` - Reads the root OpenAPI document, resolving it's internal (and external) dependencies. Also structurally validates the document. Can read from `file`, `http` or `https` in `json` and `yaml` formats. For this example we are using a dummy OpenAPI document I use for testing, see more here: https://github.com/oats-ts/oats-schemas .\n  - `validator` - Takes the output of the reader, and validates it for any possible inconsistencies or issues that might trip up the generators.\n  - `generator` - Takes the output of the reader, and generates Typescript syntax tree from it. The work of the generator is split into smaller, single responsibilty code-generators, that are responsible for a single concern, eg.: generate schema types or parameter serializers.\n    - `nameProvider` - Function determining how each generated artifact should be named.\n    - `pathProvider` - Function determining what disk location each artifact should be written to.\n    - `children` - Either a list of single-responsible code-generators, or a preset, which is a collection of these generators. Individual generators are exposed in the `generators` object, coming from the `'@oats-ts/openapi'` package.\n  - `writer` - Takes the output of the generator, stringifies the syntax tree (SourceFiles), and then writes them to the disk.\n    - `format` - Function formatting the output before it gets written to the disk. In this case using the prettier formatter, and with the config the project is already using.\n\n## Run the code generator\n\nTo run it, you can either compile it and run it using the `node` command, or you can use `ts-node` to save the extra step (we are opting for this in this guide). You don't need any special runner.\n\n```bash\nts-node src/generate.ts\n```\n\nWhich will output something like:\n\n```bash\n✔ reader step completed using \"@oats-ts/openapi-reader\"\n✔ validator step completed using \"@oats-ts/openapi-validator\"\n✔ generator step completed using \"@oats-ts/openapi-generators\"\n✔ writer step completed using \"@oats-ts/typescript-writer\"\n```\n\nFor convenience, you could create an entry in your `package.json`, that runs this command, eg.:\n\n```jsonc\n{\n  \"name\": \"your-project\",\n  // ...\n  \"scripts\": {\n    // ...\n    \"oats\": \"ts-node src/generate.ts\"\n  }\n}\n```\n\nThen you can just do this, for subsequent generator runs:\n\n```bash\nnpm run oats\n```\n\n## Where to go from here?\n\n- If you this looks interesting, check out the [demo](#/demo) page, where you can see the outputs of each generator, with either your OpenAPI inputs or samples!\n- If you find any issues, I'd greatly appreciate if you [report](https://github.com/oats-ts/oats-ts/issues) it!\n"},59799:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="# Write\n\nThe writer step is responsible for taking the output of the [generator step](OpenAPI-Generator) and writing it's outputs to the disk. The typescript writer takes typescript `SourceFile`s (this is Typescript's in-memory representation of an AST + file location) and writes them to the desired location.\n\nAdditionally it can add leading / trailing comments to each of your generated files. This is ideal for warning people that the file is generated and should be edited manually, or for disabling certain linter rules for the generated files.\n\n## Example\n\n### Basic usage\n\nBasic usage, formats the code using your project's prettier configuration. Formatter can be omitted, but the generated code won't be pretty in this case.\n\n```ts\nimport { writers, formatters } from '@oats-ts/openapi'\nimport prettierConfig from './.prettierrc.json'\n\nconst writer = writers.typescript.file({\n  format: formatters.prettier(prettierConfig),\n})\n```\n\n### With comments\n\nAdds comments. First leading comment warns about the fact that the file is generated, the second disables some `eslint` rules. The trailing comment re-enables these rules, so other code is not affected **(this is just an example, generated code will not break these specific rules)**.\n\n```ts\nimport { writers, formatters } from '@oats-ts/openapi'\nimport prettierConfig from './.prettierrc.json'\n\nconst writer = writers.typescript.file({\n  format: formatters.prettier(prettierConfig),\n  comments: {\n    leadingComments: [\n      {\n        type: 'block',\n        text: 'This is a generated file, please do not edit by hand!',\n      },\n      {\n        type: 'block',\n        text: 'eslint-disable no-console, no-alert',\n      },\n    ],\n    trailingComments: [\n      {\n        type: 'block',\n        text: 'eslint-enable no-console, no-alert',\n      },\n    ],\n  },\n})\n```\n\n## Configuration\n\nThe `writers.typescript` object exposes 3 factory functions:\n\n- `file` - Writes the generated code to the disk. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n- `memory` - Doesn't write the output to the disk, returns the generated code instead as `{ path: string; content: string }[]` instead. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n- `custom` - Customizeable `write` function, ideal if you want to send the output over the wire for example. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n  - `write(path: string, content: string): Promise<void>` - Writes the stringified, possibly formatted `content` to the disk at `path`.\n"},70629:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r='✔ reader step completed using "@oats-ts/openapi-reader"\n✔ validator step completed using "@oats-ts/openapi-validator"\n✔ generator step completed using "@oats-ts/openapi-generators"\ni npm i @oats-ts/client-runtime @oats-ts/express-runtime express@^4.18.1\n✔ writer step completed using "@oats-ts/typescript-writer"'},26360:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r="import * as oats from '@oats-ts/openapi'\n\noats.generate({\n  logger: oats.loggers.simple(),\n  reader: oats.readers.https.json('https://your.openapi.doc'),\n  // Or if you are generating from a local file:\n  // reader: oats.readers.file.json('openapi.json'),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    children: oats.presets.fullStack(),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n})\n"},11761:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.markdown=void 0;const o=r(n(78788)),a=r(n(15316)),i=r(n(6926)),s=r(n(19029)),l=r(n(74709)),c=r(n(59799)),d=r(n(12537)),u=r(n(67404)),p=r(n(68114)),m=r(n(92350)),f=r(n(68556));t.markdown={Home:o.default,OpenAPI_Generate:a.default,OpenAPI_Read:i.default,OpenAPI_Validate:s.default,OpenAPI_Workflow:l.default,Typescript_Write:c.default,OpenAPI_GettingStarted:u.default,OpenAPI_GeneratedSdk:p.default,OpenAPI_GeneratedServer:m.default,OpenAPI_CustomGenerators:d.default,OpenAPI_CommonMistakes:f.default}},27912:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.storage=t.Ttl=void 0;const r=n(96486);t.Ttl={seconds:e=>1e3*e,minutes:e=>e*t.Ttl.seconds(60),hours:e=>e*t.Ttl.minutes(60),days:e=>e*t.Ttl.hours(24)},t.storage={get(e,t,n){const o=localStorage.getItem(e);if((0,r.isNil)(o))return t;try{const{value:a,ttl:i}=JSON.parse(o);return((0,r.isNil)(i)||Date.now()<i)&&(void 0===n||n?.(a))?a:(localStorage.removeItem(e),t)}catch(e){return console.error(e),t}},set(e,t,n){const o={value:t,ttl:(0,r.isNil)(n)?void 0:Date.now()+n};return localStorage.setItem(e,JSON.stringify(o))}}},72428:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppV2=void 0;const o=r(n(67294)),a=n(49818),i=n(83871),s=n(95462),l=n(16381);t.AppV2=()=>o.default.createElement(a.Routes,null,o.default.createElement(a.Route,{index:!0,element:o.default.createElement(l.LandingPage,null)}),o.default.createElement(a.Route,{path:"documentation",element:o.default.createElement(s.DocumentationPage,null)}),o.default.createElement(a.Route,{path:"documentation/:page",element:o.default.createElement(s.DocumentationPage,null)}),o.default.createElement(a.Route,{path:"editor",element:o.default.createElement(i.ConfigurationEditorPage,null)}))},39226:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const i=a(n(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:n})=>{const[r,o]=(0,i.useState)((()=>window.matchMedia(t.breakpoints[n]).matches));return(0,i.useEffect)((()=>{window.matchMedia(t.breakpoints[n]).addEventListener("change",(e=>o(e.matches)))}),[]),r?i.default.createElement(e,null):null}},12872:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppContainer=void 0;const o=n(18592),a=r(n(67294)),i=n(61329),s=o.css`
  label: app-container;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin: ${i.theme.spacing.zero};
  padding: ${i.theme.spacing.zero};
  background-color: ${i.theme.colors.dark3};
`;t.AppContainer=({children:e})=>a.default.createElement("div",{className:s},e)},40355:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Autocomplete=void 0;const i=a(n(67294)),s=n(88899),l=n(67453),c=n(96486),d=n(18592),u=n(61329),p=n(48228),m=d.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${u.theme.spacing.zero} ${u.theme.spacing.xm} ${u.theme.spacing.zero} ${u.theme.spacing.zero};
  cursor: pointer;
`,f=d.css`
  border-width: ${u.theme.spacing.zero};
  outline: none;
  border-radius: ${u.theme.spacing.s};
  flex: ${u.theme.flex.grow};
  padding: ${u.theme.spacing.m} ${u.theme.spacing.zero} ${u.theme.spacing.m} ${u.theme.spacing.xm};
  color: ${u.theme.colors.text};
  background-color: ${u.theme.colors.transparent};
  ::placeholder {
    color: ${u.theme.colors.placeholder};
  }
`;t.Autocomplete=function({items:e,placeholder:t,value:n,customLabel:r="Custom value",onChange:o=(()=>{}),getKey:a=(e=>e),getValue:h=(e=>e),getDescription:g=(()=>{})}){const b=(0,i.useMemo)((()=>{if((0,c.isNil)(n)||0===n.length)return e;const t=e.filter((e=>e.toLowerCase().includes(n.toLowerCase())));return 0===t.length?[n]:t}),[n,e]),{isOpen:y,highlightedIndex:v,getInputProps:w,getToggleButtonProps:x,getMenuProps:_,getItemProps:O}=(0,s.useCombobox)({items:b,inputValue:n,onSelectedItemChange:e=>{o(e.inputValue)},onIsOpenChange:e=>{o(e.inputValue)}}),{onFocus:E,onBlur:P,onChange:k,...S}=w();return i.default.createElement("div",{className:(0,p.dropdownContainerStyle)(y)},i.default.createElement("div",{...x(),className:m},i.default.createElement("input",{...S,onChange:e=>{o(e.target.value),k(e)},placeholder:t,value:n??"",className:f}),i.default.createElement(l.HiChevronDown,{color:u.theme.colors.text})),i.default.createElement("ul",{..._(),className:p.dropdownStyle},y&&b.length>0&&b.map(((t,n)=>{const o=(0,d.cx)(p.dropdownItemStyle,v===n?p.focusedDropownItemStyle:void 0),s=h(t),l=a(t),u=e.includes(t)?g(t):r;return i.default.createElement("li",{...O({item:t,index:n}),className:o,key:`${l}${n}`},i.default.createElement("span",{className:p.dropdownItemLabelStyle},s),(0,c.isNil)(u)?null:i.default.createElement("span",{className:p.dropdownItemDescriptionStyle},u))}))))}},79514:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const o=n(18592),a=r(n(67294)),i=n(61329),s=o.css`
  label: secondary-button;
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};

  &:hover {
    background-color: ${i.theme.colors.buttonHover};
  }
`,l=o.css`
  label: primary-button;
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.green};

  &:hover {
    background-color: #2ea043;
  }
`,c=o.css`
  label: button;
  display: flex;
  gap: ${i.theme.spacing.s};
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  border: unset;
  border-radius: ${i.theme.spacing.s};
  padding: ${i.theme.spacing.m} ${i.theme.spacing.xm};
  position: relative;
  font-weight: 400;
  cursor: pointer;
  font-size: ${i.theme.fontSize.m};
  box-shadow: rgba(0, 0, 0, 0.05) ${i.theme.spacing.zero} ${i.theme.spacing.xs} ${i.theme.spacing.s};
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) ${i.theme.spacing.zero} ${i.theme.spacing.xs} ${i.theme.spacing.xxm};
  }
`;t.Button=({children:e,variant:t,className:n,onClick:r})=>{const i=(0,o.cx)(c,"primary"===t?l:s,n);return a.default.createElement("button",{className:i,onClick:r},e)}},9849:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Chip=void 0;const i=n(18592),s=a(n(67294)),l=n(67453),c=n(61329),d=i.css`
  padding: ${c.theme.spacing.xs} ${c.theme.spacing.s};
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${c.theme.fontSize.xs};
  background-color: ${c.theme.colors.dark3};
  color: ${c.theme.colors.muted};
  border-radius: ${c.theme.spacing.s};
  gap: ${c.theme.spacing.xs};
  &:hover {
    color: ${c.theme.colors.text};
    background-color: ${c.theme.colors.dark2};
  }
`;t.Chip=(0,s.forwardRef)((({label:e,removeable:t,onRemove:n,children:r,...o},a)=>s.default.createElement("span",{className:d,ref:a,onClick:t?e=>{e.stopPropagation(),e.preventDefault(),n?.()}:void 0,...o},e,t&&s.default.createElement(l.HiXMark,null))))},41298:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const o=n(18592),a=r(n(67294)),i=n(61329),s=o.css`
  font-size: ${i.theme.fontSize.code};
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};
  padding: ${i.theme.spacing.xxxs} ${i.theme.spacing.xxs};
  border-radius: ${i.theme.spacing.xs};
`;t.Code=({className:e,children:t,...n})=>a.default.createElement("code",{className:(0,o.cx)(s,e),...n},t)},9378:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CommentsTable=void 0;const o=n(18592),a=r(n(67294)),i=n(67453),s=n(61329),l=n(69395),c=n(9155),d=n(6488),u=n(89937),p=[{value:"line",key:"line",label:"Line comment",description:"Example: // Your comment"},{value:"block",key:"block",label:"Block comment",description:"Example: /* Your comment */"},{value:"jsdoc",key:"jsdoc",label:"JSDoc comment",description:"Example: /** Your comment */"}],m=o.css`
  color: ${s.theme.colors.muted};
  font-size: ${s.theme.fontSize.m};
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: ${s.theme.spacing.xs};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: ${s.theme.colors.text};
  }
`,f=o.css`
  width: 50%;
`,h=o.css`
  min-width: 150px;
`;t.CommentsTable=({value:e,onChange:t})=>{const n=n=>()=>t(e.filter(((e,t)=>t!==n))),r=n=>r=>t(e.map(((e,t)=>t===n?{...e,text:r.target.value}:e))),o=n=>({value:r})=>{t(e.map(((e,t)=>t===n?{...e,type:r}:e)))};return a.default.createElement(u.Table,null,a.default.createElement(u.THead,null,a.default.createElement(u.Tr,{isHeader:!0},a.default.createElement(u.Th,{className:f},"Type"),a.default.createElement(u.Th,{className:f},"Text"),a.default.createElement(u.Th,{className:h},a.default.createElement("span",{className:m,onClick:()=>t([...e,{text:"",type:"line"}])},a.default.createElement(i.HiPlusCircle,null)," Add new")))),a.default.createElement(u.TBody,null,0===e.length?a.default.createElement(u.Tr,{"aria-colspan":3},a.default.createElement(u.Td,null,"No comments")):e.map(((e,t)=>a.default.createElement(u.Tr,{key:t},a.default.createElement(u.Td,null,a.default.createElement(c.Input,{placeholder:"Text",onChange:r(t),value:e.text})),a.default.createElement(u.Td,null,a.default.createElement(d.Select,{placeholder:"Type",items:p,onChange:o(t),value:p.find((t=>t.value===e.type)),getDescription:l.dd.getDescription,getKey:l.dd.getKey,getValue:l.dd.getValue})),a.default.createElement(u.Td,null,a.default.createElement("span",{className:m,onClick:n(t)},a.default.createElement(i.HiXCircle,null)," Delete")))))))}},67036:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ConfigurationFormGroup=void 0;const o=n(18592),a=n(96486),i=r(n(67294)),s=n(61329),l=n(86299),c=o.css`
  label: group-header;
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.text};
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${s.theme.spacing.zero};
  margin-bottom: ${s.theme.spacing.xxm};
`,d=o.css`
  flex: ${s.theme.flex.grow};
  text-transform: uppercase;
`,u=o.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s.theme.spacing.xs};
`,p=o.css`
  background-color: ${s.theme.colors.dark2};
  padding: ${s.theme.spacing.xxm};
  border-radius: ${s.theme.spacing.m};
  margin-bottom: ${s.theme.spacing.xxm};
  z-index: 1;
  &:last-of-type {
    margin-bottom: ${s.theme.spacing.zero};
  }
`,m=o.css`
  border-top-left-radius: ${s.theme.spacing.zero};
  border-top-right-radius: ${s.theme.spacing.zero};
`,f=o.css`
  border-bottom-left-radius: ${s.theme.spacing.zero};
  border-bottom-right-radius: ${s.theme.spacing.zero};
  margin-bottom: ${s.theme.spacing.zero};
`,h=o.css`
  label: attachment;
  background-color: ${s.theme.colors.dark2};
  color: ${s.theme.colors.text};
  font-size: ${s.theme.fontSize.m};
  display: flex;
  gap: ${s.theme.spacing.s};
  align-items: center;
  justify-content: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  border: unset;
  padding: ${s.theme.spacing.m} ${s.theme.spacing.xxm};
  position: relative;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: ${s.theme.colors.dark1};
  }
`,g=(0,o.cx)(h,o.css`
    border-top-left-radius: ${s.theme.spacing.m};
    border-top-right-radius: ${s.theme.spacing.m};
  `),b=(0,o.cx)(h,o.css`
    border-bottom-left-radius: ${s.theme.spacing.m};
    border-bottom-right-radius: ${s.theme.spacing.m};
    margin-bottom: ${s.theme.spacing.xxm};
  `);t.ConfigurationFormGroup=({name:e,topAttachmentLabel:t,topAttachmentIcon:n,bottomAttachmentLabel:r,bottomAttachmentIcon:s,children:h,icon:y,titleButtonLabel:v,titleButtonIcon:w,onTitleButtonClick:x,onAttachmentClick:_})=>{const O=!(0,a.isNil)(t),E=!(0,a.isNil)(r),P=!(0,a.isNil)(v),k=(0,o.cx)(p,O?m:void 0,E?f:void 0);return i.default.createElement(i.default.Fragment,null,i.default.createElement("h2",{className:c},y?i.default.createElement(y,null):null,i.default.createElement("span",{className:d},e),P&&i.default.createElement(l.Link,{className:u,onClick:x},w?i.default.createElement(w,null):null,v)),O&&i.default.createElement("div",{className:g,onClick:()=>_?.("top")},n?i.default.createElement(n,null):null,t),i.default.createElement("section",{className:k},h),E&&i.default.createElement("div",{className:b,onClick:()=>_?.("bottom")},s?i.default.createElement(s,null):null,r))}},4151:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Content=void 0;const o=r(n(67294)),a=n(18592),i=n(69512),s=n(61329),l=a.css`
  label: content;
  width: 100%;
  flex: ${s.theme.flex.grow};
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  display: flex;
  flex-direction: column;
`;t.Content=({children:e})=>o.default.createElement("main",{className:(0,a.cx)(l,i.containerStyle)},e)},40782:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const o=n(18592),a=r(n(67294)),i=n(61329),s=o.css`
  label: doc-container;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  margin: ${i.theme.spacing.zero};
  padding: ${i.theme.spacing.zero};
  background-color: ${i.theme.colors.dark3};
`;t.DocContainer=({children:e})=>a.default.createElement("div",{className:s},e)},55050:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Footer=void 0;const o=n(18592),a=r(n(67294)),i=n(79129),s=n(61329),l=n(86299),c=o.css`
  label: footer;
  background-color: ${s.theme.colors.dark1};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${s.theme.spacing.xxxl} ${s.theme.spacing.m};
  gap: ${s.theme.spacing.m};
`,d=o.css`
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.muted};
`,u=o.css`
  font-size: ${s.theme.fontSize.s};
  color: ${s.theme.colors.muted};
`,p=o.css`
  display: flex;
  gap: ${s.theme.spacing.s};
  align-items: center;
  text-decoration: none;
  margin-bottom: ${s.theme.spacing.xxm};
`,m=o.css`
  font-weight: 700;
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  font-size: ${s.theme.fontSize.l};
  color: ${s.theme.colors.muted};
`;t.Footer=()=>a.default.createElement("footer",{className:c},a.default.createElement("a",{className:p,href:"#"},a.default.createElement(i.SvgLogo,{width:60,color:s.theme.colors.muted}),a.default.createElement("h1",{className:m},"Oats")),a.default.createElement("span",{className:d},"Copyright © 2022 Balázs Édes"),a.default.createElement("span",{className:u},"All Oats modules under the ",a.default.createElement(l.Link,{href:"https://opensource.org/licenses/MIT"},"MIT license")))},46219:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.FormSection=void 0;const o=n(18592),a=n(96486),i=r(n(67294)),s=n(61329),l=o.css`
  margin-bottom: ${s.theme.spacing.l};
  display: flex;
  flex-direction: column;
  gap: ${s.theme.spacing.xs};
  &:last-of-type {
    margin-bottom: ${s.theme.spacing.zero};
  }
`,c=o.css`
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.text};
`,d=o.css`
  font-size: ${s.theme.fontSize.s};
  color: ${s.theme.colors.muted};
`;t.FormSection=({children:e,name:t,description:n})=>i.default.createElement("section",{className:l},i.default.createElement("label",{className:c},t),(0,a.isNil)(n)?null:i.default.createElement("span",{className:d},n),e)},20364:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Headlines=void 0;const o=n(18592),a=r(n(67294)),i=n(67453),s=n(61329),l=n(79514),c=n(39226),d=o.css`
  label: headlines;
  display: flex;
  flex-direction: row;
  gap: ${s.theme.spacing.l};

  @media ${c.breakpoints.phone} {
    flex-direction: column;
    gap: ${s.theme.spacing.h};
  }
`,u=o.css`
  label: headlines-items-container;
  color: ${s.theme.colors.muted};
  font-size: ${s.theme.fontSize.m};
`,p=o.css`
  label: headlines-item-header;
  display: flex;
  align-items: center;
  gap: ${s.theme.spacing.xs};
  text-transform: uppercase;
  color: ${s.theme.colors.text};
  font-size: ${s.theme.fontSize.m};
  margin-top: ${s.theme.spacing.zero};
`,m=o.css`
  label: headlines-item-content;
  margin-bottom: ${s.theme.spacing.l};
  flex: ${s.theme.flex.grow};
`;t.Headlines=()=>a.default.createElement("div",{className:d},a.default.createElement("div",{className:u},a.default.createElement("h3",{className:p},a.default.createElement(i.HiPuzzlePiece,null),"Generate an SDK"),a.default.createElement("section",{className:m},"Create an easy to use, statically typed SDK for your backend, with all the bells and whistles, and either use it in house, or expose it to your customers."),a.default.createElement(l.Button,null,a.default.createElement(i.HiBookOpen,null),"Learn more")),a.default.createElement("div",{className:u},a.default.createElement("h3",{className:p},a.default.createElement(i.HiServerStack,null),"Generate the backend"),a.default.createElement("section",{className:m},"Generate all the tedious parts of your backend, like routing, parameter and body parsing and serialization, and CORS, and just implement moving data."),a.default.createElement(l.Button,null,a.default.createElement(i.HiBookOpen,null),"Learn more")),a.default.createElement("div",{className:u},a.default.createElement("h3",{className:p},a.default.createElement(i.HiWrenchScrewdriver,null),"Customize generators"),a.default.createElement("section",{className:m},"The available generators don't fully suit your needs, or you need more? Customize existing generators, or create your own, without writing everything from scratch."),a.default.createElement(l.Button,null,a.default.createElement(i.HiBookOpen,null),"Learn more")))},48732:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HeroSection=void 0;const o=n(18592),a=r(n(67294)),i=n(61329),s=n(79514),l=n(39226),c=n(67453),d=n(86299),u=n(69512),p=o.css`
  label: hero-section;
  width: 100%;
  margin: ${i.theme.spacing.zero};
  padding: ${i.theme.spacing.xh} ${i.theme.spacing.zero};
  @media ${l.breakpoints.desktop} {
    padding: ${i.theme.spacing.xxh} ${i.theme.spacing.zero};
  }
  @media ${l.breakpoints.tablet} {
    padding: ${i.theme.spacing.xh} ${i.theme.spacing.zero};
  }
`,m=o.css`
  label: hero-section-content;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: ${i.theme.spacing.xxm};
  height: 100%;
`,f=o.css`
  label: hero-text-1;
  font-size: ${i.theme.fontSize.xl};
  color: ${i.theme.colors.text};
  margin: ${i.theme.spacing.zero};
  text-align: center;
`,h=o.css`
  label: hero-text-2;
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.m};
  font-weight: 400;
  margin: ${i.theme.spacing.zero} ${i.theme.spacing.zero} ${i.theme.spacing.xxm} ${i.theme.spacing.zero};
  width: 70%;
  text-align: center;
  flex-shrink: 0;
`,g=o.css`
  label: hero-button-container;
  display: flex;
  gap: ${i.theme.spacing.m};
`;t.HeroSection=()=>a.default.createElement("div",{className:p},a.default.createElement("div",{className:(0,o.cx)(u.containerStyle,m)},a.default.createElement("h2",{className:f},"Generate TypeScript from OpenAPI, that makes sense."),a.default.createElement("h3",{className:h},"Customizable, extensible and ",a.default.createElement("b",null,"open source")," code generators, that output quality"," ",a.default.createElement(d.Link,{href:"https://www.typescriptlang.org"},"TypeScript"),", from your"," ",a.default.createElement(d.Link,{href:"https://www.openapis.org"},"OpenAPI")," definitions."),a.default.createElement("div",{className:g},a.default.createElement(s.Button,{variant:"primary"},a.default.createElement(c.HiPlay,null)," Get Started"),a.default.createElement(s.Button,null,a.default.createElement(c.HiCodeBracket,null)," Github"))))},12259:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HomeTreeRoot=void 0;const o=r(n(67294)),a=n(67453),i=n(81911),s=n(5838);t.HomeTreeRoot=()=>{const{setMenuOpen:e}=(0,i.useMobileContext)();return o.default.createElement(s.TreeNode,{value:void 0,level:0,getIcon:()=>a.HiHome,getLabel:()=>"Home",isActive:()=>!1,onClick:()=>e(!1),getHref:()=>"#"})}},9155:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Input=void 0;const o=r(n(67294)),a=n(18592),i=n(61329),s=a.css`
  label: input;
  width: 100%;
  background-color: ${i.theme.colors.dark1};
  color: ${i.theme.colors.text};
  font-size: ${i.theme.fontSize.m};
  border-radius: ${i.theme.spacing.s};
  padding: ${i.theme.spacing.m} ${i.theme.spacing.xm};
  border-width: ${i.theme.spacing.zero};
  outline: none;

  &::placeholder {
    color: ${i.theme.colors.placeholder};
  }
`;t.Input=({children:e,className:t,...n})=>o.default.createElement("input",{className:(0,a.cx)(s,t),...n},e)},86299:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const o=r(n(67294)),a=n(18592),i=n(61329),s=n(96486),l=a.css`
  label: link;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  gap: ${i.theme.spacing.s};
  align-items: center;
  transition: color 150ms linear;
  text-decoration: underline;
  color: ${i.theme.colors.muted};

  &:hover {
    text-decoration: none;
    color: ${i.theme.colors.text};
  }
`;t.Link=({children:e,className:t,onClick:n,...r})=>(0,s.isNil)(n)?o.default.createElement("a",{className:(0,a.cx)(l,t),...r},e):o.default.createElement("span",{className:(0,a.cx)(l,t),onClick:n,...r},e)},15435:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const o=n(18592),a=n(67535),i=n(96486),s=r(n(67294)),l=n(61329),c=n(79129),d=o.css`
  label: side-bar-logo;
  display: flex;
  gap: ${l.theme.spacing.m};
  align-items: center;
  text-decoration: none;
`,u=o.css`
  display: flex;
  flex-direction: column;
`,p=o.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: ${l.theme.spacing.zero};
  padding: ${l.theme.spacing.zero};
  font-size: ${l.theme.fontSize.l};
  color: ${l.theme.colors.text};
`,m=o.css`
  color: ${l.theme.colors.muted};
`,f=o.css`
  font-size: ${l.theme.fontSize.s};
  color: ${l.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:n})=>s.default.createElement("a",{className:d,href:n},s.default.createElement(c.SvgLogo,{width:60}),s.default.createElement("div",{className:u},s.default.createElement("h1",{className:p},"Oats ",(0,i.isNil)(e)?null:s.default.createElement("span",{className:m},e)),t&&s.default.createElement("span",{className:f},"v",a.version)))},39550:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const o=n(18592),a=r(n(67294)),i=n(39226),s=n(61329),l=o.css`
  margin: ${s.theme.spacing.m} ${s.theme.spacing.m} ${s.theme.spacing.xxxl} ${s.theme.spacing.m};
  @media ${i.breakpoints.phone} {
    margin: ${s.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>a.default.createElement("div",{className:l},e)},76197:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const s=n(18592),l=n(96486),c=i(n(67294)),d=a(n(23209)),u=i(n(34112)),p=n(11761),m=n(61329),f=n(41298),h=n(86299),g=n(7807),b=n(89937),y=s.css`
  color: ${m.theme.colors.text};
  font-size: ${m.theme.fontSize.l};
  margin-top: ${m.theme.spacing.zero};
`,v=s.css`
  color: ${m.theme.colors.text};
  font-size: ${m.theme.fontSize.m};
`,w=s.css`
  color: ${m.theme.colors.text};
  font-size: ${m.theme.fontSize.m};
`,x=s.css`
  margin: ${m.theme.spacing.l};
`,_=Object.keys(p.markdown),O=e=>_.some((t=>e.startsWith(t)))?"Home"===e?"#":`#/documentation/${e}`:(0,d.uriTransformer)(e),E=[u.default],P={h1:({children:e})=>c.default.createElement("h1",{className:y},e),h2:({children:e})=>c.default.createElement("h2",{className:v},e),h3:({children:e})=>c.default.createElement("h3",{className:w},e),table:({children:e})=>c.default.createElement(b.Table,null,e),tr:({children:e,isHeader:t})=>c.default.createElement(b.Tr,{isHeader:t},e),th:({children:e})=>c.default.createElement(b.Th,null,e),td:({children:e})=>c.default.createElement(b.Td,null,e),a:({href:e,children:t})=>c.default.createElement(h.Link,{href:e},t),code({node:e,inline:t,className:n,children:r,...o}){const a=/language-(\w+)/.exec(n||"");return null===a||t?c.default.createElement(f.Code,{...o},r):c.default.createElement(g.SyntaxHighlighter,{language:a[1],kind:"docs"},String(r).replace(/\n$/,""))}};t.MarkdownView=({page:e})=>(0,l.isNil)(e)||(0,l.isNil)(p.markdown[e])?c.default.createElement("div",null,"The documentation page you are looking for doesn't exist."):c.default.createElement(d.default,{remarkPlugins:E,components:P,transformLinkUri:O,className:x},p.markdown[e])},55023:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuBar=void 0;const o=n(18592),a=r(n(67294)),i=n(39226),s=n(61329),l=o.css`
  label: menu-bar;
  display: flex;
  flex-direction: row;
  padding: ${s.theme.spacing.zero};
  @media ${i.breakpoints.phone} {
    flex-direction: column;
    gap: ${s.theme.spacing.l};
  }
`;t.MenuBar=({children:e})=>a.default.createElement("ul",{className:l},e)},20012:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuItem=void 0;const o=n(18592),a=n(96486),i=r(n(67294)),s=n(39226),l=n(61329),c=o.css`
  label: active-menu-item;
  color: ${l.theme.colors.text};
`,d=o.css`
  label: menu-item-anchor;
  position: relative;
  text-decoration: none;
  color: ${l.theme.colors.muted};
  display: flex;
  gap: ${l.theme.spacing.s};
  align-items: center;
  transition: color 150ms linear;

  &:hover {
    color: ${l.theme.colors.text};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -${l.theme.spacing.xxs};
    left: 0;
    width: 100%;
    height: ${l.theme.spacing.xxxs};
    background-color: ${l.theme.colors.text};
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
  }

  &:hover::after,
  &:focus::after {
    opacity: 1;
    transform: translate3d(0, 0.2em, 0);
  }

  &::after,
  &:focus::after {
    opacity: 1;
    transform: scale(0);
    transform-origin: center;
  }

  &:hover::after {
    transform: scale(1);
  }
`,u=o.css`
  label: menu-item;
  height: 100%;
  padding: ${l.theme.spacing.zero} ${l.theme.spacing.l};
  display: flex;
  gap: ${l.theme.spacing.s};
  align-items: center;
  cursor: pointer;
  color: ${l.theme.colors.text};
  font-size: ${l.theme.fontSize.m};
  @media ${s.breakpoints.phone} {
    padding: ${l.theme.spacing.zero} ${l.theme.spacing.m};
  }
`;t.MenuItem=({label:e,active:t,href:n,onClick:r,icon:s})=>{const l=(0,o.cx)(d,t?c:void 0),p=(0,a.isNil)(n)?r:void 0;return i.default.createElement("li",{className:u,onClick:p},i.default.createElement("a",{href:n,className:l},i.default.createElement(s,null),i.default.createElement("span",null,e)))}},81911:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const r=n(96486),o=n(67294);t.MobileContext=(0,o.createContext)({isMenuOpen:!1,setMenuOpen:r.noop}),t.useMobileContext=()=>(0,o.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,o.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},52630:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const o=n(18592),a=r(n(67294)),i=n(61329),s=n(39550),l=n(15435),c=o.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,d=o.css`
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.xl};
  cursor: pointer;
  margin: ${i.theme.spacing.m};
  &:hover {
    color: ${i.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:n,actionIcon:r,onAction:o})=>a.default.createElement("div",{className:c},a.default.createElement(s.LogoContainer,null,a.default.createElement(l.Logo,{name:e,version:t,href:n})),a.default.createElement(r,{className:d,onClick:o}))},48265:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const o=r(n(67294)),a=n(67453),i=n(81911),s=n(52630),l=n(54104);t.MobileHeaderWithOverlay=({name:e,version:t,href:n,children:r})=>{const{setMenuOpen:c}=(0,i.useMobileContext)();return o.default.createElement(o.default.Fragment,null,o.default.createElement(s.MobileHeader,{href:n,name:e,version:t,actionIcon:a.HiBars3,onAction:()=>c(!0)}),o.default.createElement(l.MobileOverlay,{href:n,name:e,version:t},r))}},54104:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const o=n(18592),a=r(n(67294)),i=n(67453),s=n(61329),l=n(81911),c=n(52630),d=o.css`
  position: fixed;
  top: ${s.theme.spacing.zero};
  left: ${s.theme.spacing.zero};
  width: 100vw;
  height: 100vh;
  background-color: ${s.theme.colors.dark2};
  pointer-events: all;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: auto;
`,u=o.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:n,version:r})=>{const{isMenuOpen:s,setMenuOpen:p}=(0,l.useMobileContext)();return a.default.createElement("div",{className:(0,o.cx)(d,s?void 0:u)},a.default.createElement(c.MobileHeader,{href:n,actionIcon:i.HiXMark,onAction:()=>p(!1),name:e,version:r}),t)}},84934:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.MultiAutocomplete=void 0;const i=a(n(67294)),s=n(88899),l=n(67453),c=n(96486),d=n(18592),u=n(61329),p=n(48228),m=n(9849),f=d.css`
  label: input-container;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: ${u.theme.spacing.xm};
  * {
    cursor: pointer;
  }
`,h=d.css`
  color: ${u.theme.colors.text};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${u.theme.spacing.xs};
  padding-left: ${u.theme.spacing.m};
`;t.MultiAutocomplete=function({items:e,placeholder:t,value:n,isRemoveable:r=(()=>!0),getKey:o=(e=>`${e}`),getValue:a=(e=>`${e}`),getDescription:g=(()=>{}),onChange:b=(()=>{})}){const[y,v]=(0,i.useState)(""),w=e=>{n?.includes(e)||b([...n??[],e])},x=(0,i.useMemo)((()=>{if((0,c.isNil)(y)||0===y.length)return e;const t=e.filter((e=>a(e).toLowerCase().includes(y.toLowerCase())));return 0===t.length?[y]:t}),[n,e,y]),_=!(0,c.isEmpty)(n),O=!(0,c.isEmpty)(y),{isOpen:E,highlightedIndex:P,getToggleButtonProps:k,getLabelProps:S,getMenuProps:C,getItemProps:j,getInputProps:$}=(0,s.useCombobox)({selectedItem:null,items:x,defaultHighlightedIndex:0,onStateChange:({type:e,selectedItem:t})=>{switch(e){case s.useCombobox.stateChangeTypes.InputKeyDownEnter:(0,c.isNil)(P)&&O?w(y):(0,c.isNil)(t)||w(t),v("");break;case s.useCombobox.stateChangeTypes.ItemClick:w(t),v("")}}}),{onFocus:I,...M}=$({onKeyDown:e=>{"Backspace"===e.key&&!O&&_&&b(n.slice(0,-1))},onChange:e=>{e.stopPropagation(),e.preventDefault(),v(e.target.value)},onBlur:()=>{y.length>0&&(w(y),v(""))}});return i.default.createElement("div",{className:(0,p.dropdownContainerStyle)(E)},i.default.createElement("div",{className:f,...k()},_&&i.default.createElement("label",{className:h,...S()},n?.map((e=>i.default.createElement(m.Chip,{label:a(e),key:o(e),removeable:r(e),onRemove:()=>(e=>{b?.((n??[]).filter((t=>t!==e)))})(e)})))),i.default.createElement("input",{...M,className:(A=!_,d.css`
  label: input;
  border-width: ${u.theme.spacing.zero};
  outline: none;
  border-radius: ${u.theme.spacing.s};
  flex: ${u.theme.flex.grow};
  padding: ${u.theme.spacing.m} ${u.theme.spacing.zero} ${u.theme.spacing.m} ${A?u.theme.spacing.xm:u.theme.spacing.xs};
  color: ${u.theme.colors.text};
  background-color: ${u.theme.colors.transparent};
  ::placeholder {
    color: ${u.theme.colors.placeholder};
  }
`),placeholder:_?"":t,value:y}),i.default.createElement(l.HiChevronDown,{color:u.theme.colors.text})),i.default.createElement("ul",{...C(),className:p.dropdownStyle},E&&x.map(((e,t)=>{const r=n?.includes(e),s=P===t,u=(0,d.cx)(p.dropdownItemStyle,s?p.focusedDropownItemStyle:void 0,r?p.selectedDropdownItemStyle:void 0),m=a(e),f=o(e),h=g(e);return i.default.createElement("li",{className:u,key:`${f}${t}`,...j({item:e,index:t})},i.default.createElement("span",{className:p.dropdownItemLabelStyle},r?i.default.createElement(l.HiCheck,null):void 0,m),(0,c.isNil)(h)?null:i.default.createElement("span",{className:p.dropdownItemDescriptionStyle},h))}))));var A}},63408:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MultiSelect=void 0;const o=r(n(67294)),a=n(88899),i=n(67453),s=n(96486),l=n(18592),c=n(61329),d=n(48228),u=n(9849),p=l.css`
  flex: ${c.theme.flex.grow};
  color: ${c.theme.colors.text};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${c.theme.spacing.xs};
`,m=l.css`
  color: ${c.theme.colors.placeholder};
`;t.MultiSelect=function({items:e,placeholder:t,value:n,isRemoveable:r=(()=>!0),getKey:f=(e=>`${e}`),getValue:h=(e=>`${e}`),getDescription:g=(()=>{}),onChange:b=(()=>{})}){const y=e=>{b?.((n??[]).filter((t=>t!==e)))},{isOpen:v,getToggleButtonProps:w,getLabelProps:x,getMenuProps:_,highlightedIndex:O,getItemProps:E}=(0,a.useSelect)({selectedItem:null,items:e,onStateChange:({type:e,selectedItem:t})=>{switch(e){case a.useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:case a.useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:case a.useSelect.stateChangeTypes.ItemClick:r=t,n?.includes(r)?y(r):b([...n??[],r])}var r}});return o.default.createElement("div",{className:(0,d.dropdownContainerStyle)(v)},o.default.createElement("div",{className:(P=(0,s.isEmpty)(n),l.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${P?c.theme.spacing.m:c.theme.spacing.s} ${P?c.theme.spacing.xm:c.theme.spacing.m};
  * {
    cursor: pointer;
  }
`),...w()},o.default.createElement("label",{className:p,...x()},(0,s.isEmpty)(n)?o.default.createElement("span",{className:m},t):n?.map((e=>o.default.createElement(u.Chip,{label:h(e),key:f(e),removeable:r(e),onRemove:()=>y(e)})))),o.default.createElement(i.HiChevronDown,{color:c.theme.colors.text})),o.default.createElement("ul",{..._(),className:d.dropdownStyle},v&&e.map(((e,t)=>{const r=n?.includes(e),a=O===t,c=(0,l.cx)(d.dropdownItemStyle,a?d.focusedDropownItemStyle:void 0,r?d.selectedDropdownItemStyle:void 0),u=h(e),p=f(e),m=g(e);return o.default.createElement("li",{className:c,key:`${p}${t}`,...E({item:e,index:t})},o.default.createElement("span",{className:d.dropdownItemLabelStyle},r?o.default.createElement(i.HiCheck,null):void 0,u),(0,s.isNil)(m)?null:o.default.createElement("span",{className:d.dropdownItemDescriptionStyle},m))}))));var P}},43418:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStartItem=void 0;const o=n(18592),a=r(n(67294)),i=n(61329),s=n(39226),l=o.css`
  label: quick-start-item;
  display: flex;
  flex-direction: row;
  gap: ${i.theme.spacing.xxm};
  margin-top: ${i.theme.spacing.xxxl};
  width: 100%;
`,c=o.css`
  label: quick-start-item-circle;
  @media ${s.breakpoints.phone} {
    /* TODO */
    display: none;
  }
  width: ${i.theme.spacing.xh};
  height: ${i.theme.spacing.xh};
  min-width: ${i.theme.spacing.xh};
  min-height: ${i.theme.spacing.xh};
  margin-top: ${i.theme.spacing.m};
  border-radius: 50%;
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.text};
  color: ${i.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${i.theme.fontSize.l};
`,d=o.css`
  label: quick-start-item-title;
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.text};
  text-transform: uppercase;
`,u=o.css`
  label: quick-start-item-content;
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.m};
`,p=o.css`
  label: quick-start-item-container;
  width: 100%;
`;t.QuickStartItem=({children:e,index:t,title:n})=>a.default.createElement("div",{className:l},a.default.createElement("div",{className:c},t),a.default.createElement("div",{className:p},a.default.createElement("h3",{className:d},n),a.default.createElement("div",{className:u},e)))},6488:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Select=void 0;const o=r(n(67294)),a=n(88899),i=n(67453),s=n(96486),l=n(18592),c=n(61329),d=n(48228),u=l.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${c.theme.spacing.m} ${c.theme.spacing.xm};
  * {
    cursor: pointer;
  }
`,p=l.css`
  flex: ${c.theme.flex.grow};
  color: ${c.theme.colors.text};
`,m=l.css`
  color: ${c.theme.colors.placeholder};
`;t.Select=function({items:e,placeholder:t,value:n,onChange:r,getKey:f=(e=>`${e}`),getValue:h=(e=>`${e}`),getDescription:g=(()=>{})}){const{isOpen:b,getToggleButtonProps:y,getLabelProps:v,getMenuProps:w,highlightedIndex:x,getItemProps:_}=(0,a.useSelect)({items:e,onSelectedItemChange:e=>r?.(e.selectedItem)});return o.default.createElement("div",{className:(0,d.dropdownContainerStyle)(b)},o.default.createElement("div",{className:u,...y()},o.default.createElement("label",{className:p,...v()},(0,s.isNil)(n)?o.default.createElement("span",{className:m},t):h(n)),o.default.createElement(i.HiChevronDown,{color:c.theme.colors.text})),o.default.createElement("ul",{...w(),className:d.dropdownStyle},b&&e.map(((e,t)=>{const n=(0,l.cx)(d.dropdownItemStyle,x===t?d.focusedDropownItemStyle:void 0),r=h(e),a=f(e),i=g(e);return o.default.createElement("li",{className:n,key:`${a}${t}`,..._({item:e,index:t})},o.default.createElement("span",{className:d.dropdownItemLabelStyle},r),(0,s.isNil)(i)?null:o.default.createElement("span",{className:d.dropdownItemDescriptionStyle},i))}))))}},39201:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const o=n(18592),a=r(n(67294)),i=n(39226),s=n(61329),l=o.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${s.theme.colors.dark2};
  @media ${i.breakpoints.phone} {
    display: none;
  }
`;t.SideBar=({children:e})=>a.default.createElement("div",{className:l},e)},38938:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const o=n(18592),a=n(96486),i=r(n(67294)),s=n(61329),l=o.css`
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: ${s.theme.spacing.m} ${s.theme.spacing.m};
`,c=o.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${s.theme.spacing.xxm};
`;t.SideBarSection=({children:e,title:t})=>i.default.createElement(i.default.Fragment,null,(0,a.isNil)(t)?null:i.default.createElement("div",{className:l},t),i.default.createElement("div",{className:c},e))},79129:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const o=r(n(67294)),a=n(61329),i=n(86753);t.SvgLogo=({color:e=a.theme.colors.green,width:t,height:n})=>{const[r,s]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,n);return o.default.createElement("svg",{width:r,height:s,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},o.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),o.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},81065:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Switch=void 0;const o=n(18592),a=r(n(67294)),i=n(61329),s=o.css`
  position: relative;
  display: inline-block;
  width: ${i.theme.spacing.h};
  height: ${i.theme.spacing.xxl};
`,l=o.css`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: ${i.theme.spacing.xl};
  background-color: ${i.theme.colors.dark1};

  &:before {
    position: absolute;
    content: '';
    height: ${i.theme.spacing.xl};
    width: ${i.theme.spacing.xl};
    left: ${i.theme.spacing.xxs};
    bottom: ${i.theme.spacing.xxs};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    background-color: ${i.theme.colors.text};
  }
`,c=o.css`
  background-color: ${i.theme.colors.green};
  &:before {
    transform: translateX(${i.theme.spacing.xl});
  }
`,d=o.css`
  opacity: 0;
  width: 0;
  height: 0;
`;t.Switch=({value:e,onChange:t})=>a.default.createElement("label",{className:s},a.default.createElement("input",{type:"checkbox",checked:e,onChange:()=>{t(!e)},className:d}),a.default.createElement("span",{className:(0,o.cx)(l,e?c:void 0)}))},7807:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=n(18592),s=a(n(67294)),l=n(67361),c=a(n(29012)),d=n(74855),u=n(61329),p=n(67453),m=n(96486),f=n(71400),h=(0,f.createPrismTheme)(c.vscDarkPlus,u.theme.colors.dark1),g=(0,f.createPrismTheme)(c.vscDarkPlus,u.theme.colors.dark4),b=i.css`
  label: syntax-hl-copy;
  top: ${u.theme.spacing.m};
  right: ${u.theme.spacing.m};
  position: absolute;
  display: flex;
  gap: ${u.theme.spacing.s};
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear, opacity 150ms linear;
  padding: ${u.theme.spacing.s} ${u.theme.spacing.m};
  border: unset;
  border-radius: ${u.theme.spacing.s};
  font-weight: 400;
  cursor: pointer;
  font-size: ${u.theme.fontSize.m};
  background-color: ${u.theme.colors.dark2};
  color: ${u.theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) ${u.theme.spacing.zero} ${u.theme.spacing.xs} ${u.theme.spacing.s};
`,y=i.css`
  label: docs-syntax-hl;
  border-radius: ${u.theme.spacing.m};
  padding: ${u.theme.spacing.zero};
  /** TODO */
  margin: ${u.theme.spacing.xm} ${u.theme.spacing.zero};
  overflow: hidden;
  position: relative;
  * {
    font-family: 'Source Code Pro', monospace;
    font-size: ${u.theme.fontSize.code};
  }
`,v=i.css`
  position: relative;
  flex-grow: ${u.theme.flex.grow};
  height: 100vh;

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:n,kind:r})=>{const[o,a]=(0,s.useState)(!1),[c,u]=(0,s.useState)(!1),[f,w]=(0,s.useState)(void 0),x=(0,i.cx)("editor"===r?v:y),_="editor"===r?g:h,O=(0,i.cx)(b);return s.default.createElement("div",{className:x,onMouseEnter:()=>{u(!0)},onMouseLeave:()=>{u(!1)}},s.default.createElement(l.Prism,{language:t,style:_,wrapLongLines:n,showLineNumbers:"editor"===r},e),s.default.createElement(d.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,m.isNil)(f)||(clearTimeout(f),w(void 0)),a(t),w(setTimeout((()=>{a(!1)}),2e3))}},s.default.createElement("button",{className:O,style:{opacity:c?1:0}},o?s.default.createElement(p.HiCheck,null):s.default.createElement(p.HiClipboard,null))))}},89937:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const o=n(18592),a=r(n(67294)),i=n(61329),s=o.css`
  border-radius: ${i.theme.spacing.m};
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  margin: 1px;
`,l=o.css`
  border-collapse: collapse;
  width: 100%;
  border-width: ${i.theme.spacing.zero};
`;t.Table=({children:e,className:t,...n})=>a.default.createElement("div",{className:s},a.default.createElement("table",{className:(0,o.cx)(l,t),...n},e));const c=o.css`
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  border-left-width: ${i.theme.spacing.zero};
  border-right-width: ${i.theme.spacing.zero};
  &:last-of-type {
    border-bottom-width: ${i.theme.spacing.zero};
  }
`,d=o.css`
  background-color: ${i.theme.colors.dark1};
  border-width: ${i.theme.spacing.zero};
  border-radius: ${i.theme.spacing.m};
`;t.Tr=({children:e,isHeader:t,className:n,...r})=>{const i=(0,o.cx)(t?d:c,n);return a.default.createElement("tr",{...r,className:i},e)};const u=o.css`
  color: ${i.theme.colors.text};
  font-size: ${i.theme.fontSize.m};
  padding: ${i.theme.spacing.xxm} ${i.theme.spacing.m};
  text-align: left;
  &:first-of-type {
    border-top-left-radius: ${i.theme.spacing.xs};
  }
  &:last-of-type {
    border-top-right-radius: ${i.theme.spacing.xs};
  }
`;t.Th=({children:e,className:t,...n})=>a.default.createElement("th",{...n,className:(0,o.cx)(u,t)},e);const p=o.css`
  padding: ${i.theme.spacing.m};
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.muted};
`;t.Td=({children:e,className:t,...n})=>a.default.createElement("td",{...n,className:(0,o.cx)(p,t)},e);const m=o.css`
  border-width: ${i.theme.spacing.zero};
`;t.THead=({children:e,className:t,...n})=>a.default.createElement("thead",{...n,className:(0,o.cx)(m,t)},e);const f=o.css`
  border-width: ${i.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...n})=>a.default.createElement("tbody",{...n,className:(0,o.cx)(f,t)},e)},5838:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const o=n(18592),a=r(n(67294)),i=n(67453),s=n(61329),l=o.css`
  position: relative;
`,c=(e,t)=>o.css`
  label: tree-node-content-${e};
  display: flex;
  flex-direction: row;
  padding: ${s.theme.spacing.s};
  transition: background-color 150ms linear, color 150ms linear;
  cursor: pointer;
  text-decoration: none;

  padding-left: ${14+14*e}px;
  font-size: ${s.theme.fontSize.m};
  background-color: ${t?s.theme.colors.dark1:s.theme.colors.transparent};
  color: ${t?s.theme.colors.text:s.theme.colors.muted};
  &:hover {
    background-color: ${s.theme.colors.dark1};
  }
`,d=o.css`
  flex: ${s.theme.flex.grow};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s.theme.spacing.xxs};
`,u=({isContainer:e,isOpen:t,isEmpty:n})=>e?n?a.default.createElement(i.HiChevronLeft,null):t?a.default.createElement(i.HiChevronDown,null):a.default.createElement(i.HiChevronRight,null):null;t.TreeNode=function e({value:t,level:n,getLabel:r,isActive:i=(()=>!1),isOpen:p=(()=>!1),isContainer:m=(()=>!1),getChildren:f=(()=>[]),onClick:h=(()=>{}),getHref:g=(()=>{}),getIcon:b=(()=>{})}){const y=f(t),v=p(t),w=i(t),x=m(t),_=b(t),O=x&&v?(0,o.cx)(l,(e=>o.css`
  &::before {
    z-index: 5;
    label: tree-node-line-${e};
    border-left: 1px solid #555;
    content: '';
    left: ${22+14*e}px;
    position: absolute;
    top: ${s.theme.spacing.xxl};
    height: calc(100% - ${s.theme.spacing.xxl});
  }
`)(n)):l,E=g(t),P=r(t);return a.default.createElement("div",{className:O},a.default.createElement("a",{className:c(n,w),href:E,onClick:()=>h(t,v)},a.default.createElement("span",{className:d},a.default.createElement(u,{isContainer:x,isEmpty:0===y.length,isOpen:v}),void 0===_?null:a.default.createElement(_,null),P)),v&&y.map(((t,o)=>a.default.createElement(e,{key:`${o}-${P}`,value:t,level:n+1,getLabel:r,getHref:g,isContainer:m,getChildren:f,isOpen:p,isActive:i,onClick:h}))))}},69512:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.containerStyle=void 0;const r=n(18592),o=n(39226),a=n(61329);t.containerStyle=r.css`
  label: container;
  display: flex;
  @media ${o.breakpoints.desktop} {
    width: 90%;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  @media ${o.breakpoints.tablet} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: ${a.theme.spacing.zero} ${a.theme.spacing.m};
    margin-left: auto;
    margin-right: auto;
  }

  @media ${o.breakpoints.phone} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: ${a.theme.spacing.zero} ${a.theme.spacing.m};
    margin-left: auto;
    margin-right: auto;
  }
`},71400:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const r=n(96486),o=n(61329);t.createPrismTheme=function(e,t){const n={'pre[class*="language-"]':{backgroundColor:t,borderRadius:o.theme.spacing.zero,padding:o.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:o.theme.spacing.zero,margin:o.theme.spacing.zero,fontSize:o.theme.fontSize.code,fontFamily:o.theme.fontFamily.monospace}},a=(0,r.cloneDeep)(e);return(0,r.values)(a).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${o.theme.spacing.zero} 1px`,e.fontSize=o.theme.fontSize.code,e.fontFamily=o.theme.fontFamily.monospace})),(0,r.merge)(a,n)}},48228:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.selectedDropdownItemStyle=t.focusedDropownItemStyle=t.dropdownItemDescriptionStyle=t.dropdownItemLabelStyle=t.dropdownItemStyle=t.dropdownStyle=t.dropdownContainerStyle=void 0;const r=n(18592),o=n(61329);t.dropdownContainerStyle=e=>r.css`
  label: dropdown-container;
  width: 100%;
  position: relative;
  background-color: ${o.theme.colors.dark1};
  font-size: ${o.theme.fontSize.m};
  border-radius: ${e?`${o.theme.spacing.s} ${o.theme.spacing.s} ${o.theme.spacing.zero} ${o.theme.spacing.zero}`:o.theme.spacing.s};
  border-width: ${o.theme.spacing.zero};
  outline: none;
  cursor: pointer;
`,t.dropdownStyle=r.css`
  label: dropdown;
  width: 100%;
  display: block;
  margin: ${o.theme.spacing.zero};
  position: absolute;
  max-height: 20rem;
  overflow: auto;
  border-radius: ${o.theme.spacing.zero} ${o.theme.spacing.zero} ${o.theme.spacing.s} ${o.theme.spacing.s};
  background-color: ${o.theme.colors.dark1};
  padding: ${o.theme.spacing.zero};
  z-index: 1;
`,t.dropdownItemStyle=r.css`
  padding: ${o.theme.spacing.m} ${o.theme.spacing.xm};
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${o.theme.spacing.xxs};
  cursor: pointer;
`,t.dropdownItemLabelStyle=r.css`
  color: ${o.theme.colors.text};
  font-size: ${o.theme.fontSize.m};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${o.theme.spacing.m};
`,t.dropdownItemDescriptionStyle=r.css`
  color: ${o.theme.colors.muted};
  font-size: ${o.theme.fontSize.s};
`,t.focusedDropownItemStyle=r.css`
  background-color: ${o.theme.colors.darkHighlight};
`,t.selectedDropdownItemStyle=r.css`
  background-color: ${o.theme.colors.darkHighlight};
  color: ${o.theme.colors.text};
`},69395:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.dd=void 0,t.dd={getKey:e=>e.key,getValue:e=>e.label,getDescription:e=>e.description}},86753:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,n,r){return void 0!==n&&void 0===r?[n,t/e*n]:void 0!==r&&void 0===n?[r,e/t*r]:void 0!==n&&void 0!==r?[n,r]:[e,t]}},72050:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const r=n(26729),o=n(39226),a=n(61329);t.globalStyles=r.css`
  #root {
    margin: ${a.theme.spacing.zero};
    padding: ${a.theme.spacing.zero};
    width: 100vw;
    height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${a.theme.fontFamily.sansSerif};
  }

  html {
    font-size: 100%;

    @media ${o.breakpoints.tablet} {
      font-size: 120%;
    }

    @media ${o.breakpoints.phone} {
      font-size: 200%;
    }
  }
`},12299:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(26729),a=r(n(67294)),i=n(20745),s=n(49818),l=n(72428),c=n(72050);(0,i.createRoot)(document.getElementById("root")).render(a.default.createElement(s.HashRouter,null,a.default.createElement(o.Global,{styles:c.globalStyles}),a.default.createElement(l.AppV2,null)))},63042:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GeneratorContext=void 0;const r=n(67294);t.GeneratorContext=(0,r.createContext)({})},34241:(e,t)=>{"use strict";function n(e,t,r,o){switch(t.length){case 0:throw new Error(`Unexpected path "${e}".`);case 1:{const[n]=t;return void(o.children.some((e=>e.name===n))||o.children.push({type:"file",content:r,name:n,path:e}))}default:{const[a,...i]=t;o.children.some((e=>e.name===a))||o.children.push({type:"folder",path:`${o.path}/${a}`,name:a,children:[]});const s=o.children.find((e=>e.name===a));if("folder"!==s.type)throw new TypeError(`Should be a "folder", but is a file instead: "${a}" in "${e}".`);return n(e,i,r,s)}}}function r(e,t){if(!e.path.startsWith("/"))throw new Error(`Illegal path of file "${e.path}". Should start with "/".`);const[,...r]=e.path.split("/");n(e.path,r,e.content,t)}function o(e,t){return e.name.localeCompare(t.name)}function a(e){"folder"===e.type&&(e.children.sort(o),e.children.forEach(a))}Object.defineProperty(t,"__esModule",{value:!0}),t.buildExplorerTree=void 0,t.buildExplorerTree=function(e){const t={type:"folder",name:"/",path:"",children:[]};return e.forEach((e=>r(e,t))),a(t),t}},67045:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.needsCors=void 0;const r=n(96486);t.needsCors=function(e){return!((0,r.isNil)(e.allowCredentials)&&(0,r.isNil)(e.allowedMethods)&&(0,r.isNil)(e.allowedOrigins)&&(0,r.isNil)(e.allowedRequestHeaders)&&(0,r.isNil)(e.allowedResponseHeaders)&&(0,r.isNil)(e.maxAge))}},17379:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createPresetConfiguration=void 0;const r=n(96486),o=n(67045),a=e=>{const{debugCookies:t,documentation:n,validateResponses:o}=e;if(!((0,r.isNil)(t)&&(0,r.isNil)(n)&&(0,r.isNil)(o)))return{...(0,r.isNil)(n)?{}:{documentation:n},...(0,r.isNil)(t)?{}:{debugCookies:t},...(0,r.isNil)(o)?{}:{validateResponses:o}}},i=e=>{const{allowCredentials:t,allowedMethods:n,allowedOrigins:o,allowedRequestHeaders:a,allowedResponseHeaders:i,maxAge:s}=e;return{...(0,r.isNil)(t)?{}:{isCredentialsAllowed:()=>t},...(0,r.isNil)(o)?{}:{getAllowedOrigins:()=>o},...(0,r.isNil)(s)?{}:{getMaxAge:()=>s},...(0,r.isNil)(a)?{}:{isRequestHeaderAllowed:e=>"boolean"==typeof a?a:a.includes(e)},...(0,r.isNil)(i)?{}:{isResponseHeaderAllowed:e=>"boolean"==typeof i?i:i.includes(e)},...(0,r.isNil)(n)?{}:{isMethodAllowed:(e,t)=>"boolean"==typeof n?n:n.includes(t)}}},s=e=>{const{documentation:t}=e;if(!(0,r.isNil)(t)||(0,o.needsCors)(e))return{...(0,r.isNil)(t)?{}:{documentation:t},...(0,o.needsCors)(e)?{cors:i(e)}:{}}},l={client:a,server:s,fullStack:e=>{const t=a(e),n=s(e);return{...(0,r.isNil)(t)?{}:t,...(0,r.isNil)(n)?{}:n}}};t.createPresetConfiguration=function(e,t){return l[e](t)}},5082:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaults=void 0;const n={arrowParens:"always",bracketSameLine:!1,bracketSpacing:!0,endOfLine:"lf",printWidth:80,quoteProps:"as-needed",semi:!0,singleQuote:!1,tabWidth:2,trailingComma:"es5",useTabs:!1},r={writerType:"file",lineSeparator:"\n",useFormatter:!0,leadingComments:[],trailingComments:[],prettier:n};t.defaults={readerConfiguration:{remoteLanguage:"mixed",remotePath:"https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/pet-store-yaml.yaml",remoteProtocol:"mixed"},validatorConfiguration:{enabled:!0},generatorConfiguration:{preset:"fullStack",pathProviderType:"default",rootPath:"src/generated",configurationStyle:"preset",presetConfig:{},generators:[]},writerConfiguration:r,prettierConfiguration:n}},50443:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.filterExplorerTree=void 0;const r=n(96486),o=(0,r.negate)(r.isNil);function a(e,t){if("file"===e.type)return function(e,t){return e.path.toLowerCase().includes(t)}(e,t)?e:void 0;{const n=e.children.map((e=>a(e,t))).filter(o);return 0===n.length?void 0:{...e,children:n}}}t.filterExplorerTree=function(e,t){if(0===t.length)return e;const n=a(e,t.toLowerCase());return void 0===n?{...e,children:[]}:n}},54685:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.findFileByPath=void 0;const o=r(n(14293));t.findFileByPath=function e(t,n){if("file"===n.type&&n.path===t)return n;if("folder"===n.type)for(let r=0;r<n.children.length;r+=1){const a=e(t,n.children[r]);if(!(0,o.default)(a))return a}}},25306:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getGeneratorSource=void 0;const o=n(55423),a=r(n(39070)),i=r(n(73945)),s=n(96486),l=n(66773),c=n(5082);function d(e,t){return(0,o.addSyntheticLeadingComment)(e,o.SyntaxKind.SingleLineCommentTrivia,` ${t}`,!0)}function u(e){const t=e.remoteLanguage,n="mixed"===t?"document":`${t.toUpperCase()} document`,r="resolves it's references, structurally validates it, and exposes it for the next step.";switch(e.remoteProtocol){case"file":return`Reads your document from the file system, ${r}`;case"mixed":return`Reads your ${n}, ${r}`;default:return`Reads your ${n} from ${e.remoteProtocol.toUpperCase()}, ${r}`}}function p(e){return"preset"===e.configurationStyle?function(e){const t=(0,l.getPresetConfigAst)(e.presetConfig,e.preset);return o.factory.createCallExpression(o.factory.createPropertyAccessExpression(o.factory.createIdentifier("presets"),o.factory.createIdentifier(e.preset)),void 0,t.length>0?[o.factory.createObjectLiteralExpression(t,!0)]:[])}(e):function(e){return o.factory.createArrayLiteralExpression(e.generators.map((e=>o.factory.createCallExpression(o.factory.createPropertyAccessExpression(o.factory.createIdentifier("generators"),o.factory.createIdentifier("create")),void 0,[o.factory.createStringLiteral(e)]))),!0)}(e)}function m(e){return o.factory.createArrayLiteralExpression(e.map((e=>o.factory.createObjectLiteralExpression([o.factory.createPropertyAssignment(o.factory.createIdentifier("type"),o.factory.createStringLiteral(e.type)),o.factory.createPropertyAssignment(o.factory.createIdentifier("text"),o.factory.createStringLiteral(e.text))],!1))))}function f(e){const t=d(o.factory.createPropertyAssignment(o.factory.createIdentifier("format"),function(e){return o.factory.createCallExpression(o.factory.createPropertyAccessExpression(o.factory.createIdentifier("formatters"),o.factory.createIdentifier("prettier")),void 0,[o.factory.createObjectLiteralExpression([o.factory.createPropertyAssignment(o.factory.createIdentifier("parser"),o.factory.createStringLiteral("typescript")),...Object.entries(e.prettier).filter((([e,t])=>!(0,s.isNil)(t)&&t!==c.defaults.prettierConfiguration[e])).map((([e,t])=>o.factory.createPropertyAssignment(o.factory.createIdentifier(e),function(e){switch(typeof e){case"boolean":return e?o.factory.createTrue():o.factory.createFalse();case"number":return o.factory.createNumericLiteral(e);case"string":return o.factory.createStringLiteral(e)}}(t))))],!0)])}(e)),"Formats each generated source using prettier."),n=d(o.factory.createPropertyAssignment(o.factory.createIdentifier("comments"),function(e){return o.factory.createObjectLiteralExpression([...e.leadingComments.length>0?[d(o.factory.createPropertyAssignment(o.factory.createIdentifier("leadingComments"),m(e.leadingComments)),"Comment(s) appearing in the beginning of the file, before the first statement.")]:[],...e.trailingComments.length>0?[d(o.factory.createPropertyAssignment(o.factory.createIdentifier("trailingComments"),m(e.trailingComments)),"Comment(s) appearing in the end of the file, after the last statement.")]:[]],!0)}(e)),"Adds leading/trailing comments to each generated file. Ideal for disabling linters or warning not to edit these files.");return o.factory.createCallExpression(o.factory.createPropertyAccessExpression(o.factory.createPropertyAccessExpression(o.factory.createIdentifier("writers"),o.factory.createIdentifier("typescript")),o.factory.createIdentifier(e.writerType)),void 0,[o.factory.createObjectLiteralExpression([...e.useFormatter?[t]:[],...e.leadingComments.length>0||e.trailingComments.length>0?[n]:[]],!0)])}function h(e){return o.factory.createExpressionStatement(o.factory.createCallExpression(o.factory.createIdentifier("generate"),void 0,[o.factory.createObjectLiteralExpression([d(o.factory.createPropertyAssignment(o.factory.createIdentifier("logger"),o.factory.createCallExpression(o.factory.createPropertyAccessExpression(o.factory.createIdentifier("loggers"),o.factory.createIdentifier("simple")),void 0,[])),"Logs generator events as they happen. Use logger.verbose() for more detailed log output."),d(o.factory.createPropertyAssignment(o.factory.createIdentifier("reader"),(n=e.reader,o.factory.createCallExpression(o.factory.createPropertyAccessExpression(o.factory.createPropertyAccessExpression(o.factory.createIdentifier("readers"),o.factory.createIdentifier(n.remoteProtocol)),o.factory.createIdentifier(n.remoteLanguage)),void 0,[o.factory.createStringLiteral(n.remotePath)]))),u(e.reader)),...e.validator.enabled?[d(o.factory.createPropertyAssignment(o.factory.createIdentifier("validator"),o.factory.createCallExpression(o.factory.createIdentifier("validator"),void 0,[])),"Takes the output of the read step, and semantically validates it.")]:[],d(o.factory.createPropertyAssignment(o.factory.createIdentifier("generator"),(t=e.generator,o.factory.createCallExpression(o.factory.createIdentifier("generator"),void 0,[o.factory.createObjectLiteralExpression([d(o.factory.createPropertyAssignment(o.factory.createIdentifier("nameProvider"),o.factory.createCallExpression(o.factory.createPropertyAccessExpression(o.factory.createIdentifier("nameProviders"),o.factory.createIdentifier("default")),void 0,[])),"Provides a name for each generated artifact."),d(o.factory.createPropertyAssignment(o.factory.createIdentifier("pathProvider"),o.factory.createCallExpression(o.factory.createPropertyAccessExpression(o.factory.createIdentifier("pathProviders"),o.factory.createIdentifier(t.pathProviderType)),void 0,[o.factory.createStringLiteral(t.rootPath)])),`Provides a path in the file system for each generated artifact with "${t.rootPath}" as root.`),d(o.factory.createPropertyAssignment(o.factory.createIdentifier("children"),p(t)),("preset"===t.configurationStyle?"Generator preset":"Individual generators")+" responsible for generating the output AST.")],!0)]))),`Takes the ${e.validator.enabled?"validated ":""}output of the read step, and coordinates child code generators.`),d(o.factory.createPropertyAssignment(o.factory.createIdentifier("writer"),f(e.writer)),`Takes the output of generator step, stringifies it, and ${"memory"===e.writer.writerType?"returns it":"writes it to the disk"}.`)],!0)]));var t,n}function g({writer:e,validator:t,generator:n}){const r=["formatters","generator","generators","loggers","nameProviders","pathProviders","presets","readers","validator","writers"].filter((t=>"formatters"!==t||e.useFormatter)).filter((e=>"validator"!==e||t.enabled)).filter((e=>"generators"===n.configurationStyle?"presets"!==e:"generators"!==e)).map((e=>o.factory.createImportSpecifier(!1,void 0,o.factory.createIdentifier(e)))),a=o.factory.createImportDeclaration(void 0,void 0,o.factory.createImportClause(!1,void 0,o.factory.createNamedImports(r)),o.factory.createStringLiteral("@oats-ts/openapi"),void 0);return[o.factory.createImportDeclaration(void 0,void 0,o.factory.createImportClause(!1,void 0,o.factory.createNamedImports([o.factory.createImportSpecifier(!1,void 0,o.factory.createIdentifier("generate"))])),o.factory.createStringLiteral("@oats-ts/oats-ts"),void 0),a]}t.getGeneratorSource=function(e){const t=[g(e),[],[h(e)]].filter((e=>e.length>0)).map((e=>o.factory.createSourceFile(e,o.factory.createToken(o.SyntaxKind.EndOfFileToken),o.NodeFlags.None))),n=(0,o.createPrinter)({newLine:o.NewLineKind.LineFeed,removeComments:!1});return i.default.format(t.map((e=>n.printFile(e))).join("\n\n"),{parser:"typescript",plugins:[a.default]})}},33521:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getPackageJsonSource=void 0;const r=n(67535);function o(e){return Array.from(e).sort(((e,t)=>e.name.localeCompare(t.name))).reduce(((e,{name:t,version:n})=>({...e,[t]:n})),{})}t.getPackageJsonSource=function(e,t){const n=o(e),a={name:"your-project",version:"1.0.0",description:"You will need 'devDependencies' to run oats, and 'dependencies' make it's output work at runtime.",scripts:{oats:"ts-node ./generate.ts"},...0===e.length?{}:{dependencies:n},devDependencies:o([{name:"@oats-ts/oats-ts",version:r.version},{name:"@oats-ts/openapi",version:r.version},{name:"typescript",version:t.typescript},{name:"ts-node",version:t["ts-node"]}])};return JSON.stringify(a,null,2)}},66773:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getPresetConfigAst=void 0;const r=n(96486),o=n(55423),a=n(5563),i=n(67045);function s(e){return o.factory.createParameterDeclaration([],[],void 0,e,void 0,void 0,void 0)}function l(e,t,n){return o.factory.createPropertyAssignment(e,o.factory.createArrowFunction([],[],t.map(s),void 0,o.factory.createToken(o.SyntaxKind.EqualsGreaterThanToken),n))}function c(e,t,n=(e=>e)){return"boolean"==typeof t?!0===t?o.factory.createTrue():o.factory.createFalse():(0,a.getLogicalExpression)(o.SyntaxKind.BarBarToken,t.map(n).map((t=>o.factory.createBinaryExpression(o.factory.createIdentifier(e),o.SyntaxKind.EqualsEqualsEqualsToken,o.factory.createStringLiteral(t)))))}const d=e=>{return(0,r.isNil)(e.allowedOrigins)?[]:[l("getAllowedOrigins",["_path","_method","_operation"],(t=e.allowedOrigins,"boolean"==typeof t?!0===t?o.factory.createTrue():o.factory.createFalse():o.factory.createArrayLiteralExpression(t.map((e=>o.factory.createStringLiteral(e))))))];var t},u=e=>(0,r.isNil)(e.allowedMethods)?[]:[l("isMethodAllowed",["_path","boolean"==typeof e.allowedMethods?"_method":"method","_operation"],c("method",e.allowedMethods))],p=e=>(0,r.isNil)(e.allowedRequestHeaders)?[]:[l("isRequestHeaderAllowed",["boolean"==typeof e.allowedRequestHeaders?"_header":"header","_path","_method","_operation"],c("header",e.allowedRequestHeaders,(e=>e.toLowerCase())))],m=e=>(0,r.isNil)(e.allowedResponseHeaders)?[]:[l("isResponseHeaderAllowed",["boolean"==typeof e.allowedResponseHeaders?"_header":"header","_path","_method","_operation"],c("header",e.allowedResponseHeaders,(e=>e.toLowerCase())))],f=e=>(0,r.isNil)(e.maxAge)?[]:[l("getMaxAge",["_path","_method","_operation"],o.factory.createNumericLiteral(e.maxAge))],h=e=>(0,r.isNil)(e.allowCredentials)?[]:[l("isCredentialsAllowed",["_path","_method","_operation"],!0===e.allowCredentials?o.factory.createTrue():o.factory.createFalse())];function g(e,t){if(!(0,r.isNil)(t))return o.factory.createPropertyAssignment(e,t?o.factory.createTrue():o.factory.createFalse())}t.getPresetConfigAst=function(e,t){const n=g("documentation",e.documentation),a=g("validateResponses",e.validateResponses),s=g("debugCookies",e.debugCookies),l=function(e){if(!(0,i.needsCors)(e))return;const t=[...d(e),...u(e),...p(e),...m(e),...h(e),...f(e)];return o.factory.createPropertyAssignment("cors",o.factory.createObjectLiteralExpression(t,!0))}(e);return{client:[n,a,s],server:[n,l],fullStack:[n,a,l,s]}[t].filter((e=>!(0,r.isNil)(e)))}},8533:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getPresetConfigFields=void 0;const n=["documentation"],r=["validateResponses","debugCookies"],o=["allowedOrigins","allowedMethods","allowedRequestHeaders","allowedResponseHeaders","allowCredentials","maxAge"];t.getPresetConfigFields=function(e){switch(e){case"client":return[...n,...r];case"server":return[...n,...o];case"fullStack":return[...n,...r,...o]}}},85949:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.guessLanguage=t.fetchSampleFile=t.getSampleFiles=void 0;const o=r(n(65831)),a="oats-ts/oats-schemas";t.getSampleFiles=async function(e){const t=await fetch(`https://api.github.com/repos/${a}/git/trees/master?recursive=true`);return(await t.json()).tree.filter((e=>"tree"!==e.type)).filter((t=>e.some((e=>t.path.startsWith(`${e}/`))))).filter((e=>e.path.endsWith(".json")||e.path.endsWith(".yaml"))).map((e=>e.path)).map((e=>`https://raw.githubusercontent.com/${a}/master/${e}`))},t.fetchSampleFile=async function(e){return(await fetch(e)).text()},t.guessLanguage=function(e){try{return JSON.parse(e),"json"}catch(t){try{return o.default.parse(e),"yaml"}catch(e){}}}},99936:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getVersionMap=void 0;const r=n(81249),o=n(96486),a={};t.getVersionMap=async function(...e){return(await Promise.all(e.map((e=>async function(e){if("string"!=typeof a[e])try{const t=await fetch(`https://registry.npmjs.org/${e}`),n=await t.json(),i=Object.keys(n.versions).filter((e=>(0,o.isNil)((0,r.prerelease)(e)))).sort(((e,t)=>(0,r.gt)(t,e)?1:-1));a[e]=i[0]??"*"}catch(t){a[e]="*",console.error(t)}return{name:e,version:a[e]}}(e))))).reduce(((e,{name:t,version:n})=>({...e,[t]:n})),{})}},59352:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.createWriter=t.createGenerator=t.createReader=void 0;const o=n(6740),a=r(n(39070)),i=n(17379),s=n(96486);function l(e){switch(e.configurationStyle){case"generators":return e.generators.map((e=>o.generators.create(e)));case"preset":{const t=(0,i.createPresetConfiguration)(e.preset,e.presetConfig),n=o.presets[e.preset];return(0,s.isNil)(t)?n():n(t)}default:return[]}}t.createReader=function(e){return o.readers[e.remoteProtocol][e.remoteLanguage](e.remotePath)},t.createGenerator=function(e){return(0,o.generator)({nameProvider:o.nameProviders.default(),pathProvider:o.pathProviders[e.pathProviderType](e.rootPath),children:l(e)})},t.createWriter=function(e){return o.writers.typescript.memory({comments:{leadingComments:e.leadingComments??[],trailingComments:e.trailingComments??[],lineSeparator:e.lineSeparator},format:e.useFormatter?o.formatters.prettier({...e.prettier,parser:"typescript",plugins:[a.default]}):void 0})}},20070:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useDebounceEffect=void 0;const r=n(67294);t.useDebounceEffect=function(e,t){(0,r.useEffect)((()=>{const n=setTimeout(e,t);return()=>clearTimeout(n)}),[e,t])}},34662:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useGeneratorContext=t.useGenerator=void 0;const o=n(67535),a=n(6740),i=r(n(14293)),s=n(67294),l=n(75265),c=n(27912),d=n(85949),u=n(34241),p=n(63042),m=n(20070),f=n(25306),h=n(59352),g=n(767),b=n(50443),y=n(33521),v=n(54685),w=n(99936),x=n(5082);t.useGenerator=function(){const[e,t]=(0,s.useState)([]),[n,r]=(0,s.useState)((()=>c.storage.get("configuration",{type:"configuration",active:"reader",version:o.version,reader:x.defaults.readerConfiguration,validator:x.defaults.validatorConfiguration,generator:x.defaults.generatorConfiguration,writer:x.defaults.writerConfiguration},g.verifyConfiguration))),[p,_]=(0,s.useState)({type:"generator-source",source:""}),[O,E]=(0,s.useState)({type:"package-json",source:""}),[P,k]=(0,s.useState)({type:"issues",issues:[]}),[S,C]=(0,s.useState)({type:"folder",path:"/",name:"/",children:[]}),[j,$]=(0,s.useState)(""),[I,M]=(0,s.useState)(!0),[A,T]=(0,s.useState)(!0),[N,z]=(0,s.useState)({}),[D,R]=(0,s.useState)(S),[L,H]=(0,s.useState)((()=>c.storage.get("editorInput","configuration"))),F=(0,s.useMemo)((()=>{if(!(0,i.default)(L)){if(L.startsWith("file")){const[,e]=L.split("::");return(0,v.findFileByPath)(e,S)}switch(L){case"configuration":return n;case"generator-source":return p;case"issues":return P;case"package-json":return O;default:return}}}),[L,p,P,O,S,n]);function B(e){if((0,l.isSuccess)(e)){const{data:t}=e;C((0,u.buildExplorerTree)(t))}else C({type:"folder",name:"/",path:"/",children:[]}),k({type:"issues",issues:e.issues})}(0,s.useEffect)((()=>{M(!0);const e=c.storage.get("samples");!(0,i.default)(e)&&Array.isArray(e)?(t(e),M(!1)):(0,d.getSampleFiles)(["schemas","generated-schemas"]).then((e=>{t(e),c.storage.set("samples",e,c.Ttl.hours(1))})).finally((()=>M(!1)))}),[]);const G=(0,s.useCallback)((()=>{T(!0),k({type:"issues",issues:[]}),C({type:"folder",children:[],name:"/",path:"/"}),(0,o.generate)({logger:e=>{a.loggers.simple()(e),e.addListener("validator-step-completed",(({issues:e})=>{k((t=>({...t,issues:[...t.issues,...e]})))})),e.addListener("generator-step-completed",(({dependencies:e,issues:t})=>{(0,w.getVersionMap)("typescript","ts-node").then((t=>(0,y.getPackageJsonSource)(e,t))).then((e=>E({...O,source:e}))),k((e=>({...e,issues:[...e.issues,...t]})))}))},validator:n.validator.enabled?(0,a.validator)():void 0,reader:(0,h.createReader)(n.reader),generator:(0,h.createGenerator)(n.generator),writer:(0,h.createWriter)(n.writer)}).then(B).finally((()=>T(!1)))}),[n.reader,n.validator,n.generator,n.writer]);(0,m.useDebounceEffect)(G,1e3);const q=(0,s.useCallback)((()=>{_({type:"generator-source",source:(0,f.getGeneratorSource)(n)})}),[n.reader,n.validator,n.generator,n.writer]);(0,m.useDebounceEffect)(q,1e3);const W=(0,s.useCallback)((()=>{c.storage.set("configuration",n)}),[n]);(0,m.useDebounceEffect)(W,200);const V=(0,s.useCallback)((()=>{c.storage.set("editorInput",L)}),[L]);return(0,m.useDebounceEffect)(V,200),(0,s.useEffect)((()=>{R((0,b.filterExplorerTree)(S,j))}),[S,j]),{output:D,issues:P,samples:e,isLoading:I||A,editorInput:F,explorerTreeState:N,configuration:n,generatorSource:p,treeFilter:j,packageJson:O,setExplorerTreeState:z,setEditorInput:H,setConfiguration:r,setTreeFilter:$}},t.useGeneratorContext=function(){return(0,s.useContext)(p.GeneratorContext)}},767:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.verifyConfiguration=void 0;const r=n(42695),o=n(67535),a=(0,r.object)((0,r.shape)({text:(0,r.string)(),type:(0,r.union)({jsdoc:(0,r.literal)("jsdoc"),block:(0,r.literal)("block"),line:(0,r.literal)("line")})})),i=(0,r.object)((0,r.shape)({remoteLanguage:(0,r.union)({json:(0,r.literal)("json"),yaml:(0,r.literal)("yaml"),mixed:(0,r.literal)("mixed")}),remotePath:(0,r.string)(),remoteProtocol:(0,r.union)({http:(0,r.literal)("http"),https:(0,r.literal)("https"),file:(0,r.literal)("file"),mixed:(0,r.literal)("mixed")})})),s=(0,r.object)((0,r.shape)({enabled:(0,r.boolean)()})),l=(0,r.union)({stringArray:(0,r.array)((0,r.items)((0,r.string)())),boolean:(0,r.boolean)()}),c=(0,r.object)((0,r.shape)({allowCredentials:(0,r.optional)((0,r.boolean)()),allowedMethods:(0,r.optional)(l),allowedOrigins:(0,r.optional)(l),allowedRequestHeaders:(0,r.optional)(l),allowedResponseHeaders:(0,r.optional)(l),documentation:(0,r.optional)((0,r.boolean)()),maxAge:(0,r.optional)((0,r.number)()),debugCookies:(0,r.optional)((0,r.boolean)()),validateResponses:(0,r.optional)((0,r.boolean)())})),d=(0,r.object)((0,r.shape)({configurationStyle:(0,r.union)({preset:(0,r.literal)("preset"),generators:(0,r.literal)("generators")}),generators:(0,r.array)((0,r.items)((0,r.string)())),pathProviderType:(0,r.union)({default:(0,r.literal)("default"),singleFile:(0,r.literal)("singleFile"),byTarget:(0,r.literal)("byTarget"),byName:(0,r.literal)("byName")}),preset:(0,r.union)({fullStack:(0,r.literal)("fullStack"),client:(0,r.literal)("client"),server:(0,r.literal)("server")}),rootPath:(0,r.string)(),presetConfig:c})),u=(0,r.object)((0,r.shape)({lineSeparator:(0,r.union)({LF:(0,r.literal)("\n"),CRLF:(0,r.literal)("\r\n")}),writerType:(0,r.union)({file:(0,r.literal)("file"),memory:(0,r.literal)("memory")}),useFormatter:(0,r.boolean)(),leadingComments:(0,r.array)((0,r.items)(a)),trailingComments:(0,r.array)((0,r.items)(a)),prettier:(0,r.object)((0,r.shape)({arrowParens:(0,r.optional)((0,r.union)({avoid:(0,r.literal)("avoid"),always:(0,r.literal)("always")})),bracketSameLine:(0,r.optional)((0,r.boolean)()),bracketSpacing:(0,r.optional)((0,r.boolean)()),endOfLine:(0,r.optional)((0,r.union)({lf:(0,r.literal)("lf"),crlf:(0,r.literal)("crlf")})),printWidth:(0,r.optional)((0,r.number)()),tabWidth:(0,r.optional)((0,r.number)()),useTabs:(0,r.optional)((0,r.boolean)()),quoteProps:(0,r.optional)((0,r.union)({"as-needed":(0,r.literal)("as-needed"),consistent:(0,r.literal)("consistent"),preserve:(0,r.literal)("preserve")})),semi:(0,r.optional)((0,r.boolean)()),singleQuote:(0,r.optional)((0,r.boolean)()),trailingComma:(0,r.optional)((0,r.union)({none:(0,r.literal)("none"),es5:(0,r.literal)("es5"),all:(0,r.literal)("all")}))}))})),p=(0,r.object)((0,r.shape)({type:(0,r.literal)("configuration"),version:(0,r.literal)(o.version),active:(0,r.union)({reader:(0,r.literal)("reader"),validator:(0,r.literal)("validator"),generator:(0,r.literal)("generator"),writer:(0,r.literal)("writer")}),validator:s,reader:i,generator:d,writer:u}));t.verifyConfiguration=function(e){const t=p(e,"$",r.DefaultConfig),n=0===t.length;return n||console.warn("Local storage invalid",{data:e,issues:t}),n}},6924:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ConfigurationEditor=void 0;const o=n(18592),a=r(n(67294)),i=n(34662),s=n(61329),l=n(81256),c=n(18618),d=n(75821),u=n(52623),p=o.css`
  padding: ${s.theme.spacing.l};
  padding-top: ${s.theme.spacing.zero};
`,m=o.css`
  padding-top: ${s.theme.spacing.xxm};
`;t.ConfigurationEditor=()=>{const{configuration:e,samples:t,setConfiguration:n}=(0,i.useGeneratorContext)();return a.default.createElement("div",{className:p},a.default.createElement("div",{className:m},a.default.createElement(c.ReaderConfigurationEditor,{input:e.reader,samples:t,onChange:t=>n({...e,active:"reader",reader:t})}),a.default.createElement(d.ValidatorConfigurationEditor,{input:e.validator,onChange:t=>n({...e,active:"validator",validator:t})}),a.default.createElement(l.GeneratorConfigurationEditor,{input:e.generator,onChange:t=>n({...e,active:"generator",generator:t})}),a.default.createElement(u.WriterConfigurationEditor,{input:e.writer,onChange:t=>n({...e,active:"writer",writer:t})})))}},81256:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.GeneratorConfigurationEditor=void 0;const i=n(96486),s=a(n(67294)),l=n(67453),c=n(40355),d=n(69395),u=n(67036),p=n(46219),m=n(6488),f=n(19597),h=n(5082),g=[{value:"client",key:"client",label:"Client",description:"Generates a client side SDK, and utilities"},{value:"server",key:"server",label:"Server",description:"Generates server-side content, and utilities"},{value:"fullStack",key:"fullStack",label:"Full-stack",description:"Generates both client and server-side content"}],b=[{value:"default",key:"default",label:"Default",description:"Generates each artifact in it's own file, in a reasonalbe folder structure"},{value:"singleFile",key:"singleFile",label:"Single file",description:"Generates everything into a single file"},{value:"byName",key:"byName",label:"By name",description:"Generates each artifact in it's own file, into a single folder"},{value:"byTarget",key:"byTarget",label:"By concern",description:"Generates a separate file for each concern, eg.: types.ts, validators.ts, etc"}],y=["src/generated"];t.GeneratorConfigurationEditor=({input:e,onChange:t})=>{const[n,r]=(0,s.useState)(!1),o=(0,s.useMemo)((()=>(0,i.isNil)(e.preset)?void 0:g.find((t=>t.value===e.preset))),[e.preset]),a=(0,s.useMemo)((()=>(0,i.isNil)(e.pathProviderType)?void 0:b.find((t=>t.value===e.pathProviderType))),[e.pathProviderType]);return s.default.createElement(u.ConfigurationFormGroup,{name:"Generator",bottomAttachmentLabel:n?"Hide advanced":"Show advanced",bottomAttachmentIcon:n?l.HiChevronUp:l.HiChevronDown,onAttachmentClick:()=>r(!n),titleButtonLabel:"Reset",titleButtonIcon:l.HiArrowUturnLeft,onTitleButtonClick:()=>t(h.defaults.generatorConfiguration)},s.default.createElement(p.FormSection,{name:"Preset",description:"Select what you need! Do you need a client SDK? Server boilerplate? Both?"},s.default.createElement(m.Select,{placeholder:"Select preset",items:g,value:o,onChange:({value:n})=>{t({...e,preset:n})},getDescription:d.dd.getDescription,getKey:d.dd.getKey,getValue:d.dd.getValue})),s.default.createElement(p.FormSection,{name:"Root path",description:"Set the root folder for the generated content"},s.default.createElement(c.Autocomplete,{placeholder:"Root path",items:y,customLabel:"Custom root path",value:e.rootPath,onChange:n=>{t({...e,rootPath:n})}})),n&&s.default.createElement(s.default.Fragment,null,s.default.createElement(p.FormSection,{name:"Path configuration",description:"Set how you want to group generated artifacts into files"},s.default.createElement(m.Select,{placeholder:"Select path configuration",items:b,value:a,onChange:({value:n})=>{t({...e,pathProviderType:n})},getDescription:d.dd.getDescription,getKey:d.dd.getKey,getValue:d.dd.getValue})),s.default.createElement(f.PresetConfigurationEditor,{input:e,onChange:t})))}},18618:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.ReaderConfigurationEditor=void 0;const i=n(96486),s=a(n(67294)),l=n(67453),c=n(40355),d=n(69395),u=n(67036),p=n(46219),m=n(6488),f=n(5082),h=[{value:"json",key:"json",label:"JSON",description:"Parses JSON documents for root and references"},{value:"yaml",key:"yaml",label:"YAML",description:"Parses YAML documents for root and references"},{value:"mixed",key:"mixed",label:"Mixed",description:"Parses both JSON and YAML documents"}],g=[{label:"HTTPS",key:"https",value:"https",description:"Resolves documents using HTTPS"},{label:"HTTP",key:"http",value:"http",description:"Resolves documents using HTTPS"},{label:"File",key:"file",value:"file",description:"Resolves documents from the local file system (won't work in the browser)"},{label:"Mixed",key:"mixed",value:"mixed",description:"Resolves documents remotely or from the file system"}];t.ReaderConfigurationEditor=({input:e,samples:t,onChange:n})=>{const[r,o]=(0,s.useState)(!1),a=(0,s.useMemo)((()=>(0,i.isNil)(e.remoteProtocol)?void 0:g.find((t=>t.value===e.remoteProtocol))),[e.remoteProtocol]),b=(0,s.useMemo)((()=>(0,i.isNil)(e.remoteLanguage)?void 0:h.find((t=>t.value===e.remoteLanguage))),[e.remoteLanguage]);return s.default.createElement(u.ConfigurationFormGroup,{name:"Reader",bottomAttachmentLabel:r?"Hide advanced":"Show advanced",bottomAttachmentIcon:r?l.HiChevronUp:l.HiChevronDown,onAttachmentClick:()=>o(!r),titleButtonLabel:"Reset",titleButtonIcon:l.HiArrowUturnLeft,onTitleButtonClick:()=>n(f.defaults.readerConfiguration)},s.default.createElement(p.FormSection,{name:"URI",description:"The URI or file path where your source OpenAPI document will be read from. You can pick from Oats test documents, or check out https://apis.guru for examples"},s.default.createElement(c.Autocomplete,{placeholder:"OpenAPI document URI",items:t,value:e.remotePath,customLabel:"Custom document URI",onChange:t=>{n({...e,remotePath:t})}})),r&&s.default.createElement(s.default.Fragment,null,s.default.createElement(p.FormSection,{name:"Protocol",description:"The protocol used to read your OpenAPI document"},s.default.createElement(m.Select,{items:g,placeholder:"Choose protocol",value:a,getDescription:d.dd.getDescription,getKey:d.dd.getKey,getValue:d.dd.getValue,onChange:({value:t})=>{n({...e,remoteProtocol:t})}})),s.default.createElement(p.FormSection,{name:"Language",description:"The language used by your OpenAPI document"},s.default.createElement(m.Select,{items:h,placeholder:"Choose language",value:b,getDescription:d.dd.getDescription,getKey:d.dd.getKey,getValue:d.dd.getValue,onChange:({value:t})=>{n({...e,remoteLanguage:t})}}))))}},75821:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ValidatorConfigurationEditor=void 0;const o=r(n(67294)),a=n(67453),i=n(67036),s=n(46219),l=n(81065),c=n(5082);t.ValidatorConfigurationEditor=({input:e,onChange:t})=>o.default.createElement(i.ConfigurationFormGroup,{name:"Validator",titleButtonLabel:"Reset",titleButtonIcon:a.HiArrowUturnLeft,onTitleButtonClick:()=>t(c.defaults.validatorConfiguration)},o.default.createElement(s.FormSection,{name:"Validate",description:"When enabled, the input OpenAPI document will be semantically validated, to catch issues early"},o.default.createElement(l.Switch,{value:e.enabled,onChange:n=>{t({...e,enabled:n})}})))},52623:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.WriterConfigurationEditor=void 0;const i=a(n(67294)),s=n(67453),l=n(9378),c=n(67036),d=n(46219),u=n(81065),p=n(5082);t.WriterConfigurationEditor=({input:e,onChange:t})=>{const[n,r]=(0,i.useState)(!1);return i.default.createElement(c.ConfigurationFormGroup,{name:"Writer",bottomAttachmentLabel:n?"Hide advanced":"Show advanced",bottomAttachmentIcon:n?s.HiChevronUp:s.HiChevronDown,onAttachmentClick:()=>r(!n),titleButtonLabel:"Reset",titleButtonIcon:s.HiArrowUturnLeft,onTitleButtonClick:()=>t(p.defaults.writerConfiguration)},i.default.createElement(d.FormSection,{name:"Use Prettier?",description:"When enabled, Prettier will be used to format the generated output"},i.default.createElement(u.Switch,{value:e.useFormatter,onChange:n=>{t({...e,useFormatter:n})}})),n&&i.default.createElement(i.default.Fragment,null,i.default.createElement(d.FormSection,{name:"Leading comments",description:"Comments added to the beginning of each generated file. Great for enabling/disabling linters, that the file should not be edited."},i.default.createElement(l.CommentsTable,{value:e.leadingComments,onChange:n=>{t({...e,leadingComments:n})}})),i.default.createElement(d.FormSection,{name:"Trailing comments",description:"Comments added to the end of each generated file."},i.default.createElement(l.CommentsTable,{value:e.trailingComments,onChange:n=>{t({...e,trailingComments:n})}}))))}},16554:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AllowCredentialsEditor=void 0;const o=r(n(67294)),a=n(46219),i=n(81065);t.AllowCredentialsEditor=({data:e,onChange:t})=>o.default.createElement(a.FormSection,{name:"Allow Credentials (CORS)",description:"When enabled, cookies and authorization headers should be exposed.Influences the Access-Control-Allow-Credentials CORS header."},o.default.createElement(i.Switch,{onChange:n=>t({...e,allowCredentials:n}),value:e.allowCredentials??!1}))},21361:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.AllowedMethodsEditor=void 0;const i=n(96486),s=a(n(67294)),l=n(46219),c=n(69395),d=n(63408),u={value:"true",key:"true",label:"All methods",description:"(default) Allows all methods listed in the source OpenAPI document"},p={value:"false",key:"false",label:"No methods",description:"Forbids all methods"},m=[u,p,...["get","post","put","patch","delete","trace","head"].map((e=>({label:e.toUpperCase(),key:e,value:e})))];t.AllowedMethodsEditor=({data:e,onChange:t})=>{const n=(0,s.useMemo)((()=>(0,i.isNil)(e.allowedMethods)?[]:"boolean"==typeof e.allowedMethods?[e.allowedMethods?u:p]:e.allowedMethods.map((e=>m.find((({value:t})=>t===e))))),[e.allowedMethods]);return s.default.createElement(l.FormSection,{name:"Allowed methods (CORS)",description:"Sets allowed HTTP methods for CORS. Influences the <b>Access-Control-Allow-Methods</b> CORS header."},s.default.createElement(d.MultiSelect,{placeholder:"Allowed methods",items:m,getDescription:c.dd.getDescription,getKey:c.dd.getKey,getValue:c.dd.getValue,onChange:n=>0===n.length?t({...e,allowedMethods:void 0}):n.includes(u)&&!0!==e.allowedMethods?t({...e,allowedMethods:!0}):n.includes(p)&&!1!==e.allowedMethods?t({...e,allowedMethods:!1}):t({...e,allowedMethods:n.map((({value:e})=>e)).filter((e=>"true"!==e&&"false"!==e))}),value:n}))}},43439:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AllowedOriginsEditor=void 0;const o=r(n(67294)),a=n(51334),i=e=>{switch(e){case"true":return"All origins";case"false":return"No origins";default:return e}},s=e=>{switch(e){case"true":return"All origins will be allowed";case"false":return"(default) No origins will be allowed, CORS is effectively off";default:return"User defined origin"}};t.AllowedOriginsEditor=({data:e,onChange:t})=>o.default.createElement(a.BooleanOrStringListEditor,{data:e.allowedOrigins,name:"Allowed origins (CORS)",description:"Sets allowed HTTP origins for CORS. Influences the Access-Control-Allow-Origin CORS header.",getDescription:s,getLabel:i,placeholder:"Allowed origins",onChange:n=>t({...e,allowedOrigins:n})})},47524:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AllowedRequestHeadersEditor=void 0;const o=r(n(67294)),a=n(51334),i=e=>{switch(e){case"true":return"(default) All request headers the OpenAPI document describes will be allowed";case"false":return"No request headers will be allowed";default:return"User defined request header"}},s=e=>{switch(e){case"true":return"All headers";case"false":return"No headers";default:return e}};t.AllowedRequestHeadersEditor=({data:e,onChange:t})=>o.default.createElement(a.BooleanOrStringListEditor,{data:e.allowedRequestHeaders,name:"Allowed request headers (CORS)",description:"Sets allowed HTTP request headers for CORS. Influences the Access-Control-Allow-Headers CORS header.",getDescription:i,getLabel:s,placeholder:"Allowed request headers",onChange:n=>t({...e,allowedRequestHeaders:n})})},25429:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AllowedResponseHeadersEditor=void 0;const o=r(n(67294)),a=n(51334),i=e=>{switch(e){case"true":return"(default) All response headers the OpenAPI document describes will be allowed";case"false":return"No response headers will be allowed";default:return"User defined response header"}},s=e=>{switch(e){case"true":return"All headers";case"false":return"No headers";default:return e}};t.AllowedResponseHeadersEditor=({data:e,onChange:t})=>o.default.createElement(a.BooleanOrStringListEditor,{data:e.allowedResponseHeaders,name:"Allowed response headers (CORS)",description:"Sets allowed HTTP response headers for CORS. Influences the Access-Control-Expose-Headers CORS header.",getDescription:i,getLabel:s,placeholder:"Allowed response headers",onChange:n=>t({...e,allowedResponseHeaders:n})})},51334:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BooleanOrStringListEditor=void 0;const i=n(96486),s=a(n(67294)),l=n(46219),c=n(84934),d="true",u="false";t.BooleanOrStringListEditor=({data:e,name:t,description:n,placeholder:r,onChange:o,getLabel:a,getDescription:p})=>{const m=(0,s.useMemo)((()=>(0,i.isNil)(e)?[]:"boolean"==typeof e?[e.toString()]:e),[e]),f=(0,s.useMemo)((()=>[d,u,...Array.isArray(e)?e:[]]),[e]);return s.default.createElement(l.FormSection,{name:t,description:n},s.default.createElement(c.MultiAutocomplete,{placeholder:r,items:f,onChange:t=>0===t.length?o(void 0):t.includes(d)&&!0!==e?o(!0):t.includes(u)&&!1!==e?o(!1):o(t.filter((e=>e!==d&&e!==u))),getValue:a,getDescription:p,value:m}))}},97356:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DebugCookiesEditor=void 0;const o=r(n(67294)),a=n(46219),i=n(81065);t.DebugCookiesEditor=({data:e,onChange:t})=>o.default.createElement(a.FormSection,{name:"Debug cookies",description:"When enabled, the SDK will serialize and send the Cookie header, and parse the Set-Cookie response headers. Does not work in the browser."},o.default.createElement(i.Switch,{onChange:n=>t({...e,debugCookies:n}),value:e.debugCookies??!1}))},39053:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationEditor=void 0;const o=r(n(67294)),a=n(46219),i=n(81065);t.DocumentationEditor=({data:e,onChange:t})=>o.default.createElement(a.FormSection,{name:"Documentation",description:"When enabled, the description, summary and deprecated fields will be used to generate JSDoc."},o.default.createElement(i.Switch,{onChange:n=>t({...e,documentation:n}),value:e.documentation??!0}))},5127:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MaxAgeEditor=void 0;const o=r(n(67294)),a=n(46219),i=n(9155);t.MaxAgeEditor=({data:e,onChange:t})=>o.default.createElement(a.FormSection,{name:"Max age (CORS)",description:"Sets the maximum time in seconds, the preflight request can be cached. Influences the Access-Control-Max-Age CORS header."},o.default.createElement(i.Input,{placeholder:"Max age",type:"number",onChange:n=>t({...e,maxAge:Number.isNaN(Number(n.target.value))?void 0:Number(n.target.value)}),value:e.maxAge??""}))},19597:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.PresetConfigurationEditor=void 0;const i=a(n(67294)),s=n(8533),l=n(27794);t.PresetConfigurationEditor=({input:e,onChange:t})=>{const{preset:n,configurationStyle:r,generators:o}=e,a=(0,i.useMemo)((()=>"preset"===r?(0,s.getPresetConfigFields)(n):[]),[o,n,r]),c=n=>{t({...e,presetConfig:n})};return i.default.createElement(i.default.Fragment,null,a.map((t=>{const n=l.editors[t];return i.default.createElement(n,{field:t,key:t,data:e.presetConfig,onChange:c})})))}},6685:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ValidateResponsesEditor=void 0;const o=r(n(67294)),a=n(46219),i=n(81065);t.ValidateResponsesEditor=({data:e,onChange:t})=>o.default.createElement(a.FormSection,{name:"Validate responses",description:"When enabled, client side code will validate the structure of responses, and throw if a response is invalid."},o.default.createElement(i.Switch,{onChange:n=>t({...e,validateResponses:n}),value:e.validateResponses??!1}))},27794:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.editors=void 0;const r=n(16554),o=n(21361),a=n(39053),i=n(5127),s=n(97356),l=n(6685),c=n(43439),d=n(47524),u=n(25429);t.editors={documentation:a.DocumentationEditor,validateResponses:l.ValidateResponsesEditor,debugCookies:s.DebugCookiesEditor,allowCredentials:r.AllowCredentialsEditor,maxAge:i.MaxAgeEditor,allowedMethods:o.AllowedMethodsEditor,allowedOrigins:c.AllowedOriginsEditor,allowedRequestHeaders:d.AllowedRequestHeadersEditor,allowedResponseHeaders:u.AllowedResponseHeadersEditor}},83871:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ConfigurationEditorPage=void 0;const o=n(18592),a=r(n(67294)),i=n(39226),s=n(40782),l=n(81911),c=n(48265),d=n(39201),u=n(15435),p=n(39550),m=n(63042),f=n(34662),h=n(61329),g=n(68935),b=n(85537),y=o.css`
  flex: ${h.theme.flex.grow};
  background-color: ${h.theme.colors.dark4};
  overflow: auto;
`,v="editor",w=()=>{const e=(0,l.useProvideMobileContext)();return a.default.createElement(l.MobileContext.Provider,{value:e},a.default.createElement(c.MobileHeaderWithOverlay,{name:v,version:!0,href:"#/editor"},a.default.createElement(b.ExplorerTree,null)))};t.ConfigurationEditorPage=()=>{const e=(0,f.useGenerator)();return a.default.createElement(m.GeneratorContext.Provider,{value:e},a.default.createElement(s.DocContainer,null,a.default.createElement(d.SideBar,null,a.default.createElement(p.LogoContainer,null,a.default.createElement(u.Logo,{name:v,version:!0,href:"#/editor"})),a.default.createElement(b.ExplorerTree,null)),a.default.createElement("div",{className:y},a.default.createElement(i.BreakPoint,{Component:w,breakpoint:"phone"}),a.default.createElement(g.EditorView,null))))}},68935:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.EditorView=void 0;const o=r(n(14293)),a=r(n(67294)),i=n(7807),s=n(34662),l=n(6924),c=n(98859),d=n(14667);t.EditorView=()=>{const{editorInput:e,isLoading:t}=(0,s.useGeneratorContext)();if((0,o.default)(e))return a.default.createElement(d.NoEditor,null);switch(e?.type){case"file":return a.default.createElement(i.SyntaxHighlighter,{kind:"editor",language:"typescript"},e.content);case"issues":return a.default.createElement(c.IssuesPanel,{isLoading:t,node:e});case"configuration":return a.default.createElement(l.ConfigurationEditor,null);case"generator-source":return a.default.createElement(i.SyntaxHighlighter,{kind:"editor",language:"typescript"},e.source);case"package-json":return a.default.createElement(i.SyntaxHighlighter,{kind:"editor",language:"json"},e.source);case"folder":throw new TypeError(`Unexpected input of type "${e.type}"`);default:return a.default.createElement(d.NoEditor,null)}}},85537:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.ExplorerTree=void 0;const i=a(n(67294)),s=n(12259),l=n(38938),c=n(63042),d=n(67272);t.ExplorerTree=()=>{const{output:e,configuration:t,generatorSource:n,packageJson:r,issues:o}=(0,i.useContext)(c.GeneratorContext);return i.default.createElement(i.default.Fragment,null,i.default.createElement(l.SideBarSection,null,i.default.createElement(s.HomeTreeRoot,null)),i.default.createElement(l.SideBarSection,{title:"Input"},i.default.createElement(d.ExplorerTreeItem,{key:"configuration",value:t}),i.default.createElement(d.ExplorerTreeItem,{key:"source",value:n}),i.default.createElement(d.ExplorerTreeItem,{key:"package.json",value:r})),i.default.createElement(l.SideBarSection,{title:"Output"},i.default.createElement(d.ExplorerTreeItem,{key:"issues",value:o}),e.children.map((e=>i.default.createElement(d.ExplorerTreeItem,{key:e.path,value:e})))))}},67272:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.ExplorerTreeItem=void 0;const i=a(n(67294)),s=n(63042),l=n(5838),c=n(96486),d=n(67453),u=n(81911);t.ExplorerTreeItem=({value:e})=>{const{explorerTreeState:t,editorInput:n,setEditorInput:r,setExplorerTreeState:o}=(0,i.useContext)(s.GeneratorContext),{setMenuOpen:a}=(0,u.useMobileContext)();return i.default.createElement(l.TreeNode,{value:e,level:0,getIcon:e=>{switch(e.type){case"configuration":return d.HiWrenchScrewdriver;case"package-json":case"generator-source":return d.HiDocumentText;case"issues":return 0===e.issues.length?d.HiCheckCircle:e.issues.some((e=>"error"===e.severity))?d.HiXCircle:e.issues.some((e=>"warning"===e.severity))?d.HiExclamationCircle:d.HiInformationCircle;default:return}},getLabel:e=>{switch(e.type){case"file":case"folder":return e.name;case"configuration":return"Configure";case"generator-source":return"generate.ts";case"package-json":return"package.json";case"issues":return`Issues (${e.issues.length})`}},isOpen:e=>"folder"===e.type&&!0===t[e.path],isContainer:e=>"folder"===e.type,getChildren:e=>"folder"===e.type?e.children:[],isActive:e=>{if((0,c.isNil)(n))return!1;switch(n.type){case"file":return"file"===e.type&&n.path===e.path;case"folder":return!1;default:return e.type===n.type}},onClick:(e,n)=>{switch(e.type){case"file":return a(!1),r(`file::${e.path}`);case"folder":return o({...t,[e.path]:!n});default:return a(!1),r(e.type)}}})}},67067:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.IssuePath=void 0;const s=a(n(67294)),l=i(n(54998)),c=i(n(41609)),d=i(n(94885)),u=i(n(14293)),p=i(n(10928)),m=n(67453),f=n(18592),h=n(61329),g=f.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${h.theme.spacing.s};
`;t.IssuePath=({path:e})=>{const t=(0,s.useMemo)((()=>function(e){try{const t=new l.default(e),n=t.fragment(),r=t.path();if((0,c.default)(n))return;const o=n.split("/").filter((0,d.default)(c.default));if(!(0,c.default)(r)){const e=(0,p.default)(r.split("/"));o.unshift(e)}return o.map((e=>decodeURIComponent(e)))}catch(e){return}}(e)),[e]);return(0,u.default)(t)?s.default.createElement(s.default.Fragment,null,e):s.default.createElement("div",{className:g},t.map(((e,t)=>s.default.createElement(s.default.Fragment,null,0===t?null:s.default.createElement(m.HiChevronRight,null),s.default.createElement("span",null,e)))))}},98859:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.IssuesPanel=void 0;const o=n(18592),a=r(n(67294)),i=n(67453),s=n(89937),l=n(61329),c=n(67067),d=o.css`
  padding: ${l.theme.spacing.m} ${l.theme.spacing.xxm};
`,u=o.css`
  font-size: 1.4rem;
`,p=o.css`
  color: ${l.theme.colors.text};
  font-size: ${l.theme.fontSize.l};
  margin-top: ${l.theme.spacing.zero};
`,m=({severity:e})=>{switch(e){case"error":return a.default.createElement(i.HiXCircle,null);case"warning":return a.default.createElement(i.HiExclamationCircle,null);case"info":return a.default.createElement(i.HiInformationCircle,null)}};t.IssuesPanel=({node:e})=>a.default.createElement("div",{className:d},a.default.createElement("h1",{className:p},"Issues (",e.issues.length,")"),a.default.createElement(s.Table,null,a.default.createElement(s.THead,null,a.default.createElement(s.Tr,{isHeader:!0},a.default.createElement(s.Th,null),a.default.createElement(s.Th,null,"Path"),a.default.createElement(s.Th,null,"Message"))),a.default.createElement(s.TBody,null,e.issues.length>0?e.issues.map(((e,t)=>a.default.createElement(s.Tr,{key:t},a.default.createElement(s.Td,{className:u},a.default.createElement(m,{severity:e.severity})),a.default.createElement(s.Td,null,a.default.createElement(c.IssuePath,{path:e.path})),a.default.createElement(s.Td,null,e.message)))):a.default.createElement(s.Tr,{"aria-colspan":3},a.default.createElement(s.Td,null,"No issues")))))},14667:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.NoEditor=void 0;const o=r(n(67294)),a=n(67453);t.NoEditor=()=>o.default.createElement("div",null,o.default.createElement(a.HiDocument,null),"No editor open. Use the explorer on the left!")},44376:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const i=a(n(67294)),s=n(12259),l=n(38938),c=n(21521),d=n(21704);t.DocumentationMenu=()=>i.default.createElement(i.default.Fragment,null,i.default.createElement(l.SideBarSection,null,i.default.createElement(s.HomeTreeRoot,null)),d.sections.map((e=>i.default.createElement(i.Fragment,{key:e.name},i.default.createElement(l.SideBarSection,{title:e.name},e.items.map((e=>i.default.createElement(c.DocumentationTreeRoot,{node:e,key:e.md}))))))))},95462:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const o=n(18592),a=r(n(67294)),i=n(49818),s=n(39226),l=n(40782),c=n(76197),d=n(81911),u=n(48265),p=n(39201),m=n(15435),f=n(39550),h=n(61329),g=n(44376),b="docs",y=o.css`
  flex: ${h.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${h.theme.colors.muted};
  font-size: ${h.theme.fontSize.m};
  background-color: ${h.theme.colors.dark4};
`,v=()=>{const e=(0,d.useProvideMobileContext)();return a.default.createElement(d.MobileContext.Provider,{value:e},a.default.createElement(u.MobileHeaderWithOverlay,{name:b,version:!0,href:"#/documentation"},a.default.createElement(g.DocumentationMenu,null)))};t.DocumentationPage=()=>{const{page:e}=(0,i.useParams)(),t=e??"OpenAPI_GettingStarted";return a.default.createElement(l.DocContainer,null,a.default.createElement(p.SideBar,null,a.default.createElement(f.LogoContainer,null,a.default.createElement(m.Logo,{name:b,version:!0,href:"#/documentation"})),a.default.createElement(g.DocumentationMenu,null)),a.default.createElement("div",{className:y},a.default.createElement(s.BreakPoint,{Component:v,breakpoint:"phone"}),a.default.createElement(c.MarkdownView,{page:t})))}},21521:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const o=r(n(67294)),a=n(5838),i=n(49818),s=n(81911);t.DocumentationTreeRoot=({node:e})=>{const{page:t="OpenAPI_GettingStarted"}=(0,i.useParams)(),{setMenuOpen:n}=(0,s.useMobileContext)();return o.default.createElement(a.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===t,onClick:()=>n(!1),getHref:e=>`#/documentation/${e.md}`})}},17222:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStart=void 0;const o=n(18592),a=r(n(67294)),i=n(67453),s=n(61329),l=n(43418),c=n(7807),d=n(86299),u=r(n(26360)),p=r(n(70629)),m=n(41298),f=o.css`
  label: quick-start;
  margin-bottom: ${s.theme.spacing.xxxl};
`,h=o.css`
  label: quick-start-title;
  font-size: ${s.theme.fontSize.xl};
  color: ${s.theme.colors.text};
  margin-top: ${s.theme.spacing.xh};
  margin-bottom: ${s.theme.spacing.zero};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s.theme.spacing.s};
`,g=o.css`
  margin-top: ${s.theme.spacing.xm};
`;t.QuickStart=()=>a.default.createElement(a.default.Fragment,null,a.default.createElement("h2",{className:h},a.default.createElement(i.HiBeaker,null)," Quick start"),a.default.createElement("div",{className:f},a.default.createElement(l.QuickStartItem,{index:1,title:"Prepare your OpenAPI document"},"You need an OpenAPI document to start with. In case you don't have one already, try this example:",a.default.createElement(c.SyntaxHighlighter,{kind:"docs",lineWrap:!0},"https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json")),a.default.createElement(l.QuickStartItem,{index:2,title:"Install Oats generator modules"},"Install the necessary Oats modules to make the code generator work:",a.default.createElement(c.SyntaxHighlighter,{kind:"docs",lineWrap:!0},"npm i @oats-ts/openapi ts-node")),a.default.createElement(l.QuickStartItem,{index:3,title:"Configure the generator"},"Create a file called ",a.default.createElement("b",null,"oats.ts")," in your project root (you can call it anything you like), and the configuration:",a.default.createElement(c.SyntaxHighlighter,{language:"typescript",kind:"docs",lineWrap:!0},u.default)),a.default.createElement(l.QuickStartItem,{index:4,title:"Run the generator"},"Open a terminal and simply run:",a.default.createElement(c.SyntaxHighlighter,{kind:"docs"},"ts-node ./oats.ts")),a.default.createElement(l.QuickStartItem,{index:5,title:"Verify results"},"In case the generators successfully ran, you will see something like this in the terminal:",a.default.createElement(c.SyntaxHighlighter,{kind:"docs",lineWrap:!0},p.default),"The ",a.default.createElement(m.Code,null,"npm install")," command lists the necessary dependencies, that the generated output needs, to function at runtime. Run this command, and you are ready to use the generated output.",a.default.createElement("div",{className:g},"In case you see errors check out the ",a.default.createElement(d.Link,{href:"#"},"troubleshooting")," guide, describing the most common issues with OpenAPI documents, and in case it doesn't help please open an ",a.default.createElement(d.Link,{href:"#"},"issue"),"!")),a.default.createElement(l.QuickStartItem,{index:6,title:"What's next?"},"Check out the ",a.default.createElement(d.Link,{href:"#"},"documentation"),", where you can learn how to use the generator output, create custom generators and more. Also have a look at the ",a.default.createElement(d.Link,{href:"#"},"configuration editor"),", where you can put together your Oats configuration right in the browser, while observing the generated output (without downloading or installing anything).")))},21704:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const r=n(96486);t.sections=[{name:"Guides",items:[{md:"OpenAPI_GettingStarted",name:"Getting started"},{md:"OpenAPI_GeneratedSdk",name:"Using a generated SDK"},{md:"OpenAPI_GeneratedServer",name:"Using a generated server"},{md:"OpenAPI_CustomGenerators",name:"Custom generators"},{md:"OpenAPI_CommonMistakes",name:"Common mistakes"}]},{name:"Api",items:[{md:"OpenAPI_Read",name:"Read"},{md:"OpenAPI_Validate",name:"Validate"},{md:"OpenAPI_Generate",name:"Generate"},{md:"Typescript_Write",name:"Write"}]}],t.docs=(0,r.flatMap)(t.sections,(e=>e.items))},10895:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;const o=n(18592),a=r(n(67294)),i=n(69512),s=n(61329),l=n(39226),c=n(15435),d=n(81154),u=o.css`
  label: header;
  width: 100%;
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  @media ${l.breakpoints.phone} {
    display: none;
  }
`,p=o.css`
  label: header-content;
  height: ${s.theme.spacing.xxh};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;t.Header=()=>a.default.createElement("header",{className:u},a.default.createElement("div",{className:(0,o.cx)(p,i.containerStyle)},a.default.createElement(c.Logo,{version:!1,href:"#"}),a.default.createElement(d.LandingPageMenu,null)))},16381:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPage=void 0;const o=r(n(67294)),a=n(4151),i=n(55050),s=n(20364),l=n(48732),c=n(10895),d=n(17222),u=n(12872),p=n(48265),m=n(81911),f=n(39226),h=n(81154),g=()=>{const e=(0,m.useProvideMobileContext)();return o.default.createElement(m.MobileContext.Provider,{value:e},o.default.createElement(p.MobileHeaderWithOverlay,{version:!1,href:"#"},o.default.createElement(h.LandingPageMenu,null)))};t.LandingPage=()=>o.default.createElement(u.AppContainer,null,o.default.createElement(c.Header,null),o.default.createElement(f.BreakPoint,{Component:g,breakpoint:"phone"}),o.default.createElement(a.Content,null,o.default.createElement(l.HeroSection,null),o.default.createElement(s.Headlines,null),o.default.createElement(d.QuickStart,null)),o.default.createElement(i.Footer,null))},81154:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPageMenu=void 0;const o=r(n(67294)),a=n(67453),i=n(55023),s=n(20012);t.LandingPageMenu=()=>o.default.createElement(i.MenuBar,null,o.default.createElement(s.MenuItem,{label:"Home",icon:a.HiHome,href:"#/",active:!0}),o.default.createElement(s.MenuItem,{label:"Documentation",icon:a.HiDocument,href:"#/documentation"}),o.default.createElement(s.MenuItem,{label:"Editor",icon:a.HiCog6Tooth,href:"#/editor"}))},61329:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",l:"1.8rem",xl:"2rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}},13411:e=>{function t(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=13411,e.exports=t},57363:()=>{},33:()=>{},79511:()=>{},89317:()=>{},62183:()=>{},13024:()=>{},62715:()=>{},13611:()=>{},28353:()=>{},1210:()=>{},77488:()=>{},43454:()=>{},33781:()=>{}},o={};function a(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={id:e,loaded:!1,exports:{}};return r[e].call(n.exports,n,n.exports,a),n.loaded=!0,n.exports}a.m=r,e=[],a.O=(t,n,r,o)=>{if(!n){var i=1/0;for(d=0;d<e.length;d++){for(var[n,r,o]=e[d],s=!0,l=0;l<n.length;l++)(!1&o||i>=o)&&Object.keys(a.O).every((e=>a.O[e](n[l])))?n.splice(l--,1):(s=!1,o<i&&(i=o));if(s){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[n,r,o]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var o=Object.create(null);a.r(o);var i={};t=t||[null,n({}),n([]),n(n)];for(var s=2&r&&e;"object"==typeof s&&!~t.indexOf(s);s=n(s))Object.getOwnPropertyNames(s).forEach((t=>i[t]=()=>e[t]));return i.default=()=>e,a.d(o,i),o},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={179:0};a.O.j=t=>0===e[t];var t=(t,n)=>{var r,o,[i,s,l]=n,c=0;if(i.some((t=>0!==e[t]))){for(r in s)a.o(s,r)&&(a.m[r]=s[r]);if(l)var d=l(a)}for(t&&t(n);c<i.length;c++)o=i[c],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(d)},n=self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var i=a.O(void 0,[154],(()=>a(12299)));i=a.O(i)})();
//# sourceMappingURL=v2-main.js.map