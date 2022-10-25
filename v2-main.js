(()=>{var e,t,r,o={78788:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o="# 🌱 oats\n\nThis project aims to provide a solution for generating quality Typescript code from API-describing documents. The only supported format currently is [OpenAPI 3.x](https://www.openapis.org), but there are plans to introduce generators for [AsyncAPI](https://www.asyncapi.com/) as well.\n\nThe goal is to minimize the boilerplate a human developer has to write, to reduce the tedium around keeping a client and a server in sync, and to allow devs to focus on just displaying or moving data, without worrying about the structural correctness of that data.\n\n## why?\n\nWhy does this project exists? There are countless OpenAPI generators out there.\n\nThe main goals/differences are:\n\n- Make it work for 1 language (Typescript), and do that well.\n- Make every part of the API replaceable (without forking the project) in case it doesn't suit your needs.\n- Make it easy to customize, to suit a wide variety of use cases out of the box.\n- Make the generated code as easy to read, as if a dev would have written it by hand (or get as close to this as possible).\n\n## get started with OpenAPI\n\n- Check out the [docs](OpenAPI_Workflow) to get started!\n- The [demo](#/demo) page lets you experiment with oats, right here in the browser\n- If you find any issues, I'd greatly appreciate if you [report](https://github.com/oats-ts/oats-ts/issues) it!\n"},74663:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o="# Custom Generators\n\nTODO"},15316:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o="# Generate\n\nThe generator step is responsible for taking the validated output of the [reader](OpenAPI-Reader), and turning it into an intermediate representation (Typescript [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) in this case), that can be then turned into source code. The OpenAPI generator itself doesn't do much, the work is distributed to single responsiblity generators, that are responsible for generating one thing (like types from the JSON schemas, or serializers for parameters). They also provide means for other generators to access references to their generated content.\n\nThe generators that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-generators](https://www.npmjs.com/package/@oats-ts/openapi-generators) package.\n\n## Examples\n\n### Using individual generators\n\nYou can configure your generator from a set of code generators of your choosing. For this approach, it's the easiest to use `generators.create` from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi) package. You can use the generator names (see below) as the first argument, and optionally the approriate configuration object as the second argument (autocomplete will help with this).\n\n```ts\nimport { generator, nameProviders, pathProviders, generators } from '@oats-ts/openapi'\n\nconst withGenerators = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: [\n    generators.create('oats/type', { documentation: false }),\n    generators.create('oats/type-guard'),\n    generators.create('oats/type-validator'),\n  ],\n})\n```\n\n### Using presets\n\nYou can also use presets (I'd recommend starting with presets). Presets are a set of generators grouped toghether. The ones available currently are `presets.client()`, `presets.server()` and `presets.fullStack()`. The simplest way is to use the preset without any configuration:\n\n```ts\nimport { generator, nameProviders, pathProviders, presets } from '@oats-ts/openapi'\n\nconst withDefaults = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client(),\n})\n```\n\nPresets offer configuration options, that affect possibly multiple individual generators. In this case we are disabling the documentation for all the generators that support this option:\n\n```ts\nconst withOverrides = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client({\n    documentation: false,\n    validateResponses: false,\n  }),\n})\n```\n\nIn case you want to really fine tune presets, you can override the configuration for individual generators as well. In this case we are only generating documentation for types:\n\n```ts\nconst withOverrides = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client({ documentation: false }).override({ 'oats/type': { documentation: true } }),\n})\n```\n\n### Mixing presets and generators\n\nPresets and individual generators can be used together:\n\n```ts\nconst withPresetsAndGenerators = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: [presets.client(), generators.create('oats/express-cors-router-factory')],\n})\n```\n\n## Configuration\n\nThe main `generator` function can be configured with an object having the following properties:\n\n- `nameProvider: (input: any, originalName: string | undefined, target: string) => string` - A function that determines how each generated artifact is called. For reasonable, convention respecting names use `nameProviders.default()`\n  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).\n  - `originalName` optionally appears for pieces of the OpenAPI document, where the name is not part of the object itself (eg.: Schema object).\n  - `target` is one of the names listed below.\n- `pathProvider: (input: any, name: NameProvider, target: string) => string` - A function that determines where in the disk each artifact is written to (`SourceFile#fileName`). Check `pathProviders.*` for options.\n  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).\n  - `name` is a simplified function that takes the `input` and the `target` and delegates to the `nameProvider`.\n  - `target` is one of the names listed below.\n- `children: OpenAPIGenerator | OpenAPIGenerator[]` - A single generator or a list of generators. See available ones below.\n- `noEmit?: boolean = false` - When `true`, the generators return no output `SourceFile`s.\n- `name?: string = 'root'` - The name of the root generator, shows up in logs.\n\n## Available generators\n\nThere are a number of code generators available. These are part of certain presets, but can also be used individually, using `generators.create`. In case you want to see them in action, check the [demo](#/demo) page!\n\n| **Name**                             | **Preset**                | **Uses**                                                                                                                   | **Creates**                                                                                                                                                                 |\n| ------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| oats/type-guard                      | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | [Type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) based on JSON schemas                                              |\n| oats/type-guard                      | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on JSON schemas                                                                            |\n| oats/type                            | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | Typescript types based on JSON schemas                                                                                                                                      |\n| oats/api-type                        | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Type encapsulating server behaviour                                                                                                                                         |\n| oats/express-cors-router-factory     | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) handling CORS headers.                                 |\n| oats/express-router-factory          | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) encapsulating the app.                                 |\n| oats/express-app-router-factory      | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) for each operations.                                   |\n| oats/express-router-factories-type   | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Object type, with all [Express](https://expressjs.com) [Routers](https://expressjs.com/en/guide/routing.html)                                                               |\n| oats/express-context-handler-factory | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) handler for exposing OATS configuration for all routers                                                      |\n| oats/operation                       | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of making an HTTP requests, based on operations                                                                                                          |\n| oats/path-deserializer               | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                       |\n| oats/path-serializer                 | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                         |\n| oats/path-type                       | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [path parameters](https://swagger.io/docs/specification/serialization/#path) for operations                                                                |\n| oats/query-deserializer              | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                     |\n| oats/query-serializer                | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                       |\n| oats/query-type                      | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [query parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                              |\n| oats/cookie-deserializer             | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing client side Cookie headers for [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations    |\n| oats/cookie-serializer               | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing client side Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations       |\n| oats/set-cookie-deserializer         | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations |\n| oats/set-cookie-serializer           | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations   |\n| oats/cookies-type                    | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie) for operations                                                            |\n| oats/request-body-validator          | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on request bodies of operations                                                            |\n| oats/request-headers-deserializer    | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                           |\n| oats/request-headers-serializer      | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                             |\n| oats/request-headers-type            | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting request [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                     |\n| oats/request-server-type             | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all inputs for operations (server variant, inputs wrappedn in [Try](https://www.npmjs.com/package/@oats-ts/try)s)                                          |\n| oats/request-type                    | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all inputs for operations                                                                                                                                  |\n| oats/response-body-validator         | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on response bodies of operations                                                           |\n| oats/response-headers-deserializer   | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                          |\n| oats/response-headers-serializer     | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                            |\n| oats/response-headers-type           | client, server, fullStack | Status code + [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject) | Types collecting response [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                    |\n| oats/response-type                   | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all outputs for operations                                                                                                                                 |\n| oats/sdk-impl                        | client                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Implementation of `oats/sdk-impl` utilizing `oats/operation`                                                                                                                |\n| oats/sdk-type                        | client                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Type collecting all operations a client might call                                                                                                                          |\n\n## Extending generators\n\nIn case you want to dig deeper, and extend certain generators, check out the [source](https://github.com/oats-ts/oats-ts/tree/master/projects/openapi-generators).\n"},67404:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o="# Getting Started\n\nTODO"},6926:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o="# Read\n\nThe reader step is responsible for\n\n- Reading your OpenAPI 3.x document\n- Parsing it\n- Structurally validating it\n- Resolving it's internal and external [references](https://swagger.io/docs/specification/using-ref)\n- And exposing it to the next step\n\nThe reader that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-reader](https://www.npmjs.com/package/@oats-ts/openapi-reader) package.\n\n## Examples\n\n```ts\nimport { readers } from '@oats-ts/openapi'\n\n// Reads from the local file system, in json format\nconst jsonFileReader = readers.file.json('oa.json')\n\n// Reads from the local file system, in json format\nconst httpsYamlReader = readers.https.yaml('https://asd.com/oa.yaml')\n\n// Reads from any source in any format\nconst mixedReader = readers.mixed.mixed('http://localhost:3000/oa.json')\n```\n\n## Configuration\n\n### Read\n\nThe reader can be configured to read inputs a few different ways:\n\n- `http` - Reads main input document (and all possible references) from http. Will fail if the main input (or any of the references) are not accessible through http (https, local file system etc).\n- `https` - Reads main input document (and all possible references) from https. Will fail if the main input (or any of the references) are not accessible through https (http, local file, etc).\n- `file` - Reads main input document (and all possible references) from your local file system. Will fail if the main input (or any of the references) are not on your file system.\n- `mixed` - Reads main input document (and all possible references) from any of the sources above. You can have for example a main document in your local file system, that can reference a document through http, which references another document through https.\n- `test` - Reads main input document (and all possible references) from memory. Ideal for testing custom generators end-to-end.\n\n### Parse\n\nFor parsing the document that has been read, there are also a few different built-in solutions:\n\n- `json` - Parses the document(s) using [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).\n- `yaml` - Parses the document(s) using [yamljs](https://github.com/jeremyfa/yaml.js)\n- `mixed` - First tries to parse the document using `json`, then if that fails, it tries parsing using `yaml`. If both fail, the parsing is considered failed.\n\n## Advanced usage\n\nIn case the solutions above don't suit your needs, you can use the `readers.custom` function, to wich you need to provide a configuration object, with the following properties:\n\n- `path: string` - the entry point where the main document is\n- `sanitize: (path: string) => Try<string>` - Turns `path` into [fully qualified URI](https://www.ietf.org/rfc/rfc2396.txt)\n- `read: (uri: string) => Promise<Try<string>>` - Reads a document based on a fully qualified URI\n- `parse: (uri: string, input: string) => Promise<Try<OpenAPIObject>>` - Parses the result of a `read` into an `OpenAPIObject` (typings can be found in [@oats-ts/openapi-model](https://www.npmjs.com/package/@oats-ts/openapi-model))\n"},42812:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o="# Using a generated SDK\n\nTODO\n"},99182:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o="# Using a generated server\n\nTODO\n"},19029:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o="# Validate\n\nThe valididator step is responsible for taking the output of the [reader](OpenAPI-Reader) step, and checking for structural and semantic errors.\n\nThe validator that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-validator](https://www.npmjs.com/package/@oats-ts/openapi-validator) package.\n\n## Examples\n\n```ts\nimport { validator } from '@oats-ts/openapi';\n\n// Default validator\nconst defaultValidator = validator();\n```\n\n## Configuration\n\nThe validator can be used configuration free. This is the default behaviour, and it ensures that the generators maintained as part of the oats project run correctly with your OpenAPI document.\n\nConfiguring the validator to suit your needs is possible, but currently experimental, docs are TBD, as the internal APIs might change.\n"},74709:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o="# Workflow\n\nThis guide will walk you through on how to get started with oats and OpenAPI.\n\n## Set up the code generator\n\n### Dependencies\n\nLet's assume that you already have a Typescript project. The first thing you'll need is the core oats package (`@oats-ts/oats-ts`), and the OpenAPI specific libararies for oats (`@oats-ts/openapi`). Additionally we are going to write the generator's configuration in typescript as well, and to make it easy to run it, we are going to add `ts-node` to the project as well:\n\n```bash\nnpm i ts-node @oats-ts/oats-ts @oats-ts/openapi\n```\n\n### Generator configuration\n\nNext we need to put together the generator configuration, and we need to run this code.\n\nLet's assume, that your code lives in the `src` folder. Let's create a `generate.ts` file here (it's an ordinary typescript file, you can call it whatever you like):\n\n```ts\n// src/generate.ts\n\nimport { generate } from '@oats-ts/oats-ts'\nimport {\n  nameProviders,\n  generator,\n  pathProviders,\n  presets,\n  readers,\n  writers,\n  formatters,\n  loggers,\n  validator,\n} from '@oats-ts/openapi'\n\nimport prettierConfig from './.prettierrc.json'\n\ngenerate({\n  logger: loggers.simple(),\n  reader: readers.https.json('https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json'),\n  validator: validator(),\n  generator: generator({\n    nameProvider: nameProviders.default(),\n    pathProvider: pathProviders.default('src/generated'),\n    children: presets.fullStack(),\n  }),\n  writer: writers.typescript({\n    format: formatters.prettier(prettierConfig),\n  }),\n})\n```\n\n### Breakdown\n\n- `generate` - The main generator harness. Responsible for coordinating the generator steps.\n  - `logger` - Logs the generator events as they happen. Can be either `simple` or `verbose`. If ommited, you will have no feedback about what's happening, so it's recommended to use a logger.\n  - `reader` - Reads the root OpenAPI document, resolving it's internal (and external) dependencies. Also structurally validates the document. Can read from `file`, `http` or `https` in `json` and `yaml` formats. For this example we are using a dummy OpenAPI document I use for testing, see more here: https://github.com/oats-ts/oats-schemas .\n  - `validator` - Takes the output of the reader, and validates it for any possible inconsistencies or issues that might trip up the generators.\n  - `generator` - Takes the output of the reader, and generates Typescript syntax tree from it. The work of the generator is split into smaller, single responsibilty code-generators, that are responsible for a single concern, eg.: generate schema types or parameter serializers.\n    - `nameProvider` - Function determining how each generated artifact should be named.\n    - `pathProvider` - Function determining what disk location each artifact should be written to.\n    - `children` - Either a list of single-responsible code-generators, or a preset, which is a collection of these generators. Individual generators are exposed in the `generators` object, coming from the `'@oats-ts/openapi'` package.\n  - `writer` - Takes the output of the generator, stringifies the syntax tree (SourceFiles), and then writes them to the disk.\n    - `format` - Function formatting the output before it gets written to the disk. In this case using the prettier formatter, and with the config the project is already using.\n\n## Run the code generator\n\nTo run it, you can either compile it and run it using the `node` command, or you can use `ts-node` to save the extra step (we are opting for this in this guide). You don't need any special runner.\n\n```bash\nts-node src/generate.ts\n```\n\nWhich will output something like:\n\n```bash\n✔ reader step completed using \"@oats-ts/openapi-reader\"\n✔ validator step completed using \"@oats-ts/openapi-validator\"\n✔ generator step completed using \"@oats-ts/openapi-generators\"\n✔ writer step completed using \"@oats-ts/typescript-writer\"\n```\n\nFor convenience, you could create an entry in your `package.json`, that runs this command, eg.:\n\n```jsonc\n{\n  \"name\": \"your-project\",\n  // ...\n  \"scripts\": {\n    // ...\n    \"oats\": \"ts-node src/generate.ts\"\n  }\n}\n```\n\nThen you can just do this, for subsequent generator runs:\n\n```bash\nnpm run oats\n```\n\n## Where to go from here?\n\n- If you this looks interesting, check out the [demo](#/demo) page, where you can see the outputs of each generator, with either your OpenAPI inputs or samples!\n- If you find any issues, I'd greatly appreciate if you [report](https://github.com/oats-ts/oats-ts/issues) it!\n"},59799:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o="# Write\n\nThe writer step is responsible for taking the output of the [generator step](OpenAPI-Generator) and writing it's outputs to the disk. The typescript writer takes typescript `SourceFile`s (this is Typescript's in-memory representation of an AST + file location) and writes them to the desired location.\n\nAdditionally it can add leading / trailing comments to each of your generated files. This is ideal for warning people that the file is generated and should be edited manually, or for disabling certain linter rules for the generated files.\n\n## Example\n\n### Basic usage\n\nBasic usage, formats the code using your project's prettier configuration. Formatter can be omitted, but the generated code won't be pretty in this case.\n\n```ts\nimport { writers, formatters } from '@oats-ts/openapi'\nimport prettierConfig from './.prettierrc.json'\n\nconst writer = writers.typescript.file({\n  format: formatters.prettier(prettierConfig),\n})\n```\n\n### With comments\n\nAdds comments. First leading comment warns about the fact that the file is generated, the second disables some `eslint` rules. The trailing comment re-enables these rules, so other code is not affected **(this is just an example, generated code will not break these specific rules)**.\n\n```ts\nimport { writers, formatters } from '@oats-ts/openapi'\nimport prettierConfig from './.prettierrc.json'\n\nconst writer = writers.typescript.file({\n  format: formatters.prettier(prettierConfig),\n  comments: {\n    leadingComments: [\n      {\n        type: 'block',\n        text: 'This is a generated file, please do not edit by hand!',\n      },\n      {\n        type: 'block',\n        text: 'eslint-disable no-console, no-alert',\n      },\n    ],\n    trailingComments: [\n      {\n        type: 'block',\n        text: 'eslint-enable no-console, no-alert',\n      },\n    ],\n  },\n})\n```\n\n## Configuration\n\nThe `writers.typescript` object exposes 3 factory functions:\n\n- `file` - Writes the generated code to the disk. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n- `memory` - Doesn't write the output to the disk, returns the generated code instead as `{ path: string; content: string }[]` instead. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n- `custom` - Customizeable `write` function, ideal if you want to send the output over the wire for example. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n  - `write(path: string, content: string): Promise<void>` - Writes the stringified, possibly formatted `content` to the disk at `path`.\n"},70629:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o='✔ reader step completed using "@oats-ts/openapi-reader"\n✔ validator step completed using "@oats-ts/openapi-validator"\n✔ generator step completed using "@oats-ts/openapi-generators"\ni npm i @oats-ts/client-runtime @oats-ts/express-runtime express@^4.18.1\n✔ writer step completed using "@oats-ts/typescript-writer"'},26360:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});const o="import * as oats from '@oats-ts/openapi'\n\noats.generate({\n  logger: oats.loggers.simple(),\n  reader: oats.readers.https.json('https://your.openapi.doc'),\n  // Or if you are generating from a local file:\n  // reader: oats.readers.file.json('openapi.json'),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    children: oats.presets.fullStack(),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n})\n"},11761:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.markdown=void 0;const n=o(r(78788)),a=o(r(15316)),i=o(r(6926)),s=o(r(19029)),l=o(r(74709)),c=o(r(59799)),d=o(r(74663)),u=o(r(67404)),p=o(r(42812)),f=o(r(99182));t.markdown={Home:n.default,OpenAPI_Generate:a.default,OpenAPI_Read:i.default,OpenAPI_Validate:s.default,OpenAPI_Workflow:l.default,Typescript_Write:c.default,OpenAPI_GettingStarted:u.default,OpenAPI_Sdk:p.default,OpenAPI_Server:f.default,OpenAPI_CustomGenerator:d.default}},27912:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.storage=t.Ttl=void 0;const o=r(96486);t.Ttl={seconds:e=>1e3*e,minutes:e=>e*t.Ttl.seconds(60),hours:e=>e*t.Ttl.minutes(60),days:e=>e*t.Ttl.hours(24)},t.storage={get(e,t,r){const n=localStorage.getItem(e);if((0,o.isNil)(n))return t;try{const{value:a,ttl:i}=JSON.parse(n);return((0,o.isNil)(i)||Date.now()<i)&&(void 0===r||r?.(a))?a:(localStorage.removeItem(e),t)}catch(e){return console.error(e),t}},set(e,t,r){const n={value:t,ttl:(0,o.isNil)(r)?void 0:Date.now()+r};return localStorage.setItem(e,JSON.stringify(n))}}},72428:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppV2=void 0;const n=o(r(67294)),a=r(49818),i=r(83871),s=r(95462),l=r(16381);t.AppV2=()=>n.default.createElement(a.Routes,null,n.default.createElement(a.Route,{index:!0,element:n.default.createElement(l.LandingPage,null)}),n.default.createElement(a.Route,{path:"documentation",element:n.default.createElement(s.DocumentationPage,null)}),n.default.createElement(a.Route,{path:"documentation/:page",element:n.default.createElement(s.DocumentationPage,null)}),n.default.createElement(a.Route,{path:"editor",element:n.default.createElement(i.ConfigurationEditorPage,null)}))},12872:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppContainer=void 0;const n=r(18592),a=o(r(67294)),i=r(61329),s=n.css`
  label: app-container;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  margin: 0px;
  padding: 0px;
  background-color: ${i.theme.colors.dark3};
`,l=n.css`
  label: vertical;
  flex-direction: column;
`,c=n.css`
  label: vertical;
  flex-direction: row;
`;t.AppContainer=({children:e,direction:t,className:r})=>{const o=(0,n.cx)(s,"horizontal"===t?c:l,r);return a.default.createElement("div",{className:o},e)}},40355:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Autocomplete=void 0;const i=a(r(67294)),s=r(88899),l=r(69274),c=r(96486),d=r(18592),u=r(61329),p=r(48228),f=d.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 16px 0px 0px;
  cursor: pointer;
