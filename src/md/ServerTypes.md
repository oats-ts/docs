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

TODOO
