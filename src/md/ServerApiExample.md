# Example API

In this guide you'll see a basic API implementation using the book store example.

We are still using the [book store](https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json) example, so if you are using an API explorer tool to test the API we are creating, it's time to download this document, and load into your API explorer tool (I'd recommend [**Postman**](https://www.postman.com), [**Insomnia**](https://insomnia.rest) or any similar HTTP tester tool).

> **If you want to follow along, make sure you have completed the [previous (server setup)](ServerSetup) part of the guide!**

## Start from scratch

Let's start from a `BookStoreApi` implementation stub.

```typescript
// BookStoreApiImpl.ts
import { BookStoreApi } from './generated/api/BookStoreApi'
import { AddBookServerRequest } from './generated/requests/AddBookServerRequest'
import { GetBookServerRequest } from './generated/requests/GetBookServerRequest'
import { GetBooksServerRequest } from './generated/requests/GetBooksServerRequest'
import { AddBookResponse } from './generated/responses/AddBookResponse'
import { GetBookResponse } from './generated/responses/GetBookResponse'
import { GetBooksResponse } from './generated/responses/GetBooksResponse'

export class BookStoreApiImpl implements BookStoreApi {
  async getBooks(request: GetBooksServerRequest): Promise<GetBooksResponse> {
    throw new Error('Method not implemented.')
  }
  async addBook(request: AddBookServerRequest): Promise<AddBookResponse> {
    throw new Error('Method not implemented.')
  }
  async getBook(request: GetBookServerRequest): Promise<GetBookResponse> {
    throw new Error('Method not implemented.')
  }
}
```

> **In the following code examples I'm ommitting irrelevant parts to keep it terse. You'll see the final code all together in the end of this guide.**

## The data model

We are going to keep it very simple for this guide, I'm going to use an array of `Book` typed items to store the data. In a real scenario you can replace it with a database, another HTTP service, or whatever else you want, as each handler is returning a `Promise`. I'm adding a hardcoded dummy item to this array, so we have something to work with.

```typescript
export class BookStoreApiImpl implements BookStoreApi {
  private readonly books: Book[] = [
    { id: 1, author: 'Balázs', price: 10, title: 'test book' },
  ]

  // Rest of the code
}
```

## Simple getBooks

Let's implement the `getBooks` handler next, ignoring all parameters for now, and just returning the contents of the `books` array.

```typescript
export class BookStoreApiImpl implements BookStoreApi {
  async getBooks(request: GetBooksServerRequest): Promise<GetBooksResponse> {
    return {
      statusCode: 200,
      mimeType: 'application/json',
      body: this.books,
      headers: {
        'x-length': this.books.length,
      },
    }
  }

  // Rest of the code
}
```

If you followed the setup guide, you can immediately test this using `npm start`, and hitting `GET http://localhost:5000/books` with your favourite API explorer tool.

## Implement addBook

For now our data is static, whatever was initially in the `books` array, we return in `getBooks`, but that's it. Let's allow adding new books! We do this by taking a `Book` typed item as request body. But there are multiple ways this request body can be invalid. The user might not send a body, send it in the wrong format (ie.: URL encoded instead of JSON), make a serializing mistake, or send valid JSON data, that is structurally incorrect (eg.: missing or mistyped fields).

This is why the `body` request field (along with all user input) is wrapped in a `Try`, and validated before it reaches our handler. Here is an example how to handle this:

```typescript
export class BookStoreApiImpl implements BookStoreApi {
  async addBook(request: AddBookServerRequest): Promise<AddBookResponse> {
    // Check if the request body is a Success, meaning it's a structurally valid Book
    if (isSuccess(request.body)) {
      // New Id for it, by taking the maximum Id in the books array and incrementing it
      const newId = Math.max(...this.books.map((b) => b.id)) + 1
      // Create a Book instance with this new Id
      const newBook: Book = { ...request.body.data, id: newId }
      // Add it to the books array
      this.books.push(newBook)
      // Return a success response with the newly created book (all strictly typed as always)
      return {
        statusCode: 201,
        mimeType: 'application/json',
        body: newBook,
      }
    }
    // In case request.body was not a success, it must have been a Failure.
    return {
      // Status is 400 because it's a user error.
      statusCode: 400,
      mimeType: 'application/json',
      // Failures have an array of Issues, from which we can form descriptive messages:
      body: request.body.issues.map(
        (issue): AppError => ({
          message: `${issue.severity} in ${issue.path}: ${issue.message}`,
        }),
      ),
    }
  }

  // Rest of the code
}
```

It's time to test this! Restart the server (`CTRL+C` then `npm start`), then hit `POST http://localhost:5000/books` with your API explorer tool! Try to figure out based on the errors you get what the request body should be!

> **WARNING:** The default `express.json` body parser replaces an empty request body with an empty object, and there's nothing you can do about this with configuration. To correct this, use `jsonBodyParser` from `@oats-ts/openapi-express-server-adapter`, or leave it if you are ok with this small inconsistency.

## Implement getBook

Let's implement the last handler, which retrieves a single book by its Id. This takes the Id as a path parameter, called `bookId` of `number` type. We need to be prepared for semantically invalid input, when the supplied Id parameter is a valid number, but we don't have a book with this id, so below you'll see an example for this as well.

And in case the parameter is structurally incorrect (not a `number`, malformed, etc.), Oats takes care of this for you as well, wrapping the parameter in a `Try`. Since we would duplicate the previous code, where we convert `Issue`s of an `Failure` into application specific error objects (`AppError`s), I'm extracting this logic into it's own method, and we'll call it `failureToAppErrors`.

```typescript
export class BookStoreApiImpl implements BookStoreApi {
  // Convert Issues to AppErrors
  private failureToAppErrors(failure: Failure): AppError[] {
    return failure.issues.map(
      (issue): AppError => ({
        message: `${issue.severity} in ${issue.path}: ${issue.message}`,
      }),
    )
  }

  async getBook(request: GetBookServerRequest): Promise<GetBookResponse> {
    if (isSuccess(request.path)) {
      const { bookId } = request.path.data
      const book = this.books.find((b) => b.id === bookId)
      // Book doesn't exist, custom error
      if (book === undefined) {
        return {
          mimeType: 'application/json',
          statusCode: 400,
          body: [{ message: `book with id ${bookId} doesn't exist` }],
        }
      }
      return {
        mimeType: 'application/json',
        statusCode: 200,
        body: book,
      }
    }
    return {
      mimeType: 'application/json',
      statusCode: 400,
      body: this.failureToAppErrors(request.path),
    }
  }

  // Rest of the code
}
```

And you can test this as well now, by restarting the server (`CTRL+C` then `npm start`), and hitting `GET http://localhost:5000/books/<id>` with your API explorer tool! Initially we'll have a single book with Id `1`, try retrieving this, and also try nonexistent book Ids, let's say `10`!

