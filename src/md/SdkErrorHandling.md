# Error handling

Oats generated SDKs don't `throw` (or rather reject, as we are dealing with `Promise`s), unless the response is invalid according to the source OpenAPI document. Examples of rejections:

- The `statusCode` doesn't match any of the statuses defined in the source OpenAPI document (eg.: it defines `200`, `400` and `500` but the response has a `403` status code).
- The `mimeType` doesn't match any of the mime types defined for the given Operation and status code, defined in the source OpenAPI document (eg.: it defines `application/json` and `text/plain` but we get `application/xml`)
- The response `body` doesn't validate against the schema described in the OpenAPI document

In all of these cases the server doesn't respect the same OpenAPI document we are working against, this is considered an unexpected situation, hence Oats throws.

However, documented non `2xx` responses will not reject, the responses will be properly parsed, validated, etc, as according to the source OpenAPI document they are to be expected.

This gives you a flexible and easy to use way of error handling, that doesn't hide anything, but rather transparently reflects the servers described behaviour.

A practical example:

```typescript
const resp = await sdk.getBook({ path: { bookId: 42 } })
// In case the statusCode is 200 (and you use a type guard like so)
if (resp.statusCode === 200) {
  // The body is known to be of Book type, and you can safely access fields on it:
  console.log(resp.body.title)
} else {
  // Otherwise status is 400 or 500, for both of which the body is an array of AppErrors:
  resp.body.forEach((err) => console.error(err.message))
}
```
