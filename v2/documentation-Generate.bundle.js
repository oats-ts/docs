"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[624],{35625:(e,t,o)=>{o.r(t),o.d(t,{default:()=>n});const n="# Generate\n\nThe generator step is responsible for taking the validated output of the [reader](OpenAPI-Reader), and turning it into an intermediate representation (Typescript [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) in this case), that can be then turned into source code. The OpenAPI generator itself doesn't do much, the work is distributed to single responsiblity generators, that are responsible for generating one thing (like types from the JSON schemas, or serializers for parameters). They also provide means for other generators to access references to their generated content.\n\nThe generators that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), but it originates from the [@oats-ts/openapi-generators](https://www.npmjs.com/package/@oats-ts/openapi-generators) package.\n\n## Examples\n\n### Using individual generators\n\nYou can configure your generator from a set of code generators of your choosing. For this approach, it's the easiest to use `generators.create` from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi) package. You can use the generator names (see below) as the first argument, and optionally the approriate configuration object as the second argument (autocomplete will help with this).\n\n```ts\nimport { generator, nameProviders, pathProviders, generators } from '@oats-ts/openapi'\n\nconst withGenerators = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: [\n    generators.create('oats/type', { documentation: false }),\n    generators.create('oats/type-guard'),\n    generators.create('oats/type-validator'),\n  ],\n})\n```\n\n### Using presets\n\nYou can also use presets (I'd recommend starting with presets). Presets are a set of generators grouped toghether. The ones available currently are `presets.client()`, `presets.server()` and `presets.fullStack()`. The simplest way is to use the preset without any configuration:\n\n```ts\nimport { generator, nameProviders, pathProviders, presets } from '@oats-ts/openapi'\n\nconst withDefaults = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client(),\n})\n```\n\nPresets offer configuration options, that affect possibly multiple individual generators. In this case we are disabling the documentation for all the generators that support this option:\n\n```ts\nconst withOverrides = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client({\n    documentation: false,\n    validateResponses: false,\n  }),\n})\n```\n\nIn case you want to really fine tune presets, you can override the configuration for individual generators as well. In this case we are only generating documentation for types:\n\n```ts\nconst withOverrides = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets.client({ documentation: false }).override({ 'oats/type': { documentation: true } }),\n})\n```\n\n### Mixing presets and generators\n\nPresets and individual generators can be used together:\n\n```ts\nconst withPresetsAndGenerators = generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: [presets.client(), generators.create('oats/express-cors-router-factory')],\n})\n```\n\n## Configuration\n\nThe main `generator` function can be configured with an object having the following properties:\n\n- `nameProvider: (input: any, originalName: string | undefined, target: string) => string` - A function that determines how each generated artifact is called. For reasonable, convention respecting names use `nameProviders.default()`\n  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).\n  - `originalName` optionally appears for pieces of the OpenAPI document, where the name is not part of the object itself (eg.: Schema object).\n  - `target` is one of the names listed below.\n- `pathProvider: (input: any, name: NameProvider, target: string) => string` - A function that determines where in the disk each artifact is written to (`SourceFile#fileName`). Check `pathProviders.*` for options.\n  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).\n  - `name` is a simplified function that takes the `input` and the `target` and delegates to the `nameProvider`.\n  - `target` is one of the names listed below.\n- `children: OpenAPIGenerator | OpenAPIGenerator[]` - A single generator or a list of generators. See available ones below.\n- `noEmit?: boolean = false` - When `true`, the generators return no output `SourceFile`s.\n- `name?: string = 'root'` - The name of the root generator, shows up in logs.\n\n## Available generators\n\nThere are a number of code generators available. These are part of certain presets, but can also be used individually, using `generators.create`. In case you want to see them in action, check the [demo](#/demo) page!\n\n| **Name**                             | **Preset**                | **Uses**                                                                                                                   | **Creates**                                                                                                                                                                 |\n| ------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| oats/type-guard                      | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | [Type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) based on JSON schemas                                              |\n| oats/type-guard                      | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on JSON schemas                                                                            |\n| oats/type                            | client, server, fullStack | [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)                     | Typescript types based on JSON schemas                                                                                                                                      |\n| oats/api-type                        | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Type encapsulating server behaviour                                                                                                                                         |\n| oats/express-cors-router-factory     | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) handling CORS headers.                                 |\n| oats/express-router-factory          | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) encapsulating the app.                                 |\n| oats/express-app-router-factory      | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) for each operations.                                   |\n| oats/express-router-factories-type   | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Object type, with all [Express](https://expressjs.com) [Routers](https://expressjs.com/en/guide/routing.html)                                                               |\n| oats/express-context-handler-factory | server                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Factory function, creating an [Express](https://expressjs.com) handler for exposing OATS configuration for all routers                                                      |\n| oats/operation                       | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of making an HTTP requests, based on operations                                                                                                          |\n| oats/path-deserializer               | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                       |\n| oats/path-serializer                 | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                         |\n| oats/path-type                       | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [path parameters](https://swagger.io/docs/specification/serialization/#path) for operations                                                                |\n| oats/query-deserializer              | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                     |\n| oats/query-serializer                | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                       |\n| oats/query-type                      | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [query parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                              |\n| oats/cookie-deserializer             | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing client side Cookie headers for [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations    |\n| oats/cookie-serializer               | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing client side Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations       |\n| oats/set-cookie-deserializer         | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations |\n| oats/set-cookie-serializer           | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations   |\n| oats/cookies-type                    | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie) for operations                                                            |\n| oats/request-body-validator          | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on request bodies of operations                                                            |\n| oats/request-headers-deserializer    | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                           |\n| oats/request-headers-serializer      | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                             |\n| oats/request-headers-type            | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting request [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                     |\n| oats/request-server-type             | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all inputs for operations (server variant, inputs wrappedn in [Try](https://www.npmjs.com/package/@oats-ts/try)s)                                          |\n| oats/request-type                    | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all inputs for operations                                                                                                                                  |\n| oats/response-body-validator         | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on response bodies of operations                                                           |\n| oats/response-headers-deserializer   | client                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of deserializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                          |\n| oats/response-headers-serializer     | server                    | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Functions, capable of serializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                            |\n| oats/response-headers-type           | client, server, fullStack | Status code + [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject) | Types collecting response [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                    |\n| oats/response-type                   | client, server, fullStack | [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject)               | Types collecting all outputs for operations                                                                                                                                 |\n| oats/sdk-impl                        | client                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Implementation of `oats/sdk-impl` utilizing `oats/operation`                                                                                                                |\n| oats/sdk-type                        | client                    | [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject)                       | Type collecting all operations a client might call                                                                                                                          |\n\n## Extending generators\n\nIn case you want to dig deeper, and extend certain generators, check out the [source](https://github.com/oats-ts/oats-ts/tree/master/projects/openapi-generators).\n"},11761:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdown=void 0,t.markdown={CommonMistakes:"CommonMistakes",CustomGenerators:"CustomGenerators",Generate:"Generate",GettingStarted:"GettingStarted",Home:"Home",Read:"Read",SdkErrorHandling:"SdkErrorHandling",SdkGettingStarted:"SdkGettingStarted",SdkTypes:"SdkTypes",SdkUsage:"SdkUsage",ServerApiImpl:"ServerApiImpl",ServerCors:"ServerCors",ServerGettingStarted:"ServerGettingStarted",ServerSetup:"ServerSetup",ServerTypes:"ServerTypes",Validate:"Validate",Welcome:"Welcome",Workflow:"Workflow",Write:"Write"}},42946:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const n=o(96486),a=o(11761),r=[{items:[{md:"Welcome",name:"Welcome"}]},{name:"Server Guide",items:[{md:"ServerGettingStarted",name:"Getting started"},{md:"ServerTypes",name:"Server related types"},{md:"ServerSetup",name:"Express server setup"},{md:"ServerApiImpl",name:"API Example"},{md:"ServerCors",name:"Add CORS"}]},{name:"(Client) SDK Guide",items:[{md:"SdkGettingStarted",name:"Getting started"},{md:"SdkTypes",name:"SDK related types"},{md:"SdkUsage",name:"SDK usage"},{md:"SdkErrorHandling",name:"Error handling"}]},{name:"Other Guides",items:[{md:"CommonMistakes",name:"Common mistakes"}]},{name:"Generator api",items:[{md:"Read",name:"Reader"},{md:"Validate",name:"Validator"},{md:"Generate",name:"Generators"},{md:"CustomGenerators",name:"Custom generators"},{md:"Write",name:"Writer"}]}];!function(){const e=(0,n.flatMap)(r,(e=>e.items)).map((({md:e})=>e));(0,n.keys)(a.markdown).filter((t=>!e.includes(t))).map((e=>({md:e,name:e})))}(),t.sections=[...r],t.docs=(0,n.flatMap)(t.sections,(e=>e.items))},39226:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var a=Object.getOwnPropertyDescriptor(t,o);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,a)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const i=r(o(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:o})=>{const[n,a]=(0,i.useState)((()=>window.matchMedia(t.breakpoints[o]).matches));return(0,i.useEffect)((()=>{window.matchMedia(t.breakpoints[o]).addEventListener("change",(e=>a(e.matches)))}),[]),n?i.default.createElement(e,null):null}},41298:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const a=o(18592),r=n(o(67294)),i=o(61329),s=a.css`
  font-size: ${i.theme.fontSize.code};
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};
  padding: ${i.theme.spacing.xxxs} ${i.theme.spacing.xxs};
  border-radius: ${i.theme.spacing.xs};