`,m=d.css`
  border-width: 0px;
  outline: none;
  border-radius: 8px;
  flex: 1 1 1px;
  padding: 12px 0px 12px 16px;
  color: ${u.theme.colors.text};
  background-color: ${u.theme.colors.transparent};
  ::placeholder {
    color: ${u.theme.colors.placeholder};
  }
`;t.Autocomplete=function({items:e,placeholder:t,value:r,customLabel:o="Custom value",onChange:n=(()=>{}),getKey:a=(e=>e),getValue:h=(e=>e),getDescription:g=(()=>{})}){const b=(0,i.useMemo)((()=>{if((0,c.isNil)(r)||0===r.length)return e;const t=e.filter((e=>e.toLowerCase().includes(r.toLowerCase())));return 0===t.length?[r]:t}),[r,e]),{isOpen:y,highlightedIndex:v,getInputProps:w,getToggleButtonProps:x,getMenuProps:_,getItemProps:O}=(0,s.useCombobox)({items:b,inputValue:r,onSelectedItemChange:e=>{n(e.inputValue)},onIsOpenChange:e=>{n(e.inputValue)}}),{onFocus:E,onBlur:P,onChange:S,...C}=w();return i.default.createElement("div",{className:(0,p.dropdownContainerStyle)(y)},i.default.createElement("div",{...x(),className:f},i.default.createElement("input",{...C,onChange:e=>{n(e.target.value),S(e)},placeholder:t,value:r??"",className:m}),i.default.createElement(l.HiChevronDown,{color:u.theme.colors.text})),i.default.createElement("ul",{..._(),className:p.dropdownStyle},y&&b.length>0&&b.map(((t,r)=>{const n=(0,d.cx)(p.dropdownItemStyle,v===r?p.focusedDropownItemStyle:void 0),s=h(t),l=a(t),u=e.includes(t)?g(t):o;return i.default.createElement("li",{...O({item:t,index:r}),className:n,key:`${l}${r}`},i.default.createElement("span",{className:p.dropdownItemLabelStyle},s),(0,c.isNil)(u)?null:i.default.createElement("span",{className:p.dropdownItemDescriptionStyle},u))}))))}},79514:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const n=r(18592),a=o(r(67294)),i=r(61329),s=n.css`
  label: secondary-button;
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};

  &:hover {
    background-color: ${i.theme.colors.buttonHover};
  }
`,l=n.css`
  label: primary-button;
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.green};

  &:hover {
    background-color: #2ea043;
  }
`,c=n.css`
  label: button;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  border: unset;
  border-radius: 8px;
  padding: 14px 16px;
  position: relative;
  font-weight: 400;
  cursor: pointer;
  font-size: ${i.theme.fontSize.m};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 8px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 18px;
  }
`;t.Button=({children:e,variant:t,className:r,onClick:o})=>{const i=(0,n.cx)(c,"primary"===t?l:s,r);return a.default.createElement("button",{className:i,onClick:o},e)}},9849:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Chip=void 0;const i=r(18592),s=a(r(67294)),l=r(69274),c=r(61329),d=i.css`
  padding: 5px 7px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${c.theme.fontSize.xs};
  background-color: ${c.theme.colors.dark3};
  color: ${c.theme.colors.muted};
  border-radius: 8px;
  gap: 6px;
  &:hover {
    color: ${c.theme.colors.text};
    background-color: ${c.theme.colors.dark2};
  }
`;t.Chip=(0,s.forwardRef)((({label:e,removeable:t,onRemove:r,children:o,...n},a)=>s.default.createElement("span",{className:d,ref:a,onClick:t?e=>{e.stopPropagation(),e.preventDefault(),r?.()}:void 0,...n},e,t&&s.default.createElement(l.HiXMark,null))))},41298:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const n=r(18592),a=o(r(67294)),i=r(61329),s=n.css`
  font-size: ${i.theme.fontSize.code};
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};
  padding: 2px 4px;
  border-radius: 6px;
`;t.Code=({className:e,children:t,...r})=>a.default.createElement("code",{className:(0,n.cx)(s,e),...r},t)},9378:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CommentsTable=void 0;const n=r(18592),a=o(r(67294)),i=r(69274),s=r(61329),l=r(69395),c=r(9155),d=r(6488),u=r(89937),p=[{value:"line",key:"line",label:"Line comment",description:"Example: // Your comment"},{value:"block",key:"block",label:"Block comment",description:"Example: /* Your comment */"},{value:"jsdoc",key:"jsdoc",label:"JSDoc comment",description:"Example: /** Your comment */"}],f=n.css`
  color: ${s.theme.colors.muted};
  font-size: ${s.theme.fontSize.m};
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 6px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: ${s.theme.colors.text};
  }
`,m=n.css`
  width: 50%;
`,h=n.css`
  min-width: 150px;
`;t.CommentsTable=({value:e,onChange:t})=>{const r=r=>()=>t(e.filter(((e,t)=>t!==r))),o=r=>o=>t(e.map(((e,t)=>t===r?{...e,text:o.target.value}:e))),n=r=>({value:o})=>{t(e.map(((e,t)=>t===r?{...e,type:o}:e)))};return a.default.createElement(u.Table,null,a.default.createElement(u.THead,null,a.default.createElement(u.Tr,{isHeader:!0},a.default.createElement(u.Th,{className:m},"Type"),a.default.createElement(u.Th,{className:m},"Text"),a.default.createElement(u.Th,{className:h},a.default.createElement("span",{className:f,onClick:()=>t([...e,{text:"",type:"line"}])},a.default.createElement(i.HiPlusCircle,null)," Add new")))),a.default.createElement(u.TBody,null,0===e.length?a.default.createElement(u.Tr,{"aria-colspan":3},a.default.createElement(u.Td,null,"No comments")):e.map(((e,t)=>a.default.createElement(u.Tr,{key:t},a.default.createElement(u.Td,null,a.default.createElement(c.Input,{placeholder:"Text",onChange:o(t),value:e.text})),a.default.createElement(u.Td,null,a.default.createElement(d.Select,{placeholder:"Type",items:p,onChange:n(t),value:p.find((t=>t.value===e.type)),getDescription:l.dd.getDescription,getKey:l.dd.getKey,getValue:l.dd.getValue})),a.default.createElement(u.Td,null,a.default.createElement("span",{className:f,onClick:r(t)},a.default.createElement(i.HiXCircle,null)," Delete")))))))}},67036:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ConfigurationFormGroup=void 0;const n=r(18592),a=r(96486),i=o(r(67294)),s=r(61329),l=r(86299),c=n.css`
  label: group-header;
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.text};
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px;
  margin-bottom: 20px;
`,d=n.css`
  flex: 1 1 1px;
  text-transform: uppercase;
`,u=n.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`,p=n.css`
  background-color: ${s.theme.colors.dark2};
  padding: 18px;
  border-radius: 12px;
  margin-bottom: 20px;
  z-index: 1;
  &:last-of-type {
    margin-bottom: 0px;
  }
`,f=n.css`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`,m=n.css`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-bottom: 0px;
`,h=n.css`
  label: attachment;
  background-color: ${s.theme.colors.dark2};
  color: ${s.theme.colors.text};
  font-size: ${s.theme.fontSize.m};
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  border: unset;
  padding: 14px 18px;
  position: relative;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: ${s.theme.colors.dark1};
  }
`,g=(0,n.cx)(h,n.css`
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  `),b=(0,n.cx)(h,n.css`
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    margin-bottom: 20px;
  `);t.ConfigurationFormGroup=({name:e,topAttachmentLabel:t,topAttachmentIcon:r,bottomAttachmentLabel:o,bottomAttachmentIcon:s,children:h,icon:y,titleButtonLabel:v,titleButtonIcon:w,onTitleButtonClick:x,onAttachmentClick:_})=>{const O=!(0,a.isNil)(t),E=!(0,a.isNil)(o),P=!(0,a.isNil)(v),S=(0,n.cx)(p,O?f:void 0,E?m:void 0);return i.default.createElement(i.default.Fragment,null,i.default.createElement("h2",{className:c},y?i.default.createElement(y,null):null,i.default.createElement("span",{className:d},e),P&&i.default.createElement(l.Link,{className:u,onClick:x},w?i.default.createElement(w,null):null,v)),O&&i.default.createElement("div",{className:g,onClick:()=>_?.("top")},r?i.default.createElement(r,null):null,t),i.default.createElement("section",{className:S},h),E&&i.default.createElement("div",{className:b,onClick:()=>_?.("bottom")},s?i.default.createElement(s,null):null,o))}},4151:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Content=void 0;const n=o(r(67294)),a=r(18592),i=r(158),s=a.css`
  label: content;
  width: 100%;
  flex: 1 1 1px;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
`;t.Content=({children:e})=>n.default.createElement("main",{className:(0,a.cx)(s,i.ctnr)},e)},55050:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Footer=void 0;const n=r(18592),a=o(r(67294)),i=r(15435),s=r(61329),l=r(86299),c=n.css`
  label: footer;
  background-color: ${s.theme.colors.dark1};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10px;
  gap: 10px;
`,d=n.css`
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.muted};
`,u=n.css`
  font-size: ${s.theme.fontSize.s};
  color: ${s.theme.colors.muted};
`,p=n.css`
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  margin-bottom: 20px;
`,f=n.css`
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${s.theme.fontSize.l};
  color: ${s.theme.colors.muted};
`;t.Footer=()=>a.default.createElement("footer",{className:c},a.default.createElement("a",{className:p,href:"#"},a.default.createElement(i.Logo,{width:60,color:s.theme.colors.muted}),a.default.createElement("h1",{className:f},"Oats")),a.default.createElement("span",{className:d},"Copyright © 2022 Balázs Édes"),a.default.createElement("span",{className:u},"All Oats modules under the ",a.default.createElement(l.Link,{href:"https://opensource.org/licenses/MIT"},"MIT license")))},46219:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.FormSection=void 0;const n=r(18592),a=r(96486),i=o(r(67294)),s=r(61329),l=n.css`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  &:last-of-type {
    margin-bottom: 0px;
  }
`,c=n.css`
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.text};
`,d=n.css`
  font-size: ${s.theme.fontSize.s};
  color: ${s.theme.colors.muted};
`;t.FormSection=({children:e,name:t,description:r})=>i.default.createElement("section",{className:l},i.default.createElement("label",{className:c},t),(0,a.isNil)(r)?null:i.default.createElement("span",{className:d},r),e)},73976:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;const n=r(18592),a=o(r(67294)),i=r(69274),s=r(158),l=r(20012),c=r(16045),d=r(55023),u=n.css`
  label: header;
  width: 100%;
  margin: 0px;
  padding: 0px;
`,p=n.css`
  label: header-content;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;t.Header=()=>a.default.createElement("header",{className:u},a.default.createElement("div",{className:(0,n.cx)(p,s.ctnr)},a.default.createElement(c.MenuLogo,null),a.default.createElement(d.MenuBar,null,a.default.createElement(l.MenuItem,{label:"Home",icon:i.HiHome,href:"#/",active:!0}),a.default.createElement(l.MenuItem,{label:"Documentation",icon:i.HiDocument,href:"#/documentation"}),a.default.createElement(l.MenuItem,{label:"Editor",icon:i.HiCog6Tooth,href:"#/editor"}))))},20364:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Headlines=void 0;const n=r(18592),a=o(r(67294)),i=r(69274),s=r(61329),l=r(79514),c=r(158),d=n.css`
  label: headlines;
  display: flex;
  flex-direction: row;
  gap: 24px;

  ${c.breakpoints.phone} {
    flex-direction: column;
    gap: 50px;
  }
