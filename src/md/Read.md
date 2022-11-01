# Read

The reader step is responsible for

- Reading your OpenAPI 3.x document
- Parsing it
- Structurally validating it
- Resolving it's internal and external [references](https://swagger.io/docs/specification/using-ref)
- And exposing it to the next step

The reader that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-reader](https://www.npmjs.com/package/@oats-ts/openapi-reader) package.

## Examples

```ts
import { readers } from '@oats-ts/openapi'

// Reads from the local file system, in json format
const jsonFileReader = readers.file.json('oa.json')

// Reads from the local file system, in json format
const httpsYamlReader = readers.https.yaml('https://asd.com/oa.yaml')

// Reads from any source in any format
const mixedReader = readers.mixed.mixed('http://localhost:3000/oa.json')
```

## Configuration

### Read

The reader can be configured to read inputs a few different ways:

- `http` - Reads main input document (and all possible references) from http. Will fail if the main input (or any of the references) are not accessible through http (https, local file system etc).
- `https` - Reads main input document (and all possible references) from https. Will fail if the main input (or any of the references) are not accessible through https (http, local file, etc).
- `file` - Reads main input document (and all possible references) from your local file system. Will fail if the main input (or any of the references) are not on your file system.
- `mixed` - Reads main input document (and all possible references) from any of the sources above. You can have for example a main document in your local file system, that can reference a document through http, which references another document through https.
- `test` - Reads main input document (and all possible references) from memory. Ideal for testing custom generators end-to-end.

### Parse

For parsing the document that has been read, there are also a few different built-in solutions:

- `json` - Parses the document(s) using [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).
- `yaml` - Parses the document(s) using [yamljs](https://github.com/jeremyfa/yaml.js)
- `mixed` - First tries to parse the document using `json`, then if that fails, it tries parsing using `yaml`. If both fail, the parsing is considered failed.

## Advanced usage

In case the solutions above don't suit your needs, you can use the `readers.custom` function, to wich you need to provide a configuration object, with the following properties:

- `path: string` - the entry point where the main document is
- `sanitize: (path: string) => Try<string>` - Turns `path` into [fully qualified URI](https://www.ietf.org/rfc/rfc2396.txt)
- `read: (uri: string) => Promise<Try<string>>` - Reads a document based on a fully qualified URI
- `parse: (uri: string, input: string) => Promise<Try<OpenAPIObject>>` - Parses the result of a `read` into an `OpenAPIObject` (typings can be found in [@oats-ts/openapi-model](https://www.npmjs.com/package/@oats-ts/openapi-model))
