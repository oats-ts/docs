# SDK usage

To start using the SDK, you will need an implementation of the previously described SDK type. Oats generates an SDK implementation class (`BookStoreSdkImpl` in our case), that you can find next to the SDK type (in `src/generated/sdk`).

To instantiate this class, we'll need an input parameter called `adapter` of type `ClientAdapter`. This adapter is responsible for bridiging the generated code with a request library. Oats ships with a single client adapter based on the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API, but you can roll your own, by either extending the default `FetchClientAdapter`, or simply implementing the `ClientAdapter` type.

```typescript
import { FetchClientAdapter } from '@oats-ts/openapi-fetch-client-adapter'
import { BookStoreSdkImpl } from './generated/sdk/BookStoreSdkImpl'

// Instantiate adapter with a base URL, where your spec compliant server is running
const adapter = new FetchClientAdapter({ url: 'http://localhost:3000' })
// Instantiate the SDK with the adapter
const sdk = new BookStoreSdkImpl(adapter)
```

Once you have your SDK instance, you can use it plain and simple, as you would expect. Below are a few simple examples of using the different operations on the generated SDK.

### addBook

This operation uses a request body, with JSON mime type.

```typescript
// Create a new Book
const response = await sdk.addBook({
  mimeType: 'application/json',
  body: { id: -1, author: 'Balázs', title: 'Test book', price: 10 },
})
// If the statusCode is 201, we know the request was a success
if (response.statusCode === 201) {
  // We (and the compiler) also know the body will be of Book type
  const book = response.body
  console.log('You created this book', book)
} else {
  // We (and the compiler) know the body is of AppError[] type
  // Error types are also user defined like all other types
  response.body.forEach((err) => console.log(err.message))
}
```

### getBook

This operation uses a path parameter.

```typescript
const response = await sdk.getBook({ path: { bookId: 1 } })
if (response.statusCode === 200) {
  const book = response.body
  console.log('This is your book', book)
} else {
  response.body.forEach((err) => console.log(err.message))
}
```

### getBooks

This operation uses a mix of query and header parameters.

```typescript
const response = await sdk.getBooks({
  query: { offset: 1 },
  headers: { 'x-limit': 3 },
})
if (response.statusCode === 200) {
  const books = response.body
  books.forEach((book) => console.log(book))
} else {
  response.body.forEach((err) => console.log(err.message))
}
```
