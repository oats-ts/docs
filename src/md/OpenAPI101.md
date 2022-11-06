# OpenAPI 101

In this guide I'll share some DOs and DON'Ts, when constructing an OpenAPI document.

OpenAPI it is an extremely loosely defined spec, that in turn lets you define your API and your schemas in many different ways. In this article I'm listing the most common "mistakes" that you can make, that doesn't make your OpenAPI document invalid, but effectively prevents tooling from outputing usable documentation or code.

## Reuse schemas

It's more important for code generators (like Oats), than it is for documentation tools. Keeping your `"schemas"` flat, and avoiding nested schemas as possible helps you construct better, a more thought out "type system". It also allows generated code to be more like as it was written by hand.

### ✅ Would recommend

### ❌ Wouldn't recommend

This neatly ties into the next point...

## Use descriptive schema names

It helps everybody! Think of it as how you'd name your types in your preferred language! Keep casing consistent, and name them describing their purpose!

### ✅ Would recommend

### ❌ Wouldn't recommend

## Name your operations

OpenAPI [operations](https://spec.openapis.org/oas/v3.1.0#operation-object) have an optional `operationId` field. Use it! Think of it how you'd name a procedure or function! While in the spec it's optional, the Oats validator fails if you are missing your `operationId`s, as it's literally impossible to generate reasonably named code without this consistently.

### ✅ Would recommend

### ❌ Wouldn't recommend

## Describe your parameters

The OpenAPI [parameter](https://spec.openapis.org/oas/v3.1.0#parameter-object) spec is arguably not the most well defined part of the spec. You have many serialization options, that doesn't really contribute anything to the spec. You have path parameters that according to the spec can be omitted, but this leaves users clueless about the purpose and exact structure of given parameter. And you have cookie parameters among the request parameters, while it's a server produced concept, and should be on response instead.

Regardless, when you are putting together your spec, define your parameters with intention: `name`, `style` (serialization method), and `schema` is a must, and `description` can be very useful as well, when appropriate. Both the readers of your documentation, and the users of your generated code will thank you!

### ✅ Would recommend

### ❌ Wouldn't recommend