`;t.Code=({className:e,children:t,...o})=>r.default.createElement("code",{className:(0,a.cx)(s,e),...o},t)},40782:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const a=o(18592),r=o(26729),i=n(o(67294)),s=o(72050),c=o(61329),l=a.css`
  label: doc-container;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  margin: ${c.theme.spacing.zero};
  padding: ${c.theme.spacing.zero};
  background-color: ${c.theme.colors.dark3};
`;t.DocContainer=({children:e})=>i.default.createElement(i.default.Fragment,null,i.default.createElement(r.Global,{styles:s.globalStyles}),i.default.createElement("div",{className:l},e))},12259:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HomeTreeRoot=void 0;const a=n(o(67294)),r=o(69274),i=o(81911),s=o(5838);t.HomeTreeRoot=()=>{const{setMenuOpen:e}=(0,i.useMobileContext)();return a.default.createElement(s.TreeNode,{value:void 0,level:0,getIcon:()=>r.HiHome,getLabel:()=>"Home",isActive:()=>!1,onClick:()=>e(!1),getHref:()=>"/"})}},86299:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const a=n(o(67294)),r=o(18592),i=o(61329),s=o(96486),c=r.css`
  label: link;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  gap: ${i.theme.spacing.s};
  align-items: center;
  transition: color 150ms linear;
  text-decoration: underline;
  color: ${i.theme.colors.muted};

  &:hover {
    text-decoration: none;
    color: ${i.theme.colors.text};
  }
