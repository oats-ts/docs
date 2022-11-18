"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[624],{36426:(e,t,o)=>{o.r(t),o.d(t,{default:()=>a});const a="# Generate\n\nIn this guide you'll learn how the generator step works.\n\nThe generator step is responsible for taking the validated output of the [reader](Reader) step, and turning it into an intermediate representation (Typescript [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)), that can be then turned into source code. The work is distributed to single responsiblity generators, that are responsible for generating one thing (like types from the JSON schemas, or serializers for parameters). They also provide means for other generators to access references to their generated content.\n\nThe generators that comes with oats by default can be accessed from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi), package but it originates from the [@oats-ts/openapi-generators](https://www.npmjs.com/package/@oats-ts/openapi-generators) package.\n\n## Examples\n\n### Using individual generators\n\nYou can configure your generator from a set of code generators of your choosing. For this approach, it's the easiest to use `generators.create` from the [@oats-ts/openapi](https://www.npmjs.com/package/@oats-ts/openapi) package. You can use the generator names (see below) as the first argument, and optionally the approriate configuration object as the second argument (autocomplete will help with this).\n\n```ts\nconst oats = require('@oats-ts/openapi')\n\nconst withGenerators = oats.generator({\n  nameProvider: oats.nameProviders.default(),\n  pathProvider: oats.pathProviders.default('src/generated'),\n  children: [\n    oats.generators.create('oats/type', { documentation: false }),\n    oats.generators.create('oats/type-guard'),\n    oats.generators.create('oats/type-validator'),\n  ],\n})\n```\n\n### Using presets\n\nYou can also use presets (I would in fact recommend starting with presets). Presets are a set of generators grouped toghether. The ones available currently are `presets.client()`, `presets.server()` and `presets.fullStack()`. The simplest way is to use the preset without any configuration:\n\n```ts\nconst oats = require('@oats-ts/openapi')\n\nconst withDefaults = oats.generator({\n  nameProvider: oats.nameProviders.default(),\n  pathProvider: oats.pathProviders.default('src/generated'),\n  children: oats.presets.client(),\n})\n```\n\nPresets offer configuration options, that affect possibly multiple individual generators. In this case we are disabling the `documentation` for all the generators that support this option:\n\n```ts\nconst oats = require('@oats-ts/openapi')\n\nconst withOverrides = oats.generator({\n  nameProvider: oats.nameProviders.default(),\n  pathProvider: oats.pathProviders.default('src/generated'),\n  children: oats.presets.client({\n    documentation: false,\n  }),\n})\n```\n\nIn case you want to fine tune presets, you can override the configuration for individual generators as well. In this case we are only generating documentation for types:\n\n```ts\nconst oats = require('@oats-ts/openapi')\n\nconst withOverrides = oats.generator({\n  nameProvider: nameProviders.default(),\n  pathProvider: pathProviders.default('src/generated'),\n  children: presets\n    .client({ documentation: false })\n    .override({ 'oats/type': { documentation: true } }),\n})\n```\n\n### Mixing presets and generators\n\nPresets and individual generators can be used together, this works well if you have additional custom generators on top of what Oats provides, and you want to use references to the outputs of the provided generators:\n\n```ts\nconst oats = require('@oats-ts/openapi')\n\nconst withPresetsAndGenerators = oats.generator({\n  nameProvider: oats.nameProviders.default(),\n  pathProvider: oats.pathProviders.default('src/generated'),\n  children: [\n    oats.presets.client(),\n    oats.generators.create('oats/express-cors-router-factory'),\n  ],\n})\n```\n\n## Configuration\n\nThe main `generator` function can be configured with an object having the following properties:\n\n- `nameProvider: (input: any, target: string, helper: NameProviderHelper) => string` - A function that determines how each generated artifact is called. For reasonable, convention respecting names use `nameProviders.default()`\n  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).\n  - `target` is one of the names listed below.\n  - `helper` object with helper methods for schema traversal.\n- `pathProvider: (input: any, target: string, helper: PathProviderHelper) => string` - A function that determines where in the disk each artifact is written to (`SourceFile#fileName`). Check `pathProviders.*` for options.\n  - `input` is the part of the OpenAPI object tree that the given artifact is based on (eg.: A Schema object or Operation object).\n  - `target` is one of the names listed below.\n  - `helper` object with helper methods for schema traversal and for retrieving the name provided by the `nameProvider`.\n- `children: OpenAPIGenerator | OpenAPIGenerator[]` - A single generator or a list of generators. See available ones below.\n- `noEmit?: boolean = false` - When `true`, the generators return no output `SourceFile`s.\n- `name?: string = 'root'` - The name of the root generator, shows up in logs.\n\n## Available generators\n\nThere are a number of code generators available. These are part of certain presets, but can also be used individually, using `generators.create`. In case you want to see them in action, check the [demo](#/demo) page!\n\n| **Name**                             | **Preset**                | **Uses**                                                                                | **Creates**                                                                                                                                                                 |\n| ------------------------------------ | ------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| oats/type-guard                      | client, server, fullStack | [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)                     | [Type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) based on JSON schemas                                              |\n| oats/type-guard                      | client, server, fullStack | [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)                     | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on JSON schemas                                                                            |\n| oats/type                            | client, server, fullStack | [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object)                     | Typescript types based on JSON schemas                                                                                                                                      |\n| oats/api-type                        | server                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Type encapsulating server behaviour                                                                                                                                         |\n| oats/express-cors-router-factory     | server                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) handling CORS headers.                                 |\n| oats/express-router-factory          | server                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) encapsulating the app.                                 |\n| oats/express-app-router-factory      | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Factory function, creating an [Express](https://expressjs.com) [Router](https://expressjs.com/en/guide/routing.html) for each operations.                                   |\n| oats/express-router-factories-type   | server                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Object type, with all [Express](https://expressjs.com) [Routers](https://expressjs.com/en/guide/routing.html)                                                               |\n| oats/express-context-handler-factory | server                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Factory function, creating an [Express](https://expressjs.com) handler for exposing OATS configuration for all routers                                                      |\n| oats/operation                       | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of making an HTTP requests, based on operations                                                                                                          |\n| oats/path-deserializer               | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                       |\n| oats/path-serializer                 | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing [path parameters](https://swagger.io/docs/specification/serialization/#path), based on operations                                         |\n| oats/path-type                       | client, server, fullStack | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting [path parameters](https://swagger.io/docs/specification/serialization/#path) for operations                                                                |\n| oats/query-deserializer              | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                     |\n| oats/query-serializer                | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing [query parameters](https://swagger.io/docs/specification/serialization/#query), based on operations                                       |\n| oats/query-type                      | client, server, fullStack | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting [query parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                              |\n| oats/cookie-deserializer             | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing client side Cookie headers for [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations    |\n| oats/cookie-serializer               | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing client side Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations       |\n| oats/set-cookie-deserializer         | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations |\n| oats/set-cookie-serializer           | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing server side Set-Cookie headers for [query parameters](https://swagger.io/docs/specification/serialization/#cookie), based on operations   |\n| oats/cookies-type                    | client, server, fullStack | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting [cookie parameters](https://swagger.io/docs/specification/serialization/#cookie) for operations                                                            |\n| oats/request-body-validator          | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on request bodies of operations                                                            |\n| oats/request-headers-deserializer    | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                           |\n| oats/request-headers-serializer      | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing request [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                             |\n| oats/request-headers-type            | client, server, fullStack | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting request [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                     |\n| oats/request-server-type             | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting all inputs for operations (server variant, inputs wrappedn in [Try](https://www.npmjs.com/package/@oats-ts/try)s)                                          |\n| oats/request-type                    | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting all inputs for operations                                                                                                                                  |\n| oats/response-body-validator         | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Structural [validators](https://www.npmjs.com/package/@oats-ts/validators) based on response bodies of operations                                                           |\n| oats/response-headers-deserializer   | client                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of deserializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                          |\n| oats/response-headers-serializer     | server                    | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Functions, capable of serializing response [header parameters](https://swagger.io/docs/specification/serialization/#header), based on operations                            |\n| oats/response-headers-type           | client, server, fullStack | Status code + [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object) | Types collecting response [header parameters](https://swagger.io/docs/specification/serialization/#query) for operations                                                    |\n| oats/response-type                   | client, server, fullStack | [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object)               | Types collecting all outputs for operations                                                                                                                                 |\n| oats/sdk-impl                        | client                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Implementation of `oats/sdk-impl` utilizing `oats/operation`                                                                                                                |\n| oats/sdk-type                        | client                    | [OpenAPI Object](https://spec.openapis.org/oas/v3.1.0#openapi-object)                   | Type collecting all operations a client might call                                                                                                                          |\n\n## Extending generators\n\nIn case you want to dig deeper, and extend certain generators, check out the [source](https://github.com/oats-ts/oats-ts/tree/master/projects/openapi-generators).\n"},86032:(e,t,o)=>{o.r(t),o.d(t,{default:()=>a});const a={'pre[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#1e1e1e"},'code[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'pre[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},':not(pre) > code[class*="language-"]':{padding:".1em .3em",borderRadius:".3em",color:"#db4c69",background:"#1e1e1e"},".namespace":{Opacity:".7"},"doctype.doctype-tag":{color:"#569CD6"},"doctype.name":{color:"#9cdcfe"},comment:{color:"#6a9955"},prolog:{color:"#6a9955"},punctuation:{color:"#d4d4d4"},".language-html .language-css .token.punctuation":{color:"#d4d4d4"},".language-html .language-javascript .token.punctuation":{color:"#d4d4d4"},property:{color:"#9cdcfe"},tag:{color:"#569cd6"},boolean:{color:"#569cd6"},number:{color:"#b5cea8"},constant:{color:"#9cdcfe"},symbol:{color:"#b5cea8"},inserted:{color:"#b5cea8"},unit:{color:"#b5cea8"},selector:{color:"#d7ba7d"},"attr-name":{color:"#9cdcfe"},string:{color:"#ce9178"},char:{color:"#ce9178"},builtin:{color:"#ce9178"},deleted:{color:"#ce9178"},".language-css .token.string.url":{textDecoration:"underline"},operator:{color:"#d4d4d4"},entity:{color:"#569cd6"},"operator.arrow":{color:"#569CD6"},atrule:{color:"#ce9178"},"atrule.rule":{color:"#c586c0"},"atrule.url":{color:"#9cdcfe"},"atrule.url.function":{color:"#dcdcaa"},"atrule.url.punctuation":{color:"#d4d4d4"},keyword:{color:"#569CD6"},"keyword.module":{color:"#c586c0"},"keyword.control-flow":{color:"#c586c0"},function:{color:"#dcdcaa"},"function.maybe-class-name":{color:"#dcdcaa"},regex:{color:"#d16969"},important:{color:"#569cd6"},italic:{fontStyle:"italic"},"class-name":{color:"#4ec9b0"},"maybe-class-name":{color:"#4ec9b0"},console:{color:"#9cdcfe"},parameter:{color:"#9cdcfe"},interpolation:{color:"#9cdcfe"},"punctuation.interpolation-punctuation":{color:"#569cd6"},variable:{color:"#9cdcfe"},"imports.maybe-class-name":{color:"#9cdcfe"},"exports.maybe-class-name":{color:"#9cdcfe"},escape:{color:"#d7ba7d"},"tag.punctuation":{color:"#808080"},cdata:{color:"#808080"},"attr-value":{color:"#ce9178"},"attr-value.punctuation":{color:"#ce9178"},"attr-value.punctuation.attr-equals":{color:"#d4d4d4"},namespace:{color:"#4ec9b0"},'pre[class*="language-javascript"]':{color:"#9cdcfe"},'code[class*="language-javascript"]':{color:"#9cdcfe"},'pre[class*="language-jsx"]':{color:"#9cdcfe"},'code[class*="language-jsx"]':{color:"#9cdcfe"},'pre[class*="language-typescript"]':{color:"#9cdcfe"},'code[class*="language-typescript"]':{color:"#9cdcfe"},'pre[class*="language-tsx"]':{color:"#9cdcfe"},'code[class*="language-tsx"]':{color:"#9cdcfe"},'pre[class*="language-css"]':{color:"#ce9178"},'code[class*="language-css"]':{color:"#ce9178"},'pre[class*="language-html"]':{color:"#d4d4d4"},'code[class*="language-html"]':{color:"#d4d4d4"},".language-regex .token.anchor":{color:"#dcdcaa"},".language-html .token.punctuation":{color:"#808080"},'pre[class*="language-"] > code[class*="language-"]':{position:"relative",zIndex:"1"},".line-highlight.line-highlight":{background:"#f7ebc6",boxShadow:"inset 5px 0 0 #f7d87c",zIndex:"0"}}},80887:function(e,t,o){var a=this&&this.__createBinding||(Object.create?function(e,t,o,a){void 0===a&&(a=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,a,n)}:function(e,t,o,a){void 0===a&&(a=o),e[a]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&a(t,e,o);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const s=r(o(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:o})=>{const[a,n]=(0,s.useState)((()=>window.matchMedia(t.breakpoints[o]).matches));return(0,s.useEffect)((()=>{window.matchMedia(t.breakpoints[o]).addEventListener("change",(e=>n(e.matches)))}),[]),a?s.default.createElement(e,null):null}},38251:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(o(67294)),r=o(20745),s=o(15529),i=a(o(36426));(0,r.createRoot)(document.getElementById("root")).render(n.default.createElement(s.DocumentationPage,{page:"Generate",content:i.default}))},4074:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const n=o(18592),r=a(o(67294)),s=o(19446),i=n.css`
  font-size: ${s.theme.fontSize.code};
  color: ${s.theme.colors.text};
  background-color: ${s.theme.colors.dark1};
  padding: ${s.theme.spacing.xxxs} ${s.theme.spacing.xxs};
  border-radius: ${s.theme.spacing.xs};
