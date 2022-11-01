# Using generated server-side code

This guide will help you getting started with generating server side code using Oats, and using said code. For this guide the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) sample OpenAPI document will be used, but feel free to use your own.

## Generating the server side code

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
    children: oats.presets.server(),
  }),
  writer: oats.writers.typescript.file({
    format: oats.formatters.prettier({
      parser: 'typescript',
    }),
  }),
})
```

Now you sould have a `generated` folder in `src`, that contains a bunch of subfolders, and some generated code in them. The most important folder for us is `src/generated/api`, where you'll find a file called `BookStoreApi.ts`.

## The API type

This is how the `BookStoreApi` type looks like (imports and JSDoc comments ommited):

```typescript
export type BookStoreApi = {
  getBooks(request: GetBooksServerRequest): Promise<GetBooksServerResponse>
  addBook(request: AddBookServerRequest): Promise<AddBookServerResponse>
  getBook(request: GetBookServerRequest): Promise<GetBookServerResponse>
}
```

If you have checked out the [SDK guide](OpenAPI_GeneratedSdk), it may look familiar and that is no accident. In this case however, you have to provide an implementation for this API type, and Oats will take care of extracting the right data from the request, and serializing the data returned by your implementation into the response.

## Laying down the foundations

Before we write any business logic, let's create a functional server that has the appropriate endpoints, and we can test it locally.

### Step 1.: Create an API implementation

In this example we are going to use a class implementation, as it lends itself for our purpose. Start by creating a class, that implements `BookStoreApi`. A modern IDE (like VS Code) should be able to help you creating a stub for each method, and add the appropriate imports:

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

### Step 2.: Create an express app

Now that you have an API implementation that at least compiles, you can hook up the server using `express`. Let's create a file called `createBookStoreApp.ts`:

```typescript
// createBookStoreApp.ts
import express from 'express'
import { ExpressServerAdapter, jsonBodyParser } from '@oats-ts/openapi-express-server-adapter'

import { BookStoreApiImpl } from './BookStoreApiImpl'
import { createBookStoreAppRouter } from './generated/routers/createBookStoreAppRouter'
import { createBookStoreContextRouter } from './generated/routers/createBookStoreContextRouter'

export function createBookStoreApp() {
  // Create an app, and add a body parser as usual
  const app = express()
  app.use(json())

  // Add router/middleware, that exposes an instance of your API implementation,
  // and an adapter connecting the generated code and the framework on response.locals.
  createBookStoreContextRouter(app, new BookStoreApiImpl(), new ExpressServerAdapter())

  // Add routers handling each operation. These routers will use the API implementation
  // With the appropriate parameters, and use it's return value to construct a response.
  createBookStoreAppRouter(app)

  // Return the app
  return app
}
```

### Step 3.: Create a runnable file

And in order to be able to test this, create a file called `index.ts`, where you create and start an instance of your app:

```typescript
// index.ts
import { createBookStoreApp } from './createBookStoreApp'

createBookStoreApp().listen(5000)
```

### Step 4.: Make running this easy

In production I'd recommend compiling this first, but for now installing `ts-node`, and creating a simple `"start"` script in `package.json` will do:

```json
// package.json
{
  "scripts": {
    "oats": "node ./oats.ts",
    "start": "ts-node ./src/index.ts"
  },
  "devDependencies": {
    "@oats-ts/openapi": "0.0.43",
    "ts-node": "10.9.1"
  }
}
```

## Test if this works

Now we have an easy to run server that should handle the appropriate requests, so let's test if it works:

- Use `npm start` to start the server
- Make a request to one of the endpoints, eg.: `GET http://localhost:5000/books` (I'd recommend using [Postman](https://www.postman.com), [Insomnia](https://insomnia.rest) or any other HTTP tester tool, to make your job easier)
- You should get the standard express error response, with `500` as status, and the stack trace of our `throw new Error('Method not implemented.')` statement, originating from the appropraite method (in this case `getBooks`).

## Let's add some business logic!

Let's go back to `BookStoreApiImpl` and implement some simple logic. In this guide I'm going to store data in memory, but since all API methods return `Promise`s, you can use whatever data storage you choose.

- First I'm adding an array with `Book` typed items, this is going to be our data storage (replace it with a database, another HTTP service, or whatever else you want)
- I'm adding a hardcoded dummy item to this array, so it's not empty
- Finally I'm implementing the `getBooks` method

```typescript
export class BookStoreApiImpl implements BookStoreApi {
  private readonly books: Book[] = [{ id: 1, author: 'Balázs', price: 10, title: 'test book' }]

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
  async addBook(request: AddBookServerRequest): Promise<AddBookResponse> {
    throw new Error('Method not implemented.')
  }
  async getBook(request: GetBookServerRequest): Promise<GetBookResponse> {
    throw new Error('Method not implemented.')
  }
}
```

If you do this along with the guide, you'll see that you have content assist and type checking for the response. The `statusCode` field is only allowed to be `200`, `400` and `500` (just as our source OpenAPI document defines this). The `body` and `headers` fields also only allow properly typed data.
