## SDK Usage

TODO : The SDK implementation implements the above type as a `class` implementation. To actually start using it, you need to instantiate this class, with an input parameter called `adapter` of type `ClientAdapter`. This adapter is responsible for bridiging the generated code with a request library. Oats comes with a single client adapter based on the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API. So instantiation looks something like this:

```typescript
import { FetchClientAdapter } from '@oats-ts/openapi-fetch-client-adapter'
import { BookStoreSdkImpl } from './generated/sdk/BookStoreSdkImpl'

// Instantiate adapter with a base URL, where your spec compliant server is running
const adapter = new FetchClientAdapter({ url: 'http://localhost:3000' })
// Instantiate the SDK with the adapter
const sdk = new BookStoreSdkImpl(adapter)

// Use the SDK
const booksResponse = await sdk.getBooks({ query: { offset: 0 } })
```
