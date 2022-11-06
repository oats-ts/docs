# OpenAPI 101

In this guide I'll share some DOs and DON'Ts, when constructing an OpenAPI document.

OpenAPI it is an extremely loosely defined spec, that in turn lets you define your API and your schemas in many different ways. In this article I'm listing the most common "mistakes" that you can make, that doesn't make your OpenAPI document invalid, but effectively prevents tooling from outputing usable documentation or code.

## Reuse schemas

It's more important for code generators (like Oats), than it is for documentation tools. Keeping your `"schemas"` flat, and avoiding nested schemas as possible helps you construct better, a more thought out "type system". It also allows generated code to be more like as it was written by hand.

### ✅ Would recommend

```json
{
  "components": {
    "schemas": {
      "Book": {
        "type": "object",
        "required": ["title"],
        "properties": {
          "title": { "type": "string" }
        }
      },
      "Person": {
        "type": "object",
        "required": ["likes"],
        "properties": {
          // We are reusing the previous Book schema
          "likes": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Book"
            }
          }
        }
      }
    }
  }
  //...
}
```

### ❌ Wouldn't recommend

```json
{
  "components": {
    "schemas": {
      "Book": {
        "type": "object",
        "required": ["title"],
        "properties": {
          "title": { "type": "string" }
        }
      },
      "Person": {
        "type": "object",
        "required": ["likes"],
        "properties": {
          // We are not reusing the previous schema.
          "likes": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["title"],
              "properties": {
                "title": { "type": "string" }
              }
            }
          }
        }
      }
    }
  }
}
```

This neatly ties into the next point...

## Use descriptive schema / field names

It helps everybody! Think of it as how you'd name your types in your preferred language! Keep casing consistent, and name them describing their purpose!

### ✅ Would recommend

```json
{
  "components": {
    "schemas": {
      // Consistent, short descriptive names
      "Book": {
        "type": "object",
        "required": ["title"],
        "properties": {
          // Same for fields
          "title": { "type": "string" }
        }
      }
    }
  }
  //...
}
```

### ❌ Wouldn't recommend

```json
{
  "components": {
    "schemas": {
      // Inconsistent casing
      "__Book_2": {
        "type": "object",
        "required": ["a0fef8b4_title"],
        "properties": {
          // Random stuff in field names
          "a0fef8b4_title": { "type": "string" }
        }
      }
    }
  }
  //...
}
```

## Name your operations

OpenAPI [operations](https://spec.openapis.org/oas/v3.1.0#operation-object) have an optional `operationId` field. Use it! Think of it how you'd name a procedure or function! While in the spec it's optional, the Oats validator fails if you are missing your `operationId`s, as it's literally impossible to generate reasonably named code without this consistently.

### ✅ Would recommend

```json
{
  "paths": {
    "/books": {
      "get": {
        // Proper name and description for everyone
        "operationId": "getBooks"
        // ...
      },
      "post": {
        "operationId": "addBook"
        // ...
      }
    }
  }
}
```

### ❌ Wouldn't recommend

Omitting the `operationId` field.

## Describe your parameters

The OpenAPI [parameter](https://spec.openapis.org/oas/v3.1.0#parameter-object) spec is arguably not the most well defined part of the spec. There are many serialization styles, that doesn't contribute anything to the spec. Path parameters can be omitted according to the spec, but this leaves users clueless about the purpose and exact structure of given parameter. And you have cookie parameters among the request parameters, while it's a server produced concept.

Regardless, when you are putting together your spec, define your parameters with intention: `name` and `schema` is a must, and `description` and `style` (serialization method) can be very useful as well, when appropriate. Both the readers of your documentation, and the users of your generated code will thank you!

### ✅ Would recommend

```json
{
  "paths": {
    "/books/{bookId}": {
      "get": {
        "operationId": "getBook",
        "description": "Returns the book associated with the given bookId",
        "parameters": [
          {
            "in": "path",
            "name": "bookId",
            "description": "The id of the book",
            "required": true,
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "someQueryParam",
            "style": "form",
            "in": "query",
            "required": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "x-some-header-param",
            "style": "simple",
            "in": "header",
            "required": false,
            "schema": {
              "type": "boolean"
            }
          }
        ]
      }
    }
  }
}
```

### ❌ Wouldn't recommend

```json
{
  "paths": {
    "/books/{bookId}": {
      "get": {
        "operationId": "getBook",
        "description": "Returns the book associated with the given bookId",
        "parameters": [
          {
            "name": "someQueryParam",
            "in": "query",
            "required": false
          },
          {
            "name": "x-some-header-param",
            "style": "simple",
            "in": "header",
            "required": false
          }
        ]
      }
    }
  }
}
```
