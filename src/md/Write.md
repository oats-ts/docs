# Write

In this guide you'll learn how the writer step works.

The writer step is responsible for taking the output of the [generator step](OpenAPI-Generator) and writing it's outputs to the disk. The typescript writer takes typescript `SourceFile`s (this is Typescript's in-memory representation of an AST + file location) and writes them to the desired location.

Additionally it can add leading / trailing comments to each of your generated files. This is ideal for warning people that the file is generated and should be edited manually, or for disabling certain linter rules for the generated files.

## Example

### Basic usage

Basic usage, formats the code using your project's prettier configuration. Formatter can be omitted, but the generated code won't be pretty in this case.

```ts
import { writers, formatters } from '@oats-ts/openapi'
import prettierConfig from './.prettierrc.json'

const writer = writers.typescript.file({
  format: formatters.prettier(prettierConfig),
})
```

### With comments

Adds comments. First leading comment warns about the fact that the file is generated, the second disables some `eslint` rules. The trailing comment re-enables these rules, so other code is not affected **(this is just an example, generated code will not break these specific rules)**.

```ts
import { writers, formatters } from '@oats-ts/openapi'
import prettierConfig from './.prettierrc.json'

const writer = writers.typescript.file({
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

The `writers.typescript` object exposes 3 factory functions:

- `file` - Writes the generated code to the disk. Configuration:
  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.
  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.
- `memory` - Doesn't write the output to the disk, returns the generated code instead as `{ path: string; content: string }[]` instead. Configuration:
  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.
  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.
- `custom` - Customizeable `write` function, ideal if you want to send the output over the wire for example. Configuration:
  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.
  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.
  - `write(path: string, content: string): Promise<void>` - Writes the stringified, possibly formatted `content` to the disk at `path`.
