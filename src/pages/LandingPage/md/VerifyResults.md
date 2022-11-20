# Verify results

In case the generators ran successfully, you will see something like this in the terminal:

```bash
✔ reader step completed using "@oats-ts/openapi-reader"
✔ validator step completed using "@oats-ts/openapi-validator"
✔ generator step completed using "@oats-ts/openapi-generators"
i some outputs have runtime dependencies:
  npm i \
    @oats-ts/openapi-express-server-adapter@0.0.43 \
    @oats-ts/openapi-fetch-client-adapter@0.0.43 \
    @oats-ts/openapi-runtime@0.0.43 \
    express@^4.18.1
✔ writer step completed using "@oats-ts/typescript-writer"
```

The `npm i` command lists the necessary dependencies, that the generated output needs, to function at runtime.

**Run this command, and you are ready to use the generated output!**

In case you see errors (and the descriptions don't help), check out the [OpenAPI 101](OpenAPI101) guide, describing the most common DOs and DON'Ts with OpenAPI documents! In case it doesn't help either, please open an [issue](https://github.com/oats-ts/oats-ts/issues), and describe the problem in detail!
