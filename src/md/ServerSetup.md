# Express server setup

In this guide you'll learn how to set up generated Oats code with your existing express backend.

Before we write any business logic, let's create a functional server that exposes the appropriate endpoints, and we can test it locally. This involves the following steps:

## Create an API implementation

First we need to create an implementation of the previously described API Type. In this example we are going to use a class implementation, as it lends itself for our purpose. Start by creating a class, that implements `BookStoreApi`. A modern IDE (like VS Code) should be able to help you creating a stub for each method, and add the appropriate imports:

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

## Create an express app

Now that you have an API implementation that at least compiles (even though it lacks proper business logic at this point), you can put together the `express` server.

Oats generates functionality that interacts with express in the form of `Router` factory functions. These functions can either

- Produce a new express `Router` with the attached functionality,
- Or they can attach their functionality to an existing `IRouter`, that's always the first, optional value of the factory functions.

The "app" returned by the `express` function call is an `IRouter` as well, so in our simple example we are going to pick the second option, and attach the functionality to the app.

```typescript
// createBookStoreApp.ts
import express from 'express'
import { ExpressServerAdapter } from '@oats-ts/openapi-express-server-adapter'

import { BookStoreApiImpl } from './BookStoreApiImpl'
import { createBookStoreAppRouter } from './generated/routers/createBookStoreAppRouter'
import { createBookStoreContextRouter } from './generated/routers/createBookStoreContextRouter'

export function createBookStoreApp() {
  // Create an app, and add a body parser as usual
  const app = express()
  app.use(json())

  // Add router/middleware, that exposes an instance of your API implementation,
  // and an adapter connecting the generated code and the framework on response.locals.
  createBookStoreContextRouter(
    app,
    new BookStoreApiImpl(),
    new ExpressServerAdapter(),
  )

  // Add routers handling each operation. These routers will use the API implementation
  // With the appropriate parameters, and use it's return value to construct a response.
  createBookStoreAppRouter(app)

  // Return the app
  return app
}
```

## Create a runnable file

In order to be able to test this, lets create a file called `index.ts`, where you create and start an instance of your express app:

```typescript
// index.ts
import { createBookStoreApp } from './createBookStoreApp'

createBookStoreApp().listen(5000)
```

## Make running this easy

In production I'd recommend compiling this first. But for development we are just going to use `ts-node` (command line tool, that allows running typescript without compilation). Let's create a simple `"start"` script in `package.json`, that runs `ts-node` with our entry point, `index.ts`:

```json
// package.json
{
  "scripts": {
    "oats": "node ./oats.ts",
    "build": "tsc",
    "start": "ts-node ./src/index.ts"
  },
  "devDependencies": {
    "@oats-ts/openapi": "0.0.43",
    "ts-node": "10.9.1"
  }
}
```

## Let's test if this works!

Now we have an easy to run server that should handle the appropriate requests, so let's test if it works:

- Use `npm start` to start the server
- Make a request to one of the endpoints, eg.: `GET http://localhost:5000/books` (I'd recommend using [**Postman**](https://www.postman.com), [**Insomnia**](https://insomnia.rest) or any other HTTP tester tool, to make your job easier)
- You should get the standard express error response, with `500` as status, and the stack trace of our `throw new Error('Method not implemented.')` statement, originating from the appropraite method (in this case `getBooks`).
