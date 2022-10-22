(()=>{"use strict";var e,t,n,o={78788:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# 🌱 oats\n\nThis project aims to provide a solution for generating quality Typescript code from API-describing documents. The only supported format currently is [OpenAPI 3.x](https://www.openapis.org), but there are plans to introduce generators for [AsyncAPI](https://www.asyncapi.com/) as well.\n\nThe goal is to minimize the boilerplate a human developer has to write, to reduce the tedium around keeping a client and a server in sync, and to allow devs to focus on just displaying or moving data, without worrying about the structural correctness of that data.\n\n## why?\n\nWhy does this project exists? There are countless OpenAPI generators out there.\n\nThe main goals/differences are:\n\n- Make it work for 1 language (Typescript), and do that well.\n- Make every part of the API replaceable (without forking the project) in case it doesn't suit your needs.\n- Make it easy to customize, to suit a wide variety of use cases out of the box.\n- Make the generated code as easy to read, as if a dev would have written it by hand (or get as close to this as possible).\n\n## get started with OpenAPI\n\n- Check out the [docs](OpenAPI_Workflow) to get started!\n- The [demo](#/demo) page lets you experiment with oats, right here in the browser\n- If you find any issues, I'd greatly appreciate if you [report](https://github.com/oats-ts/oats-ts/issues) it!\n"},74663:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Custom Generators\n\nTODO"},15316:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Generate\n\nThe generator step is responsible for taking the validated output of the [reader](OpenAPI-Reader), and turning it into an intermediate representation (Typescript [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) in this case), that can be then turned into source code. The OpenAPI generator itself doesn't do much, the work is distributed to single responsiblity generators, that are responsible for generating one thing (like types from the JSON schemas, or serializers for parameters). They also provide means for other generators to access references to their generated content.\n\nThe generators that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-generators](https://www.npmjs.com/package/@oats-ts/openapi-generators) package.\n\n## Examples\n\n### Using individual generators\n\nYou can configure your generator from a set of code generators of your choosing. For this approach, it's the easiest to use `generators.create` from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi) package. You can use the generator names (see below) as the first argument, and optionally the approriate configuration object as the second argument (autocomplete will help with this).\n\n```ts\nimport { generator, nameProviders, pathProviders, generators } from '@oats-ts/openapi'\n\nconst withGenerators = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: [\n    generators.create('oats/type', { documentation: false }),\n    generators.create('oats/type-guard'),\n    generators.create('oats/type-validator'),\n  ],\n})\n```\n\n### Using presets\n\nYou can also use presets (I'd recommend starting with presets). Presets are a set of generators grouped toghether. The ones available currently are `presets.client()`, `presets.server()` and `presets.fullStack()`. The simplest way is to use the preset without any configuration:\n\n```ts\nimport { generator, nameProviders, pathProviders, presets } from '@oats-ts/openapi'\n\nconst withDefaults = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client(),\n})\n```\n\nPresets offer configuration options, that affect possibly multiple individual generators. In this case we are disabling the documentation for all the generators that support this option:\n\n```ts\nconst withOverrides = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client({\n    documentation: false,\n    validateResponses: false,\n  }),\n})\n```\n\nIn case you want to really fine tune presets, you can override the configuration for individual generators as well. In this case we are only generating documentation for types:\n\n```ts\nconst withOverrides = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client({ documentation: false }).override({ 'oats/type': { documentation: true } }),\n})\n```\n\n### Mixing presets and generators\n\nPresets and individual generators can be used together:\n\n```ts\nconst withPresetsAndGenerators = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: [presets.client(), generators.create('oats/express-cors-router-factory')],\n})\n```\n\n## Configuration\n\nThe main `generator` function can be configured with an object having the following properties:\n\n- `nameProvider: (input: any, originalName: string | undefined, target: string) => string` - A function that determines how each generated artifact is called. For reasonable, convention respecting names use `nameProviders.default()`\n  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).\n  - `originalName` optionally appears for pieces of the OpenAPI document, where the name is not part of the object itself (eg.: Schema object).\n  - `target` is one of the names listed below.\n- `pathProvider: (input: any, name: NameProvider, target: string) => string` - A function that determines where in the disk each artifact is written to (`SourceFile#fileName`). Check `pathProviders.*` for options.\n  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).\n  - `name` is a simplified function that takes the `input` and the `target` and delegates to the `nameProvider`.\n  - `target` is one of the names listed below.\n- `children: OpenAPIGenerator | OpenAPIGenerator[]` - A single generator or a list of generators. See available ones below.\n- `noEmit?: boolean = false` - When `true`, the generators return no output `SourceFile`s.\n- `name?: string = 'root'` - The name of the root generator, shows up in logs.\n\n## Available generators\n\nThere are a number of code generators available. These are part of certain presets, but can also be used individually, using `generators.create`. In case you want to see them in action, check the [demo](#/demo) page!\n\n| **Name**                             | **Preset**                | **Uses**                                                                                                                   | **Creates**                                                                                                                                                                 |\n| ------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| oats/type-guard                      | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | [Type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) based on JSON schemas                                              |\n| oats/type-guard                      | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on JSON schemas                                                                            |\n| oats/type                            | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | Typescript types based on JSON schemas                                                                                                                                      |\n| oats/api-type                        | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Type encapsulating server behaviour                                                                                                                                         |\n| oats/express-cors-router-factory     | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) handling CORS headers.                                 |\n| oats/express-router-factory          | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) encapsulating the app.                                 |\n| oats/express-app-router-factory      | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) for each operations.                                   |\n| oats/express-router-factories-type   | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Object type, with all [Express](https://expressjs.com) [Routers](https://expressjs.com/en/guide/routing.html)                                                               |\n| oats/express-context-handler-factory | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) handler for exposing OATS configuration for all routers                                                      |\n| oats/operation                       | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of making an HTTP requests, based on operations                                                                                                          |\n| oats/path-deserializer               | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                       |\n| oats/path-serializer                 | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                         |\n| oats/path-type                       | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [path parameters](https://swagger.io/docs/specification/serialization/#path) for operations                                                                |\n| oats/query-deserializer              | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                     |\n| oats/query-serializer                | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                       |\n| oats/query-type                      | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [query parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                              |\n| oats/cookie-deserializer             | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing client side Cookie headers for [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations    |\n| oats/cookie-serializer               | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing client side Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations       |\n| oats/set-cookie-deserializer         | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations |\n| oats/set-cookie-serializer           | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations   |\n| oats/cookies-type                    | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie) for operations                                                            |\n| oats/request-body-validator          | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on request bodies of operations                                                            |\n| oats/request-headers-deserializer    | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                           |\n| oats/request-headers-serializer      | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                             |\n| oats/request-headers-type            | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting request [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                     |\n| oats/request-server-type             | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all inputs for operations (server variant, inputs wrappedn in [Try](https://www.npmjs.com/package/@oats-ts/try)s)                                          |\n| oats/request-type                    | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all inputs for operations                                                                                                                                  |\n| oats/response-body-validator         | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on response bodies of operations                                                           |\n| oats/response-headers-deserializer   | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                          |\n| oats/response-headers-serializer     | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                            |\n| oats/response-headers-type           | client, server, fullStack | Status code + [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject) | Types collecting response [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                    |\n| oats/response-type                   | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all outputs for operations                                                                                                                                 |\n| oats/sdk-impl                        | client                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Implementation of `oats/sdk-impl` utilizing `oats/operation`                                                                                                                |\n| oats/sdk-type                        | client                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Type collecting all operations a client might call                                                                                                                          |\n\n## Extending generators\n\nIn case you want to dig deeper, and extend certain generators, check out the [source](https://github.com/oats-ts/oats-ts/tree/master/projects/openapi-generators).\n"},67404:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Getting Started\n\nTODO"},6926:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Read\n\nThe reader step is responsible for\n\n- Reading your OpenAPI 3.x document\n- Parsing it\n- Structurally validating it\n- Resolving it's internal and external [references](https://swagger.io/docs/specification/using-ref)\n- And exposing it to the next step\n\nThe reader that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-reader](https://www.npmjs.com/package/@oats-ts/openapi-reader) package.\n\n## Examples\n\n```ts\nimport { readers } from '@oats-ts/openapi'\n\n// Reads from the local file system, in json format\nconst jsonFileReader = readers.file.json('oa.json')\n\n// Reads from the local file system, in json format\nconst httpsYamlReader = readers.https.yaml('https://asd.com/oa.yaml')\n\n// Reads from any source in any format\nconst mixedReader = readers.mixed.mixed('http://localhost:3000/oa.json')\n```\n\n## Configuration\n\n### Read\n\nThe reader can be configured to read inputs a few different ways:\n\n- `http` - Reads main input document (and all possible references) from http. Will fail if the main input (or any of the references) are not accessible through http (https, local file system etc).\n- `https` - Reads main input document (and all possible references) from https. Will fail if the main input (or any of the references) are not accessible through https (http, local file, etc).\n- `file` - Reads main input document (and all possible references) from your local file system. Will fail if the main input (or any of the references) are not on your file system.\n- `mixed` - Reads main input document (and all possible references) from any of the sources above. You can have for example a main document in your local file system, that can reference a document through http, which references another document through https.\n- `test` - Reads main input document (and all possible references) from memory. Ideal for testing custom generators end-to-end.\n\n### Parse\n\nFor parsing the document that has been read, there are also a few different built-in solutions:\n\n- `json` - Parses the document(s) using [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).\n- `yaml` - Parses the document(s) using [yamljs](https://github.com/jeremyfa/yaml.js)\n- `mixed` - First tries to parse the document using `json`, then if that fails, it tries parsing using `yaml`. If both fail, the parsing is considered failed.\n\n## Advanced usage\n\nIn case the solutions above don't suit your needs, you can use the `readers.custom` function, to wich you need to provide a configuration object, with the following properties:\n\n- `path: string` - the entry point where the main document is\n- `sanitize: (path: string) => Try<string>` - Turns `path` into [fully qualified URI](https://www.ietf.org/rfc/rfc2396.txt)\n- `read: (uri: string) => Promise<Try<string>>` - Reads a document based on a fully qualified URI\n- `parse: (uri: string, input: string) => Promise<Try<OpenAPIObject>>` - Parses the result of a `read` into an `OpenAPIObject` (typings can be found in [@oats-ts/openapi-model](https://www.npmjs.com/package/@oats-ts/openapi-model))\n"},42812:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Using generated SDKs\n\nTODO\n"},99182:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Using generated server\n\nTODO\n"},19029:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Validate\n\nThe valididator step is responsible for taking the output of the [reader](OpenAPI-Reader) step, and checking for structural and semantic errors.\n\nThe validator that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-validator](https://www.npmjs.com/package/@oats-ts/openapi-validator) package.\n\n## Examples\n\n```ts\nimport { validator } from '@oats-ts/openapi';\n\n// Default validator\nconst defaultValidator = validator();\n```\n\n## Configuration\n\nThe validator can be used configuration free. This is the default behaviour, and it ensures that the generators maintained as part of the oats project run correctly with your OpenAPI document.\n\nConfiguring the validator to suit your needs is possible, but currently experimental, docs are TBD, as the internal APIs might change.\n"},74709:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Workflow\n\nThis guide will walk you through on how to get started with oats and OpenAPI.\n\n## Set up the code generator\n\n### Dependencies\n\nLet's assume that you already have a Typescript project. The first thing you'll need is the core oats package (`@oats-ts/oats-ts`), and the OpenAPI specific libararies for oats (`@oats-ts/openapi`). Additionally we are going to write the generator's configuration in typescript as well, and to make it easy to run it, we are going to add `ts-node` to the project as well:\n\n```bash\nnpm i ts-node @oats-ts/oats-ts @oats-ts/openapi\n```\n\n### Generator configuration\n\nNext we need to put together the generator configuration, and we need to run this code.\n\nLet's assume, that your code lives in the `src` folder. Let's create a `generate.ts` file here (it's an ordinary typescript file, you can call it whatever you like):\n\n```ts\n// src/generate.ts\n\nimport { generate } from '@oats-ts/oats-ts'\nimport {\n  nameProviders,\n  generator,\n  pathProviders,\n  presets,\n  readers,\n  writers,\n  formatters,\n  loggers,\n  validator,\n} from '@oats-ts/openapi'\n\nimport prettierConfig from './.prettierrc.json'\n\ngenerate({\n  logger: loggers.simple(),\n  reader: readers.https.json('https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json'),\n  validator: validator(),\n  generator: generator({\n    nameProvider: nameProviders.default(),\n    pathProvider: pathProviders.default('src/generated'),\n    children: presets.fullStack(),\n  }),\n  writer: writers.typescript({\n    format: formatters.prettier(prettierConfig),\n  }),\n})\n```\n\n### Breakdown\n\n- `generate` - The main generator harness. Responsible for coordinating the generator steps.\n  - `logger` - Logs the generator events as they happen. Can be either `simple` or `verbose`. If ommited, you will have no feedback about what's happening, so it's recommended to use a logger.\n  - `reader` - Reads the root OpenAPI document, resolving it's internal (and external) dependencies. Also structurally validates the document. Can read from `file`, `http` or `https` in `json` and `yaml` formats. For this example we are using a dummy OpenAPI document I use for testing, see more here: https://github.com/oats-ts/oats-schemas .\n  - `validator` - Takes the output of the reader, and validates it for any possible inconsistencies or issues that might trip up the generators.\n  - `generator` - Takes the output of the reader, and generates Typescript syntax tree from it. The work of the generator is split into smaller, single responsibilty code-generators, that are responsible for a single concern, eg.: generate schema types or parameter serializers.\n    - `nameProvider` - Function determining how each generated artifact should be named.\n    - `pathProvider` - Function determining what disk location each artifact should be written to.\n    - `children` - Either a list of single-responsible code-generators, or a preset, which is a collection of these generators. Individual generators are exposed in the `generators` object, coming from the `'@oats-ts/openapi'` package.\n  - `writer` - Takes the output of the generator, stringifies the syntax tree (SourceFiles), and then writes them to the disk.\n    - `format` - Function formatting the output before it gets written to the disk. In this case using the prettier formatter, and with the config the project is already using.\n\n## Run the code generator\n\nTo run it, you can either compile it and run it using the `node` command, or you can use `ts-node` to save the extra step (we are opting for this in this guide). You don't need any special runner.\n\n```bash\nts-node src/generate.ts\n```\n\nWhich will output something like:\n\n```bash\n✔ reader step completed using \"@oats-ts/openapi-reader\"\n✔ validator step completed using \"@oats-ts/openapi-validator\"\n✔ generator step completed using \"@oats-ts/openapi-generators\"\n✔ writer step completed using \"@oats-ts/typescript-writer\"\n```\n\nFor convenience, you could create an entry in your `package.json`, that runs this command, eg.:\n\n```jsonc\n{\n  \"name\": \"your-project\",\n  // ...\n  \"scripts\": {\n    // ...\n    \"oats\": \"ts-node src/generate.ts\"\n  }\n}\n```\n\nThen you can just do this, for subsequent generator runs:\n\n```bash\nnpm run oats\n```\n\n## Where to go from here?\n\n- If you this looks interesting, check out the [demo](#/demo) page, where you can see the outputs of each generator, with either your OpenAPI inputs or samples!\n- If you find any issues, I'd greatly appreciate if you [report](https://github.com/oats-ts/oats-ts/issues) it!\n"},59799:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Write\n\nThe writer step is responsible for taking the output of the [generator step](OpenAPI-Generator) and writing it's outputs to the disk. The typescript writer takes typescript `SourceFile`s (this is Typescript's in-memory representation of an AST + file location) and writes them to the desired location.\n\nAdditionally it can add leading / trailing comments to each of your generated files. This is ideal for warning people that the file is generated and should be edited manually, or for disabling certain linter rules for the generated files.\n\n## Example\n\n### Basic usage\n\nBasic usage, formats the code using your project's prettier configuration. Formatter can be omitted, but the generated code won't be pretty in this case.\n\n```ts\nimport { writers, formatters } from '@oats-ts/openapi'\nimport prettierConfig from './.prettierrc.json'\n\nconst writer = writers.typescript.file({\n  format: formatters.prettier(prettierConfig),\n})\n```\n\n### With comments\n\nAdds comments. First leading comment warns about the fact that the file is generated, the second disables some `eslint` rules. The trailing comment re-enables these rules, so other code is not affected **(this is just an example, generated code will not break these specific rules)**.\n\n```ts\nimport { writers, formatters } from '@oats-ts/openapi'\nimport prettierConfig from './.prettierrc.json'\n\nconst writer = writers.typescript.file({\n  format: formatters.prettier(prettierConfig),\n  comments: {\n    leadingComments: [\n      {\n        type: 'block',\n        text: 'This is a generated file, please do not edit by hand!',\n      },\n      {\n        type: 'block',\n        text: 'eslint-disable no-console, no-alert',\n      },\n    ],\n    trailingComments: [\n      {\n        type: 'block',\n        text: 'eslint-enable no-console, no-alert',\n      },\n    ],\n  },\n})\n```\n\n## Configuration\n\nThe `writers.typescript` object exposes 3 factory functions:\n\n- `file` - Writes the generated code to the disk. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n- `memory` - Doesn't write the output to the disk, returns the generated code instead as `{ path: string; content: string }[]` instead. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n- `custom` - Customizeable `write` function, ideal if you want to send the output over the wire for example. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n  - `write(path: string, content: string): Promise<void>` - Writes the stringified, possibly formatted `content` to the disk at `path`.\n"},91482:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="import * as oats from '@oats-ts/openapi'\n\nconst generatorConfig: oats.GeneratorConfig = {\n  logger: oats.loggers.simple(),\n  reader: oats.readers.https.json('https://your.openapi.doc'),\n  // Or if you are generating from a local file:\n  // reader: oats.readers.file.json('openapi.json'),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    children: oats.presets.fullStack(),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n}\n\nexport default generatorConfig\n"},11761:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.markdown=void 0;const a=o(n(78788)),r=o(n(15316)),i=o(n(6926)),s=o(n(19029)),l=o(n(74709)),c=o(n(59799)),d=o(n(74663)),p=o(n(67404)),u=o(n(42812)),m=o(n(99182));t.markdown={Home:a.default,OpenAPI_Generate:r.default,OpenAPI_Read:i.default,OpenAPI_Validate:s.default,OpenAPI_Workflow:l.default,Typescript_Write:c.default,OpenAPI_GettingStarted:p.default,OpenAPI_Sdk:u.default,OpenAPI_Server:m.default,OpenAPI_CustomGenerator:d.default}},72428:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppV2=void 0;const a=o(n(67294)),r=n(49818),i=n(95462),s=n(16381);t.AppV2=()=>a.default.createElement(r.Routes,null,a.default.createElement(r.Route,{index:!0,element:a.default.createElement(s.LandingPage,null)}),a.default.createElement(r.Route,{path:"documentation",element:a.default.createElement(i.DocumentationPage,null)}),a.default.createElement(r.Route,{path:"documentation/:page",element:a.default.createElement(i.DocumentationPage,null)}))},12872:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppContainer=void 0;const a=n(18592),r=o(n(67294)),i=n(61329),s=a.css`
  label: app-container;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  margin: 0px;
  padding: 0px;
  background-color: ${i.theme.colors.dark2};
`,l=a.css`
  label: vertical;
  flex-direction: column;
`,c=a.css`
  label: vertical;
  flex-direction: row;
`;t.AppContainer=({children:e,direction:t,className:n})=>{const o=(0,a.cx)(s,"horizontal"===t?c:l,n);return r.default.createElement("div",{className:o},e)}},79514:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const a=n(18592),r=o(n(67294)),i=n(61329),s=a.css`
  label: secondary-button;
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};

  &:hover {
    background-color: ${i.theme.colors.buttonHover};
  }
`,l=a.css`
  label: primary-button;
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.green};

  &:hover {
    background-color: #2ea043;
  }
`,c=a.css`
  label: button;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  padding: 16px 20px;
  border: unset;
  border-radius: 14px;
  position: relative;
  font-weight: 400;
  cursor: pointer;
  font-size: ${i.theme.font.m};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 8px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 18px;
  }