`;t.Code=({className:e,children:t,...o})=>r.default.createElement("code",{className:(0,n.cx)(i,e),...o},t)},98378:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const n=o(18592),r=o(26729),s=a(o(67294)),i=o(63413),c=o(19446),l=n.css`
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
`;t.DocContainer=({children:e})=>s.default.createElement(s.default.Fragment,null,s.default.createElement(r.Global,{styles:i.globalStyles}),s.default.createElement("div",{className:l},e))},3930:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const n=a(o(67294)),r=o(18592),s=o(19446),i=o(96486),c=r.css`
  label: link;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  gap: ${s.theme.spacing.s};
  align-items: center;
  transition: color 150ms linear;
  text-decoration: underline;
  color: ${s.theme.colors.muted};

  &:hover {
    text-decoration: none;
    color: ${s.theme.colors.text};
  }
`;t.Link=({children:e,className:t,onClick:o,...a})=>(0,i.isNil)(o)?n.default.createElement("a",{className:(0,r.cx)(c,t),...a},e):n.default.createElement("span",{className:(0,r.cx)(c,t),onClick:o,...a},e)},66118:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const n=o(18592),r=o(67535),s=o(96486),i=a(o(67294)),c=o(19446),l=o(20519),d=n.css`
  label: side-bar-logo;
  display: flex;
  gap: ${c.theme.spacing.m};
  align-items: center;
  text-decoration: none;
