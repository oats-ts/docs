# Generate an SDK

In this guide you'll learn how to generate an SDK and (necessary related code) based on your OpenAPI document. As for all examples, we are going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example (so it's recommended you try using this first, if you are unfamiliar with Oats)!

## Set up the generator

- Install `@oats-ts/openapi` in your project (`npm i --dev @oats-ts/openapi`)
- Create a file called `oats.js` file in your project
- Add the content below to `oats.js`
- (Optional) Add an entry to `"scripts"` in your `package.json` with this command: `node ./oats.js`
- Run this file either with the script (`npm run <script-name>`) or directly (`node ./oats.js`)
- For more detail on how to generate, check out the ["Getting started"](OpenAPI_GettingStarted) guide.

```javascript
// oats.js
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
    children: oats.presets.client(),
  }),
  writer: oats.writers.typescript.file({
    format: oats.formatters.prettier({
      parser: 'typescript',
    }),
  }),
})
```

Now you sould have a `generated` folder in `src`, that contains the generated code, in neatly organized subfolders.