`;t.Button=({children:e,variant:t,className:n})=>{const o=(0,a.cx)(c,"primary"===t?l:s,n);return r.default.createElement("button",{className:o},e)}},4151:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Content=void 0;const a=o(n(67294)),r=n(18592),i=n(158),s=r.css`
  label: content;
  width: 100%;
  flex: 1 1 1px;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
`;t.Content=({children:e})=>a.default.createElement("main",{className:(0,r.cx)(s,i.ctnr)},e)},55050:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Footer=void 0;const a=n(18592),r=o(n(67294)),i=n(15435),s=n(61329),l=n(86299),c=a.css`
  label: footer;
  background-color: ${s.theme.colors.dark1};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10px;
  gap: 10px;
`,d=a.css`
  font-size: ${s.theme.font.m};
  color: ${s.theme.colors.muted};
`,p=a.css`
  font-size: ${s.theme.font.s};
  color: ${s.theme.colors.muted};
`,u=a.css`
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  margin-bottom: 20px;
`,m=a.css`
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${s.theme.font.l};
  color: ${s.theme.colors.muted};
`;t.Footer=()=>r.default.createElement("footer",{className:c},r.default.createElement("a",{className:u,href:"#"},r.default.createElement(i.Logo,{width:60,color:s.theme.colors.muted}),r.default.createElement("h1",{className:m},"Oats")),r.default.createElement("span",{className:d},"Copyright © 2022 Balázs Édes"),r.default.createElement("span",{className:p},"All Oats modules under the ",r.default.createElement(l.Link,{href:"https://opensource.org/licenses/MIT"},"MIT license")))},73976:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;const a=n(18592),r=o(n(67294)),i=n(69274),s=n(61329),l=n(158),c=n(20012),d=n(16045),p=a.css`
  label: header;
  width: 100%;
  margin: 0px;
  padding: 0px;
