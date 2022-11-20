# Configure Oats

Create a file called `oats.js` in your project root with the following content:

```javascript
const oats = require('@oats-ts/openapi')

oats.generate({
  plugins: [oats.loggers.simple()],
  // Use readers.file, to read from the local file system
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

Experiment with different configurations in the [configuration editor]({{editor}})
