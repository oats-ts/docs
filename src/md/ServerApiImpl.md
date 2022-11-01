# Implement the API (properly)

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
