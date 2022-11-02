# SDK related types

This guide will showcase the main types generated for the client side. A big chunk of the generated types is the same as for the server side (JSON schema based types and parameter types), so in this chapter I'm highlighting the differences.

## The SDK type

The most important type on the client side is the SDK type. This is the type through which we will interact with the backend. In our example the SDK type can be found under `src/generated/sdk`. The type itself, `BookStoreSdk.ts` will look something like this:

```typescript
import { AddBookRequest } from '../requests/AddBookRequest'
import { GetBookRequest } from '../requests/GetBookRequest'
import { GetBooksRequest } from '../requests/GetBooksRequest'
import { AddBookResponse } from '../responses/AddBookResponse'
import { GetBookResponse } from '../responses/GetBookResponse'
import { GetBooksResponse } from '../responses/GetBooksResponse'

export type BookStoreSdk = {
  /**
   * Returns a list of books, can be paginated
   */
  getBooks(request: GetBooksRequest): Promise<GetBooksResponse>
  /**
   * Creates a new book based on the request body.
   */
  addBook(request: AddBookRequest): Promise<AddBookResponse>
  /**
   * Returns the book associated with the given bookId
   */
  getBook(request: GetBookRequest): Promise<GetBookResponse>
}
```

This type has a method for each [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object) under `paths` defined in your source OpenAPI document, with which you can execute each request the OpenAPI document defines.

The aim is to expose **clear functions with no extra nonsense**. When you want to make a request:

- You have to provide a strictly typed input parameter (`request`), with all the user input encapsulated.
- And when you run it, you get a strictly typed response, with everything relevant from the response encapsulated.

## Request types

Request types aim to encapsulate all input that you, as the user need to provide. This includes:

- The request `body` (along with its `mimeType`)
- The `query` parameters
- The `path` parameters
- The request `headers`

Each operation has it's dedicated request type, with **only** the parameters, the source OpenAPI document describes.

An example from the book-store sample, where we have `headers` and `query` parameters:

```typescript
import { GetBooksQueryParameters } from '../parameters/GetBooksQueryParameters'
import { GetBooksRequestHeaderParameters } from '../parameters/GetBooksRequestHeaderParameters'

export type GetBooksRequest = {
  headers?: GetBooksRequestHeaderParameters
  query?: GetBooksQueryParameters
}
```

An example, where we have a request `body` (along with it's `mimeType`):

```typescript
import { Book } from '../types/Book'

export type AddBookRequest = {
  mimeType: 'application/json'
  body: Book
}
```

And another example where we have `path` parameters:

```typescript
import { GetBookPathParameters } from '../parameters/GetBookPathParameters'

export type GetBookRequest = {
  path: GetBookPathParameters
}
```

## Response types

Response types aim to encapsulate the responses defined in your source OpenAPI document without ambiguity. Response types can have the following fields (depending how your OpenAPI document defines responses):

- The `statusCode`
- The response `body` (along with its `mimeType`)
- The response `headers`

As an example, let's look at the response type used for the `getBooks` operation, called `GetBooksResponse`:

```typescript
import { GetBooks200ResponseHeaderParameters } from '../parameters/GetBooks200ResponseHeaderParameters'
import { AppError } from '../types/AppError'
import { Book } from '../types/Book'

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

Since it is a union type of all the different responses, and they are discriminated by the `statusCode` and `mimeType` fields, you can't mix up which `statusCode` belongs with which response `body` or `headers`. This way, when you get a `GetBooksResponse`, checking the `statusCode` (and the `mimeType` in case you have multiple of those), `headers` and `body` types will not be a guesswork anymore.