## Revisit getBooks

Since the `getBooks` operation has 2 additional parameters that we ignored previously. It has an query parameter called `offset` and a header parameter called `x-limit`. This are there for pagination, and the reason why they are split between query and header is to showcase how to deal with multiple `Try`s (as both can have issues while the other can be correct). There is a utility for merging multiple `Try` objects called `zip` which returns a `Success` with a strictly typed tuple containing all the `data`, and a `Failure` with all the issues if either `Try` objects were a `Failure`.

So let's re-implement this handler, but with pagination.

```typescript
export class BookStoreApiImpl implements BookStoreApi {
  async getBooks(request: GetBooksServerRequest): Promise<GetBooksResponse> {
    // Zip query and headers into a single Try
    const queryAndHeaders = zip(request.query, request.headers)
    if (isSuccess(queryAndHeaders)) {
      // In case its a success we can extract the data
      const [query, headers] = queryAndHeaders.data
      // Start with offset (or if not provided 0)
      const start = query.offset ?? 0
      // Compute the last index using x-limit (or if not provided take it to the end)
      const end = (headers['x-limit'] ?? this.books.length - start) + start
      // Slice the piece we need and package it in a typed response
      const paginatedBooks = this.books.slice(start, end)
      return {
        statusCode: 200,
        mimeType: 'application/json',
        body: paginatedBooks,
        headers: {
          'x-length': paginatedBooks.length,
        },
      }
    }
    // There were issues with the input, so return the usual 400 response
    return {
      mimeType: 'application/json',
      statusCode: 400,
      body: this.failureToAppErrors(queryAndHeaders),
    }
  }
  // Rest of the code
}
```

