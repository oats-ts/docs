This guide will walk you through on how to get started with oats and OpenAPI.

## Set up the code generator

### Dependencies

Let's assume that you already have a Typescript project. The first thing you'll need is the core oats package (`@oats-ts/oats-ts`), and the OpenAPI specific libararies for oats (`@oats-ts/openapi`). Additionally we are going to write the generator's configuration in typescript as well, and to make it easy to run it, we are going to add `ts-node` to the project as well:

```bash
npm i ts-node @oats-ts/oats-ts @oats-ts/openapi
```

### Generator configuration

Next we need to put together the generator configuration, and we need to run this code.

Let's assume, that your code lives in the `src` folder. Let's create a `generate.ts` file here (it's an ordinary typescript file, you can call it whatever you like):

```ts
// src/generate.ts

import { generate } from '@oats-ts/oats-ts';
import {
  nameProviders,
  generator,
  pathProviders,
  presets,
  readers,
  writers,
  formatters,
  loggers,
  validator,
} from '@oats-ts/openapi';

import prettierConfig from './.prettierrc.json';

generate({
  logger: loggers.simple(),
  reader: readers.https.json('https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json'),
  validator: validator(),
  generator: generator({
    nameProvider: nameProviders.default(),
    pathProvider: pathProviders.default('src/generated'),
    children: presets.fullStack(),
  }),
  writer: writers.typescript({
    format: formatters.prettier(prettierConfig),
  }),
});
```

### Breakdown

- `generate` - The main generator harness. Responsible for coordinating the generator steps.
  - `logger` - Logs the generator events as they happen. Can be either `simple` or `verbose`. If ommited, you will have no feedback about what's happening, so it's recommended to use a logger.
  - `reader` - Reads the root OpenAPI document, resolving it's internal (and external) dependencies. Also structurally validates the document. Can read from `file`, `http` or `https` in `json` and `yaml` formats. For this example we are using a dummy OpenAPI document I use for testing, see more here: https://github.com/oats-ts/oats-schemas .
  - `validator` - Takes the output of the reader, and validates it for any possible inconsistencies or issues that might trip up the generators.
  - `generator` - Takes the output of the reader, and generates Typescript syntax tree from it. The work of the generator is split into smaller, single responsibilty code-generators, that are responsible for a single concern, eg.: generate schema types or parameter serializers.
    - `nameProvider` - Function determining how each generated artifact should be named.
    - `pathProvider` - Function determining what disk location each artifact should be written to.
    - `children` - Either a list of single-responsible code-generators, or a preset, which is a collection of these generators. Individual generators are exposed in the `generators` object, coming from the `'@oats-ts/openapi'` package.
  - `writer` - Takes the output of the generator, stringifies the syntax tree (SourceFiles), and then writes them to the disk.
    - `format` - Function formatting the output before it gets written to the disk. In this case using the prettier formatter, and with the config the project is already using.

## Run the code generator

To run it, you can either compile it and run it using the `node` command, or you can use `ts-node` to save the extra step (we are opting for this in this guide). You don't need any special runner.

```bash
ts-node src/generate.ts
```

Which will output something like:

```bash
✔ reader step completed using "@oats-ts/openapi-reader"
✔ validator step completed using "@oats-ts/openapi-validator"
✔ generator step completed using "@oats-ts/openapi-generators"
✔ writer step completed using "@oats-ts/typescript-writer"
```

For convenience, you could create an entry in your `package.json`, that runs this command, eg.:

```jsonc
{
  "name": "your-project",
  // ...
  "scripts": {
    // ...
    "oats": "ts-node src/generate.ts"
  }
}
```

Then you can just do this, for subsequent generator runs:

```bash
npm run oats
```

## Where to go from here?

- If you find the project interesting, feel free to check it out in action!
- If you are interested in how do certain parts work in this project, have a look around in this wiki!
- If you have found a bug, please open an issue!