`,u=n.css`
  label: headlines-items-container;
  color: ${s.theme.colors.muted};
  font-size: ${s.theme.fontSize.m};
`,p=n.css`
  label: headlines-item-header;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  color: ${s.theme.colors.text};
  font-size: ${s.theme.fontSize.m};
  margin-top: 0px;
`,f=n.css`
  label: headlines-item-content;
  margin-bottom: 24px;
  flex: 1 1 1px;
`;t.Headlines=()=>a.default.createElement("div",{className:d},a.default.createElement("div",{className:u},a.default.createElement("h3",{className:p},a.default.createElement(i.HiPuzzlePiece,null),"Generate an SDK"),a.default.createElement("section",{className:f},"Create an easy to use, statically typed SDK for your backend, with all the bells and whistles, and either use it in house, or expose it to your customers."),a.default.createElement(l.Button,null,a.default.createElement(i.HiBookOpen,null),"Learn more")),a.default.createElement("div",{className:u},a.default.createElement("h3",{className:p},a.default.createElement(i.HiServerStack,null),"Generate the backend"),a.default.createElement("section",{className:f},"Generate all the tedious parts of your backend, like routing, parameter and body parsing and serialization, and CORS, and just implement moving data."),a.default.createElement(l.Button,null,a.default.createElement(i.HiBookOpen,null),"Learn more")),a.default.createElement("div",{className:u},a.default.createElement("h3",{className:p},a.default.createElement(i.HiWrenchScrewdriver,null),"Customize generators"),a.default.createElement("section",{className:f},"The available generators don't fully suit your needs, or you need more? Customize existing generators, or create your own, without writing everything from scratch."),a.default.createElement(l.Button,null,a.default.createElement(i.HiBookOpen,null),"Learn more")))},48732:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HeroSection=void 0;const n=r(18592),a=o(r(67294)),i=r(61329),s=r(79514),l=r(158),c=r(66653),d=r(69274),u=r(86299),p=n.css`
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
`,f=n.css`
  label: hero-section-content;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: 18px;
  height: 100%;
`,m=n.css`
  label: hero-text-1;
  font-size: ${i.theme.fontSize.xl};
  color: ${i.theme.colors.text};
  margin: 0px;
  text-align: center;
`,h=n.css`
  label: hero-text-2;
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.m};
  font-weight: 400;
  margin: 0px 0px 20px 0px;
  width: 70%;
  text-align: center;
  flex-shrink: 0;
`,g=n.css`
  label: hero-button-container;
  display: flex;
  gap: 12px;
`;t.HeroSection=()=>a.default.createElement("div",{className:p},a.default.createElement("div",{className:(0,n.cx)(l.ctnr,f)},a.default.createElement("h2",{className:m},"Generate TypeScript from OpenAPI, that makes sense."),a.default.createElement("h3",{className:h},"Customizable, extensible and ",a.default.createElement("b",null,"open source")," code generators, that output quality"," ",a.default.createElement(u.Link,{href:"https://www.typescriptlang.org"},"TypeScript"),", from your"," ",a.default.createElement(u.Link,{href:"https://www.openapis.org"},"OpenAPI")," definitions."),a.default.createElement("div",{className:g},a.default.createElement(s.Button,{variant:"primary"},a.default.createElement(d.HiPlay,null)," Get Started"),a.default.createElement(s.Button,null,a.default.createElement(c.GoOctoface,null)," Github"))))},9155:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Input=void 0;const n=o(r(67294)),a=r(18592),i=r(61329),s=a.css`
  label: input;
  width: 100%;
  background-color: ${i.theme.colors.dark1};
  color: ${i.theme.colors.text};
  font-size: ${i.theme.fontSize.m};
  border-radius: 8px;
  padding: 12px 16px;
  border-width: 0px;
  outline: none;

  &::placeholder {
    color: ${i.theme.colors.placeholder};
  }
`;t.Input=({children:e,className:t,...r})=>n.default.createElement("input",{className:(0,a.cx)(s,t),...r},e)},86299:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const n=o(r(67294)),a=r(18592),i=r(61329),s=r(96486),l=a.css`
  label: link;
  cursor: pointer;
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
`;t.Link=({children:e,className:t,onClick:r,...o})=>(0,s.isNil)(r)?n.default.createElement("a",{className:(0,a.cx)(l,t),...o},e):n.default.createElement("span",{className:(0,a.cx)(l,t),onClick:r,...o},e)},15435:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const n=o(r(67294)),a=r(61329),i=r(86753);t.Logo=({color:e=a.theme.colors.green,width:t,height:r})=>{const[o,s]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,r);return n.default.createElement("svg",{width:o,height:s,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},n.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),n.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},76197:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const s=r(18592),l=r(96486),c=i(r(67294)),d=a(r(23209)),u=i(r(34112)),p=r(11761),f=r(61329),m=r(41298),h=r(86299),g=r(7807),b=r(89937),y=s.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.l};
  margin-top: 0px;
`,v=s.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.m};
`,w=s.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.m};
`,x=Object.keys(p.markdown),_=e=>x.some((t=>e.startsWith(t)))?"Home"===e?"#":`#/docs/${e}`:(0,d.uriTransformer)(e),O=[u.default],E={h1:({children:e})=>c.default.createElement("h1",{className:y},e),h2:({children:e})=>c.default.createElement("h2",{className:v},e),h3:({children:e})=>c.default.createElement("h3",{className:w},e),table:({children:e})=>c.default.createElement(b.Table,null,e),tr:({children:e,isHeader:t})=>c.default.createElement(b.Tr,{isHeader:t},e),th:({children:e})=>c.default.createElement(b.Th,null,e),td:({children:e})=>c.default.createElement(b.Td,null,e),a:({href:e,children:t})=>c.default.createElement(h.Link,{href:e},t),code({node:e,inline:t,className:r,children:o,...n}){const a=/language-(\w+)/.exec(r||"");return null===a||t?c.default.createElement(m.Code,{...n},o):c.default.createElement(g.SyntaxHighlighter,{language:a[1],kind:"docs"},String(o).replace(/\n$/,""))}};t.MarkdownView=({page:e})=>(0,l.isNil)(e)||(0,l.isNil)(p.markdown[e])?c.default.createElement("div",null,"The documentation page you are looking for doesn't exist."):c.default.createElement(d.default,{remarkPlugins:O,components:E,transformLinkUri:_},p.markdown[e])},55023:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuBar=void 0;const n=r(18592),a=o(r(67294)),i=n.css`
  label: menu-bar;
  display: flex;
  flex-direction: row;
  padding: 0px;
`;t.MenuBar=({children:e})=>a.default.createElement("ul",{className:i},e)},20012:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuItem=void 0;const n=r(18592),a=r(96486),i=o(r(67294)),s=r(61329),l=n.css`
  label: active-menu-item;
  color: ${s.theme.colors.text};
`,c=n.css`
  label: menu-item-anchor;
  position: relative;
  text-decoration: none;
  color: ${s.theme.colors.muted};
  display: flex;
  gap: 8px;
  align-items: center;
  transition: color 150ms linear;

  &:hover {
    color: ${s.theme.colors.text};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${s.theme.colors.text};
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
`,d=n.css`
  label: menu-item;
  height: 100%;
  padding: 0px 24px;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  color: ${s.theme.colors.text};
  font-size: ${s.theme.fontSize.m};
  &:first-of-type {
    padding-left: 0px;
  }
`;t.MenuItem=({label:e,active:t,href:r,onClick:o,icon:s})=>{const u=(0,n.cx)(c,t?l:void 0),p=(0,a.isNil)(r)?o:void 0;return i.default.createElement("li",{className:d,onClick:p},i.default.createElement("a",{href:r,className:u},i.default.createElement(s,null),i.default.createElement("span",null,e)))}},16045:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuLogo=void 0;const n=r(18592),a=o(r(67294)),i=r(15435),s=r(61329),l=n.css`
  label: menu-logo;
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
`,c=n.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${s.theme.fontSize.l};
  color: ${s.theme.colors.text};
`;t.MenuLogo=()=>a.default.createElement("a",{className:l,href:"#"},a.default.createElement(i.Logo,{width:60}),a.default.createElement("h1",{className:c},"Oats"))},84934:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.MultiAutocomplete=void 0;const i=a(r(67294)),s=r(88899),l=r(69274),c=r(96486),d=r(18592),u=r(61329),p=r(48228),f=r(9849),m=d.css`
  label: input-container;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 16px;
  * {
    cursor: pointer;
  }
`,h=d.css`
  color: ${u.theme.colors.text};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  padding-left: 12px;
`;t.MultiAutocomplete=function({items:e,placeholder:t,value:r,isRemoveable:o=(()=>!0),getKey:n=(e=>`${e}`),getValue:a=(e=>`${e}`),getDescription:g=(()=>{}),onChange:b=(()=>{})}){const[y,v]=(0,i.useState)(""),w=e=>{r?.includes(e)||b([...r??[],e])},x=(0,i.useMemo)((()=>{if((0,c.isNil)(y)||0===y.length)return e;const t=e.filter((e=>a(e).toLowerCase().includes(y.toLowerCase())));return 0===t.length?[y]:t}),[r,e,y]),_=!(0,c.isEmpty)(r),O=!(0,c.isEmpty)(y),{isOpen:E,highlightedIndex:P,getToggleButtonProps:S,getLabelProps:C,getMenuProps:k,getItemProps:j,getInputProps:I}=(0,s.useCombobox)({selectedItem:null,items:x,defaultHighlightedIndex:0,onStateChange:({type:e,selectedItem:t})=>{switch(e){case s.useCombobox.stateChangeTypes.InputKeyDownEnter:(0,c.isNil)(P)&&O?w(y):(0,c.isNil)(t)||w(t),v("");break;case s.useCombobox.stateChangeTypes.ItemClick:w(t),v("")}}}),{onFocus:A,...M}=I({onKeyDown:e=>{"Backspace"===e.key&&!O&&_&&b(r.slice(0,-1))},onChange:e=>{e.stopPropagation(),e.preventDefault(),v(e.target.value)},onBlur:()=>{y.length>0&&(w(y),v(""))}});return i.default.createElement("div",{className:(0,p.dropdownContainerStyle)(E)},i.default.createElement("div",{className:m,...S()},_&&i.default.createElement("label",{className:h,...C()},r?.map((e=>i.default.createElement(f.Chip,{label:a(e),key:n(e),removeable:o(e),onRemove:()=>(e=>{b?.((r??[]).filter((t=>t!==e)))})(e)})))),i.default.createElement("input",{...M,className:(T=!_,d.css`
  label: input;
  border-width: 0px;
  outline: none;
  border-radius: 8px;
  flex: 1 1 1px;
  padding: 12px 0px 12px ${T?"16px":"6px"};
  color: ${u.theme.colors.text};
  background-color: ${u.theme.colors.transparent};
  ::placeholder {
    color: ${u.theme.colors.placeholder};
  }
`),placeholder:_?"":t,value:y}),i.default.createElement(l.HiChevronDown,{color:u.theme.colors.text})),i.default.createElement("ul",{...k(),className:p.dropdownStyle},E&&x.map(((e,t)=>{const o=r?.includes(e),s=P===t,u=(0,d.cx)(p.dropdownItemStyle,s?p.focusedDropownItemStyle:void 0,o?p.selectedDropdownItemStyle:void 0),f=a(e),m=n(e),h=g(e);return i.default.createElement("li",{className:u,key:`${m}${t}`,...j({item:e,index:t})},i.default.createElement("span",{className:p.dropdownItemLabelStyle},o?i.default.createElement(l.HiCheck,null):void 0,f),(0,c.isNil)(h)?null:i.default.createElement("span",{className:p.dropdownItemDescriptionStyle},h))}))));var T}},63408:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MultiSelect=void 0;const n=o(r(67294)),a=r(88899),i=r(69274),s=r(96486),l=r(18592),c=r(61329),d=r(48228),u=r(9849),p=l.css`
  flex: 1 1 1px;
  color: ${c.theme.colors.text};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`,f=l.css`
  color: ${c.theme.colors.placeholder};
`;t.MultiSelect=function({items:e,placeholder:t,value:r,isRemoveable:o=(()=>!0),getKey:m=(e=>`${e}`),getValue:h=(e=>`${e}`),getDescription:g=(()=>{}),onChange:b=(()=>{})}){const y=e=>{b?.((r??[]).filter((t=>t!==e)))},{isOpen:v,getToggleButtonProps:w,getLabelProps:x,getMenuProps:_,highlightedIndex:O,getItemProps:E}=(0,a.useSelect)({selectedItem:null,items:e,onStateChange:({type:e,selectedItem:t})=>{switch(e){case a.useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:case a.useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:case a.useSelect.stateChangeTypes.ItemClick:o=t,r?.includes(o)?y(o):b([...r??[],o])}var o}});return n.default.createElement("div",{className:(0,d.dropdownContainerStyle)(v)},n.default.createElement("div",{className:(P=(0,s.isEmpty)(r),l.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${P?"12px":"9px"} ${P?"16px":"12px"};
  * {
    cursor: pointer;
  }
`),...w()},n.default.createElement("label",{className:p,...x()},(0,s.isEmpty)(r)?n.default.createElement("span",{className:f},t):r?.map((e=>n.default.createElement(u.Chip,{label:h(e),key:m(e),removeable:o(e),onRemove:()=>y(e)})))),n.default.createElement(i.HiChevronDown,{color:c.theme.colors.text})),n.default.createElement("ul",{..._(),className:d.dropdownStyle},v&&e.map(((e,t)=>{const o=r?.includes(e),a=O===t,c=(0,l.cx)(d.dropdownItemStyle,a?d.focusedDropownItemStyle:void 0,o?d.selectedDropdownItemStyle:void 0),u=h(e),p=m(e),f=g(e);return n.default.createElement("li",{className:c,key:`${p}${t}`,...E({item:e,index:t})},n.default.createElement("span",{className:d.dropdownItemLabelStyle},o?n.default.createElement(i.HiCheck,null):void 0,u),(0,s.isNil)(f)?null:n.default.createElement("span",{className:d.dropdownItemDescriptionStyle},f))}))));var P}},43418:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStartItem=void 0;const n=r(18592),a=o(r(67294)),i=r(61329),s=r(158),l=n.css`
  label: quick-start-item;
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 40px;
  width: 100%;
`,c=n.css`
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
  font-size: ${i.theme.fontSize.l};
`,d=n.css`
  label: quick-start-item-title;
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.text};
  text-transform: uppercase;
`,u=n.css`
  label: quick-start-item-content;
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.m};
`,p=n.css`
  label: quick-start-item-container;
  width: 100%;
`;t.QuickStartItem=({children:e,index:t,title:r})=>a.default.createElement("div",{className:l},a.default.createElement("div",{className:c},t),a.default.createElement("div",{className:p},a.default.createElement("h3",{className:d},r),a.default.createElement("div",{className:u},e)))},6488:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Select=void 0;const n=o(r(67294)),a=r(88899),i=r(69274),s=r(96486),l=r(18592),c=r(61329),d=r(48228),u=l.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  * {
    cursor: pointer;
  }