`,u=n.css`
  display: flex;
  flex-direction: column;
`,p=n.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: ${c.theme.spacing.zero};
  padding: ${c.theme.spacing.zero};
  font-size: ${c.theme.fontSize.l};
  color: ${c.theme.colors.text};
`,m=n.css`
  color: ${c.theme.colors.muted};
`,h=n.css`
  font-size: ${c.theme.fontSize.s};
  color: ${c.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:o})=>i.default.createElement("a",{className:d,href:o},i.default.createElement(l.SvgLogo,{width:60}),i.default.createElement("div",{className:u},i.default.createElement("h1",{className:p},"Oats ",(0,s.isNil)(e)?null:i.default.createElement("span",{className:m},e)),t&&i.default.createElement("span",{className:h},"v",r.version)))},19187:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const n=o(18592),r=a(o(67294)),s=o(80887),i=o(19446),c=n.css`
  margin: ${i.theme.spacing.m} ${i.theme.spacing.m} ${i.theme.spacing.xxxl} ${i.theme.spacing.m};
  @media ${s.breakpoints.phone} {
    margin: ${i.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>r.default.createElement("div",{className:c},e)},40704:function(e,t,o){var a=this&&this.__createBinding||(Object.create?function(e,t,o,a){void 0===a&&(a=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,a,n)}:function(e,t,o,a){void 0===a&&(a=o),e[a]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&a(t,e,o);return n(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const i=o(18592),c=o(96486),l=s(o(67294)),d=r(o(23209)),u=s(o(34112)),p=o(82509),m=o(77255),h=o(19446),g=o(4074),f=o(3930),b=o(44702),v=o(66999),y=i.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.l};
  margin-top: ${h.theme.spacing.zero};
`,x=i.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.xm};
`,w=i.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.m};
`,k=i.css`
  margin-top: ${h.theme.spacing.l};
  padding: ${h.theme.spacing.xxm};
  background-color: ${h.theme.colors.dark2};
  border-radius: ${h.theme.spacing.m};
  color: ${h.theme.colors.muted};
  p {
    &:first-of-type {
      margin-top: 0px;
    }
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
`,_=i.css`
  margin: ${h.theme.spacing.l};
`,O=Object.values(p.markdownPages),P=e=>{const t=O.find((t=>e.startsWith(t.md)));return(0,c.isNil)(t)?(0,d.uriTransformer)(e):m.links.doc(t.md)},j=[u.default],S={h1:({children:e})=>l.default.createElement("h1",{className:y},e),h2:({children:e})=>l.default.createElement("h2",{className:x},e),h3:({children:e})=>l.default.createElement("h3",{className:w},e),table:({children:e})=>l.default.createElement(v.Table,null,e),tr:({children:e,isHeader:t})=>l.default.createElement(v.Tr,{isHeader:t},e),th:({children:e})=>l.default.createElement(v.Th,null,e),td:({children:e})=>l.default.createElement(v.Td,null,e),a:({href:e,children:t})=>l.default.createElement(f.Link,{href:e},t),code({node:e,inline:t,className:o,children:a,...n}){const r=/language-(\w+)/.exec(o||"");return null===r||t?l.default.createElement(g.Code,{...n},a):l.default.createElement(b.SyntaxHighlighter,{language:r[1],host:"docs",theme:"medium"},String(a).replace(/\n$/,""))},blockquote:({children:e})=>l.default.createElement("div",{className:k},e)};t.MarkdownView=({content:e})=>l.default.createElement(d.default,{remarkPlugins:j,components:S,transformLinkUri:P,className:_},e??"")},96487:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuTreeItem=void 0;const n=a(o(67294)),r=o(69274),s=o(77255),i=o(7117),c=o(82067),l={index:"Home",docs:"Documentation",editor:"Editor"},d={index:r.HiHome,docs:r.HiDocument,editor:r.HiCog6Tooth};t.MenuTreeItem=({link:e})=>{const{setMenuOpen:t}=(0,i.useMobileContext)();return n.default.createElement(c.TreeNode,{value:void 0,level:0,getIcon:()=>d[e],getLabel:()=>l[e],isActive:()=>!1,onClick:()=>t(!1),getHref:()=>s.links[e]()})}},7117:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const a=o(96486),n=o(67294);t.MobileContext=(0,n.createContext)({isMenuOpen:!1,setMenuOpen:a.noop}),t.useMobileContext=()=>(0,n.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,n.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},35625:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const n=o(18592),r=a(o(67294)),s=o(19446),i=o(19187),c=o(66118),l=n.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,d=n.css`
  color: ${s.theme.colors.muted};
  font-size: ${s.theme.fontSize.xxl};
  cursor: pointer;
  margin: ${s.theme.spacing.m};
  &:hover {
    color: ${s.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:o,actionIcon:a,onAction:n})=>r.default.createElement("div",{className:l},r.default.createElement(i.LogoContainer,null,r.default.createElement(c.Logo,{name:e,version:t,href:o})),r.default.createElement(a,{className:d,onClick:n}))},8015:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const n=a(o(67294)),r=o(69274),s=o(7117),i=o(35625),c=o(99102);t.MobileHeaderWithOverlay=({name:e,version:t,href:o,children:a})=>{const{setMenuOpen:l}=(0,s.useMobileContext)();return n.default.createElement(n.default.Fragment,null,n.default.createElement(i.MobileHeader,{href:o,name:e,version:t,actionIcon:r.HiBars3,onAction:()=>l(!0)}),n.default.createElement(c.MobileOverlay,{href:o,name:e,version:t},a))}},99102:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const n=o(18592),r=a(o(67294)),s=o(69274),i=o(19446),c=o(7117),l=o(35625),d=n.css`
  position: fixed;
  top: ${i.theme.spacing.zero};
  left: ${i.theme.spacing.zero};
  width: 100vw;
  height: 100vh;
  background-color: ${i.theme.colors.dark2};
  pointer-events: all;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: auto;
`,u=n.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:o,version:a})=>{const{isMenuOpen:i,setMenuOpen:p}=(0,c.useMobileContext)();return r.default.createElement("div",{className:(0,n.cx)(d,i?void 0:u)},r.default.createElement(l.MobileHeader,{href:o,actionIcon:s.HiXMark,onAction:()=>p(!1),name:e,version:a}),t)}},86229:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const n=o(18592),r=a(o(67294)),s=o(80887),i=o(19446),c=n.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${i.theme.colors.dark2};
  @media ${s.breakpoints.phone} {
    display: none;
  }
