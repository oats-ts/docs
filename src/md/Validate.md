# Validate

In this guide you'll learn how the validator step works.

The valididator step is responsible for taking the output of the [reader](Reader) step, and checking for structural and semantic errors.

The validator that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-validator](https://www.npmjs.com/package/@oats-ts/openapi-validator) package.

## Examples

```ts
const oats = require('@oats-ts/openapi')

// Default validator
const defaultValidator = oats.validator()
```

## Configuration

The validator can be used configuration free. This is the default behaviour, and it ensures that the generators maintained as part of the oats project run correctly with your OpenAPI document.

Configuring the validator to suit your needs is possible, but currently experimental, docs are TBD, as the internal APIs might change.