`;t.Link=({children:e,className:t,onClick:o,...n})=>(0,s.isNil)(o)?a.default.createElement("a",{className:(0,r.cx)(c,t),...n},e):a.default.createElement("span",{className:(0,r.cx)(c,t),onClick:o,...n},e)},15435:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const a=o(18592),r=o(67535),i=o(96486),s=n(o(67294)),c=o(61329),l=o(79129),d=a.css`
  label: side-bar-logo;
  display: flex;
  gap: ${c.theme.spacing.m};
  align-items: center;
  text-decoration: none;
`,m=a.css`
  display: flex;
  flex-direction: column;
`,p=a.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: ${c.theme.spacing.zero};
  padding: ${c.theme.spacing.zero};
  font-size: ${c.theme.fontSize.l};
  color: ${c.theme.colors.text};
`,u=a.css`
  color: ${c.theme.colors.muted};
`,h=a.css`
  font-size: ${c.theme.fontSize.s};
  color: ${c.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:o})=>s.default.createElement("a",{className:d,href:o},s.default.createElement(l.SvgLogo,{width:60}),s.default.createElement("div",{className:m},s.default.createElement("h1",{className:p},"Oats ",(0,i.isNil)(e)?null:s.default.createElement("span",{className:u},e)),t&&s.default.createElement("span",{className:h},"v",r.version)))},39550:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const a=o(18592),r=n(o(67294)),i=o(39226),s=o(61329),c=a.css`
  margin: ${s.theme.spacing.m} ${s.theme.spacing.m} ${s.theme.spacing.xxxl} ${s.theme.spacing.m};
  @media ${i.breakpoints.phone} {
    margin: ${s.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>r.default.createElement("div",{className:c},e)},76197:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var a=Object.getOwnPropertyDescriptor(t,o);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,a)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const s=o(18592),c=i(o(67294)),l=r(o(23209)),d=i(o(34112)),m=o(11761),p=o(9572),u=o(61329),h=o(41298),f=o(86299),g=o(7807),b=o(89937),v=s.css`
  color: ${u.theme.colors.text};
  font-size: ${u.theme.fontSize.l};
  margin-top: ${u.theme.spacing.zero};
`,O=s.css`
  color: ${u.theme.colors.text};
  font-size: ${u.theme.fontSize.xm};
`,y=s.css`
  color: ${u.theme.colors.text};
  font-size: ${u.theme.fontSize.m};
`,x=s.css`
  margin: ${u.theme.spacing.l};
`,_=Object.keys(m.markdown),k=e=>_.some((t=>e.startsWith(t)))?p.links.doc(e):(0,l.uriTransformer)(e),w=[d.default],S={h1:({children:e})=>c.default.createElement("h1",{className:v},e),h2:({children:e})=>c.default.createElement("h2",{className:O},e),h3:({children:e})=>c.default.createElement("h3",{className:y},e),table:({children:e})=>c.default.createElement(b.Table,null,e),tr:({children:e,isHeader:t})=>c.default.createElement(b.Tr,{isHeader:t},e),th:({children:e})=>c.default.createElement(b.Th,null,e),td:({children:e})=>c.default.createElement(b.Td,null,e),a:({href:e,children:t})=>c.default.createElement(f.Link,{href:e},t),code({node:e,inline:t,className:o,children:n,...a}){const r=/language-(\w+)/.exec(o||"");return null===r||t?c.default.createElement(h.Code,{...a},n):c.default.createElement(g.SyntaxHighlighter,{language:r[1],kind:"docs"},String(n).replace(/\n$/,""))}};t.MarkdownView=({content:e})=>c.default.createElement(l.default,{remarkPlugins:w,components:S,transformLinkUri:k,className:x},e??"")},81911:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const n=o(96486),a=o(67294);t.MobileContext=(0,a.createContext)({isMenuOpen:!1,setMenuOpen:n.noop}),t.useMobileContext=()=>(0,a.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,a.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},52630:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const a=o(18592),r=n(o(67294)),i=o(61329),s=o(39550),c=o(15435),l=a.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,d=a.css`
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.xxl};
  cursor: pointer;
  margin: ${i.theme.spacing.m};
  &:hover {
    color: ${i.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:o,actionIcon:n,onAction:a})=>r.default.createElement("div",{className:l},r.default.createElement(s.LogoContainer,null,r.default.createElement(c.Logo,{name:e,version:t,href:o})),r.default.createElement(n,{className:d,onClick:a}))},48265:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const a=n(o(67294)),r=o(69274),i=o(81911),s=o(52630),c=o(54104);t.MobileHeaderWithOverlay=({name:e,version:t,href:o,children:n})=>{const{setMenuOpen:l}=(0,i.useMobileContext)();return a.default.createElement(a.default.Fragment,null,a.default.createElement(s.MobileHeader,{href:o,name:e,version:t,actionIcon:r.HiBars3,onAction:()=>l(!0)}),a.default.createElement(c.MobileOverlay,{href:o,name:e,version:t},n))}},54104:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const a=o(18592),r=n(o(67294)),i=o(69274),s=o(61329),c=o(81911),l=o(52630),d=a.css`
  position: fixed;
  top: ${s.theme.spacing.zero};
  left: ${s.theme.spacing.zero};
  width: 100vw;
  height: 100vh;
  background-color: ${s.theme.colors.dark2};
  pointer-events: all;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: auto;
