# Getting started

This guide will help you getting started with generating server side code using Oats.

> As for all guides, this one is based on the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example.

## Set up the generator

- Install `@oats-ts/openapi` in your project (`npm i --dev @oats-ts/openapi`)
- Create a file called `oats.js` file in your project
- (Optional) You can write your configuration in Typescript, but you need to take care of compilation (`ts-node`)
- Add the content below to `oats.js`
- (Optional) Add an entry to `"scripts"` in your `package.json` with this command: `node ./oats.js`
- Run this file either with the script (`npm run <script-name>`) or directly (`node ./oats.js`)

```javascript
// oats.js
const oats = require('@oats-ts/openapi')

oats.generate({
  plugins: [oats.loggers.simple()],
  reader: oats.readers.https.json(
    'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',
  ),
  validator: oats.validator(),
  generator: oats.generator({
    nameProvider: oats.nameProviders.default(),
    pathProvider: oats.pathProviders.default('src/generated'),
    children: oats.presets.server(),
  }),
  writer: oats.writers.typescript.file({
    format: oats.formatters.prettier({
      parser: 'typescript',
    }),
  }),
})
```

Now you sould have a `generated` folder in `src`, that contains the generated code, in neatly organized subfolders.

In case you see errors when generating from your own OpenAPI document, and you can't interpet them:

- Make sure to check out the [OpenAPI 101](OpenAPI101) guide
- If that doesn't help either, please open an [issue](https://github.com/oats-ts/oats-ts/issues), and explain the issue you are facing in detail!