`;t.SideBar=({children:e})=>r.default.createElement("div",{className:c},e)},21710:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const n=o(18592),r=o(96486),s=a(o(67294)),i=o(19446),c=n.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${i.theme.spacing.m} ${i.theme.spacing.m};
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.text};
  gap: ${i.theme.spacing.s};
`,l=n.css`
  text-transform: uppercase;
  font-weight: bold;
  flex: ${i.theme.flex.grow};
`,d=n.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${i.theme.spacing.xxm};
`;t.SideBarSection=({children:e,attachment:t,title:o})=>{const a=(0,r.isNil)(o)&&(0,r.isNil)(t);return s.default.createElement(s.default.Fragment,null,a?null:s.default.createElement("div",{className:c},s.default.createElement("span",{className:l},o),t),s.default.createElement("div",{className:d},e))}},20519:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const n=a(o(67294)),r=o(19446),s=o(14757);t.SvgLogo=({color:e=r.theme.colors.green,width:t,height:o})=>{const[a,i]=(0,s.getSizeWithAspectRatio)(172.439,111.543,t,o);return n.default.createElement("svg",{width:a,height:i,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},n.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),n.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},44702:function(e,t,o){var a=this&&this.__createBinding||(Object.create?function(e,t,o,a){void 0===a&&(a=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,a,n)}:function(e,t,o,a){void 0===a&&(a=o),e[a]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&a(t,e,o);return n(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=o(18592),c=r(o(67294)),l=o(70077),d=s(o(86032)),u=o(74855),p=o(19446),m=o(69274),h=o(96486),g=o(98452),f={light:(0,g.createPrismTheme)(d.default,p.theme.colors.dark1),medium:(0,g.createPrismTheme)(d.default,p.theme.colors.dark2),dark:(0,g.createPrismTheme)(d.default,p.theme.colors.dark4)},b=i.css`
  label: syntax-hl-copy;
  top: ${p.theme.spacing.m};
  right: ${p.theme.spacing.m};
  position: absolute;
  display: flex;
  gap: ${p.theme.spacing.s};
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear, opacity 150ms linear;
  padding: ${p.theme.spacing.s} ${p.theme.spacing.m};
  border: unset;
  border-radius: ${p.theme.spacing.s};
  font-weight: 400;
  cursor: pointer;
  font-size: ${p.theme.fontSize.m};
  background-color: ${p.theme.colors.dark2};
  color: ${p.theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) ${p.theme.spacing.zero} ${p.theme.spacing.xs} ${p.theme.spacing.s};
