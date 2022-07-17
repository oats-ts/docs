# Write

The writer step is responsible for taking the output of the [generator step](OpenAPI-Generator) and writing it's outputs to the disk. The typescript writer takes typescript `SourceFile`s (this is Typescript's in-memory representation of an AST + file location) and writes them to the desired location.

Additionally it can add leading / trailing comments to your files, this is ideal for warning people that the file is generated and should be edited manually, or for disabling certain linter rules for the generated files.

## Example

### Basic usage

Basic usage, formats the code using your project's prettier configuration.

```ts
import { writers, formatters } from '@oats-ts/openapi'
import prettierConfig from './.prettierrc.json'

const writer = writers.typescript({
  format: formatters.prettier(prettierConfig),
})
```

### With comments

Adds comments, first leading comment in the file warns about the fact that the file is generated, then it disables some `eslint` rules, then the trailing comment re-enables these rules, so other code is not affected (this is just an example, generated code will not break these rules).

```ts
import { writers, formatters } from '@oats-ts/openapi'
import prettierConfig from './.prettierrc.json'

const writer = writers.typescript({
  format: formatters.prettier(prettierConfig),
  comments: {
    leadingComments: [
      {
        type: 'block',
        text: 'This is a generated file, please do not edit by hand!',
      },
      {
        type: 'block',
        text: 'eslint-disable no-console, no-alert',
      },
    ],
    trailingComments: [
      {
        type: 'block',
        text: 'eslint-enable no-console, no-alert',
      },
    ],
  },
})
```

## Configuration

The default `typescript.writer` can be configured with an object, with the following fields:

- `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.
- `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.
- `write(path: string, content: string): Promise<void>` - Writes the stringified, possibly formatted `content` to the disk at `path`.
