# Getting Started

In this guide you'll learn how to set up and generate with Oats.

## Prepare your OpenAPI document

To get started you'll need a valid OpenAPI document. If you are unsure about how to put together an OpenAPI document, a few pointers:

- The [latest specification](https://spec.openapis.org/oas/latest.html)
- Guide about [common mistakes](OpenAPI_CommonMistakes)

Oats works with both remotely hosted OpenAPI documents - accessible using the HTTP(S) protocol - and local documents in your file system. In these guides I'm going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example:

```text
https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json
```

## Install Oats generator modules

To get generating, you'll need the main Oats module.

```text
npm i @oats-ts/openapi
```

## Configure Oats

Oats borrows its configuration philosophy from Webpack, meaning code is configuration. This is how basic configuration looks like:

```js
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

## Verify results

In case Oats successfully ran, you will see something like this in the terminal:

```text
✔ reader step completed using "@oats-ts/openapi-reader"
✔ validator step completed using "@oats-ts/openapi-validator"
✔ generator step completed using "@oats-ts/openapi-generators"
i npm i @oats-ts/client-runtime @oats-ts/express-runtime express@^4.18.1
✔ writer step completed using "@oats-ts/typescript-writer"
```

Some generated outputs might have runtime dependencies (eg.: you generated `express` routers, therefore the generated code has a runtime depdency on `express`), these dependencies are summarized as a convenient `npm install` command after the generator step completes, on line `4` in this example.

Grab this command, and run it:

```text
npm i @oats-ts/client-runtime @oats-ts/express-runtime express@^4.18.1
```

## Using the generated code

Depending on what you generated (`client`, `server` or `fullStack` - meaning both), check out these guides highlighting how to use the generator output for each:

- [Using the generated SDK](OpenAPI_GeneratedSdk)
- [Using the generated server](OpenAPI_GeneratedServer)
