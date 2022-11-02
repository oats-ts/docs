# Welcome to the docs!

Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.

## How to get started?

- [**SDK Guide**](SdkGenerate) - If you are a frontend developer, or you want to generate a Typescript SDK based on an OpenAPI document
- [**Server guide**](ServerGenerate) - If you are a backend developer, you want to focus on moving data, and generate the tedious parts (routing, parameter parsing etc.)

## Motivation

**Why does this project exist?**

During my job as a Typescript dev, I'm continously running into the same problem: while the frontend (and usually the backend too) is strictly typed, the integration between them is unclear to everyone. Backend devs produce usually poorly written wiki pages about their services, that then nobody updates. In turn the frontend continously breaks, as there is no way to figure out at compile time, if its still in sync with the backend, and the only solution is extremely extensive testing.

Describing a service / Rest API in a language agnostic way (like OpenAPI), and building upon that is a good first step, but it still needs maintenance on both the backend and frontend side. Here comes the idea of generating the code thats used for the interaction between the 2 (or more) sides. The idea is not new, unfortunately I had many issues with the existing tooling.

If you want to use the official OpenAPI code generators, you need Java, a Java library that you either build yourself or download as a jar, then you run it and hope whatever comes out of it is usable (which for me it wasn't).

There are other open source alternatives, that fit in the Javascript/Typescript ecosystem well. However they are usually characterized by limited configuration, no clear path to extend them, without forking the project or redoing most of the work the devs have already done. They also often implemented the easy stuff (types from schemas, and basic client side SDK), however more involved things (like advanced types, references to other OpenAPI documents, different style parameter serialization, etc.) are left out, as the original developers didn't need these.

**This is why I started Oats.** I want to provide code generators, that produce well thought out, spec compliant code, for both the frontend and backend.

The goals in short were:

- Make it work for 1 language (Typescript), and do that well.
- Make every part of the public API replaceable (without forking the project) in case it doesn't suit your needs.
- Make it easy to customize, to suit a wide variety of use cases out of the box.
- Make the generated code as easy to read, as if a dev would have written it by hand (or get as close to this as possible).