`,u=a.css`
  label: header-content;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: ${s.theme.font.m};
`,m=a.css`
  label: header-menu-items-container;
  display: flex;
  flex-direction: row;
  ${l.breakpoints.phone} {
    /* TODO */
    display: none;
  }
`;t.Header=()=>r.default.createElement("header",{className:p},r.default.createElement("div",{className:(0,a.cx)(u,l.ctnr)},r.default.createElement(d.MenuLogo,null),r.default.createElement("ul",{className:m},r.default.createElement(c.MenuItem,{label:"Home",icon:i.HiHome,href:"#/",active:!0}),r.default.createElement(c.MenuItem,{label:"Documentation",icon:i.HiDocument,href:"#/documentation"}),r.default.createElement(c.MenuItem,{label:"Configuration Editor",icon:i.HiCog6Tooth,href:"#/"}))))},20364:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Headlines=void 0;const a=n(18592),r=o(n(67294)),i=n(69274),s=n(61329),l=n(79514),c=n(158),d=a.css`
  label: headlines;
  display: flex;
  flex-direction: row;
  gap: 24px;

  ${c.breakpoints.phone} {
    flex-direction: column;
    gap: 50px;
  }
`,p=a.css`
  label: headlines-items-container;
  color: ${s.theme.colors.muted};
  font-size: ${s.theme.font.m};
