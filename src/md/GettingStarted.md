# Getting Started

In this guide you'll learn how to set up and generate with Oats.

## Prepare your OpenAPI document

To get started you'll need a valid OpenAPI document. If you are unsure about how to put together an OpenAPI document, a few pointers:

- The [latest specification](https://spec.openapis.org/oas/latest.html)
- Guide about [common mistakes](CommonMistakes), when defining your OpenAPI document

Oats works with both remotely hosted OpenAPI documents - accessible using the HTTP(S) protocol - and local documents in your file system. In these guides I'm going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example:

```text
https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json
```

## Install Oats generator modules

To get generating, you'll need the main Oats module. This simply contains all that you need to generate, but you won't need anything from this module, when using the generated code:

```text
npm i --dev @oats-ts/openapi
```

## Configure Oats

Oats borrows its configuration philosophy from Webpack, meaning code is configuration. Let's create a file called `oats.js` (you can call it whatever you want), and add a basic Oats configuration:

```javascript
const oats = require('@oats-ts/openapi')

oats.generate({
  logger: oats.loggers.simple(),
  reader: oats.readers.https.json(
    'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',
  ),
  validator: oats.validator(),
  generator: oats.generator({
    nameProvider: oats.nameProviders.default(),
    pathProvider: oats.pathProviders.default('src/generated'),
    // Use presets.client() or presets.server() for just client/server side code
    children: oats.presets.fullStack(),
  }),
  writer: oats.writers.typescript.file({
    format: oats.formatters.prettier({
      parser: 'typescript',
    }),
  }),
})
```

Each part of this code can be customized or even fully replaced. The main components are:

- `generate` - The main generator harness function
- `reader` - Reads the input, resolves it's dependencies, and structuraly validates it
- `validator` - Semantically validates the resolved document
- `generator` - Runs a set of code generators, either as a list of individual generators, or presets
- `writer` - Writes the generator output to the disk
- `logger` - Event-driven logger that logs important generator events

## Run Oats

Now that we have the generator set up, you can run it like any node.js script:

```text
node ./oats.js
```

**NOTE:** In this example we are using Javascript for configuring and running the generator, even though the project is built in and for Typescript. In case you want to define your configuration in Typescript, you can, but you'll need to solve running it, for which the simplest solution is [`ts-node`](https://www.npmjs.com/package/ts-node). However in a decent IDE (like VSCode) you will still have good content assist in Javascript, when putting together this configuration, because of the type definitions exposed by the Oats packages.

## Verify results

In case Oats successfully ran, you will see something like this in the terminal:

```text
✔ reader step completed using "@oats-ts/openapi-reader"
✔ validator step completed using "@oats-ts/openapi-validator"
✔ generator step completed using "@oats-ts/openapi-generators"
i some outputs have runtime dependencies:
  npm i \
    @oats-ts/openapi-express-server-adapter@0.0.43 \
    @oats-ts/openapi-fetch-client-adapter@0.0.43 \
    @oats-ts/openapi-runtime@0.0.43 \
    express@^4.18.1
✔ writer step completed using "@oats-ts/typescript-writer"
```

Some generated outputs might have runtime dependencies (eg.: you generated `express` routers, therefore the generated code has a runtime depdency on `express`). These dependencies are summarized as a convenient `npm install` command after the generator step completes (on line `5` in this example).

Grab this command, and run it:

```text
npm i \
  @oats-ts/openapi-express-server-adapter@0.0.43 \
  @oats-ts/openapi-fetch-client-adapter@0.0.43 \
  @oats-ts/openapi-runtime@0.0.43 \
  express@^4.18.1
```

## Using the generated code

Depending on what you generated (`client`, `server` or `fullStack` - meaning both), check out these guides highlighting how to use the generator output for each:

- [Using the generated SDK](SdkGettingStarted)
- [Using the generated server](ServerGettingStarted)
