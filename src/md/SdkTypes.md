# The SDK type

The content of `BookStoreSdk.ts` will be something like this (obviously with `import`s and optionally documentation):

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

TODO description

```typescript
import { GetBooksQueryParameters } from '../parameters/GetBooksQueryParameters'
import { GetBooksRequestHeaderParameters } from '../parameters/GetBooksRequestHeaderParameters'

export type GetBooksRequest = {
  headers?: GetBooksRequestHeaderParameters
  query?: GetBooksQueryParameters
}
```

## Response types

Response types aim to encapsulate the responses defined in your source OpenAPI document without ambiguity. As an example, let's look at the response type used for the `getBooks` operation, called `GetBooksResponse`:

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

It is a union type of all the different responses, and they are discriminated by the `statusCode` and `mimeType` fields. This way, when you get a `GetBooksResponse`, checking the `statusCode` (and the `mimeType` in case you have multiple of those), `headers` and `body` types will not be a guesswork anymore.