`,u=a.css`
  label: headlines-item-header;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  color: ${s.theme.colors.text};
  font-size: ${s.theme.font.m};
  margin-top: 0px;
`,m=a.css`
  label: headlines-item-content;
  margin-bottom: 24px;
  flex: 1 1 1px;
`;t.Headlines=()=>r.default.createElement("div",{className:d},r.default.createElement("div",{className:p},r.default.createElement("h3",{className:u},r.default.createElement(i.HiPuzzlePiece,null),"Generate an SDK"),r.default.createElement("section",{className:m},"Create an easy to use, statically typed SDK for your backend, with all the bells and whistles, and either use it in house, or expose it to your customers."),r.default.createElement(l.Button,null,r.default.createElement(i.HiBookOpen,null),"Learn more")),r.default.createElement("div",{className:p},r.default.createElement("h3",{className:u},r.default.createElement(i.HiServerStack,null),"Generate the backend"),r.default.createElement("section",{className:m},"Generate all the tedious parts of your backend, like routing, parameter and body parsing and serialization, and CORS, and just implement moving data."),r.default.createElement(l.Button,null,r.default.createElement(i.HiBookOpen,null),"Learn more")),r.default.createElement("div",{className:p},r.default.createElement("h3",{className:u},r.default.createElement(i.HiWrenchScrewdriver,null),"Customize generators"),r.default.createElement("section",{className:m},"The available generators don't fully suit your needs, or you need more? Customize existing generators, or create your own, without writing everything from scratch."),r.default.createElement(l.Button,null,r.default.createElement(i.HiBookOpen,null),"Learn more")))},48732:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HeroSection=void 0;const a=n(18592),r=o(n(67294)),i=n(61329),s=n(79514),l=n(158),c=n(66653),d=n(69274),p=n(86299),u=a.css`
  label: hero-section;
  width: 100%;
  margin: 0px;
  padding: 80px 0px;
  ${l.breakpoints.desktop} {
    padding: 100px 0px;
  }
  ${l.breakpoints.tablet} {
    padding: 80px 0px;
  }
