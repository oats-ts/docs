# Using a generated SDK

This guide will help you getting started with generating an SDK using Oats, and using said SDK. For this guide the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) sample OpenAPI document will be used, but feel free to use your own.

## Generating the SDK

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
    children: oats.presets.client(),
  }),
  writer: oats.writers.typescript.file({
    format: oats.formatters.prettier({
      parser: 'typescript',
    }),
  }),
})
```

Now you sould have a `generated` folder in `src`, that contains a bunch of subfolders, and some generated code in them. The most important folder for us is `src/generated/sdk`, where you'll find a file called `BookStoreSdk.ts` and `BookStoreSdkImpl.ts`.

## The SDK type

The content of `BookStoreSdk.ts` will be something like this (obviously with `import`s and optionally documentation):

```typescript
export type BookStoreSdk = {
  getBooks(request: GetBooksRequest): Promise<GetBooksResponse>
  addBook(request: AddBookRequest): Promise<AddBookResponse>
  getBook(request: GetBookRequest): Promise<GetBookResponse>
}
```

This type has a method for each [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object) under `paths` defined in your source OpenAPI document, with which you can execute each request the OpenAPI document defines.

The aim is to expose **clear functions with no extra nonsense**. When you want to make a request:

- You have to provide a strictly typed input parameter (`request`), with all the user input encapsulated.
- And when you run it, you get a strictly typed response, with everything relevant from the response encapsulated.

## The SDK implementation

The SDK implementation implements the above type as a `class` implementation. To actually start using it, you need to instantiate this class, with an input parameter called `adapter` of type `ClientAdapter`. This adapter is responsible for bridiging the generated code with a request library. Oats comes with a single client adapter based on the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API. So instantiation looks something like this:

```typescript
import { FetchClientAdapter } from '@oats-ts/openapi-fetch-client-adapter'
import { BookStoreSdkImpl } from './generated/sdk/BookStoreSdkImpl'

// Instantiate adapter with a base URL, where your spec compliant server is running
const adapter = new FetchClientAdapter({ url: 'http://localhost:3000' })
// Instantiate the SDK with the adapter
const sdk = new BookStoreSdkImpl(adapter)

// Use the SDK
const booksResponse = await sdk.getBooks({ query: { offset: 0 } })
```

## The responses

Response types aim to encapsulate the responses defined in your source OpenAPI document without ambiguity. As an example, let's look at the response type used for the `getBooks` operation, called `GetBooksResponse`:

```typescript
export type GetBooksResponse =
  | {
      statusCode: 200
      mimeType: 'application/json'
      body: Book[]
      headers: GetBooks200ResponseHeaderParameters
    }
  | {
      statusCode: 400
      mimeType: 'application/json'
      body: AppError[]
    }
  | {
      statusCode: 500
      mimeType: 'application/json'
      body: AppError[]
    }
```

It is a union type of all the different responses, and they are discriminated by the `statusCode` and `mimeType` fields. This way, when you get a `GetBooksResponse`, checking the `statusCode` (and the `mimeType` in case you have multiple of those), `headers` and `body` types will not be a guesswork anymore:

A practical example:

```typescript
const resp = await sdk.getBook({ path: { bookId: 42 } })
// In case the statusCode is 200 (and you use a type guard like so)
if (resp.statusCode === 200) {
  // The body is known to be of Book type, and you can safely access fields on it:
  console.log(resp.body.title)
} else {
  // Otherwise status is 400 or 500, for both of which the body is an array of AppErrors:
  resp.body.forEach((err) => console.error(err.message))
}
```

# When does it throw?

Oats generated SDKs don't `throw` (or rather reject, as we are dealing with `Promise`s), unless the response is invalid according to the source OpenAPI document. Examples of rejections:

- The `statusCode` doesn't match any of the statuses defined in the source OpenAPI document (eg.: it defines `200`, `400` and `500` but the response has a `403` status code).
- The `mimeType` doesn't match any of the mime types defined for the given Operation and status code, defined in the source OpenAPI document (eg.: it defines `application/json` and `text/plain` but we get `application/xml`)
- The response `body` doesn't validate against the schema described in the OpenAPI document

In all of these cases the server doesn't respect the same OpenAPI document we are working against, this is considered an unexpected situation, hence Oats throws.

However, documented non `2xx` responses will not reject, the responses will be properly parsed, validated, etc, as according to the source OpenAPI document they are to be expected.

This gives you a flexible and easy to use way of error handling, that doesn't hide anything, but rather transparently reflects the servers described behaviour.
