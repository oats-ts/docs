# Express server setup

Before we write any business logic, let's create a functional server that has the appropriate endpoints, and we can test it locally.

## Create an API implementation

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

## Create an express app

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

## Create a runnable file

And in order to be able to test this, create a file called `index.ts`, where you create and start an instance of your app:

```typescript
// index.ts
import { createBookStoreApp } from './createBookStoreApp'

createBookStoreApp().listen(5000)
```

## Make running this easy

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