`,p=l.css`
  flex: 1 1 1px;
  color: ${c.theme.colors.text};
`,f=l.css`
  color: ${c.theme.colors.placeholder};
`;t.Select=function({items:e,placeholder:t,value:r,onChange:o,getKey:m=(e=>`${e}`),getValue:h=(e=>`${e}`),getDescription:g=(()=>{})}){const{isOpen:b,getToggleButtonProps:y,getLabelProps:v,getMenuProps:w,highlightedIndex:x,getItemProps:_}=(0,a.useSelect)({items:e,onSelectedItemChange:e=>o?.(e.selectedItem)});return n.default.createElement("div",{className:(0,d.dropdownContainerStyle)(b)},n.default.createElement("div",{className:u,...y()},n.default.createElement("label",{className:p,...v()},(0,s.isNil)(r)?n.default.createElement("span",{className:f},t):h(r)),n.default.createElement(i.HiChevronDown,{color:c.theme.colors.text})),n.default.createElement("ul",{...w(),className:d.dropdownStyle},b&&e.map(((e,t)=>{const r=(0,l.cx)(d.dropdownItemStyle,x===t?d.focusedDropownItemStyle:void 0),o=h(e),a=m(e),i=g(e);return n.default.createElement("li",{className:r,key:`${a}${t}`,..._({item:e,index:t})},n.default.createElement("span",{className:d.dropdownItemLabelStyle},o),(0,s.isNil)(i)?null:n.default.createElement("span",{className:d.dropdownItemDescriptionStyle},i))}))))}},39201:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const n=r(18592),a=o(r(67294)),i=r(61329),s=n.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${i.theme.colors.dark2};
`;t.SideBar=({children:e})=>a.default.createElement("div",{className:s},e)},19343:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarLogo=void 0;const n=r(18592),a=r(67535),i=o(r(67294)),s=r(61329),l=r(15435),c=n.css`
  label: side-bar-logo;
  display: flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  margin: 14px 14px 40px 14px;
`,d=n.css`
  display: flex;
  flex-direction: column;
`,u=n.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${s.theme.fontSize.l};
  color: ${s.theme.colors.text};
`,p=n.css`
  color: ${s.theme.colors.muted};
`,f=n.css`
  font-size: ${s.theme.fontSize.s};
  color: ${s.theme.colors.muted};
