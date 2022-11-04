# Implement CORS

In this guide you'll learn how to make your Oats and express based server CORS enabled.

## What is CORS?

CORS or cross site resource sharing is a mechanism used between HTTP servers and web browsers. When browser scripts make an HTTP request (using [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)) to a different origin, there are a few additional rules the server need to comply with in order to allow communication with the browser. If you want to learn more about CORS (which I would highly recommend) check out the [**official CORS docs**](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), but in this guide I summarized the most relevant parts.

## What is a different origin?

A different origin is defined as different domain or port.

- So if you open `https://foo.com` in the browser, and it's script makes a request to `https://bar.com`, or even `https://foo.com:5000` (same domain, protocol, etc but different port), it counts as a cross origin request.
- But from `https://foo.com` to `https://foo.com/api/something` or `https://foo.com/api/foo?foo=bar`, is the same origin, as only the path and query part of the URL are different.

This means if you are serving your frontend using the same express server (domain + port) as where you serve your API from, and you don't want to expose your API for other browser apps to be used, you are lucky, as you don't need to worry about the rest of this guide.

## What are the CORS mechanics?

There are two ways the browser may inspect, if the request a client side script made is "approved" by the server or not.

### 1. Simple requests

`GET`, `POST` or `HEAD` request, without any extra request headers are called simple requests. In this case the browser simply hits your endpoint, and expects the response to have certain `Access-Control-*` response headers confirming, that the origin, the request is coming from is allowed. If it doesn't, the request will error out, and your client side code will not have access to the response.

### 2. Pre-flight requests

In cases when you are using other request methods, or you want to send extra request headers, it is a pre-flighted request. In this case the client will first attempt a request to the same URL, but with the `OPTIONS` method, which is called a pre-flight request. In this request it communicates using certain `Access-Control-*` request headers, what method and optionally what request headers did you originally intend to use, from what origin. If the server sends back the appropriate response headers to this OPTIONS request, the client will then attempt to make the original request you intended to, otherwise it rejects your request, and your client side code will not have access to the response.

## How does Oats help?

Oats can generate express `Router`s that deal with CORS, customized to your exact OpenAPI based backend. To enable this, you need to modify your generator preset a bit, as CORS is off by default. The minimum amount of configuration you need to provide for functional CORS is the allowed origins, but you can customize the full suite of CORS headers:

```typescript
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
    children: oats.presets.server({
      cors: {
        getAllowedOrigins: (path, method, operation) => ['http://localhost:5000'],
        isMethodAllowed: (path, method, operation) => true,
        isRequestHeaderAllowed: (header, path, method, operation) => true,
        isResponseHeaderAllowed: (header, path, method, operation) => true,
        isCredentialsAllowed: (path, method, operation) => false,
        getMaxAge: (path, method, operation) => 10,
      },
    }),
  }),
  writer: oats.writers.typescript.file({
    format: oats.formatters.prettier({
      parser: 'typescript',
    }),
  }),
})
```

### Configuration

- `getAllowedOrigins` **`(mandatory)`** - Either return an array of allowed origins, eg.: `['https://foo.com']`, or return a `boolean` to either allow or disallow any origin.
- `isMethodAllowed` **`(optional)`** - Only called with `path`s and `method`s occuring in the OpenAPI document, and allows you to further restrict these. Return `true` to allow the given `path` and `method` combination (default) or `false` to disallow it.
- `isRequestHeaderAllowed` and `isResponseHeaderAllowed` **`(optional)`** - Only called with headers (request or response respectively) that occur in your OpenAPI document, and allows you to further restrict them. Return `true` to allow given header for given path and method (default) or `false` to disallow it.
- `isCredentialsAllowed` **`(optional)`** - Only called with `path`s and `method`s occuring in the OpenAPI document, and sets the `Access-Control-Allow-Credentials` header. This effectively gives cross-origin access to cookies set by CORS requests. Return `true` to allow this or `false` (default) to disallow
- `getMaxAge` **`(optional)`** - Sets how long pre-flight requests can be cached (in seconds). By default caching is not specified.

## Using the generated output

If you generate again with CORS enabled for the same document:

- You'll have a new CORS configuration object, `bookStoreCorsConfiguration.ts`
- Your express routers will now respond to simple CORS requests with the appropriate CORS headers using the above configuration
- A new CORS router has been generated, responsible for handling the pre-flight `OPTIONS` requests, you'll need to add this router to your app.

If you followed the server guides so far, then the only thing you have to change is the commented lines:

```typescript
// createBookStoreApp.ts
import express from 'express'
import { ExpressServerAdapter } from '@oats-ts/openapi-express-server-adapter'

import { BookStoreApiImpl } from './BookStoreApiImpl'
import { createBookStoreAppRouter } from './generated/routers/createBookStoreAppRouter'
import { createBookStoreContextRouter } from './generated/routers/createBookStoreContextRouter'
// This is new
import { createBookStoreCorsRouter } from './generated/routers/createBookStoreCorsRouter'

export function createBookStoreApp() {
  const app = express()
  app.use(json())

  createBookStoreContextRouter(app, new BookStoreApiImpl(), new ExpressServerAdapter())
  // This is new, make sure it's AFTER the Context router
  createBookStoreCorsRouter(app)
  createBookStoreAppRouter(app)

  return app
}
```

That's it your server should be CORS enabled based on your OpenAPI document, respecting your restrictions, and using your origins.
