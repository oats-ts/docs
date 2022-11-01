# Generate server-side code

This guide will help you getting started with generating server side code using Oats. As for all examples, we are going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example (so it's recommended you try using this first, if you are unfamiliar with Oats)!

- Install `@oats-ts/openapi` in your project (`npm i --dev @oats-ts/openapi`)
- Create a file called `oats.js` file in your project
- Add the content below to `oats.js`
- Run this file using `node ./oats.js` (it's recommended to add an entry to `"scripts"` in your `package.json`)
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