`,m=a.css`
  label: hero-section-content;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: 18px;
  height: 100%;
`,h=a.css`
  label: hero-text-1;
  font-size: ${i.theme.font.xl};
  color: ${i.theme.colors.text};
  margin: 0px;
  text-align: center;
`,f=a.css`
  label: hero-text-2;
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.font.m};
  font-weight: 400;
  margin: 0px 0px 20px 0px;
  width: 70%;
  text-align: center;
  flex-shrink: 0;
`,g=a.css`
  label: hero-button-container;
  display: flex;
  gap: 12px;
`;t.HeroSection=()=>r.default.createElement("div",{className:u},r.default.createElement("div",{className:(0,a.cx)(l.ctnr,m)},r.default.createElement("h2",{className:h},"Generate TypeScript from OpenAPI, that makes sense."),r.default.createElement("h3",{className:f},"Customizable, extensible and ",r.default.createElement("b",null,"open source")," code generators, that output quality"," ",r.default.createElement(p.Link,{href:"https://www.typescriptlang.org"},"TypeScript"),", from your"," ",r.default.createElement(p.Link,{href:"https://www.openapis.org"},"OpenAPI")," definitions."),r.default.createElement("div",{className:g},r.default.createElement(s.Button,{variant:"primary"},r.default.createElement(d.HiPlay,null)," Get Started"),r.default.createElement(s.Button,null,r.default.createElement(d.HiCog6Tooth,null)," Try Editor"),r.default.createElement(s.Button,null,r.default.createElement(c.GoOctoface,null)," Github"))))},86299:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const a=o(n(67294)),r=n(18592),i=n(61329),s=r.css`
  label: link;
  position: relative;
  text-decoration: none;
  gap: 8px;
  align-items: center;
  transition: color 150ms linear;
  text-decoration: underline;
  color: ${i.theme.colors.muted};

  &:hover {
    text-decoration: none;
    color: ${i.theme.colors.text};
  }
