# Error handling

In this example you'll learn the recommended approach to handle errors when using the generated SDK.

> As for all guides, this one is based on the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example.

Oats generated SDKs don't `throw` (or rather reject, as we are dealing with `Promise`s), unless the response is invalid according to the source OpenAPI document.

## Examples of rejections:

- The `statusCode` doesn't match any of the statuses defined in the source OpenAPI document (eg.: it defines `200`, `400` and `500` but the response has a `403` status code).
- The `mimeType` doesn't match any of the mime types defined for the given Operation and status code, defined in the source OpenAPI document (eg.: it defines `application/json` and `text/plain` but we get `application/xml`)
- Parsing of the response `body` fails
- The response `body` doesn't validate against the schema described in the OpenAPI document

In all of these cases the server doesn't respect the same OpenAPI document we are working against, this is considered an unexpected situation. Oats throws, as this is something that **NEEDS** a developers attention, as the SDK and the server "don't speak the same language".

## Examples of no rejection:

- The `statusCode`, the response `body` + its `mimeType`, and optionally the response `headers` together match a response option described in the source OpenAPI document.
- The `statusCode` is outside of the `2xx`, but the first condition is fulfilled (given status code is documented in the source OpenAPI document)

In this cases the response is documented, and so the responses will be properly parsed, validated, etc, as according to the source OpenAPI document they are to be expected, even if it's not in the `2xx` range. If the OpenAPI document the SDK was generated from lists `4xx` and `5xx` statuses as possibilites that can happen, then the client **SHOULD** be ready for these cases too, and handle them properly.

This gives you a flexible and consistent way of error handling, that doesn't hide anything, but rather transparently reflects the servers described behaviour. This is reflected in the [previous (usage) example](SdkUsage) as well.

An example displaying really detailed error handling:

```typescript
try {
  // Make a request
  const response = await sdk.getBook({ path: { bookId: 42 } })
  // Check each option for status code
  switch (response.statusCode) {
    case 200: {
      // The body is known to be of Book type, and you can safely access fields on it:
      console.log(response.body.title)
      break
    }
    case 400: {
      // The body is known to be of AppError[] type:
      console.error('400 Status code')
      response.body.forEach((err) => console.error(err.message))
      break
    }
    case 500: {
      // The body is also known to be of AppError[] type:
      console.error('500 Status code')
      response.body.forEach((err) => console.error(err.message))
      break
    }
  }
} catch (e) {
  console.error('The server did something unexpected:')
  // Thrown error will have detailed explanation about what was unexpected.
  // This can be wrong status code + mime type, response body or response
  // header format or structure.
  console.error(e)
}
```