`,v=i.css`
  label: docs-syntax-hl;
  border-radius: ${p.theme.spacing.m};
  padding: ${p.theme.spacing.zero};
  /** TODO */
  margin: ${p.theme.spacing.xm} ${p.theme.spacing.zero};
  overflow: hidden;
  position: relative;
  * {
    font-family: 'Source Code Pro', monospace;
    font-size: ${p.theme.fontSize.code};
  }
`,y=i.css`
  position: relative;
  flex-grow: ${p.theme.flex.grow};
  height: 100vh;

  pre {
    min-height: 100%;
  }

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:o,theme:a,host:n,renderer:r})=>{const[s,i]=(0,c.useState)(!1),[d,p]=(0,c.useState)(void 0),g="editor"===n?y:v;return c.default.createElement("div",{className:g},c.default.createElement(l.Prism,{language:t,style:f[a],wrapLongLines:o,showLineNumbers:"editor"===n,...(0,h.isNil)(r)?{}:{renderer:r}},e),c.default.createElement(u.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,h.isNil)(d)||(clearTimeout(d),p(void 0)),i(t),p(setTimeout((()=>{i(!1)}),2e3))}},c.default.createElement("button",{className:b},s?c.default.createElement(m.HiCheck,null):c.default.createElement(m.HiClipboard,null))))}},66999:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const n=o(18592),r=a(o(67294)),s=o(19446),i=n.css`
  border-radius: ${s.theme.spacing.m};
  border: ${s.theme.spacing.xxxs} solid ${s.theme.colors.dark1};
  margin: 1px;
`,c=n.css`
  border-collapse: collapse;
  max-width: 100%;
  width: 100%;
  border-width: ${s.theme.spacing.zero};
`;t.Table=({children:e,className:t,...o})=>r.default.createElement("div",{className:i},r.default.createElement("table",{className:(0,n.cx)(c,t),...o},e));const l=n.css`
  border: ${s.theme.spacing.xxxs} solid ${s.theme.colors.dark1};
  border-left-width: ${s.theme.spacing.zero};
  border-right-width: ${s.theme.spacing.zero};
  max-width: 100%;
  &:last-of-type {
    border-bottom-width: ${s.theme.spacing.zero};
  }
`,d=n.css`
  background-color: ${s.theme.colors.dark1};
  border-width: ${s.theme.spacing.zero};
  border-radius: ${s.theme.spacing.m};
`;t.Tr=({children:e,isHeader:t,className:o,...a})=>{const s=(0,n.cx)(t?d:l,o);return r.default.createElement("tr",{...a,className:s},e)};const u=n.css`
  color: ${s.theme.colors.text};
  font-size: ${s.theme.fontSize.m};
  padding: ${s.theme.spacing.xxm} ${s.theme.spacing.m};
  text-align: left;
  &:first-of-type {
    border-top-left-radius: ${s.theme.spacing.xs};
  }
  &:last-of-type {
    border-top-right-radius: ${s.theme.spacing.xs};
  }
`;t.Th=({children:e,className:t,...o})=>r.default.createElement("th",{...o,className:(0,n.cx)(u,t)},e);const p=n.css`
  padding: ${s.theme.spacing.m};
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.muted};
`;t.Td=({children:e,className:t,...o})=>r.default.createElement("td",{...o,className:(0,n.cx)(p,t)},e);const m=n.css`
  border-width: ${s.theme.spacing.zero};
`;t.THead=({children:e,className:t,...o})=>r.default.createElement("thead",{...o,className:(0,n.cx)(m,t)},e);const h=n.css`
  border-width: ${s.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...o})=>r.default.createElement("tbody",{...o,className:(0,n.cx)(h,t)},e)},82067:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const n=o(18592),r=a(o(67294)),s=o(69274),i=o(19446),c=n.css`
  label: tree-node;
  position: relative;