`,m=a.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:o,version:n})=>{const{isMenuOpen:s,setMenuOpen:p}=(0,c.useMobileContext)();return r.default.createElement("div",{className:(0,a.cx)(d,s?void 0:m)},r.default.createElement(l.MobileHeader,{href:o,actionIcon:i.HiXMark,onAction:()=>p(!1),name:e,version:n}),t)}},39201:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const a=o(18592),r=n(o(67294)),i=o(39226),s=o(61329),c=a.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${s.theme.colors.dark2};
  @media ${i.breakpoints.phone} {
    display: none;
  }
`;t.SideBar=({children:e})=>r.default.createElement("div",{className:c},e)},38938:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const a=o(18592),r=o(96486),i=n(o(67294)),s=o(61329),c=a.css`
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: ${s.theme.spacing.m} ${s.theme.spacing.m};
`,l=a.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${s.theme.spacing.xxm};
`;t.SideBarSection=({children:e,title:t})=>i.default.createElement(i.default.Fragment,null,(0,r.isNil)(t)?null:i.default.createElement("div",{className:c},t),i.default.createElement("div",{className:l},e))},79129:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const a=n(o(67294)),r=o(61329),i=o(86753);t.SvgLogo=({color:e=r.theme.colors.green,width:t,height:o})=>{const[n,s]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,o);return a.default.createElement("svg",{width:n,height:s,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},7807:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var a=Object.getOwnPropertyDescriptor(t,o);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,a)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=o(18592),s=r(o(67294)),c=o(67361),l=r(o(29012)),d=o(74855),m=o(61329),p=o(69274),u=o(96486),h=o(71400),f=(0,h.createPrismTheme)(l.vscDarkPlus,m.theme.colors.dark1),g=(0,h.createPrismTheme)(l.vscDarkPlus,m.theme.colors.dark4),b=i.css`
  label: syntax-hl-copy;
  top: ${m.theme.spacing.m};
  right: ${m.theme.spacing.m};
  position: absolute;
  display: flex;
  gap: ${m.theme.spacing.s};
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear, opacity 150ms linear;
  padding: ${m.theme.spacing.s} ${m.theme.spacing.m};
  border: unset;
  border-radius: ${m.theme.spacing.s};
  font-weight: 400;
  cursor: pointer;
  font-size: ${m.theme.fontSize.m};
  background-color: ${m.theme.colors.dark2};
  color: ${m.theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) ${m.theme.spacing.zero} ${m.theme.spacing.xs} ${m.theme.spacing.s};