And now you can try this on `GET http://localhost:5000/books` after restarting your server. Try it with different `offset` (query) and `x-limit` (header) parameters!

## The result

Here is the API example in one piece:

```typescript
import { Failure, isSuccess, zip } from '@oats-ts/openapi-runtime'
import { BookStoreApi } from './generated/api/BookStoreApi'
import { AddBookServerRequest } from './generated/requests/AddBookServerRequest'
import { GetBookServerRequest } from './generated/requests/GetBookServerRequest'
import { GetBooksServerRequest } from './generated/requests/GetBooksServerRequest'
import { AddBookResponse } from './generated/responses/AddBookResponse'
import { GetBookResponse } from './generated/responses/GetBookResponse'
import { GetBooksResponse } from './generated/responses/GetBooksResponse'
import { AppError } from './generated/types/AppError'
import { Book } from './generated/types/Book'

export class BookStoreApiImpl implements BookStoreApi {
  private readonly books: Book[] = [
    { id: 1, author: 'Balázs', price: 10, title: 'test book' },
  ]

  private failureToAppErrors(failure: Failure): AppError[] {
    return failure.issues.map(
      (issue): AppError => ({
        message: `${issue.severity} in ${issue.path}: ${issue.message}`,
      }),
    )
  }

  async getBooks(request: GetBooksServerRequest): Promise<GetBooksResponse> {
    const queryAndHeaders = zip(request.query, request.headers)
    if (isSuccess(queryAndHeaders)) {
      const [query, headers] = queryAndHeaders.data
      const start = query.offset ?? 0
      const end = (headers['x-limit'] ?? this.books.length - start) + start
      const paginatedBooks = this.books.slice(start, end)
      return {
        statusCode: 200,
        mimeType: 'application/json',
        body: paginatedBooks,
        headers: {
          'x-length': paginatedBooks.length,
        },
      }
    }
    return {
      mimeType: 'application/json',
      statusCode: 400,
      body: this.failureToAppErrors(queryAndHeaders),
    }
  }

  async addBook(request: AddBookServerRequest): Promise<AddBookResponse> {
    if (isSuccess(request.body)) {
      const newId = Math.max(...this.books.map((b) => b.id)) + 1
      const newBook: Book = { ...request.body.data, id: newId }
      this.books.push(newBook)
      return {
        statusCode: 201,
        mimeType: 'application/json',
        body: newBook,
      }
    }
    return {
      statusCode: 400,
      mimeType: 'application/json',
      body: this.failureToAppErrors(request.body),
    }
  }

  async getBook(request: GetBookServerRequest): Promise<GetBookResponse> {
    if (isSuccess(request.path)) {
      const { bookId } = request.path.data
      const book = this.books.find((b) => b.id === bookId)
      if (book === undefined) {
        return {
          mimeType: 'application/json',
          statusCode: 400,
          body: [{ message: `book with id ${bookId} doesn't exist` }],
        }
      }
      return {
        mimeType: 'application/json',
        statusCode: 200,
        body: book,
      }
    }
    return {
      mimeType: 'application/json',
      statusCode: 400,
      body: this.failureToAppErrors(request.path),
    }
  }
}
```