`,l=(e,t)=>n.css`
  label: tree-node-content-level-${e};
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  padding: ${i.theme.spacing.s};
  transition: background-color 150ms linear, color 150ms linear;
  cursor: pointer;
  text-decoration: none;

  padding-left: ${14+14*e}px;
  font-size: ${i.theme.fontSize.m};
  background-color: ${t?i.theme.colors.dark1:i.theme.colors.transparent};
  color: ${t?i.theme.colors.text:i.theme.colors.muted};
  &:hover {
    background-color: ${i.theme.colors.dark1};
  }
`,d=n.css`
  label: tree-node-item-label;
  flex: 1 0 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${i.theme.spacing.xxs};
`,u=n.css`
  margin-left: 0.6rem;
`,p=({isOpen:e,isEmpty:t})=>t?r.default.createElement(s.HiChevronLeft,null):e?r.default.createElement(s.HiChevronDown,null):r.default.createElement(s.HiChevronRight,null);t.TreeNode=function e({value:t,level:o,getLabel:a,isActive:s=(()=>!1),isOpen:i=(()=>!1),isContainer:m=(()=>!1),getChildren:h=(()=>[]),onClick:g=(()=>{}),getHref:f=(()=>{}),getIcon:b=(()=>{})}){const v=h(t),y=i(t),x=s(t),w=m(t),k=b(t),_=w&&y?(0,n.cx)(c,(e=>n.css`
  &::before {
    z-index: 5;
    label: tree-node-line-level-${e};
    border-left: 1px solid #555;
    content: '';
    left: ${23+14*e}px;
    position: absolute;
    top: 2.35rem;
    height: calc(100% - 2.35rem);
    flex-shrink: 0;
  }
