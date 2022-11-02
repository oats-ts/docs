# Server types

This guide will showcase the main types generated for the server side. A big chunk of the generated types is the same as for the client side (JSON schema based types and parameter types), so in this chapter I'm highlighting the differences.

## The API type

The most important type on the server side is the API type. You'll need an implementation of this type (can be a class or a plain object, if you don't need to share context), that will carry all the business logic for your server. How you split up logic here is completely up to you. In our example the API type can be found under `src/generated/api`. The type itself, `BookStoreApi.ts` will look something like this:

```typescript
import { AddBookServerRequest } from '../requests/AddBookServerRequest'
import { GetBookServerRequest } from '../requests/GetBookServerRequest'
import { GetBooksServerRequest } from '../requests/GetBooksServerRequest'
import { AddBookServerResponse } from '../responses/AddBookServerResponse'
import { GetBookServerResponse } from '../responses/GetBookServerResponse'
import { GetBooksServerResponse } from '../responses/GetBooksServerResponse'

export type BookStoreApi = {
  /**
   * Returns a list of books, can be paginated
   */
  getBooks(request: GetBooksServerRequest): Promise<GetBooksServerResponse>
  /**
   * Creates a new book based on the request body.
   */
  addBook(request: AddBookServerRequest): Promise<AddBookServerResponse>
  /**
   * Returns the book associated with the given bookId
   */
  getBook(request: GetBookServerRequest): Promise<GetBookServerResponse>
}
```

If you have checked out the SDK guide, it may look familiar and that is no accident. The main difference is, that we have separate request and response types for the API type. Let's check out why we have these differences!

## (Server) Request types

Request types aim to encapsulate all input that the caller has provided for a specific request. This includes:

- The request `body` (along with its `mimeType`)
- The `query` parameters
- The `path` parameters
- The request `headers`
- The `cookies` sent back by the browser (this is unique to the server request, as browsers can't directly set cookie headers)

Each operation has it's dedicated server request type, with **only** the parameters, the source OpenAPI document describes.

An example from the book-store sample, where we have `headers` and `query` parameters:

```typescript
import { Try } from '@oats-ts/openapi-runtime'
import { GetBooksQueryParameters } from '../parameters/GetBooksQueryParameters'
import { GetBooksRequestHeaderParameters } from '../parameters/GetBooksRequestHeaderParameters'

export type GetBooksServerRequest = {
  headers: Try<GetBooksRequestHeaderParameters>
  query: Try<GetBooksQueryParameters>
}
```

An example, where we have a request `body` (along with it's `mimeType`):

```typescript
import { Try } from '@oats-ts/openapi-runtime'
import { Book } from '../types/Book'

export type AddBookServerRequest = {
  mimeType: 'application/json'
  body: Try<Book>
}
```

And another example where we have `path` parameters:

```typescript
import { Try } from '@oats-ts/openapi-runtime'
import { GetBookPathParameters } from '../parameters/GetBookPathParameters'

export type GetBookServerRequest = {
  path: Try<GetBookPathParameters>
}
```

### The Try type

While on the client (SDK) side we are building the request ourselves, on the server side we need to prepare for missing or malformed input parameters. This is true for all of the above parameters. Since all parameters can be automatically parsed, I needed to find a way to communicate possible errors clearly, and let the user of the generated code decide what should happen in case of errors.

This is why the `Try` type was introduced, that wraps each field of the generated server requests. This type exists, as Typescript doesn't have [typed caches](https://github.com/microsoft/TypeScript/issues/8677) (nor [typed promise rejections](https://github.com/microsoft/TypeScript/issues/6283)), so the `Try` type encapsulates a "fail-able" value, that can be either a `Success` of a `Failure`. It has the appropriate type guards `isSuccess` and `isFailure` respectively, which are exposed by the `@oats-ts/openapi-runtime` package. A `Success` has a generic `data` field, and a `Failure` has an `issues` field of `Issue[]` type, that contains the array of issues that caused the value to be a `Failure`.

## (Server) Response types

Server response types aim to encapsulate the responses defined in your source OpenAPI document without ambiguity. For each of the API methods you need to return eventually a `Promise` of the appropriate server response type. Server response types can have the following fields (depending how your OpenAPI document defines responses):

- The `statusCode`
- The response `body` (along with its `mimeType`)
- The response `headers`
- The `cookies` set by the server

As an example, let's look at the response type used for the `getBooks` operation, called `GetBooksResponse`:

```typescript
import { GetBooks200ResponseHeaderParameters } from '../parameters/GetBooks200ResponseHeaderParameters'
import { AppError } from '../types/AppError'
import { Book } from '../types/Book'

export type GetBooksServerResponse =
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

Since it is a union type of all the different responses, and they are discriminated by the `statusCode` and `mimeType` fields, you can't mix up which `statusCode` belongs with which response `body`, `headers` or `cookies`.

**Tip:** When returning a response, always define the `statusCode` and `mimeType` first, as they narrow down the type of the rest of the fields, and you get better content assist immediately.