`;t.Link=({children:e,className:t,...n})=>a.default.createElement("a",{className:(0,r.cx)(s,t),...n},e)},15435:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const a=o(n(67294)),r=n(61329),i=n(86753);t.Logo=({color:e=r.theme.colors.green,width:t,height:n})=>{const[o,s]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,n);return a.default.createElement("svg",{width:o,height:s,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},76197:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const s=n(18592),l=n(96486),c=i(n(67294)),d=r(n(23209)),p=i(n(34112)),u=n(11761),m=n(61329),h=n(86299),f=n(7807),g=s.css`
  color: ${m.theme.colors.text};
  font-size: ${m.theme.font.l};
  margin-top: 0px;
`,b=s.css`
  color: ${m.theme.colors.text};
  font-size: ${m.theme.font.m};
`,v=s.css`
  color: ${m.theme.colors.text};
  font-size: ${m.theme.font.m};
`,y=s.css`
  font-size: ${m.theme.font.code};
  color: ${m.theme.colors.text};
  background-color: ${m.theme.colors.dark1};
  padding: 2px 4px;
  border-radius: 6px;
`,x=s.css`
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid ${m.theme.colors.dark1};
  margin: 1px;
`,O=s.css`
  border-collapse: collapse;
`,w=s.css`
  background-color: ${m.theme.colors.dark1};
`,k=s.css`
  padding: 10px;
`,_=s.css`
  color: ${m.theme.colors.text};
  padding: 18px 10px;
  text-align: left;
  border: 2px solid ${m.theme.colors.dark1};
`,j=s.css`
  border: 2px solid ${m.theme.colors.dark1};
  border-left-width: 0px;
  border-right-width: 0px;
`,P=Object.keys(u.markdown),I=e=>P.some((t=>e.startsWith(t)))?"Home"===e?"#":`#/docs/${e}`:(0,d.uriTransformer)(e),E=[p.default],A={h1:({children:e})=>c.default.createElement("h1",{className:g},e),h2:({children:e})=>c.default.createElement("h2",{className:b},e),h3:({children:e})=>c.default.createElement("h3",{className:v},e),table:({children:e})=>c.default.createElement("div",{className:x},c.default.createElement("table",{className:O},e)),tr:({children:e,isHeader:t})=>c.default.createElement("tr",{className:t?w:j},e),th:({children:e})=>c.default.createElement("th",{className:_},e),td:({children:e})=>c.default.createElement("td",{className:k},e),a:({href:e,children:t})=>c.default.createElement(h.Link,{href:e},t),code({node:e,inline:t,className:n,children:o,...a}){const r=/language-(\w+)/.exec(n||"");return null===r||t?c.default.createElement("code",{className:y,...a},o):c.default.createElement(f.SyntaxHighlighter,{language:r[1]},String(o).replace(/\n$/,""))}};t.MarkdownView=({page:e})=>(0,l.isNil)(e)||(0,l.isNil)(u.markdown[e])?c.default.createElement("div",null,"The documentation page you are looking for doesn't exist."):c.default.createElement(d.default,{remarkPlugins:E,components:A,transformLinkUri:I},u.markdown[e])},20012:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuItem=void 0;const a=n(18592),r=o(n(67294)),i=n(61329),s=a.css`
  label: active-menu-item;
  color: ${i.theme.colors.text};
`,l=a.css`
  label: menu-item-anchor;
  position: relative;
  text-decoration: none;
  color: ${i.theme.colors.muted};
  display: flex;
  gap: 8px;
  align-items: center;
  transition: color 150ms linear;

  &:hover {
    color: ${i.theme.colors.text};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${i.theme.colors.text};
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
`,c=a.css`
  label: menu-item;
  height: 100%;
  padding: 0px 24px;
  color: ${i.theme.colors.text};
  display: flex;
  gap: 8px;
  align-items: center;
`;t.MenuItem=({label:e,active:t,href:n,icon:o})=>{const i=(0,a.cx)(l,t?s:void 0);return r.default.createElement("li",{className:c},r.default.createElement("a",{href:n,className:i},r.default.createElement(o,{size:"20px"}),r.default.createElement("span",null,e)))}},16045:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuLogo=void 0;const a=n(18592),r=o(n(67294)),i=n(15435),s=n(61329),l=a.css`
  label: menu-logo;
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
`,c=a.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${s.theme.font.l};
  color: ${s.theme.colors.text};
`;t.MenuLogo=()=>r.default.createElement("a",{className:l,href:"#"},r.default.createElement(i.Logo,{width:60}),r.default.createElement("h1",{className:c},"Oats"))},56005:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStart=void 0;const a=n(18592),r=o(n(67294)),i=n(60155),s=n(61329),l=n(43418),c=n(7807),d=n(86299),p=o(n(91482)),u=a.css`
  label: quick-start;
  margin-bottom: 40px;
`,m=a.css`
  label: quick-start-title;
  font-size: ${s.theme.font.xl};
  color: ${s.theme.colors.text};
  margin-top: 70px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;t.QuickStart=()=>r.default.createElement(r.default.Fragment,null,r.default.createElement("h2",{className:m},r.default.createElement(i.IoRocketSharp,null)," Quick start"),r.default.createElement("div",{className:u},r.default.createElement(l.QuickStartItem,{index:1,title:"Prepare your OpenAPI document"},"You need an OpenAPI document to start with. In case you don't have one already, try this example:",r.default.createElement(c.SyntaxHighlighter,null,"https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json")),r.default.createElement(l.QuickStartItem,{index:2,title:"Install Oats generator modules"},"Install the necessary Oats modules to make the code generator work:",r.default.createElement(c.SyntaxHighlighter,null,"npm i @oats-ts/openapi @oats-ts/cli")),r.default.createElement(l.QuickStartItem,{index:3,title:"Configure the generator"},"Create a file called ",r.default.createElement("b",null,"oats.ts")," in your project root (you can call it anything you like), and the configuration:",r.default.createElement(c.SyntaxHighlighter,{language:"typescript"},p.default)),r.default.createElement(l.QuickStartItem,{index:4,title:"Run the generator"},"Open a terminal and simply run:",r.default.createElement(c.SyntaxHighlighter,null,"npx oats --config oats.ts")),r.default.createElement(l.QuickStartItem,{index:5,title:"What now?"},"Check out the ",r.default.createElement(d.Link,{href:"#"},"documentation"),", where you can learn how to use the generator output, create custom generators and more. Also have a look at the ",r.default.createElement(d.Link,{href:"#"},"configuration editor"),", where you can put together your Oats configuration right in the browser, while observing the generated output (without downloading or installing anything).")))},43418:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStartItem=void 0;const a=n(18592),r=o(n(67294)),i=n(61329),s=n(158),l=a.css`
  label: quick-start-item;
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 40px;
  width: 100%;