`;t.SideBarLogo=({name:e})=>i.default.createElement("a",{className:c,href:"#"},i.default.createElement(l.Logo,{width:60}),i.default.createElement("div",{className:d},i.default.createElement("h1",{className:u},"Oats ",i.default.createElement("span",{className:p},e)),i.default.createElement("span",{className:f},"v",a.version)))},38938:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const n=r(18592),a=o(r(67294)),i=r(61329),s=n.css`
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: 10px 14px;
`,l=n.css`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;t.SideBarSection=({children:e,title:t})=>a.default.createElement(a.default.Fragment,null,a.default.createElement("div",{className:s},t),a.default.createElement("div",{className:l},e))},81065:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Switch=void 0;const n=r(18592),a=o(r(67294)),i=r(61329),s=n.css`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`,l=n.css`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 26px;
  background-color: ${i.theme.colors.dark1};

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    background-color: ${i.theme.colors.text};
  }
`,c=n.css`
  background-color: ${i.theme.colors.green};
  &:before {
    transform: translateX(26px);
  }
`,d=n.css`
  opacity: 0;
  width: 0;
  height: 0;
`;t.Switch=({value:e,onChange:t})=>a.default.createElement("label",{className:s},a.default.createElement("input",{type:"checkbox",checked:e,onChange:()=>{t(!e)},className:d}),a.default.createElement("span",{className:(0,n.cx)(l,e?c:void 0)}))},7807:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=r(18592),s=a(r(67294)),l=r(67361),c=a(r(29012)),d=r(74855),u=r(61329),p=r(69274),f=r(96486),m=r(71400),h=(0,m.createPrismTheme)(c.vscDarkPlus,u.theme.colors.dark1),g=(0,m.createPrismTheme)(c.vscDarkPlus,u.theme.colors.dark4),b=i.css`
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
  font-size: ${u.theme.fontSize.m};
  background-color: ${u.theme.colors.dark2};
  color: ${u.theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 8px;
`,y=i.css`
  label: docs-syntax-hl;
  border-radius: 10px;
  padding: 0px;
  /** TODO */
  margin: 16px 0px;
  overflow: hidden;
  position: relative;
  * {
    font-family: 'Source Code Pro', monospace;
    font-size: ${u.theme.fontSize.code};
  }
`,v=i.css`
  overflow: auto;
  position: relative;
  flex-grow: 1 1 1px;
  height: 100vh;
`;t.SyntaxHighlighter=({children:e,language:t,kind:r})=>{const[o,n]=(0,s.useState)(!1),[a,c]=(0,s.useState)(!1),[u,m]=(0,s.useState)(void 0),w=(0,i.cx)("editor"===r?v:y),x="editor"===r?g:h;return s.default.createElement("div",{className:w,onMouseEnter:()=>{c(!0)},onMouseLeave:()=>{c(!1)}},s.default.createElement(l.Prism,{language:t,style:x,wrapLongLines:!0,showLineNumbers:"editor"===r},e),s.default.createElement(d.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,f.isNil)(u)||(clearTimeout(u),m(void 0)),n(t),m(setTimeout((()=>{n(!1)}),2e3))}},s.default.createElement("button",{className:b,style:{opacity:a?1:0}},o?s.default.createElement(p.HiCheck,null):s.default.createElement(p.HiClipboard,null))))}},89937:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const n=r(18592),a=o(r(67294)),i=r(61329),s=n.css`
  border-radius: 10px;
  border: 2px solid ${i.theme.colors.dark1};
  margin: 1px;
`,l=n.css`
  border-collapse: collapse;
  width: 100%;
  border-width: 0px;
`;t.Table=({children:e,className:t,...r})=>a.default.createElement("div",{className:s},a.default.createElement("table",{className:(0,n.cx)(l,t),...r},e));const c=n.css`
  border: 2px solid ${i.theme.colors.dark1};
  border-left-width: 0px;
  border-right-width: 0px;
  &:last-of-type {
    border-bottom-width: 0px;
  }
`,d=n.css`
  background-color: ${i.theme.colors.dark1};
  border-width: 0px;
  border-radius: 10px;
`;t.Tr=({children:e,isHeader:t,className:r,...o})=>{const i=(0,n.cx)(t?d:c,r);return a.default.createElement("tr",{...o,className:i},e)};const u=n.css`
  color: ${i.theme.colors.text};
  font-size: ${i.theme.fontSize.m};
  padding: 18px 10px;
  text-align: left;
  &:first-of-type {
    border-top-left-radius: 5px;
  }
  &:last-of-type {
    border-top-right-radius: 5px;
  }
`;t.Th=({children:e,className:t,...r})=>a.default.createElement("th",{...r,className:(0,n.cx)(u,t)},e);const p=n.css`
  padding: 10px;
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.muted};
`;t.Td=({children:e,className:t,...r})=>a.default.createElement("td",{...r,className:(0,n.cx)(p,t)},e);const f=n.css`
  border-width: 0px;
`;t.THead=({children:e,className:t,...r})=>a.default.createElement("thead",{...r,className:(0,n.cx)(f,t)},e);const m=n.css`
  border-width: 0px;
`;t.TBody=({children:e,className:t,...r})=>a.default.createElement("tbody",{...r,className:(0,n.cx)(m,t)},e)},5838:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const n=r(18592),a=o(r(67294)),i=r(69274),s=r(61329),l=n.css`
  position: relative;
`,c=(e,t)=>n.css`
  label: tree-node-content-${e};
  display: flex;
  flex-direction: row;
  padding: 8px;
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
`,d=n.css`
  flex: 1 1 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`,u=({isContainer:e,isOpen:t,isEmpty:r})=>e?r?a.default.createElement(i.HiChevronLeft,null):t?a.default.createElement(i.HiChevronDown,null):a.default.createElement(i.HiChevronRight,null):null;t.TreeNode=function e({value:t,level:r,getLabel:o,isActive:i=(()=>!1),isOpen:s=(()=>!1),isContainer:p=(()=>!1),getChildren:f=(()=>[]),onClick:m=(()=>{}),getHref:h=(()=>{}),getIcon:g=(()=>{})}){const b=f(t),y=s(t),v=i(t),w=p(t),x=g(t),_=w&&y?(0,n.cx)(l,(e=>n.css`
  &::before {
    z-index: 5;
    label: tree-node-line-${e};
    border-left: 1px solid #555;
    content: '';
    left: ${22+14*e}px;
    position: absolute;
    top: 30px;
    height: calc(100% - 30px);
  }
`)(r)):l,O=h(t),E=o(t),P=void 0===O?()=>m(t,y):void 0;return a.default.createElement("div",{className:_},a.default.createElement("a",{className:c(r,v),href:O,onClick:P},a.default.createElement("span",{className:d},a.default.createElement(u,{isContainer:w,isEmpty:0===b.length,isOpen:y}),void 0===x?null:a.default.createElement(x,null),E)),y&&b.map(((t,n)=>a.default.createElement(e,{key:`${n}-${E}`,value:t,level:r+1,getLabel:o,getHref:h,isContainer:p,getChildren:f,isOpen:s,isActive:i,onClick:m}))))}},71400:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const o=r(96486),n=r(61329);t.createPrismTheme=function(e,t){const r={'pre[class*="language-"]':{backgroundColor:t,borderRadius:"0px",padding:"18px",width:"100%",maxWidth:"100%",borderWidth:"0px",margin:"0px",fontSize:n.theme.fontSize.code,fontFamily:n.theme.fontFamily.monospace}},a=(0,o.cloneDeep)(e);return(0,o.values)(a).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow="rgb(0 0 0 / 30%) 0px 1px",e.fontSize=n.theme.fontSize.code,e.fontFamily=n.theme.fontFamily.monospace})),(0,o.merge)(a,r)}},48228:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.selectedDropdownItemStyle=t.focusedDropownItemStyle=t.dropdownItemDescriptionStyle=t.dropdownItemLabelStyle=t.dropdownItemStyle=t.dropdownStyle=t.dropdownContainerStyle=void 0;const o=r(18592),n=r(61329);t.dropdownContainerStyle=e=>o.css`
  label: dropdown-container;
  width: 100%;
  position: relative;
  background-color: ${n.theme.colors.dark1};
  font-size: ${n.theme.fontSize.m};
  border-radius: ${e?"8px 8px 0px 0px":"8px"};
  border-width: 0px;
  outline: none;
  cursor: pointer;
`,t.dropdownStyle=o.css`
  label: dropdown;
  width: 100%;
  display: block;
  margin: 0px;
  position: absolute;
  max-height: 20rem;
  overflow: auto;
  border-radius: 0px 0px 8px 8px;
  background-color: ${n.theme.colors.dark1};
  padding: 0px;
  z-index: 1;
`,t.dropdownItemStyle=o.css`
  padding: 12px 16px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
`,t.dropdownItemLabelStyle=o.css`
  color: ${n.theme.colors.text};
  font-size: ${n.theme.fontSize.m};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`,t.dropdownItemDescriptionStyle=o.css`
  color: ${n.theme.colors.muted};
  font-size: ${n.theme.fontSize.s};
`,t.focusedDropownItemStyle=o.css`
  background-color: ${n.theme.colors.darkHighlight};
`,t.selectedDropdownItemStyle=o.css`
  background-color: ${n.theme.colors.darkHighlight};
  color: ${n.theme.colors.text};
`},69395:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.dd=void 0,t.dd={getKey:e=>e.key,getValue:e=>e.label,getDescription:e=>e.description}},86753:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,r,o){return void 0!==r&&void 0===o?[r,t/e*r]:void 0!==o&&void 0===r?[o,e/t*o]:void 0!==r&&void 0!==o?[r,o]:[e,t]}},158:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ctnr=t.breakpoints=void 0;const o=r(18592);t.breakpoints={desktop:"@media (min-width: 1201px)",tablet:"@media (min-width: 651px) and (max-width: 1200px) ",phone:"@media (max-width: 650px) "},t.ctnr=o.css`
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
`},72050:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const o=r(26729),n=r(61329);t.globalStyles=o.css`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: ${n.theme.fontFamily.sansSerif};
  }
  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`},12299:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(26729),a=o(r(67294)),i=r(20745),s=r(49818),l=r(72428),c=r(72050);(0,i.createRoot)(document.getElementById("root")).render(a.default.createElement(s.HashRouter,null,a.default.createElement(n.Global,{styles:c.globalStyles}),a.default.createElement(l.AppV2,null)))},63042:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GeneratorContext=void 0;const o=r(67294);t.GeneratorContext=(0,o.createContext)({})},34241:(e,t)=>{"use strict";function r(e,t,o,n){switch(t.length){case 0:throw new Error(`Unexpected path "${e}".`);case 1:{const[r]=t;return void(n.children.some((e=>e.name===r))||n.children.push({type:"file",content:o,name:r,path:e}))}default:{const[a,...i]=t;n.children.some((e=>e.name===a))||n.children.push({type:"folder",path:`${n.path}/${a}`,name:a,children:[]});const s=n.children.find((e=>e.name===a));if("folder"!==s.type)throw new TypeError(`Should be a "folder", but is a file instead: "${a}" in "${e}".`);return r(e,i,o,s)}}}function o(e,t){if(!e.path.startsWith("/"))throw new Error(`Illegal path of file "${e.path}". Should start with "/".`);const[,...o]=e.path.split("/");r(e.path,o,e.content,t)}function n(e,t){return e.name.localeCompare(t.name)}function a(e){"folder"===e.type&&(e.children.sort(n),e.children.forEach(a))}Object.defineProperty(t,"__esModule",{value:!0}),t.buildExplorerTree=void 0,t.buildExplorerTree=function(e){const t={type:"folder",name:"/",path:"",children:[]};return e.forEach((e=>o(e,t))),a(t),t}},67045:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.needsCors=void 0;const o=r(96486);t.needsCors=function(e){return!((0,o.isNil)(e.allowCredentials)&&(0,o.isNil)(e.allowedMethods)&&(0,o.isNil)(e.allowedOrigins)&&(0,o.isNil)(e.allowedRequestHeaders)&&(0,o.isNil)(e.allowedResponseHeaders)&&(0,o.isNil)(e.maxAge))}},17379:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createPresetConfiguration=void 0;const o=r(96486),n=r(67045),a=e=>{const{debugCookies:t,documentation:r,validateResponses:n}=e;if(!((0,o.isNil)(t)&&(0,o.isNil)(r)&&(0,o.isNil)(n)))return{...(0,o.isNil)(r)?{}:{documentation:r},...(0,o.isNil)(t)?{}:{debugCookies:t},...(0,o.isNil)(n)?{}:{validateResponses:n}}},i=e=>{const{allowCredentials:t,allowedMethods:r,allowedOrigins:n,allowedRequestHeaders:a,allowedResponseHeaders:i,maxAge:s}=e;return{...(0,o.isNil)(t)?{}:{isCredentialsAllowed:()=>t},...(0,o.isNil)(n)?{}:{getAllowedOrigins:()=>n},...(0,o.isNil)(s)?{}:{getMaxAge:()=>s},...(0,o.isNil)(a)?{}:{isRequestHeaderAllowed:e=>"boolean"==typeof a?a:a.includes(e)},...(0,o.isNil)(i)?{}:{isResponseHeaderAllowed:e=>"boolean"==typeof i?i:i.includes(e)},...(0,o.isNil)(r)?{}:{isMethodAllowed:(e,t)=>"boolean"==typeof r?r:r.includes(t)}}},s=e=>{const{documentation:t}=e;if(!(0,o.isNil)(t)||(0,n.needsCors)(e))return{...(0,o.isNil)(t)?{}:{documentation:t},...(0,n.needsCors)(e)?{cors:i(e)}:{}}},l={client:a,server:s,fullStack:e=>{const t=a(e),r=s(e);return{...(0,o.isNil)(t)?{}:t,...(0,o.isNil)(r)?{}:r}}};t.createPresetConfiguration=function(e,t){return l[e](t)}},5082:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaults=void 0;const r={arrowParens:"always",bracketSameLine:!1,bracketSpacing:!0,endOfLine:"lf",printWidth:80,quoteProps:"as-needed",semi:!0,singleQuote:!1,tabWidth:2,trailingComma:"es5",useTabs:!1},o={writerType:"file",lineSeparator:"\n",useFormatter:!0,leadingComments:[],trailingComments:[],prettier:r};t.defaults={readerConfiguration:{readerType:"remote",inlineContent:"",inlineLanguage:"json",remoteLanguage:"mixed",remotePath:"https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/pet-store-yaml.yaml",remoteProtocol:"mixed"},validatorConfiguration:{enabled:!0},generatorConfiguration:{preset:"fullStack",pathProviderType:"default",rootPath:"/src/generated",configurationStyle:"preset",presetConfig:{},generators:[]},writerConfiguration:o,prettierConfiguration:r}},50443:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.filterExplorerTree=void 0;const o=r(96486),n=(0,o.negate)(o.isNil);function a(e,t){if("file"===e.type)return function(e,t){return e.path.toLowerCase().includes(t)}(e,t)?e:void 0;{const r=e.children.map((e=>a(e,t))).filter(n);return 0===r.length?void 0:{...e,children:r}}}t.filterExplorerTree=function(e,t){if(0===t.length)return e;const r=a(e,t.toLowerCase());return void 0===r?{...e,children:[]}:r}},54685:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.findFileByPath=void 0;const n=o(r(14293));t.findFileByPath=function e(t,r){if("file"===r.type&&r.path===t)return r;if("folder"===r.type)for(let o=0;o<r.children.length;o+=1){const a=e(t,r.children[o]);if(!(0,n.default)(a))return a}}},25306:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getGeneratorSource=void 0;const n=r(55423),a=o(r(39070)),i=o(r(73945)),s=r(96486),l=o(r(65831)),c=r(66773),d=r(5082);function u(e,t){return(0,n.addSyntheticLeadingComment)(e,n.SyntaxKind.SingleLineCommentTrivia,` ${t}`,!0)}function p(e){const t="inline"===e.readerType?e.inlineLanguage:e.remoteLanguage,r="mixed"===t?"document":`${t.toUpperCase()} document`,o="resolves it's references, structurally validates it, and exposes it for the next step.";if("inline"===e.readerType)return`Reads your inline ${r}, ${o}`;switch(e.remoteProtocol){case"file":return`Reads your document from the file system, ${o}`;case"mixed":return`Reads your ${r}, ${o}`;default:return`Reads your ${r} from ${e.remoteProtocol.toUpperCase()}, ${o}`}}function f(e){const t=function(e,t){try{if("yaml"===t)return l.default.stringify(l.default.parse(e));if("json"===t)return JSON.stringify(JSON.parse(e))}catch(e){console.error(e)}return e}(e.inlineContent,e.inlineLanguage);return u(n.factory.createVariableStatement(void 0,n.factory.createVariableDeclarationList([n.factory.createVariableDeclaration(n.factory.createIdentifier(`${e.inlineLanguage}Source`),void 0,void 0,n.factory.createNoSubstitutionTemplateLiteral(t,t))],n.NodeFlags.Const)),`The source of your inline OpenAPI document in ${e.inlineLanguage.toUpperCase()} format.`)}function m(e){return"preset"===e.configurationStyle?function(e){const t=(0,c.getPresetConfigAst)(e.presetConfig,e.preset);return n.factory.createCallExpression(n.factory.createPropertyAccessExpression(n.factory.createIdentifier("presets"),n.factory.createIdentifier(e.preset)),void 0,t.length>0?[n.factory.createObjectLiteralExpression(t,!0)]:[])}(e):function(e){return n.factory.createArrayLiteralExpression(e.generators.map((e=>n.factory.createCallExpression(n.factory.createPropertyAccessExpression(n.factory.createIdentifier("generators"),n.factory.createIdentifier("create")),void 0,[n.factory.createStringLiteral(e)]))),!0)}(e)}function h(e){return n.factory.createArrayLiteralExpression(e.map((e=>n.factory.createObjectLiteralExpression([n.factory.createPropertyAssignment(n.factory.createIdentifier("type"),n.factory.createStringLiteral(e.type)),n.factory.createPropertyAssignment(n.factory.createIdentifier("text"),n.factory.createStringLiteral(e.text))],!1))))}function g(e){const t=u(n.factory.createPropertyAssignment(n.factory.createIdentifier("format"),function(e){return n.factory.createCallExpression(n.factory.createPropertyAccessExpression(n.factory.createIdentifier("formatters"),n.factory.createIdentifier("prettier")),void 0,[n.factory.createObjectLiteralExpression([n.factory.createPropertyAssignment(n.factory.createIdentifier("parser"),n.factory.createStringLiteral("typescript")),...Object.entries(e.prettier).filter((([e,t])=>!(0,s.isNil)(t)&&t!==d.defaults.prettierConfiguration[e])).map((([e,t])=>n.factory.createPropertyAssignment(n.factory.createIdentifier(e),function(e){switch(typeof e){case"boolean":return e?n.factory.createTrue():n.factory.createFalse();case"number":return n.factory.createNumericLiteral(e);case"string":return n.factory.createStringLiteral(e)}}(t))))],!0)])}(e)),"Formats each generated source using prettier."),r=u(n.factory.createPropertyAssignment(n.factory.createIdentifier("comments"),function(e){return n.factory.createObjectLiteralExpression([...e.leadingComments.length>0?[u(n.factory.createPropertyAssignment(n.factory.createIdentifier("leadingComments"),h(e.leadingComments)),"Comment(s) appearing in the beginning of the file, before the first statement.")]:[],...e.trailingComments.length>0?[u(n.factory.createPropertyAssignment(n.factory.createIdentifier("trailingComments"),h(e.trailingComments)),"Comment(s) appearing in the end of the file, after the last statement.")]:[]],!0)}(e)),"Adds leading/trailing comments to each generated file. Ideal for disabling linters or warning not to edit these files.");return n.factory.createCallExpression(n.factory.createPropertyAccessExpression(n.factory.createPropertyAccessExpression(n.factory.createIdentifier("writers"),n.factory.createIdentifier("typescript")),n.factory.createIdentifier(e.writerType)),void 0,[n.factory.createObjectLiteralExpression([...e.useFormatter?[t]:[],...e.leadingComments.length>0||e.trailingComments.length>0?[r]:[]],!0)])}function b(e){return n.factory.createExpressionStatement(n.factory.createCallExpression(n.factory.createIdentifier("generate"),void 0,[n.factory.createObjectLiteralExpression([u(n.factory.createPropertyAssignment(n.factory.createIdentifier("logger"),n.factory.createCallExpression(n.factory.createPropertyAccessExpression(n.factory.createIdentifier("loggers"),n.factory.createIdentifier("simple")),void 0,[])),"Logs generator events as they happen. Use logger.verbose() for more detailed log output."),u(n.factory.createPropertyAssignment(n.factory.createIdentifier("reader"),(t=e.reader,"inline"===t.readerType?function(e){const t=`inline.${e.inlineLanguage}`;return n.factory.createCallExpression(n.factory.createPropertyAccessExpression(n.factory.createPropertyAccessExpression(n.factory.createPropertyAccessExpression(n.factory.createIdentifier("readers"),n.factory.createIdentifier("memory")),n.factory.createIdentifier("mixed")),n.factory.createIdentifier(e.inlineLanguage)),void 0,[u(n.factory.createStringLiteral(t),"The URI to the main inline document."),u(n.factory.createObjectLiteralExpression([n.factory.createPropertyAssignment(n.factory.createStringLiteral(t),n.factory.createIdentifier(`${e.inlineLanguage}Source`))]),"The mapping between inline document URI and content. Documents can reference each outher by the key URI.")])}(t):function(e){return n.factory.createCallExpression(n.factory.createPropertyAccessExpression(n.factory.createPropertyAccessExpression(n.factory.createIdentifier("readers"),n.factory.createIdentifier(e.remoteProtocol)),n.factory.createIdentifier(e.remoteLanguage)),void 0,[n.factory.createStringLiteral(e.remotePath)])}(t))),p(e.reader)),...e.validator.enabled?[u(n.factory.createPropertyAssignment(n.factory.createIdentifier("validator"),n.factory.createCallExpression(n.factory.createIdentifier("validator"),void 0,[])),"Takes the output of the read step, and semantically validates it.")]:[],u(n.factory.createPropertyAssignment(n.factory.createIdentifier("generator"),(r=e.generator,n.factory.createCallExpression(n.factory.createIdentifier("generator"),void 0,[n.factory.createObjectLiteralExpression([u(n.factory.createPropertyAssignment(n.factory.createIdentifier("nameProvider"),n.factory.createCallExpression(n.factory.createPropertyAccessExpression(n.factory.createIdentifier("nameProviders"),n.factory.createIdentifier("default")),void 0,[])),"Provides a name for each generated artifact."),u(n.factory.createPropertyAssignment(n.factory.createIdentifier("pathProvider"),n.factory.createCallExpression(n.factory.createPropertyAccessExpression(n.factory.createIdentifier("pathProviders"),n.factory.createIdentifier(r.pathProviderType)),void 0,[n.factory.createStringLiteral(r.rootPath)])),`Provides a path in the file system for each generated artifact with "${r.rootPath}" as root.`),u(n.factory.createPropertyAssignment(n.factory.createIdentifier("children"),m(r)),("preset"===r.configurationStyle?"Generator preset":"Individual generators")+" responsible for generating the output AST.")],!0)]))),`Takes the ${e.validator.enabled?"validated ":""}output of the read step, and coordinates child code generators.`),u(n.factory.createPropertyAssignment(n.factory.createIdentifier("writer"),g(e.writer)),`Takes the output of generator step, stringifies it, and ${"memory"===e.writer.writerType?"returns it":"writes it to the disk"}.`)],!0)]));var t,r}function y({writer:e,validator:t,generator:r}){const o=["formatters","generator","generators","loggers","nameProviders","pathProviders","presets","readers","validator","writers"].filter((t=>"formatters"!==t||e.useFormatter)).filter((e=>"validator"!==e||t.enabled)).filter((e=>"generators"===r.configurationStyle?"presets"!==e:"generators"!==e)).map((e=>n.factory.createImportSpecifier(!1,void 0,n.factory.createIdentifier(e)))),a=n.factory.createImportDeclaration(void 0,void 0,n.factory.createImportClause(!1,void 0,n.factory.createNamedImports(o)),n.factory.createStringLiteral("@oats-ts/openapi"),void 0);return[n.factory.createImportDeclaration(void 0,void 0,n.factory.createImportClause(!1,void 0,n.factory.createNamedImports([n.factory.createImportSpecifier(!1,void 0,n.factory.createIdentifier("generate"))])),n.factory.createStringLiteral("@oats-ts/oats-ts"),void 0),a]}t.getGeneratorSource=function(e){const t=[y(e),"inline"===e.reader.readerType?[f(e.reader)]:[],[b(e)]].filter((e=>e.length>0)).map((e=>n.factory.createSourceFile(e,n.factory.createToken(n.SyntaxKind.EndOfFileToken),n.NodeFlags.None))),r=(0,n.createPrinter)({newLine:n.NewLineKind.LineFeed,removeComments:!1});return i.default.format(t.map((e=>r.printFile(e))).join("\n\n"),{parser:"typescript",plugins:[a.default]})}},33521:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getPackageJsonSource=void 0;const o=r(67535);function n(e){return Array.from(e).sort(((e,t)=>e.name.localeCompare(t.name))).reduce(((e,{name:t,version:r})=>({...e,[t]:r})),{})}t.getPackageJsonSource=function(e,t){const r=n(e),a={name:"your-project",version:"1.0.0",description:"You will need 'devDependencies' to run oats, and 'dependencies' make it's output work at runtime.",scripts:{oats:"ts-node ./generate.ts"},...0===e.length?{}:{dependencies:r},devDependencies:n([{name:"@oats-ts/oats-ts",version:o.version},{name:"@oats-ts/openapi",version:o.version},{name:"typescript",version:t.typescript},{name:"ts-node",version:t["ts-node"]}])};return JSON.stringify(a,null,2)}},66773:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getPresetConfigAst=void 0;const o=r(96486),n=r(55423),a=r(5563),i=r(67045);function s(e){return n.factory.createParameterDeclaration([],[],void 0,e,void 0,void 0,void 0)}function l(e,t,r){return n.factory.createPropertyAssignment(e,n.factory.createArrowFunction([],[],t.map(s),void 0,n.factory.createToken(n.SyntaxKind.EqualsGreaterThanToken),r))}function c(e,t,r=(e=>e)){return"boolean"==typeof t?!0===t?n.factory.createTrue():n.factory.createFalse():(0,a.getLogicalExpression)(n.SyntaxKind.BarBarToken,t.map(r).map((t=>n.factory.createBinaryExpression(n.factory.createIdentifier(e),n.SyntaxKind.EqualsEqualsEqualsToken,n.factory.createStringLiteral(t)))))}const d=e=>{return(0,o.isNil)(e.allowedOrigins)?[]:[l("getAllowedOrigins",["_path","_method","_operation"],(t=e.allowedOrigins,"boolean"==typeof t?!0===t?n.factory.createTrue():n.factory.createFalse():n.factory.createArrayLiteralExpression(t.map((e=>n.factory.createStringLiteral(e))))))];var t},u=e=>(0,o.isNil)(e.allowedMethods)?[]:[l("isMethodAllowed",["_path","boolean"==typeof e.allowedMethods?"_method":"method","_operation"],c("method",e.allowedMethods))],p=e=>(0,o.isNil)(e.allowedRequestHeaders)?[]:[l("isRequestHeaderAllowed",["boolean"==typeof e.allowedRequestHeaders?"_header":"header","_path","_method","_operation"],c("header",e.allowedRequestHeaders,(e=>e.toLowerCase())))],f=e=>(0,o.isNil)(e.allowedResponseHeaders)?[]:[l("isResponseHeaderAllowed",["boolean"==typeof e.allowedResponseHeaders?"_header":"header","_path","_method","_operation"],c("header",e.allowedResponseHeaders,(e=>e.toLowerCase())))],m=e=>(0,o.isNil)(e.maxAge)?[]:[l("getMaxAge",["_path","_method","_operation"],n.factory.createNumericLiteral(e.maxAge))],h=e=>(0,o.isNil)(e.allowCredentials)?[]:[l("isCredentialsAllowed",["_path","_method","_operation"],!0===e.allowCredentials?n.factory.createTrue():n.factory.createFalse())];function g(e,t){if(!(0,o.isNil)(t))return n.factory.createPropertyAssignment(e,t?n.factory.createTrue():n.factory.createFalse())}t.getPresetConfigAst=function(e,t){const r=g("documentation",e.documentation),a=g("validateResponses",e.validateResponses),s=g("debugCookies",e.debugCookies),l=function(e){if(!(0,i.needsCors)(e))return;const t=[...d(e),...u(e),...p(e),...f(e),...h(e),...m(e)];return n.factory.createPropertyAssignment("cors",n.factory.createObjectLiteralExpression(t,!0))}(e);return{client:[r,a,s],server:[r,l],fullStack:[r,a,l,s]}[t].filter((e=>!(0,o.isNil)(e)))}},8533:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getPresetConfigFields=void 0;const r=["documentation"],o=["validateResponses","debugCookies"],n=["allowedOrigins","allowedMethods","allowedRequestHeaders","allowedResponseHeaders","allowCredentials","maxAge"];t.getPresetConfigFields=function(e){switch(e){case"client":return[...r,...o];case"server":return[...r,...n];case"fullStack":return[...r,...o,...n]}}},85949:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.guessLanguage=t.fetchSampleFile=t.getSampleFiles=void 0;const n=o(r(65831)),a="oats-ts/oats-schemas";t.getSampleFiles=async function(e){const t=await fetch(`https://api.github.com/repos/${a}/git/trees/master?recursive=true`);return(await t.json()).tree.filter((e=>"tree"!==e.type)).filter((t=>e.some((e=>t.path.startsWith(`${e}/`))))).filter((e=>e.path.endsWith(".json")||e.path.endsWith(".yaml"))).map((e=>e.path)).map((e=>`https://raw.githubusercontent.com/${a}/master/${e}`))},t.fetchSampleFile=async function(e){return(await fetch(e)).text()},t.guessLanguage=function(e){try{return JSON.parse(e),"json"}catch(t){try{return n.default.parse(e),"yaml"}catch(e){}}}},99936:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getVersionMap=void 0;const o=r(81249),n=r(96486),a={};t.getVersionMap=async function(...e){return(await Promise.all(e.map((e=>async function(e){if("string"!=typeof a[e])try{const t=await fetch(`https://registry.npmjs.org/${e}`),r=await t.json(),i=Object.keys(r.versions).filter((e=>(0,n.isNil)((0,o.prerelease)(e)))).sort(((e,t)=>(0,o.gt)(t,e)?1:-1));a[e]=i[0]??"*"}catch(t){a[e]="*",console.error(t)}return{name:e,version:a[e]}}(e))))).reduce(((e,{name:t,version:r})=>({...e,[t]:r})),{})}},59352:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.createWriter=t.createGenerator=t.createReader=void 0;const n=r(6740),a=o(r(39070)),i=r(17379),s=r(96486);function l(e){switch(e.configurationStyle){case"generators":return e.generators.map((e=>n.generators.create(e)));case"preset":{const t=(0,i.createPresetConfiguration)(e.preset,e.presetConfig),r=n.presets[e.preset];return(0,s.isNil)(t)?r():r(t)}default:return[]}}t.createReader=function(e){switch(e.readerType){case"inline":return n.readers.memory.mixed[e.inlineLanguage]("",{"":e.inlineContent});case"remote":return n.readers[e.remoteProtocol][e.remoteLanguage](e.remotePath)}},t.createGenerator=function(e){return(0,n.generator)({nameProvider:n.nameProviders.default(),pathProvider:n.pathProviders[e.pathProviderType](e.rootPath),children:l(e)})},t.createWriter=function(e){return n.writers.typescript.memory({comments:{leadingComments:e.leadingComments??[],trailingComments:e.trailingComments??[],lineSeparator:e.lineSeparator},format:e.useFormatter?n.formatters.prettier({...e.prettier,parser:"typescript",plugins:[a.default]}):void 0})}},20070:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useDebounceEffect=void 0;const o=r(67294);t.useDebounceEffect=function(e,t){(0,o.useEffect)((()=>{const r=setTimeout(e,t);return()=>clearTimeout(r)}),[e,t])}},34662:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useGeneratorContext=t.useGenerator=void 0;const n=r(67535),a=r(6740),i=o(r(14293)),s=r(67294),l=r(75265),c=r(27912),d=r(85949),u=r(34241),p=r(63042),f=r(20070),m=r(25306),h=r(59352),g=r(767),b=r(50443),y=r(33521),v=r(54685),w=r(99936),x=r(5082);t.useGenerator=function(){const[e,t]=(0,s.useState)([]),[r,o]=(0,s.useState)((()=>c.storage.get("configuration",{type:"configuration",active:"reader",version:n.version,reader:x.defaults.readerConfiguration,validator:x.defaults.validatorConfiguration,generator:x.defaults.generatorConfiguration,writer:x.defaults.writerConfiguration},g.verifyConfiguration))),[p,_]=(0,s.useState)({type:"generator-source",source:""}),[O,E]=(0,s.useState)({type:"package-json",source:""}),[P,S]=(0,s.useState)({type:"issues",issues:[]}),[C,k]=(0,s.useState)({type:"folder",path:"/",name:"/",children:[]}),[j,I]=(0,s.useState)(""),[A,M]=(0,s.useState)(!0),[T,N]=(0,s.useState)(!1),[D,$]=(0,s.useState)(!0),[L,z]=(0,s.useState)({}),[R,H]=(0,s.useState)(C),[F,B]=(0,s.useState)((()=>c.storage.get("editorInput"))),G=(0,s.useMemo)((()=>{if(!(0,i.default)(F)){if(F.startsWith("file")){const[,e]=F.split("::");return(0,v.findFileByPath)(e,C)}switch(F){case"configuration":return r;case"generator-source":return p;case"issues":return P;case"package-json":return O;default:return}}}),[F,p,P,O,C,r]);function q(e){if((0,l.isSuccess)(e)){const{data:t}=e;k((0,u.buildExplorerTree)(t))}else k({type:"folder",name:"/",path:"/",children:[]}),S({type:"issues",issues:e.issues})}(0,s.useEffect)((()=>{M(!0);const e=c.storage.get("samples");!(0,i.default)(e)&&Array.isArray(e)?(t(e),M(!1)):(0,d.getSampleFiles)(["schemas","generated-schemas"]).then((e=>{t(e),c.storage.set("samples",e,c.Ttl.hours(1))})).finally((()=>M(!1)))}),[]),(0,s.useCallback)((()=>{$(!0),S({type:"issues",issues:[]}),k({type:"folder",children:[],name:"/",path:"/"}),(0,n.generate)({logger:e=>{a.loggers.simple()(e),e.addListener("validator-step-completed",(({issues:e})=>{S((t=>({...t,issues:[...t.issues,...e]})))})),e.addListener("generator-step-completed",(({dependencies:e,issues:t})=>{(0,w.getVersionMap)("typescript","ts-node").then((t=>(0,y.getPackageJsonSource)(e,t))).then((e=>E({...O,source:e}))),S((e=>({...e,issues:[...e.issues,...t]})))}))},validator:r.validator.enabled?(0,a.validator)():void 0,reader:(0,h.createReader)(r.reader),generator:(0,h.createGenerator)(r.generator),writer:(0,h.createWriter)(r.writer)}).then(q).finally((()=>$(!1)))}),[r.reader,r.validator,r.generator,r.writer]);const V=(0,s.useCallback)((()=>{_({type:"generator-source",source:(0,m.getGeneratorSource)(r)})}),[r.reader,r.validator,r.generator,r.writer]);(0,f.useDebounceEffect)(V,1e3);const W=(0,s.useCallback)((()=>{c.storage.set("configuration",r)}),[r]);(0,f.useDebounceEffect)(W,200);const U=(0,s.useCallback)((()=>{c.storage.set("editorInput",F)}),[F]);return(0,f.useDebounceEffect)(U,200),(0,s.useEffect)((()=>{H((0,b.filterExplorerTree)(C,j))}),[C,j]),{output:R,issues:P,samples:e,isLoading:A||D||T,isRemoteSampleLoading:T,editorInput:G,explorerTreeState:L,configuration:r,generatorSource:p,treeFilter:j,packageJson:O,loadRemoteAsInline:async()=>{N(!0);try{const e=await(0,d.fetchSampleFile)(r.reader.remotePath);o({...r,reader:{...r.reader,readerType:"inline",inlineContent:e,inlineLanguage:(0,d.guessLanguage)(e)??r.reader.inlineLanguage}}),B("configuration")}catch(e){}finally{N(!1)}},setExplorerTreeState:z,setEditorInput:B,setConfiguration:o,setTreeFilter:I}},t.useGeneratorContext=function(){return(0,s.useContext)(p.GeneratorContext)}},767:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.verifyConfiguration=void 0;const o=r(42695),n=r(67535),a=(0,o.object)((0,o.shape)({text:(0,o.string)(),type:(0,o.union)({jsdoc:(0,o.literal)("jsdoc"),block:(0,o.literal)("block"),line:(0,o.literal)("line")})})),i=(0,o.object)((0,o.shape)({readerType:(0,o.union)({inline:(0,o.literal)("inline"),remote:(0,o.literal)("remote")}),inlineContent:(0,o.string)(),inlineLanguage:(0,o.union)({json:(0,o.literal)("json"),yaml:(0,o.literal)("yaml")}),remoteLanguage:(0,o.union)({json:(0,o.literal)("json"),yaml:(0,o.literal)("yaml"),mixed:(0,o.literal)("mixed")}),remotePath:(0,o.string)(),remoteProtocol:(0,o.union)({http:(0,o.literal)("http"),https:(0,o.literal)("https"),file:(0,o.literal)("file"),mixed:(0,o.literal)("mixed")})})),s=(0,o.object)((0,o.shape)({enabled:(0,o.boolean)()})),l=(0,o.union)({stringArray:(0,o.array)((0,o.items)((0,o.string)())),boolean:(0,o.boolean)()}),c=(0,o.object)((0,o.shape)({allowCredentials:(0,o.optional)((0,o.boolean)()),allowedMethods:(0,o.optional)(l),allowedOrigins:(0,o.optional)(l),allowedRequestHeaders:(0,o.optional)(l),allowedResponseHeaders:(0,o.optional)(l),documentation:(0,o.optional)((0,o.boolean)()),maxAge:(0,o.optional)((0,o.number)()),debugCookies:(0,o.optional)((0,o.boolean)()),validateResponses:(0,o.optional)((0,o.boolean)())})),d=(0,o.object)((0,o.shape)({configurationStyle:(0,o.union)({preset:(0,o.literal)("preset"),generators:(0,o.literal)("generators")}),generators:(0,o.array)((0,o.items)((0,o.string)())),pathProviderType:(0,o.union)({default:(0,o.literal)("default"),singleFile:(0,o.literal)("singleFile"),byTarget:(0,o.literal)("byTarget"),byName:(0,o.literal)("byName")}),preset:(0,o.union)({fullStack:(0,o.literal)("fullStack"),client:(0,o.literal)("client"),server:(0,o.literal)("server")}),rootPath:(0,o.string)(),presetConfig:c})),u=(0,o.object)((0,o.shape)({lineSeparator:(0,o.union)({LF:(0,o.literal)("\n"),CRLF:(0,o.literal)("\r\n")}),writerType:(0,o.union)({file:(0,o.literal)("file"),memory:(0,o.literal)("memory")}),useFormatter:(0,o.boolean)(),leadingComments:(0,o.array)((0,o.items)(a)),trailingComments:(0,o.array)((0,o.items)(a)),prettier:(0,o.object)((0,o.shape)({arrowParens:(0,o.optional)((0,o.union)({avoid:(0,o.literal)("avoid"),always:(0,o.literal)("always")})),bracketSameLine:(0,o.optional)((0,o.boolean)()),bracketSpacing:(0,o.optional)((0,o.boolean)()),endOfLine:(0,o.optional)((0,o.union)({lf:(0,o.literal)("lf"),crlf:(0,o.literal)("crlf")})),printWidth:(0,o.optional)((0,o.number)()),tabWidth:(0,o.optional)((0,o.number)()),useTabs:(0,o.optional)((0,o.boolean)()),quoteProps:(0,o.optional)((0,o.union)({"as-needed":(0,o.literal)("as-needed"),consistent:(0,o.literal)("consistent"),preserve:(0,o.literal)("preserve")})),semi:(0,o.optional)((0,o.boolean)()),singleQuote:(0,o.optional)((0,o.boolean)()),trailingComma:(0,o.optional)((0,o.union)({none:(0,o.literal)("none"),es5:(0,o.literal)("es5"),all:(0,o.literal)("all")}))}))})),p=(0,o.object)((0,o.shape)({type:(0,o.literal)("configuration"),version:(0,o.literal)(n.version),active:(0,o.union)({reader:(0,o.literal)("reader"),validator:(0,o.literal)("validator"),generator:(0,o.literal)("generator"),writer:(0,o.literal)("writer")}),validator:s,reader:i,generator:d,writer:u}));t.verifyConfiguration=function(e){const t=p(e,"$",o.DefaultConfig),r=0===t.length;return r||console.warn("Local storage invalid",{data:e,issues:t}),r}},6924:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ConfigurationEditor=void 0;const n=r(18592),a=o(r(67294)),i=r(34662),s=r(81256),l=r(83348),c=r(75821),d=r(52623),u=n.css`
  padding: 20px;
  padding-top: 0px;
`,p=n.css`
  padding-top: 18px;
`;t.ConfigurationEditor=()=>{const{configuration:e,samples:t,setConfiguration:r,loadRemoteAsInline:o}=(0,i.useGeneratorContext)();return a.default.createElement("div",{className:u},a.default.createElement("div",{className:p},a.default.createElement(l.RemoteReaderEditor,{input:e.reader,samples:t,onChange:t=>r({...e,active:"reader",reader:t}),onLoadRemote:o}),a.default.createElement(c.ValidatorConfigurationEditor,{input:e.validator,onChange:t=>r({...e,active:"validator",validator:t})}),a.default.createElement(s.GeneratorConfigurationEditor,{input:e.generator,onChange:t=>r({...e,active:"generator",generator:t})}),a.default.createElement(d.WriterConfigurationEditor,{input:e.writer,onChange:t=>r({...e,active:"writer",writer:t})})))}},81256:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.GeneratorConfigurationEditor=void 0;const i=r(96486),s=a(r(67294)),l=r(69274),c=r(40355),d=r(69395),u=r(67036),p=r(46219),f=r(6488),m=r(37029),h=r(5082),g=[{value:"client",key:"client",label:"Client",description:"Generates a client side SDK, and utilities"},{value:"server",key:"server",label:"Server",description:"Generates server-side content, and utilities"},{value:"fullStack",key:"fullStack",label:"Full-stack",description:"Generates both client and server-side content"}],b=[{value:"default",key:"default",label:"Default",description:"Generates each artifact in it's own file, in a reasonalbe folder structure"},{value:"singleFile",key:"singleFile",label:"Single file",description:"Generates everything into a single file"},{value:"byName",key:"byName",label:"By name",description:"Generates each artifact in it's own file, into a single folder"},{value:"byTarget",key:"byTarget",label:"By concern",description:"Generates a separate file for each concern, eg.: types.ts, validators.ts, etc"}],y=["src/generated"];t.GeneratorConfigurationEditor=({input:e,onChange:t})=>{const[r,o]=(0,s.useState)(!1),n=(0,s.useMemo)((()=>(0,i.isNil)(e.preset)?void 0:g.find((t=>t.value===e.preset))),[e.preset]),a=(0,s.useMemo)((()=>(0,i.isNil)(e.pathProviderType)?void 0:b.find((t=>t.value===e.pathProviderType))),[e.pathProviderType]);return s.default.createElement(u.ConfigurationFormGroup,{name:"Generator",bottomAttachmentLabel:r?"Hide advanced":"Show advanced",bottomAttachmentIcon:r?l.HiChevronUp:l.HiChevronDown,onAttachmentClick:()=>o(!r),titleButtonLabel:"Reset",titleButtonIcon:l.HiArrowUturnLeft,onTitleButtonClick:()=>t(h.defaults.generatorConfiguration)},s.default.createElement(p.FormSection,{name:"Preset",description:"Select what you need! Do you need a client SDK? Server boilerplate? Both?"},s.default.createElement(f.Select,{placeholder:"Select preset",items:g,value:n,onChange:({value:r})=>{t({...e,preset:r})},getDescription:d.dd.getDescription,getKey:d.dd.getKey,getValue:d.dd.getValue})),s.default.createElement(p.FormSection,{name:"Root path",description:"Set the root folder for the generated content"},s.default.createElement(c.Autocomplete,{placeholder:"Root path",items:y,customLabel:"Custom root path",value:e.rootPath,onChange:r=>{t({...e,rootPath:r})}})),r&&s.default.createElement(s.default.Fragment,null,s.default.createElement(p.FormSection,{name:"Path configuration",description:"Set how you want to group generated artifacts into files"},s.default.createElement(f.Select,{placeholder:"Select path configuration",items:b,value:a,onChange:({value:r})=>{t({...e,pathProviderType:r})},getDescription:d.dd.getDescription,getKey:d.dd.getKey,getValue:d.dd.getValue})),s.default.createElement(m.PresetConfigurationEditor,{input:e,onChange:t})))}},37029:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.PresetConfigurationEditor=void 0;const i=r(96486),s=a(r(67294)),l=r(8533),c=r(11707);t.PresetConfigurationEditor=({input:e,onChange:t})=>{const{preset:r,configurationStyle:o,generators:n}=e,a=(0,s.useMemo)((()=>"preset"===o?(0,l.getPresetConfigFields)(r):[]),[n,r,o]),d=r=>{t({...e,presetConfig:r})};return s.default.createElement(s.default.Fragment,null,a.map((t=>{const r=c.editors[t];return(0,i.isNil)(r)?null:s.default.createElement(r,{field:t,key:t,data:e.presetConfig,onChange:d})})))}},83348:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.RemoteReaderEditor=void 0;const i=r(96486),s=a(r(67294)),l=r(69274),c=r(40355),d=r(69395),u=r(67036),p=r(46219),f=r(6488),m=r(5082),h=[{value:"json",key:"json",label:"JSON",description:"Parses JSON documents for root and references"},{value:"yaml",key:"yaml",label:"YAML",description:"Parses YAML documents for root and references"},{value:"mixed",key:"mixed",label:"Mixed",description:"Parses both JSON and YAML documents"}],g=[{label:"HTTPS",key:"https",value:"https",description:"Resolves documents using HTTPS"},{label:"HTTP",key:"http",value:"http",description:"Resolves documents using HTTPS"},{label:"File",key:"file",value:"file",description:"Resolves documents from the local file system (won't work in the browser)"},{label:"Mixed",key:"mixed",value:"mixed",description:"Resolves documents remotely or from the file system"}];t.RemoteReaderEditor=({input:e,samples:t,onChange:r})=>{const[o,n]=(0,s.useState)(!1),a=(0,s.useMemo)((()=>(0,i.isNil)(e.remoteProtocol)?void 0:g.find((t=>t.value===e.remoteProtocol))),[e.remoteProtocol]),b=(0,s.useMemo)((()=>(0,i.isNil)(e.remoteLanguage)?void 0:h.find((t=>t.value===e.remoteLanguage))),[e.remoteLanguage]);return s.default.createElement(u.ConfigurationFormGroup,{name:"Reader",bottomAttachmentLabel:o?"Hide advanced":"Show advanced",bottomAttachmentIcon:o?l.HiChevronUp:l.HiChevronDown,onAttachmentClick:()=>n(!o),titleButtonLabel:"Reset",titleButtonIcon:l.HiArrowUturnLeft,onTitleButtonClick:()=>r(m.defaults.readerConfiguration)},s.default.createElement(p.FormSection,{name:"URI",description:"The URI or file path where your source OpenAPI document will be read from. You can pick from Oats test documents, or check out https://apis.guru for examples"},s.default.createElement(c.Autocomplete,{placeholder:"OpenAPI document URI",items:t,value:e.remotePath,customLabel:"Custom document URI",onChange:t=>{r({...e,remotePath:t})}})),o&&s.default.createElement(s.default.Fragment,null,s.default.createElement(p.FormSection,{name:"Protocol",description:"The protocol used to read your OpenAPI document"},s.default.createElement(f.Select,{items:g,placeholder:"Choose protocol",value:a,getDescription:d.dd.getDescription,getKey:d.dd.getKey,getValue:d.dd.getValue,onChange:({value:t})=>{r({...e,remoteProtocol:t})}})),s.default.createElement(p.FormSection,{name:"Language",description:"The language used by your OpenAPI document"},s.default.createElement(f.Select,{items:h,placeholder:"Choose language",value:b,getDescription:d.dd.getDescription,getKey:d.dd.getKey,getValue:d.dd.getValue,onChange:({value:t})=>{r({...e,remoteLanguage:t})}}))))}},75821:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ValidatorConfigurationEditor=void 0;const n=o(r(67294)),a=r(69274),i=r(67036),s=r(46219),l=r(81065),c=r(5082);t.ValidatorConfigurationEditor=({input:e,onChange:t})=>n.default.createElement(i.ConfigurationFormGroup,{name:"Validator",titleButtonLabel:"Reset",titleButtonIcon:a.HiArrowUturnLeft,onTitleButtonClick:()=>t(c.defaults.validatorConfiguration)},n.default.createElement(s.FormSection,{name:"Validate",description:"When enabled, the input OpenAPI document will be semantically validated, to catch issues early"},n.default.createElement(l.Switch,{value:e.enabled,onChange:r=>{t({...e,enabled:r})}})))},52623:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.WriterConfigurationEditor=void 0;const i=a(r(67294)),s=r(69274),l=r(9378),c=r(67036),d=r(46219),u=r(81065),p=r(5082);t.WriterConfigurationEditor=({input:e,onChange:t})=>{const[r,o]=(0,i.useState)(!1);return i.default.createElement(c.ConfigurationFormGroup,{name:"Writer",bottomAttachmentLabel:r?"Hide advanced":"Show advanced",bottomAttachmentIcon:r?s.HiChevronUp:s.HiChevronDown,onAttachmentClick:()=>o(!r),titleButtonLabel:"Reset",titleButtonIcon:s.HiArrowUturnLeft,onTitleButtonClick:()=>t(p.defaults.writerConfiguration)},i.default.createElement(d.FormSection,{name:"Use Prettier?",description:"When enabled, Prettier will be used to format the generated output"},i.default.createElement(u.Switch,{value:e.useFormatter,onChange:r=>{t({...e,useFormatter:r})}})),r&&i.default.createElement(i.default.Fragment,null,i.default.createElement(d.FormSection,{name:"Leading comments",description:"Comments added to the beginning of each generated file. Great for enabling/disabling linters, that the file should not be edited."},i.default.createElement(l.CommentsTable,{value:e.leadingComments,onChange:r=>{t({...e,leadingComments:r})}})),i.default.createElement(d.FormSection,{name:"Trailing comments",description:"Comments added to the end of each generated file."},i.default.createElement(l.CommentsTable,{value:e.trailingComments,onChange:r=>{t({...e,trailingComments:r})}}))))}},44749:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AllowCredentialsEditor=void 0;const n=o(r(67294)),a=r(46219),i=r(81065);t.AllowCredentialsEditor=({data:e,onChange:t})=>n.default.createElement(a.FormSection,{name:"Allow Credentials (CORS)",description:"When enabled, cookies and authorization headers should be exposed.Influences the Access-Control-Allow-Credentials CORS header."},n.default.createElement(i.Switch,{onChange:r=>t({...e,allowCredentials:r}),value:e.allowCredentials??!1}))},33152:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.AllowedMethodsEditor=void 0;const i=r(96486),s=a(r(67294)),l=r(46219),c=r(69395),d=r(63408),u={value:"true",key:"true",label:"All methods",description:"(default) Allows all methods listed in the source OpenAPI document"},p={value:"false",key:"false",label:"No methods",description:"Forbids all methods"},f=[u,p,...["get","post","put","patch","delete","trace","head"].map((e=>({label:e.toUpperCase(),key:e,value:e})))];t.AllowedMethodsEditor=({data:e,onChange:t})=>{const r=(0,s.useMemo)((()=>(0,i.isNil)(e.allowedMethods)?[]:"boolean"==typeof e.allowedMethods?[e.allowedMethods?u:p]:e.allowedMethods.map((e=>f.find((({value:t})=>t===e))))),[e.allowedMethods]);return s.default.createElement(l.FormSection,{name:"Allowed methods (CORS)",description:"Sets allowed HTTP methods for CORS. Influences the <b>Access-Control-Allow-Methods</b> CORS header."},s.default.createElement(d.MultiSelect,{placeholder:"Allowed methods",items:f,getDescription:c.dd.getDescription,getKey:c.dd.getKey,getValue:c.dd.getValue,onChange:r=>0===r.length?t({...e,allowedMethods:void 0}):r.includes(u)&&!0!==e.allowedMethods?t({...e,allowedMethods:!0}):r.includes(p)&&!1!==e.allowedMethods?t({...e,allowedMethods:!1}):t({...e,allowedMethods:r.map((({value:e})=>e)).filter((e=>"true"!==e&&"false"!==e))}),value:r}))}},56418:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AllowedOriginsEditor=void 0;const n=o(r(67294)),a=r(17235),i=e=>{switch(e){case"true":return"All origins";case"false":return"No origins";default:return e}},s=e=>{switch(e){case"true":return"All origins will be allowed";case"false":return"(default) No origins will be allowed, CORS is effectively off";default:return"User defined origin"}};t.AllowedOriginsEditor=({data:e,onChange:t})=>n.default.createElement(a.BooleanOrStringListEditor,{data:e.allowedOrigins,name:"Allowed origins (CORS)",description:"Sets allowed HTTP origins for CORS. Influences the Access-Control-Allow-Origin CORS header.",getDescription:s,getLabel:i,placeholder:"Allowed origins",onChange:r=>t({...e,allowedOrigins:r})})},45619:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AllowedRequestHeadersEditor=void 0;const n=o(r(67294)),a=r(17235),i=e=>{switch(e){case"true":return"(default) All request headers the OpenAPI document describes will be allowed";case"false":return"No request headers will be allowed";default:return"User defined request header"}},s=e=>{switch(e){case"true":return"All headers";case"false":return"No headers";default:return e}};t.AllowedRequestHeadersEditor=({data:e,onChange:t})=>n.default.createElement(a.BooleanOrStringListEditor,{data:e.allowedRequestHeaders,name:"Allowed request headers (CORS)",description:"Sets allowed HTTP request headers for CORS. Influences the Access-Control-Allow-Headers CORS header.",getDescription:i,getLabel:s,placeholder:"Allowed request headers",onChange:r=>t({...e,allowedRequestHeaders:r})})},27927:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AllowedResponseHeadersEditor=void 0;const n=o(r(67294)),a=r(17235),i=e=>{switch(e){case"true":return"(default) All response headers the OpenAPI document describes will be allowed";case"false":return"No response headers will be allowed";default:return"User defined response header"}},s=e=>{switch(e){case"true":return"All headers";case"false":return"No headers";default:return e}};t.AllowedResponseHeadersEditor=({data:e,onChange:t})=>n.default.createElement(a.BooleanOrStringListEditor,{data:e.allowedResponseHeaders,name:"Allowed response headers (CORS)",description:"Sets allowed HTTP response headers for CORS. Influences the Access-Control-Expose-Headers CORS header.",getDescription:i,getLabel:s,placeholder:"Allowed response headers",onChange:r=>t({...e,allowedResponseHeaders:r})})},17235:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BooleanOrStringListEditor=void 0;const i=r(96486),s=a(r(67294)),l=r(46219),c=r(84934),d="true",u="false";t.BooleanOrStringListEditor=({data:e,name:t,description:r,placeholder:o,onChange:n,getLabel:a,getDescription:p})=>{const f=(0,s.useMemo)((()=>(0,i.isNil)(e)?[]:"boolean"==typeof e?[e.toString()]:e),[e]),m=(0,s.useMemo)((()=>[d,u,...Array.isArray(e)?e:[]]),[e]);return s.default.createElement(l.FormSection,{name:t,description:r},s.default.createElement(c.MultiAutocomplete,{placeholder:o,items:m,onChange:t=>0===t.length?n(void 0):t.includes(d)&&!0!==e?n(!0):t.includes(u)&&!1!==e?n(!1):n(t.filter((e=>e!==d&&e!==u))),getValue:a,getDescription:p,value:f}))}},4491:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DebugCookiesEditor=void 0;const n=o(r(67294)),a=r(46219),i=r(81065);t.DebugCookiesEditor=({data:e,onChange:t})=>n.default.createElement(a.FormSection,{name:"Debug cookies",description:"When enabled, the SDK will serialize and send the Cookie header, and parse the Set-Cookie response headers. Does not work in the browser."},n.default.createElement(i.Switch,{onChange:r=>t({...e,debugCookies:r}),value:e.debugCookies??!1}))},11789:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationEditor=void 0;const n=o(r(67294)),a=r(46219),i=r(81065);t.DocumentationEditor=({data:e,onChange:t})=>n.default.createElement(a.FormSection,{name:"Documentation",description:"When enabled, the description, summary and deprecated fields will be used to generate JSDoc."},n.default.createElement(i.Switch,{onChange:r=>t({...e,documentation:r}),value:e.documentation??!0}))},36222:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MaxAgeEditor=void 0;const n=o(r(67294)),a=r(46219),i=r(9155);t.MaxAgeEditor=({data:e,onChange:t})=>n.default.createElement(a.FormSection,{name:"Max age (CORS)",description:"Sets the maximum time in seconds, the preflight request can be cached. Influences the Access-Control-Max-Age CORS header."},n.default.createElement(i.Input,{placeholder:"Max age",type:"number",onChange:r=>t({...e,maxAge:Number.isNaN(Number(r.target.value))?void 0:Number(r.target.value)}),value:e.maxAge??""}))},61559:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ValidateResponsesEditor=void 0;const n=o(r(67294)),a=r(46219),i=r(81065);t.ValidateResponsesEditor=({data:e,onChange:t})=>n.default.createElement(a.FormSection,{name:"Validate responses",description:"When enabled, client side code will validate the structure of responses, and throw if a response is invalid."},n.default.createElement(i.Switch,{onChange:r=>t({...e,validateResponses:r}),value:e.validateResponses??!1}))},11707:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.editors=void 0;const o=r(44749),n=r(33152),a=r(11789),i=r(36222),s=r(4491),l=r(61559),c=r(56418),d=r(45619),u=r(27927);t.editors={documentation:a.DocumentationEditor,validateResponses:l.ValidateResponsesEditor,debugCookies:s.DebugCookiesEditor,allowCredentials:o.AllowCredentialsEditor,maxAge:i.MaxAgeEditor,allowedMethods:n.AllowedMethodsEditor,allowedOrigins:c.AllowedOriginsEditor,allowedRequestHeaders:d.AllowedRequestHeadersEditor,allowedResponseHeaders:u.AllowedResponseHeadersEditor}},83871:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ConfigurationEditorPage=void 0;const n=r(18592),a=o(r(67294)),i=r(12872),s=r(39201),l=r(19343),c=r(63042),d=r(34662),u=r(61329),p=r(68935),f=r(85537),m=n.css`
  overflow: hidden;
`,h=n.css`
  flex: 1 1 1px;
  background-color: ${u.theme.colors.dark4};
  overflow: auto;
`;t.ConfigurationEditorPage=()=>{const e=(0,d.useGenerator)();return a.default.createElement(c.GeneratorContext.Provider,{value:e},a.default.createElement(i.AppContainer,{direction:"horizontal",className:m},a.default.createElement(s.SideBar,null,a.default.createElement(l.SideBarLogo,{name:"editor"}),a.default.createElement(f.ExplorerTree,null)),a.default.createElement("div",{className:h},a.default.createElement(p.EditorView,null))))}},68935:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.EditorView=void 0;const n=o(r(14293)),a=o(r(67294)),i=r(7807),s=r(34662),l=r(6924),c=r(98859),d=r(14667);t.EditorView=()=>{const{editorInput:e,isLoading:t}=(0,s.useGeneratorContext)();if((0,n.default)(e))return a.default.createElement(d.NoEditor,null);switch(e?.type){case"file":return a.default.createElement(i.SyntaxHighlighter,{kind:"editor",language:"typescript"},e.content);case"issues":return a.default.createElement(c.IssuesPanel,{isLoading:t,node:e});case"configuration":return a.default.createElement(l.ConfigurationEditor,null);case"generator-source":return a.default.createElement(i.SyntaxHighlighter,{kind:"editor",language:"typescript"},e.source);case"package-json":return a.default.createElement(i.SyntaxHighlighter,{kind:"editor",language:"json"},e.source);case"folder":throw new TypeError(`Unexpected input of type "${e.type}"`);default:return a.default.createElement(d.NoEditor,null)}}},85537:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.ExplorerTree=void 0;const i=a(r(67294)),s=r(38938),l=r(63042),c=r(67272);t.ExplorerTree=()=>{const{output:e,configuration:t,generatorSource:r,packageJson:o,issues:n}=(0,i.useContext)(l.GeneratorContext);return i.default.createElement(i.default.Fragment,null,i.default.createElement(s.SideBarSection,{title:"Input"},i.default.createElement(c.ExplorerTreeItem,{key:"configuration",value:t}),i.default.createElement(c.ExplorerTreeItem,{key:"source",value:r}),i.default.createElement(c.ExplorerTreeItem,{key:"package.json",value:o})),i.default.createElement(s.SideBarSection,{title:"Output"},i.default.createElement(c.ExplorerTreeItem,{key:"issues",value:n}),e.children.map((e=>i.default.createElement(c.ExplorerTreeItem,{key:e.path,value:e})))))}},67272:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.ExplorerTreeItem=void 0;const i=a(r(67294)),s=r(63042),l=r(5838),c=r(96486),d=r(69274);t.ExplorerTreeItem=({value:e})=>{const{explorerTreeState:t,editorInput:r,setEditorInput:o,setExplorerTreeState:n}=(0,i.useContext)(s.GeneratorContext);return i.default.createElement(l.TreeNode,{value:e,level:0,getIcon:e=>{switch(e.type){case"configuration":return d.HiWrenchScrewdriver;case"package-json":case"generator-source":return d.HiDocumentText;case"issues":return 0===e.issues.length?d.HiCheckCircle:e.issues.some((e=>"error"===e.severity))?d.HiXCircle:e.issues.some((e=>"warning"===e.severity))?d.HiExclamationCircle:d.HiInformationCircle;default:return}},getLabel:e=>{switch(e.type){case"file":case"folder":return e.name;case"configuration":return"Configure";case"generator-source":return"generate.ts";case"package-json":return"package.json";case"issues":return`Issues (${e.issues.length})`}},isOpen:e=>"folder"===e.type&&!0===t[e.path],isContainer:e=>"folder"===e.type,getChildren:e=>"folder"===e.type?e.children:[],isActive:e=>{if((0,c.isNil)(r))return!1;switch(r.type){case"file":return"file"===e.type&&r.path===e.path;case"folder":return!1;default:return e.type===r.type}},onClick:(e,r)=>{switch(e.type){case"file":return o(`file::${e.path}`);case"folder":return n({...t,[e.path]:!r});default:return o(e.type)}}})}},67067:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.IssuePath=void 0;const s=a(r(67294)),l=i(r(54998)),c=i(r(41609)),d=i(r(94885)),u=i(r(14293)),p=i(r(10928)),f=r(69274),m=r(18592).css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;t.IssuePath=({path:e})=>{const t=(0,s.useMemo)((()=>function(e){try{const t=new l.default(e),r=t.fragment(),o=t.path();if((0,c.default)(r))return;const n=r.split("/").filter((0,d.default)(c.default));if(!(0,c.default)(o)){const e=(0,p.default)(o.split("/"));n.unshift(e)}return n.map((e=>decodeURIComponent(e)))}catch(e){return}}(e)),[e]);return(0,u.default)(t)?s.default.createElement(s.default.Fragment,null,e):s.default.createElement("div",{className:m},t.map(((e,t)=>s.default.createElement(s.default.Fragment,null,0===t?null:s.default.createElement(f.HiChevronRight,null),s.default.createElement("span",null,e)))))}},98859:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.IssuesPanel=void 0;const n=r(18592),a=o(r(67294)),i=r(69274),s=r(89937),l=r(61329),c=r(67067),d=n.css`
  padding: 14px 20px;
`,u=n.css`
  font-size: 1.4rem;
`,p=n.css`
  color: ${l.theme.colors.text};
  font-size: ${l.theme.fontSize.l};
  margin-top: 0px;
`,f=({severity:e})=>{switch(e){case"error":return a.default.createElement(i.HiXCircle,null);case"warning":return a.default.createElement(i.HiExclamationCircle,null);case"info":return a.default.createElement(i.HiInformationCircle,null)}};t.IssuesPanel=({node:e})=>a.default.createElement("div",{className:d},a.default.createElement("h1",{className:p},"Issues (",e.issues.length,")"),a.default.createElement(s.Table,null,a.default.createElement(s.THead,null,a.default.createElement(s.Tr,{isHeader:!0},a.default.createElement(s.Th,null),a.default.createElement(s.Th,null,"Path"),a.default.createElement(s.Th,null,"Message"))),a.default.createElement(s.TBody,null,e.issues.length>0?e.issues.map(((e,t)=>a.default.createElement(s.Tr,{key:t},a.default.createElement(s.Td,{className:u},a.default.createElement(f,{severity:e.severity})),a.default.createElement(s.Td,null,a.default.createElement(c.IssuePath,{path:e.path})),a.default.createElement(s.Td,null,e.message)))):a.default.createElement(s.Tr,{"aria-colspan":3},a.default.createElement(s.Td,null,"No issues")))))},14667:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.NoEditor=void 0;const n=o(r(67294)),a=r(69274);t.NoEditor=()=>n.default.createElement("div",null,n.default.createElement(a.HiDocument,null),"No editor open. Use the explorer on the left!")},95462:function(e,t,r){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var n=Object.getOwnPropertyDescriptor(t,r);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,n)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const i=r(18592),s=a(r(67294)),l=r(49818),c=r(12872),d=r(76197),u=r(39201),p=r(19343),f=r(38938),m=r(61329),h=r(21521),g=r(21704),b=i.css`
  flex: 1 1 1px;
  overflow: auto;
  padding: 20px;
  line-height: 140%;

  color: ${m.theme.colors.muted};
  font-size: ${m.theme.fontSize.m};
  background-color: ${m.theme.colors.dark4};
`,y=i.css`
  overflow: hidden;
`;t.DocumentationPage=()=>{const{page:e}=(0,l.useParams)(),t=e??"OpenAPI_GettingStarted";return s.default.createElement(c.AppContainer,{direction:"horizontal",className:y},s.default.createElement(u.SideBar,null,s.default.createElement(p.SideBarLogo,{name:"docs"}),g.sections.map((e=>s.default.createElement(s.Fragment,{key:e.name},s.default.createElement(f.SideBarSection,{title:e.name},e.items.map((e=>s.default.createElement(h.DocumentationTreeRoot,{node:e,key:e.md})))))))),s.default.createElement("div",{className:b},s.default.createElement(d.MarkdownView,{page:t})))}},21521:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const n=o(r(67294)),a=r(5838),i=r(49818);t.DocumentationTreeRoot=({node:e})=>{const{page:t="OpenAPI_GettingStarted"}=(0,i.useParams)();return n.default.createElement(a.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===t,getHref:e=>`#/documentation/${e.md}`})}},17222:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStart=void 0;const n=r(18592),a=o(r(67294)),i=r(60155),s=r(61329),l=r(43418),c=r(7807),d=r(86299),u=o(r(26360)),p=o(r(70629)),f=r(41298),m=n.css`
  label: quick-start;
  margin-bottom: 40px;
`,h=n.css`
  label: quick-start-title;
  font-size: ${s.theme.fontSize.xl};
  color: ${s.theme.colors.text};
  margin-top: 70px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,g=n.css`
  margin-top: 16px;