`,v=i.css`
  label: docs-syntax-hl;
  border-radius: ${m.theme.spacing.m};
  padding: ${m.theme.spacing.zero};
  /** TODO */
  margin: ${m.theme.spacing.xm} ${m.theme.spacing.zero};
  overflow: hidden;
  position: relative;
  * {
    font-family: 'Source Code Pro', monospace;
    font-size: ${m.theme.fontSize.code};
  }
`,O=i.css`
  position: relative;
  flex-grow: ${m.theme.flex.grow};
  height: 100vh;

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:o,kind:n})=>{const[a,r]=(0,s.useState)(!1),[l,m]=(0,s.useState)(!1),[h,y]=(0,s.useState)(void 0),x=(0,i.cx)("editor"===n?O:v),_="editor"===n?g:f,k=(0,i.cx)(b);return s.default.createElement("div",{className:x,onMouseEnter:()=>{m(!0)},onMouseLeave:()=>{m(!1)}},s.default.createElement(c.Prism,{language:t,style:_,wrapLongLines:o,showLineNumbers:"editor"===n},e),s.default.createElement(d.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,u.isNil)(h)||(clearTimeout(h),y(void 0)),r(t),y(setTimeout((()=>{r(!1)}),2e3))}},s.default.createElement("button",{className:k,style:{opacity:l?1:0}},a?s.default.createElement(p.HiCheck,null):s.default.createElement(p.HiClipboard,null))))}},89937:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const a=o(18592),r=n(o(67294)),i=o(61329),s=a.css`
  border-radius: ${i.theme.spacing.m};
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  margin: 1px;
`,c=a.css`
  border-collapse: collapse;
  width: 100%;
  border-width: ${i.theme.spacing.zero};
`;t.Table=({children:e,className:t,...o})=>r.default.createElement("div",{className:s},r.default.createElement("table",{className:(0,a.cx)(c,t),...o},e));const l=a.css`
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  border-left-width: ${i.theme.spacing.zero};
  border-right-width: ${i.theme.spacing.zero};
  &:last-of-type {
    border-bottom-width: ${i.theme.spacing.zero};
  }
`,d=a.css`
  background-color: ${i.theme.colors.dark1};
  border-width: ${i.theme.spacing.zero};
  border-radius: ${i.theme.spacing.m};
`;t.Tr=({children:e,isHeader:t,className:o,...n})=>{const i=(0,a.cx)(t?d:l,o);return r.default.createElement("tr",{...n,className:i},e)};const m=a.css`
  color: ${i.theme.colors.text};
  font-size: ${i.theme.fontSize.m};
  padding: ${i.theme.spacing.xxm} ${i.theme.spacing.m};
  text-align: left;
  &:first-of-type {
    border-top-left-radius: ${i.theme.spacing.xs};
  }
  &:last-of-type {
    border-top-right-radius: ${i.theme.spacing.xs};
  }
`;t.Th=({children:e,className:t,...o})=>r.default.createElement("th",{...o,className:(0,a.cx)(m,t)},e);const p=a.css`
  padding: ${i.theme.spacing.m};
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.muted};
`;t.Td=({children:e,className:t,...o})=>r.default.createElement("td",{...o,className:(0,a.cx)(p,t)},e);const u=a.css`
  border-width: ${i.theme.spacing.zero};
`;t.THead=({children:e,className:t,...o})=>r.default.createElement("thead",{...o,className:(0,a.cx)(u,t)},e);const h=a.css`
  border-width: ${i.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...o})=>r.default.createElement("tbody",{...o,className:(0,a.cx)(h,t)},e)},5838:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const a=o(18592),r=n(o(67294)),i=o(69274),s=o(61329),c=a.css`
  position: relative;
