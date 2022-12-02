# Publish your SDK

This guide will walk show how you can create an SDK (client side code that can talk to your backend) using Oats, and publish it as an npm package.

> As for all guides, this one is based on the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example.

## Project setup

First let's set up a folder and make it an `npm` project.

- Create a folder, let's call it `book-store-sdk`
- Run `npm init`, to make it an npm package
- In `package.json` ensure that you have the following dependencies:

> I recommend using the latest version of oats, so if this guide goes out of date, please install what's the latest!

```json
// package.json

{
  "name": "book-store-sdk",
  "version": "1.0.0",
  "scripts": {
    "oats": "node ./oats.js"
  },
  "dependencies": {
    "@oats-ts/openapi-fetch-client-adapter": "0.0.47",
    "@oats-ts/openapi-runtime": "0.0.47"
  },
  "devDependencies": {
    "@oats-ts/openapi": "0.0.47",
    "typescript": "4.9.3"
  }
}
```

## Generating

Let's create a file called `oats.js` with the following content:

```ts
// oats.js

const oats = require('@oats-ts/openapi')

oats.generate({
  plugins: [oats.loggers.simple()],
  reader: oats.readers.mixed.mixed(
    'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',
  ),
  validator: oats.validator(),
  generator: oats.generator({
    nameProvider: oats.nameProviders.default(),
    // Generated output will be grouped by concern, eg.: types, parameter types, etc
    pathProvider: oats.pathProviders.byTarget('src/sdk'),
    // We only need client side (SDK) code for this
    children: oats.presets.client(),
  }),
  writer: oats.writers.typescript.file({
    format: oats.formatters.prettier({
      parser: 'typescript',
    }),
  }),
})
```

And let's run it:

```bash
npm run oats

# Or if you don't have a script in package.json:

node ./oats.js
```

## Export your SDK

Since we want to expose this as an `npm` package, you can simplify usage for your users. They don't really need to be concerned with all the options Oats provides.

They also don't need to know implementation details so we can neatly hide that as well.

Let's create a file called `src/index.ts` with the following content:

```ts
// src/index.ts

import { FetchClientAdapter } from '@oats-ts/openapi-fetch-client-adapter'
import { BookStoreSdkImpl } from './sdk/sdkImpl'
import { BookStoreSdk } from './sdk/sdkType'

export function bookStoreSdk(): BookStoreSdk {
  return new BookStoreSdkImpl(
    // Your APIs URL goes here
    new FetchClientAdapter({ url: 'https://yourapi.com' }),
  )
}
```

In case your API needs authentication, you can do this through a custom `FetchClientAdapter`, so your user has to specify credentials only once:

```ts
// src/index.ts

import { FetchClientAdapter } from '@oats-ts/openapi-fetch-client-adapter'
import { Try, RawHttpHeaders } from '@oats-ts/openapi-runtime'
import { BookStoreSdkImpl } from './sdk/sdkImpl'
import { BookStoreSdk } from './sdk/sdkType'

class AuthenticatingFetchClientAdapter extends FetchClientAdapter {
  // Store the token in a field
  public token: string = ''

  public getAuxiliaryRequestHeaders(): RawHttpHeaders {
    return {
      // Your custom request header sending this token with each request
      Authorization: `Bearer ${this.token}`,
    }
  }
}

export function bookStoreSdk(token: string): BookStoreSdk {
  const adapter = new AuthenticatingFetchClientAdapter({
    // Your APIs url goes here
    url: 'https://yourapi.com',
  })
  adapter.token = token
  return new BookStoreSdkImpl(adapter)
}
```

## Export typings

Add the appropriate exports in `index.ts`, so we only expose static typings as well, that your users most likely need/want:

```ts
// src/index.ts

export function bookStoreSdk(): BookStoreSdk {
  //...
}

export * from './sdk/types'
export * from './sdk/queryTypes'
export * from './sdk/pathTypes'
export * from './sdk/requestHeaderTypes'
export * from './sdk/responseHeaderTypes'
export * from './sdk/requestTypes'
export * from './sdk/responseTypes'
export * from './sdk/sdkType'
```

## Add build

In this guide I'm going to assume that you want to expose this package as a traditional CommonJS package with typescript definitions, but obviously you can build for whatever target you want.

First, add a `tsconfig.json` file with the following content (customize to your needs):

```json
// tsconfig.json

{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2022",
    "strict": true,
    "esModuleInterop": true,
    "declaration": true,
    "outDir": "./lib",
    "lib": ["ES2022", "DOM"]
  },
  "exclude": ["node_modules"],
  "include": ["./src"]
}
```

Then add a `build` script in `package.json`, that runs the `tsc` command and also deletes the previous build output:

```json
// package.json

{
  "scripts": {
    // ...
    "build": "rm -rf lib && tsc"
  }
}
```

And finally run the build script to see the fruits of your labour (you should see a `lib` folder with the build output):

```bash
npm run build
```

## Configure for publishing

In order to publish this as an `npm` package, we need a few changes in `package.json`:

```json
// package.json

{
  // We need the entry point when someone require-s your package
  "main": "lib/index.js",
  // We need the entry point to typings for typescript
  "typings": "lib/index.d.ts",
  // We need to define what exactly do we want to publish (only the built js and definition files)
  "files": ["lib"]

  // ... rest of package.json
}
```

## Publishing

The last step is publishing your package. You can do this by:

- `npm login` - (logging in with CLI to your npm account)
- (optional) `npm version <major | minor | patch>` - Bump your version if it's not your first publish
- `npm publish` - Publish your package

> Please don't publish this example! Please only publish stuff, that actually makes sense to be on `npm`!

## What will your clients see?

Your clients will see a single function, `bookStoreSdk` exposed along with all the static typings that have been generated, so usage will be something like this:

```ts
import { bookStoreSdk, Book } from 'book-store-sdk'

async function getBooks(): Promise<Book[]> {
  const sdk = bookStoreSdk('my-token')
  const response = await sdk.getBooks()
  if (response.statusCode !== 200) {
    throw new Error(
      `${response.statusCode} - issues: ${response.body
        .map((err) => err.message)
        .join('\n')}`,
    )
  }
  return response.body
}
```