`;t.QuickStart=()=>a.default.createElement(a.default.Fragment,null,a.default.createElement("h2",{className:h},a.default.createElement(i.IoRocketSharp,null)," Quick start"),a.default.createElement("div",{className:m},a.default.createElement(l.QuickStartItem,{index:1,title:"Prepare your OpenAPI document"},"You need an OpenAPI document to start with. In case you don't have one already, try this example:",a.default.createElement(c.SyntaxHighlighter,{kind:"docs"},"https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json")),a.default.createElement(l.QuickStartItem,{index:2,title:"Install Oats generator modules"},"Install the necessary Oats modules to make the code generator work:",a.default.createElement(c.SyntaxHighlighter,{kind:"docs"},"npm i @oats-ts/openapi ts-node")),a.default.createElement(l.QuickStartItem,{index:3,title:"Configure the generator"},"Create a file called ",a.default.createElement("b",null,"oats.ts")," in your project root (you can call it anything you like), and the configuration:",a.default.createElement(c.SyntaxHighlighter,{language:"typescript",kind:"docs"},u.default)),a.default.createElement(l.QuickStartItem,{index:4,title:"Run the generator"},"Open a terminal and simply run:",a.default.createElement(c.SyntaxHighlighter,{kind:"docs"},"ts-node ./oats.ts")),a.default.createElement(l.QuickStartItem,{index:5,title:"Verify results"},"In case the generators successfully ran, you will see something like this in the terminal:",a.default.createElement(c.SyntaxHighlighter,{kind:"docs"},p.default),"The ",a.default.createElement(f.Code,null,"npm install")," command lists the necessary dependencies, that the generated output needs, to function at runtime. Run this command, and you are ready to use the generated output.",a.default.createElement("p",{className:g},"In case you see errors check out the ",a.default.createElement(d.Link,{href:"#"},"troubleshooting")," guide, describing the most common issues with OpenAPI documents, and in case it doesn't help please open an ",a.default.createElement(d.Link,{href:"#"},"issue"),"!")),a.default.createElement(l.QuickStartItem,{index:6,title:"What's next?"},"Check out the ",a.default.createElement(d.Link,{href:"#"},"documentation"),", where you can learn how to use the generator output, create custom generators and more. Also have a look at the ",a.default.createElement(d.Link,{href:"#"},"configuration editor"),", where you can put together your Oats configuration right in the browser, while observing the generated output (without downloading or installing anything).")))},21704:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const o=r(96486);t.sections=[{name:"Guides",items:[{md:"OpenAPI_GettingStarted",name:"Getting started"},{md:"OpenAPI_Sdk",name:"Using a generated SDK"},{md:"OpenAPI_Server",name:"Using a generated server"},{md:"OpenAPI_CustomGenerator",name:"Custom generators"}]},{name:"Api",items:[{md:"OpenAPI_Read",name:"Read"},{md:"OpenAPI_Validate",name:"Validate"},{md:"OpenAPI_Generate",name:"Generate"},{md:"Typescript_Write",name:"Write"}]}],t.docs=(0,o.flatMap)(t.sections,(e=>e.items))},16381:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPage=void 0;const n=o(r(67294)),a=r(4151),i=r(55050),s=r(20364),l=r(48732),c=r(73976),d=r(17222),u=r(12872);t.LandingPage=()=>n.default.createElement(u.AppContainer,{direction:"vertical"},n.default.createElement(c.Header,null),n.default.createElement(a.Content,null,n.default.createElement(l.HeroSection,null),n.default.createElement(s.Headlines,null),n.default.createElement(d.QuickStart,null)),n.default.createElement(i.Footer,null))},61329:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",l:"1.8rem",xl:"2rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"}}},13411:e=>{function t(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=13411,e.exports=t},57363:()=>{},33:()=>{},79511:()=>{},89317:()=>{},62183:()=>{},13024:()=>{},62715:()=>{},13611:()=>{},28353:()=>{},1210:()=>{},77488:()=>{},43454:()=>{},33781:()=>{}},n={};function a(e){var t=n[e];if(void 0!==t)return t.exports;var r=n[e]={id:e,loaded:!1,exports:{}};return o[e].call(r.exports,r,r.exports,a),r.loaded=!0,r.exports}a.m=o,e=[],a.O=(t,r,o,n)=>{if(!r){var i=1/0;for(d=0;d<e.length;d++){for(var[r,o,n]=e[d],s=!0,l=0;l<r.length;l++)(!1&n||i>=n)&&Object.keys(a.O).every((e=>a.O[e](r[l])))?r.splice(l--,1):(s=!1,n<i&&(i=n));if(s){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[r,o,n]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var n=Object.create(null);a.r(n);var i={};t=t||[null,r({}),r([]),r(r)];for(var s=2&o&&e;"object"==typeof s&&!~t.indexOf(s);s=r(s))Object.getOwnPropertyNames(s).forEach((t=>i[t]=()=>e[t]));return i.default=()=>e,a.d(n,i),n},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={179:0};a.O.j=t=>0===e[t];var t=(t,r)=>{var o,n,[i,s,l]=r,c=0;if(i.some((t=>0!==e[t]))){for(o in s)a.o(s,o)&&(a.m[o]=s[o]);if(l)var d=l(a)}for(t&&t(r);c<i.length;c++)n=i[c],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(d)},r=self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var i=a.O(void 0,[957],(()=>a(12299)));i=a.O(i)})();
//# sourceMappingURL=v2-main.js.map