`,l=(e,t)=>a.css`
  label: tree-node-content-${e};
  display: flex;
  flex-direction: row;
  padding: ${s.theme.spacing.s};
  transition: background-color 150ms linear, color 150ms linear;
  cursor: pointer;
  text-decoration: none;

  padding-left: ${14+14*e}px;
  font-size: ${s.theme.fontSize.m};
  background-color: ${t?s.theme.colors.dark1:s.theme.colors.transparent};
  color: ${t?s.theme.colors.text:s.theme.colors.muted};
  &:hover {
    background-color: ${s.theme.colors.dark1};
  }
`,d=a.css`
  flex: ${s.theme.flex.grow};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s.theme.spacing.xxs};
`,m=({isContainer:e,isOpen:t,isEmpty:o})=>e?o?r.default.createElement(i.HiChevronLeft,null):t?r.default.createElement(i.HiChevronDown,null):r.default.createElement(i.HiChevronRight,null):null;t.TreeNode=function e({value:t,level:o,getLabel:n,isActive:i=(()=>!1),isOpen:p=(()=>!1),isContainer:u=(()=>!1),getChildren:h=(()=>[]),onClick:f=(()=>{}),getHref:g=(()=>{}),getIcon:b=(()=>{})}){const v=h(t),O=p(t),y=i(t),x=u(t),_=b(t),k=x&&O?(0,a.cx)(c,(e=>a.css`
  &::before {
    z-index: 5;
    label: tree-node-line-${e};
    border-left: 1px solid #555;
    content: '';
    left: ${22+14*e}px;
    position: absolute;
    top: ${s.theme.spacing.xxl};
    height: calc(100% - ${s.theme.spacing.xxl});
  }
