# Welcome to the docs!

Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.

## How to get started?

- [**SDK Guide**](SdkGettingStarted) - If you are a frontend developer, or you want to generate a Typescript SDK based on an OpenAPI document
- [**Server guide**](ServerGettingStarted) - If you are a backend developer, you want to focus on moving data, and generate the tedious parts (routing, parameter parsing etc.)

## Motivation

**Why does this project exist?**

During my job as a Typescript dev, I'm continously running into the same problem: while the frontend (and usually the backend too) is strictly typed, the integration between them is unclear to everyone. We are usually working based on poorly written wiki pages about the services we need to interact with, that nobody updates. In turn the frontend continously breaks, as there is no way to figure out at compile time (or sometimes even at runtime at a first glance), if we are still in sync with the backend, and the only solution is extremely extensive testing (which is usually cut short because of time constraints).

Describing a service / Rest API in a language agnostic way (like OpenAPI), and building upon that is a good first step, but it still needs maintenance on both the backend and frontend side. Here comes the idea of generating the code thats used for the exchange between the two (or more) sides. The idea is not new, unfortunately I had many issues with the existing tooling:

If you want to use the official OpenAPI code generators, you need Java, a Java library that you either build yourself or download as a jar, then you run it, and hope whatever comes out of it is usable (which for me it wasn't).

There are other open source alternatives, that fit in the Javascript/Typescript ecosystem well. However they are usually characterized by limited configuration, no clear path to extend them, without forking the project or redoing most of the work the devs have already done. They also often implemented the easy stuff (types from schemas, and basic client side SDK), however more involved things (parameter serialization, well thought out error handling, reference resolution, etc.) are left out, as the developers didn't need them.

**This is why I started Oats.** I wanted to create modular code generators, that produce well thought out code, for both the frontend and backend, that you can modify and extend if you need to. Interacting with APIs doesn't have to suck.

The goals in short were:

- Make it work for one language (Typescript), and do that well.
- Make every part of the public API replaceable (without forking the project).
- Make it easy to customize, to suit a wide variety of use cases out of the box.
- Make the generated code as easy to read, as if a dev would have written it by hand (or get as close to this as possible).