`)(o)):c,O=f(t),P=a(t),j=!(w||void 0!==k||0===o);return r.default.createElement("div",{className:_},r.default.createElement("a",{className:l(o,x),href:O,onClick:()=>g(t,y)},r.default.createElement("span",{className:d},w&&r.default.createElement(p,{isEmpty:0===v.length,isOpen:y}),void 0===k?null:r.default.createElement(k,null),j?r.default.createElement("span",{className:u},P):r.default.createElement("span",null,P))),y&&v.map(((t,n)=>r.default.createElement(e,{key:`${n}-${P}`,value:t,level:o+1,getLabel:a,getHref:f,isContainer:m,getChildren:h,isOpen:i,isActive:s,onClick:g}))))}},98452:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const a=o(96486),n=o(19446);t.createPrismTheme=function(e,t){const o={'pre[class*="language-"]':{backgroundColor:t,borderRadius:n.theme.spacing.zero,padding:n.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:n.theme.spacing.zero,margin:n.theme.spacing.zero,fontSize:n.theme.fontSize.code,fontFamily:n.theme.fontFamily.monospace}},r=(0,a.cloneDeep)(e);return(0,a.values)(r).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${n.theme.spacing.zero} ${n.theme.spacing.zero} ${n.theme.spacing.xxs}`,e.fontSize=n.theme.fontSize.code,e.fontFamily=n.theme.fontFamily.monospace})),(0,a.merge)(r,o)}},14757:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,o,a){return void 0!==o&&void 0===a?[o,t/e*o]:void 0!==a&&void 0===o?[a,e/t*a]:void 0!==o&&void 0!==a?[o,a]:[e,t]}},63413:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const a=o(26729),n=o(80887),r=o(19446);t.globalStyles=a.css`
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

    @media ${n.breakpoints.tablet} {
      font-size: 120%;
    }

    @media ${n.breakpoints.phone} {
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
    height: 14px;
  }

  *::-webkit-scrollbar-track {
    background: ${r.theme.colors.dark5};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${r.theme.colors.dark2};
    border-radius: 7px;
    border: 2px solid ${r.theme.colors.dark5};
  }
  *::-webkit-scrollbar-corner {
    background: ${r.theme.colors.dark5};
  }
`},77255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,t.links={docs:()=>"/docs/documentation",doc:e=>`/docs/documentation/${e}`,editor:()=>"/docs/editor",index:()=>"/docs"}},82509:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdownPages=void 0,t.markdownPages={customGeneratorsPage:{bundle:"documentation-CustomGenerators",name:"Custom Generators",description:"In this guide you'll learn how to create custom generators using Oats",importPath:"src/bundles/documentation/DocumentationBundle_CustomGenerators.tsx",md:"CustomGenerators"},generatePage:{bundle:"documentation-Generate",name:"Generate",description:"In this guide you'll learn how the generator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Generate.tsx",md:"Generate"},openApi101Page:{bundle:"documentation-OpenAPI101",name:"OpenAPI 101",description:"In this guide I'll share some DOs and DON'Ts, when constructing an OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_OpenAPI101.tsx",md:"OpenAPI101"},readPage:{bundle:"documentation-Read",name:"Read",description:"In this guide you'll learn how the reader step works.",importPath:"src/bundles/documentation/DocumentationBundle_Read.tsx",md:"Read"},sdkErrorHandlingPage:{bundle:"documentation-SdkErrorHandling",name:"Error handling",description:"In this example you'll learn the recommended approach to handle errors using the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkErrorHandling.tsx",md:"SdkErrorHandling"},sdkGettingStartedPage:{bundle:"documentation-SdkGettingStarted",name:"Getting started",description:"In this guide you'll learn how to generate an SDK and (necessary related code) based on your OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_SdkGettingStarted.tsx",md:"SdkGettingStarted"},sdkTypesPage:{bundle:"documentation-SdkTypes",name:"SDK related types",description:"This guide will showcase the main types generated for the client side.",importPath:"src/bundles/documentation/DocumentationBundle_SdkTypes.tsx",md:"SdkTypes"},sdkUsagePage:{bundle:"documentation-SdkUsage",name:"SDK usage",description:"In this guide you'll learn the basic usage of the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkUsage.tsx",md:"SdkUsage"},serverApiExamplePage:{bundle:"documentation-ServerApiExample",name:"Example API",description:"In this guide you'll see a basic API implementation using the book store example.",importPath:"src/bundles/documentation/DocumentationBundle_ServerApiExample.tsx",md:"ServerApiExample"},serverCorsPage:{bundle:"documentation-ServerCors",name:"Implement CORS",description:"In this guide you'll learn how to make your Oats and express based server CORS enabled.",importPath:"src/bundles/documentation/DocumentationBundle_ServerCors.tsx",md:"ServerCors"},serverGettingStartedPage:{bundle:"documentation-ServerGettingStarted",name:"Getting started",description:"This guide will help you getting started with generating server side code using Oats.",importPath:"src/bundles/documentation/DocumentationBundle_ServerGettingStarted.tsx",md:"ServerGettingStarted"},serverSetupPage:{bundle:"documentation-ServerSetup",name:"Express server setup",description:"In this guide you'll learn how to set up generated Oats code with your existing express backend.",importPath:"src/bundles/documentation/DocumentationBundle_ServerSetup.tsx",md:"ServerSetup"},serverTypesPage:{bundle:"documentation-ServerTypes",name:"Server types",description:"This guide will showcase the main types generated for the server side.",importPath:"src/bundles/documentation/DocumentationBundle_ServerTypes.tsx",md:"ServerTypes"},validatePage:{bundle:"documentation-Validate",name:"Validate",description:"In this guide you'll learn how the validator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Validate.tsx",md:"Validate"},welcomePage:{bundle:"documentation-Welcome",name:"Welcome to the docs!",description:"Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.",importPath:"src/bundles/documentation/DocumentationBundle_Welcome.tsx",md:"Welcome"},writePage:{bundle:"documentation-Write",name:"Write",description:"In this guide you'll learn how the writer step works.",importPath:"src/bundles/documentation/DocumentationBundle_Write.tsx",md:"Write"}}},42946:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const a=o(96486),n=o(82509),r=[{name:"General",useNavigation:!1,items:[n.markdownPages.welcomePage,n.markdownPages.openApi101Page]},{name:"Server Guide",useNavigation:!0,items:[n.markdownPages.serverGettingStartedPage,n.markdownPages.serverTypesPage,n.markdownPages.serverSetupPage,n.markdownPages.serverApiExamplePage,n.markdownPages.serverCorsPage]},{name:"(Client) SDK Guide",useNavigation:!0,items:[n.markdownPages.sdkGettingStartedPage,n.markdownPages.sdkTypesPage,n.markdownPages.sdkUsagePage,n.markdownPages.sdkErrorHandlingPage]},{name:"Generator api",useNavigation:!0,items:[n.markdownPages.readPage,n.markdownPages.validatePage,n.markdownPages.generatePage,n.markdownPages.customGeneratorsPage,n.markdownPages.writePage]}];t.sections=r,t.docs=(0,a.flatMap)(t.sections,(e=>e.items))},11149:function(e,t,o){var a=this&&this.__createBinding||(Object.create?function(e,t,o,a){void 0===a&&(a=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,a,n)}:function(e,t,o,a){void 0===a&&(a=o),e[a]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&a(t,e,o);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const s=o(18592),i=o(96486),c=r(o(67294)),l=o(69274),d=o(3930),u=o(77255),p=o(19446),m=o(10603),h=s.css`
  padding: ${p.theme.spacing.l};
  display: flex;
  flex-direction: column;
  gap: ${p.theme.spacing.l};
`,g=s.css`
  display: flex;
  flex-direction: row;
  align-items: center;
`,f=s.css`
  padding: ${p.theme.spacing.xxm};
  background-color: ${p.theme.colors.dark2};
  border-radius: ${p.theme.spacing.m};
  color: ${p.theme.colors.muted};
`,b=s.css`
  flex: ${p.theme.flex.grow};
`,v=s.css`
  font-weight: bold;
`;function y(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,o]=(0,m.useNeighbours)(),a=!(0,i.isNil)(e),n=!(0,i.isNil)(o),r=!(0,i.isNil)(t),s=(0,c.useMemo)((()=>{if(!(0,i.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${y(t.name)}+(in+${t.md}.md)&body=${y("Please describe the issue!")}`}),[t]);return a||n||r?c.default.createElement("div",{className:h},(a||n)&&c.default.createElement("div",{className:g},a&&c.default.createElement(d.Link,{href:u.links.doc(e.md),className:v},c.default.createElement(l.HiChevronLeft,null),e.name),c.default.createElement("div",{className:b}),n&&c.default.createElement(d.Link,{href:u.links.doc(o.md),className:v},o.name,c.default.createElement(l.HiChevronRight,null))),r&&c.default.createElement("div",{className:f},c.default.createElement("b",null,"Found an issue on this page?"),c.default.createElement("br",null),"Please let me know by ",c.default.createElement(d.Link,{href:s},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},97281:function(e,t,o){var a=this&&this.__createBinding||(Object.create?function(e,t,o,a){void 0===a&&(a=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,a,n)}:function(e,t,o,a){void 0===a&&(a=o),e[a]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&a(t,e,o);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const s=r(o(67294)),i=o(96487),c=o(21710),l=o(54711),d=o(42946);t.DocumentationMenu=()=>s.default.createElement(s.default.Fragment,null,s.default.createElement(c.SideBarSection,null,s.default.createElement(i.MenuTreeItem,{link:"index"}),s.default.createElement(i.MenuTreeItem,{link:"editor"})),d.sections.map(((e,t)=>s.default.createElement(s.Fragment,{key:e.name??`item-${t}`},s.default.createElement(c.SideBarSection,{title:e.name},e.items.map((e=>s.default.createElement(l.DocumentationTreeRoot,{node:e,key:e.md}))))))))},15529:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const n=o(18592),r=a(o(67294)),s=o(80887),i=o(98378),c=o(40704),l=o(7117),d=o(8015),u=o(86229),p=o(66118),m=o(19187),h=o(19446),g=o(97281),f=o(11149),b=o(49098),v=o(77255),y="docs",x=n.css`
  flex: ${h.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${h.theme.colors.muted};
  font-size: ${h.theme.fontSize.m};
  background-color: ${h.theme.colors.dark4};
`,w=()=>{const e=(0,l.useProvideMobileContext)();return r.default.createElement(l.MobileContext.Provider,{value:e},r.default.createElement(d.MobileHeaderWithOverlay,{name:y,version:!0,href:v.links.docs()},r.default.createElement(g.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>r.default.createElement(b.MarkdownContext.Provider,{value:{page:e,content:t}},r.default.createElement(i.DocContainer,null,r.default.createElement(u.SideBar,null,r.default.createElement(m.LogoContainer,null,r.default.createElement(p.Logo,{name:y,version:!0,href:v.links.docs()})),r.default.createElement(g.DocumentationMenu,null)),r.default.createElement("div",{className:x},r.default.createElement(s.BreakPoint,{Component:w,breakpoint:"phone"}),r.default.createElement(c.MarkdownView,{content:t}),r.default.createElement(f.DocumentationFooter,null))))},54711:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const n=a(o(67294)),r=o(82067),s=o(7117),i=o(49098),c=o(77255);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,s.useMobileContext)(),{page:o}=(0,i.useMarkdown)();return n.default.createElement(r.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===o,onClick:()=>t(!1),getHref:e=>c.links.doc(e.md)})}},49098:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const a=o(67294);t.MarkdownContext=(0,a.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,a.useContext)(t.MarkdownContext)},10603:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const a=o(96486),n=o(67294),r=o(42946),s=o(49098);function i(e,t,o=0){if((0,a.isNil)(e)||0!==o&&!e.useNavigation)return;const n=function(e,t){return t.items.findIndex((t=>t.md===e))}(t,e)+o;return e.items[n]}t.useNeighbours=function(){const{page:e}=(0,s.useMarkdown)(),t=(0,n.useMemo)((()=>function(e){return r.sections.find((t=>t.items.some((t=>t.md===e))))}(e)),[e]),o=(0,n.useMemo)((()=>i(t,e)),[e,t]);return[(0,n.useMemo)((()=>i(t,e,-1)),[e,t]),o,(0,n.useMemo)((()=>i(t,e,1)),[e,t])]}},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444",transparentWhite:"rgba(255, 255, 255, 0.2)"},fontSize:{code:"1.1rem",xxs:"0.85rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=38251)}]);
//# sourceMappingURL=documentation-Generate.bundle.js.map