`,c=a.css`
  label: quick-start-item-circle;
  ${s.breakpoints.phone} {
    /* TODO */
    display: none;
  }
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  margin-top: 12px;
  border-radius: 50%;
  border: 1px solid ${i.theme.colors.text};
  color: ${i.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${i.theme.font.l};
`,d=a.css`
  label: quick-start-item-title;
  font-size: ${i.theme.font.m};
  color: ${i.theme.colors.text};
  text-transform: uppercase;
`,p=a.css`
  label: quick-start-item-content;
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.font.m};
`,u=a.css`
  label: quick-start-item-container;
  width: 100%;
`;t.QuickStartItem=({children:e,index:t,title:n})=>r.default.createElement("div",{className:l},r.default.createElement("div",{className:c},t),r.default.createElement("div",{className:u},r.default.createElement("h3",{className:d},n),r.default.createElement("div",{className:p},e)))},39201:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const a=n(18592),r=o(n(67294)),i=a.css`
  label: side-bar;
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 14px;
  overflow: auto;
`;t.SideBar=({children:e})=>r.default.createElement("div",{className:i},e)},19343:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarLogo=void 0;const a=n(18592),r=n(67535),i=o(n(67294)),s=n(61329),l=n(15435),c=a.css`
  label: side-bar-logo;
  display: flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  margin-bottom: 40px;
`,d=a.css`
  display: flex;
  flex-direction: column;
`,p=a.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${s.theme.font.l};
  color: ${s.theme.colors.text};
`,u=a.css`
  color: ${s.theme.colors.muted};
`,m=a.css`
  font-size: ${s.theme.font.s};
  color: ${s.theme.colors.muted};
`;t.SideBarLogo=({name:e})=>i.default.createElement("a",{className:c,href:"#"},i.default.createElement(l.Logo,{width:60}),i.default.createElement("div",{className:d},i.default.createElement("h1",{className:p},"Oats ",i.default.createElement("span",{className:u},e)),i.default.createElement("span",{className:m},"v",r.version)))},32154:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarMenuItem=void 0;const a=n(18592),r=o(n(67294)),i=n(69274),s=n(61329),l=a.css`
  display: flex;
  flex-direction: row;
  font-size: ${s.theme.font.m};
  color: ${s.theme.colors.muted};
  padding: 10px 14px;
  transition: background-color 150ms linear, color 150ms linear;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${s.theme.colors.dark1};
  }
`,c=a.css`
  flex: 1 1 1px;
`,d=a.css`
  background-color: ${s.theme.colors.dark1};
  color: ${s.theme.colors.text};
`;t.SideBarMenuItem=({children:e,href:t,active:n})=>{const o=n?(0,a.cx)(l,d):l;return r.default.createElement("a",{href:t,className:o},r.default.createElement("span",{className:c},e)," ",n&&r.default.createElement(i.HiChevronRight,null))}},38938:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const a=n(18592),r=o(n(67294)),i=n(61329),s=a.css`
  font-size: ${i.theme.font.m};
  color: ${i.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: 10px 14px;
`,l=a.css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
`;t.SideBarSection=({children:e,title:t})=>r.default.createElement(r.default.Fragment,null,r.default.createElement("div",{className:s},t),r.default.createElement("div",{className:l},e))},7807:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=n(18592),s=r(n(67294)),l=n(67361),c=r(n(29012)),d=n(74855),p=n(61329),u=n(69274),m=n(96486),h=function(e){const t={'pre[class*="language-"]':{backgroundColor:p.theme.colors.dark1,borderRadius:"10px",padding:"18px",width:"100%",maxWidth:"100%",borderWidth:"0px"}},n=(0,m.cloneDeep)(e);return(0,m.values)(n).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow="rgb(0 0 0 / 30%) 0px 1px"})),(0,m.merge)(n,t)}(c.vscDarkPlus),f=i.css`
  label: syntax-hl-copy;
  top: 10px;
  right: 10px;
  position: absolute;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear, opacity 150ms linear;
  padding: 8px 12px;
  border: unset;
  border-radius: 8px;
  font-weight: 400;
  cursor: pointer;
  font-size: ${p.theme.font.m};
  background-color: ${p.theme.colors.dark2};
  color: ${p.theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 8px;
`,g=i.css`
  label: syntax-hl;
  position: relative;
  * {
    font-family: 'Source Code Pro', monospace;
    font-size: ${p.theme.font.code};
  }
`;t.SyntaxHighlighter=({children:e,language:t})=>{const[n,o]=(0,s.useState)(!1),[a,r]=(0,s.useState)(!1),[i,c]=(0,s.useState)(void 0);return s.default.createElement("div",{className:g,onMouseEnter:()=>{r(!0)},onMouseLeave:()=>{r(!1)}},s.default.createElement(l.Prism,{language:t,style:h,wrapLongLines:!0},e),s.default.createElement(d.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,m.isNil)(i)||(clearTimeout(i),c(void 0)),o(t),c(setTimeout((()=>{o(!1)}),2e3))}},s.default.createElement("button",{className:f,style:{opacity:a?1:0}},n?s.default.createElement(u.HiCheck,null):s.default.createElement(u.HiClipboard,null))))}},86753:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,n,o){return void 0!==n&&void 0===o?[n,t/e*n]:void 0!==o&&void 0===n?[o,e/t*o]:void 0!==n&&void 0!==o?[n,o]:[e,t]}},158:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ctnr=t.breakpoints=void 0;const o=n(18592);t.breakpoints={desktop:"@media (min-width: 1201px)",tablet:"@media (min-width: 651px) and (max-width: 1200px) ",phone:"@media (max-width: 650px) "},t.ctnr=o.css`
  label: container;
  display: flex;

  ${t.breakpoints.desktop} {
    width: 90%;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  ${t.breakpoints.tablet} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: 0px 10px;
    margin-left: auto;
    margin-right: auto;
  }

  ${t.breakpoints.phone} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: 0px 10px;
    margin-left: auto;
    margin-right: auto;
  }