`)(o)):c,w=g(t),S=n(t);return r.default.createElement("div",{className:k},r.default.createElement("a",{className:l(o,y),href:w,onClick:()=>f(t,O)},r.default.createElement("span",{className:d},r.default.createElement(m,{isContainer:x,isEmpty:0===v.length,isOpen:O}),void 0===_?null:r.default.createElement(_,null),S)),O&&v.map(((t,a)=>r.default.createElement(e,{key:`${a}-${S}`,value:t,level:o+1,getLabel:n,getHref:g,isContainer:u,getChildren:h,isOpen:p,isActive:i,onClick:f}))))}},71400:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const n=o(96486),a=o(61329);t.createPrismTheme=function(e,t){const o={'pre[class*="language-"]':{backgroundColor:t,borderRadius:a.theme.spacing.zero,padding:a.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:a.theme.spacing.zero,margin:a.theme.spacing.zero,fontSize:a.theme.fontSize.code,fontFamily:a.theme.fontFamily.monospace}},r=(0,n.cloneDeep)(e);return(0,n.values)(r).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${a.theme.spacing.zero} ${a.theme.spacing.zero} ${a.theme.spacing.xxs}`,e.fontSize=a.theme.fontSize.code,e.fontFamily=a.theme.fontFamily.monospace})),(0,n.merge)(r,o)}},86753:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,o,n){return void 0!==o&&void 0===n?[o,t/e*o]:void 0!==n&&void 0===o?[n,e/t*n]:void 0!==o&&void 0!==n?[o,n]:[e,t]}},72050:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const n=o(26729),a=o(39226),r=o(61329);t.globalStyles=n.css`
  #root {
    margin: ${r.theme.spacing.zero};
    padding: ${r.theme.spacing.zero};
    width: 100vw;
    height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${r.theme.fontFamily.sansSerif};
  }

  html {
    font-size: 100%;

    @media ${a.breakpoints.tablet} {
      font-size: 120%;
    }

    @media ${a.breakpoints.phone} {
      font-size: 200%;
    }
  }

  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${r.theme.colors.dark2} ${r.theme.colors.dark5};
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 14px;
  }

  *::-webkit-scrollbar-track {
    background: ${r.theme.colors.dark5};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${r.theme.colors.dark2};
    border-radius: 7px;
    border: 2px solid ${r.theme.colors.dark5};
  }
`},9572:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,console.log("production"),t.links={docs:()=>"/documentation",doc:e=>`/documentation/${e}`,editor:()=>"/editor",index:()=>"/"}},2684:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var a=Object.getOwnPropertyDescriptor(t,o);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,a)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const i=o(18592),s=o(96486),c=r(o(67294)),l=o(69274),d=o(86299),m=o(9572),p=o(61329),u=o(82704),h=i.css`
  padding: ${p.theme.spacing.l};
  display: flex;
  flex-direction: column;
  gap: ${p.theme.spacing.l};
`,f=i.css`
  display: flex;
  flex-direction: row;
  align-items: center;
`,g=i.css`
  padding: ${p.theme.spacing.xxm};
  background-color: ${p.theme.colors.dark2};
  border-radius: ${p.theme.spacing.m};
  color: ${p.theme.colors.muted};
`,b=i.css`
  flex: ${p.theme.flex.grow};
`,v=i.css`
  font-weight: bold;
`;function O(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,o]=(0,u.useNeighbours)(),n=!(0,s.isNil)(e),a=!(0,s.isNil)(o),r=!(0,s.isNil)(t),i=(0,c.useMemo)((()=>{if(!(0,s.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${O(t.name)}+(in+${t.md}.md)&body=${O("Please describe the issue with as much detail as possible!")}`}),[t]);return n||a||r?c.default.createElement("div",{className:h},(n||a)&&c.default.createElement("div",{className:f},n&&c.default.createElement(d.Link,{href:m.links.doc(e.md),className:v},c.default.createElement(l.HiChevronLeft,null),e.name),c.default.createElement("div",{className:b}),a&&c.default.createElement(d.Link,{href:m.links.doc(o.md),className:v},o.name,c.default.createElement(l.HiChevronRight,null))),r&&c.default.createElement("div",{className:g},c.default.createElement("b",null,"Found an issue with this page?"),c.default.createElement("br",null),"Please let me know by ",c.default.createElement(d.Link,{href:i},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},44376:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var a=Object.getOwnPropertyDescriptor(t,o);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,a)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const i=r(o(67294)),s=o(12259),c=o(38938),l=o(21521),d=o(42946);t.DocumentationMenu=()=>i.default.createElement(i.default.Fragment,null,i.default.createElement(c.SideBarSection,null,i.default.createElement(s.HomeTreeRoot,null)),d.sections.map((e=>i.default.createElement(i.Fragment,{key:e.name},i.default.createElement(c.SideBarSection,{title:e.name},e.items.map((e=>i.default.createElement(l.DocumentationTreeRoot,{node:e,key:e.md}))))))))},95462:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const a=o(18592),r=n(o(67294)),i=o(39226),s=o(40782),c=o(76197),l=o(81911),d=o(48265),m=o(39201),p=o(15435),u=o(39550),h=o(61329),f=o(44376),g=o(2684),b=o(50059),v=o(9572),O="docs",y=a.css`
  flex: ${h.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${h.theme.colors.muted};
  font-size: ${h.theme.fontSize.m};
  background-color: ${h.theme.colors.dark4};
`,x=()=>{const e=(0,l.useProvideMobileContext)();return r.default.createElement(l.MobileContext.Provider,{value:e},r.default.createElement(d.MobileHeaderWithOverlay,{name:O,version:!0,href:v.links.docs()},r.default.createElement(f.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>r.default.createElement(b.MarkdownContext.Provider,{value:{page:e,content:t}},r.default.createElement(s.DocContainer,null,r.default.createElement(m.SideBar,null,r.default.createElement(u.LogoContainer,null,r.default.createElement(p.Logo,{name:O,version:!0,href:v.links.docs()})),r.default.createElement(f.DocumentationMenu,null)),r.default.createElement("div",{className:y},r.default.createElement(i.BreakPoint,{Component:x,breakpoint:"phone"}),r.default.createElement(c.MarkdownView,{content:t}),r.default.createElement(g.DocumentationFooter,null))))},21521:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const a=n(o(67294)),r=o(5838),i=o(81911),s=o(50059),c=o(9572);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,i.useMobileContext)(),{page:o}=(0,s.useMarkdown)();return a.default.createElement(r.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===o,onClick:()=>t(!1),getHref:e=>c.links.doc(e.md)})}},50059:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const n=o(67294);t.MarkdownContext=(0,n.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,n.useContext)(t.MarkdownContext)},82704:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const n=o(96486),a=o(67294),r=o(42946),i=o(50059);function s(e,t=0){const o=function(e){return r.sections.find((t=>t.items.some((t=>t.md===e))))}(e);if((0,n.isNil)(o))return;const a=function(e,t){return t.items.findIndex((t=>t.md===e))}(e,o)+t;return o.items[a]}t.useNeighbours=function(){const{page:e}=(0,i.useMarkdown)(),t=(0,a.useMemo)((()=>s(e)),[e]);return[(0,a.useMemo)((()=>s(e,-1)),[e]),t,(0,a.useMemo)((()=>s(e,1)),[e])]}},41697:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(o(67294)),r=o(20745),i=o(95462),s=n(o(35625));(0,r.createRoot)(document.getElementById("root")).render(a.default.createElement(i.DocumentationPage,{page:"Generate",content:s.default}))},61329:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=41697)}]);
//# sourceMappingURL=documentation-Generate.bundle.js.map