`},72050:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const o=n(26729);t.globalStyles=o.css`
  * {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
  }
`},12299:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(26729),r=o(n(67294)),i=n(20745),s=n(49818),l=n(72428),c=n(72050);(0,i.createRoot)(document.getElementById("root")).render(r.default.createElement(s.HashRouter,null,r.default.createElement(a.Global,{styles:c.globalStyles}),r.default.createElement(l.AppV2,null)))},95462:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const i=n(18592),s=r(n(67294)),l=n(49818),c=n(12872),d=n(76197),p=n(39201),u=n(19343),m=n(32154),h=n(38938),f=n(61329),g=n(21704),b=i.css`
  flex: 1 1 1px;
  overflow: auto;
  padding: 20px 20px 20px 10px;
  color: ${f.theme.colors.muted};
  font-size: ${f.theme.font.m};
  line-height: 140%;
`,v=i.css`
  overflow: hidden;
`;t.DocumentationPage=()=>{const{page:e}=(0,l.useParams)(),t=e??"OpenAPI_GettingStarted";return s.default.createElement(c.AppContainer,{direction:"horizontal",className:v},s.default.createElement(p.SideBar,null,s.default.createElement(u.SideBarLogo,{name:"docs"}),g.sections.map((e=>s.default.createElement(s.Fragment,{key:e.name},s.default.createElement(h.SideBarSection,{title:e.name},e.items.map((e=>s.default.createElement(m.SideBarMenuItem,{href:`#/documentation/${e.md}`,active:e.md===t},e.name)))))))),s.default.createElement("div",{className:b},s.default.createElement(d.MarkdownView,{page:t})))}},21704:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const o=n(96486);t.sections=[{name:"Guides",items:[{md:"OpenAPI_GettingStarted",name:"Getting started"},{md:"OpenAPI_Sdk",name:"Generated SDK"},{md:"OpenAPI_Server",name:"Generated server"},{md:"OpenAPI_CustomGenerator",name:"Custom generators"}]},{name:"Api",items:[{md:"OpenAPI_Read",name:"Read"},{md:"OpenAPI_Validate",name:"Validate"},{md:"OpenAPI_Generate",name:"Generate"},{md:"Typescript_Write",name:"Write"}]}],t.docs=(0,o.flatMap)(t.sections,(e=>e.items))},16381:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPage=void 0;const a=o(n(67294)),r=n(4151),i=n(55050),s=n(20364),l=n(48732),c=n(73976),d=n(56005),p=n(12872);t.LandingPage=()=>a.default.createElement(p.AppContainer,{direction:"vertical"},a.default.createElement(c.Header,null),a.default.createElement(r.Content,null,a.default.createElement(l.HeroSection,null),a.default.createElement(s.Headlines,null),a.default.createElement(d.QuickStart,null)),a.default.createElement(i.Footer,null))},61329:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{dark1:"#323232",dark2:"#212121",text:"#ffffff",muted:"#aaaaaa",green:"#238636",button:"#eeeeee",buttonHover:"#444444"},font:{code:"1.1rem",s:"1rem",m:"1.2rem",l:"1.8rem",xl:"2rem"}}}},a={};function r(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={id:e,loaded:!1,exports:{}};return o[e].call(n.exports,n,n.exports,r),n.loaded=!0,n.exports}r.m=o,e=[],r.O=(t,n,o,a)=>{if(!n){var i=1/0;for(d=0;d<e.length;d++){for(var[n,o,a]=e[d],s=!0,l=0;l<n.length;l++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](n[l])))?n.splice(l--,1):(s=!1,a<i&&(i=a));if(s){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[n,o,a]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,r.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var a=Object.create(null);r.r(a);var i={};t=t||[null,n({}),n([]),n(n)];for(var s=2&o&&e;"object"==typeof s&&!~t.indexOf(s);s=n(s))Object.getOwnPropertyNames(s).forEach((t=>i[t]=()=>e[t]));return i.default=()=>e,r.d(a,i),a},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={179:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,[i,s,l]=n,c=0;if(i.some((t=>0!==e[t]))){for(o in s)r.o(s,o)&&(r.m[o]=s[o]);if(l)var d=l(r)}for(t&&t(n);c<i.length;c++)a=i[c],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(d)},n=self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var i=r.O(void 0,[833],(()=>r(12299)));i=r.O(i)})();
//# sourceMappingURL=v2-main.js.map