"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[482],{97292:(e,t,o)=>{o.r(t),o.d(t,{default:()=>n});const n="# Server types\n\nThis guide will showcase the main types generated for the server side. A big chunk of the generated types is the same as for the client side (JSON schema based types and parameter types), so in this chapter I'm highlighting the differences.\n\n## The API type\n\nThe most important type on the server side is the API type. You'll need an implementation of this type (can be a class or a plain object, if you don't need to share context), that will carry all the business logic for your server. How you split up logic here is completely up to you. In our example the API type can be found under `src/generated/api`. The type itself, `BookStoreApi.ts` will look something like this:\n\n```typescript\nimport { AddBookServerRequest } from '../requests/AddBookServerRequest'\nimport { GetBookServerRequest } from '../requests/GetBookServerRequest'\nimport { GetBooksServerRequest } from '../requests/GetBooksServerRequest'\nimport { AddBookServerResponse } from '../responses/AddBookServerResponse'\nimport { GetBookServerResponse } from '../responses/GetBookServerResponse'\nimport { GetBooksServerResponse } from '../responses/GetBooksServerResponse'\n\nexport type BookStoreApi = {\n  /**\n   * Returns a list of books, can be paginated\n   */\n  getBooks(request: GetBooksServerRequest): Promise<GetBooksServerResponse>\n  /**\n   * Creates a new book based on the request body.\n   */\n  addBook(request: AddBookServerRequest): Promise<AddBookServerResponse>\n  /**\n   * Returns the book associated with the given bookId\n   */\n  getBook(request: GetBookServerRequest): Promise<GetBookServerResponse>\n}\n```\n\nIf you have checked out the SDK guide, it may look familiar and that is no accident. The main difference is, that we have separate request and response types for the API type. Let's check out why we have these differences!\n\n## (Server) Request types\n\nRequest types aim to encapsulate all input that the caller has provided for a specific request. This includes:\n\n- The request `body` (along with its `mimeType`)\n- The `query` parameters\n- The `path` parameters\n- The request `headers`\n- The `cookies` sent back by the browser (this is unique to the server request, as browsers can't directly set cookie headers)\n\nEach operation has it's dedicated server request type, with **only** the parameters, the source OpenAPI document describes.\n\nAn example from the book-store sample, where we have `headers` and `query` parameters:\n\n```typescript\nimport { Try } from '@oats-ts/openapi-runtime'\nimport { GetBooksQueryParameters } from '../parameters/GetBooksQueryParameters'\nimport { GetBooksRequestHeaderParameters } from '../parameters/GetBooksRequestHeaderParameters'\n\nexport type GetBooksServerRequest = {\n  headers: Try<GetBooksRequestHeaderParameters>\n  query: Try<GetBooksQueryParameters>\n}\n```\n\nAn example, where we have a request `body` (along with it's `mimeType`):\n\n```typescript\nimport { Try } from '@oats-ts/openapi-runtime'\nimport { Book } from '../types/Book'\n\nexport type AddBookServerRequest = {\n  mimeType: 'application/json'\n  body: Try<Book>\n}\n```\n\nAnd another example where we have `path` parameters:\n\n```typescript\nimport { Try } from '@oats-ts/openapi-runtime'\nimport { GetBookPathParameters } from '../parameters/GetBookPathParameters'\n\nexport type GetBookServerRequest = {\n  path: Try<GetBookPathParameters>\n}\n```\n\n### The Try type\n\nWhile on the client (SDK) side we are building the request ourselves, on the server side we need to prepare for missing or malformed input parameters. This is true for all of the above parameters. Since all parameters can be automatically parsed, I needed to find a way to communicate possible errors clearly, and let the user of the generated code decide what should happen in case of errors.\n\nThis is why the `Try` type was introduced, that wraps each field of the generated server requests. This type exists, as Typescript doesn't have [typed caches](https://github.com/microsoft/TypeScript/issues/8677) (nor [typed promise rejections](https://github.com/microsoft/TypeScript/issues/6283)), so the `Try` type encapsulates a \"fail-able\" value, that can be either a `Success` of a `Failure`. It has the appropriate type guards `isSuccess` and `isFailure` respectively, which are exposed by the `@oats-ts/openapi-runtime` package. A `Success` has a generic `data` field, and a `Failure` has an `issues` field of `Issue[]` type, that contains the array of issues that caused the value to be a `Failure`.\n\n## (Server) Response types\n\nServer response types aim to encapsulate the responses defined in your source OpenAPI document without ambiguity. For each of the API methods you need to return eventually a `Promise` of the appropriate server response type. Server response types can have the following fields (depending how your OpenAPI document defines responses):\n\n- The `statusCode`\n- The response `body` (along with its `mimeType`)\n- The response `headers`\n- The `cookies` set by the server\n\nAs an example, let's look at the response type used for the `getBooks` operation, called `GetBooksResponse`:\n\n```typescript\nimport { GetBooks200ResponseHeaderParameters } from '../parameters/GetBooks200ResponseHeaderParameters'\nimport { AppError } from '../types/AppError'\nimport { Book } from '../types/Book'\n\nexport type GetBooksServerResponse =\n  | {\n      statusCode: 200\n      mimeType: 'application/json'\n      body: Book[]\n      headers: GetBooks200ResponseHeaderParameters\n    }\n  | {\n      statusCode: 400\n      mimeType: 'application/json'\n      body: AppError[]\n    }\n  | {\n      statusCode: 500\n      mimeType: 'application/json'\n      body: AppError[]\n    }\n```\n\nSince it is a union type of all the different responses, and they are discriminated by the `statusCode` and `mimeType` fields, you can't mix up which `statusCode` belongs with which response `body`, `headers` or `cookies`.\n\n**Tip:** When returning a response, always define the `statusCode` and `mimeType` first, as they narrow down the type of the rest of the fields, and you get better content assist immediately.\n"},80887:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const s=a(o(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:o})=>{const[n,r]=(0,s.useState)((()=>window.matchMedia(t.breakpoints[o]).matches));return(0,s.useEffect)((()=>{window.matchMedia(t.breakpoints[o]).addEventListener("change",(e=>r(e.matches)))}),[]),n?s.default.createElement(e,null):null}},16339:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(o(67294)),a=o(20745),s=o(15529),i=n(o(97292));(0,a.createRoot)(document.getElementById("root")).render(r.default.createElement(s.DocumentationPage,{page:"ServerTypes",content:i.default}))},4074:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const r=o(18592),a=n(o(67294)),s=o(19446),i=r.css`
  font-size: ${s.theme.fontSize.code};
  color: ${s.theme.colors.text};
  background-color: ${s.theme.colors.dark1};
  padding: ${s.theme.spacing.xxxs} ${s.theme.spacing.xxs};
  border-radius: ${s.theme.spacing.xs};
`;t.Code=({className:e,children:t,...o})=>a.default.createElement("code",{className:(0,r.cx)(i,e),...o},t)},98378:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const r=o(18592),a=o(26729),s=n(o(67294)),i=o(63413),l=o(19446),d=r.css`
  label: doc-container;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  margin: ${l.theme.spacing.zero};
  padding: ${l.theme.spacing.zero};
  background-color: ${l.theme.colors.dark3};
`;t.DocContainer=({children:e})=>s.default.createElement(s.default.Fragment,null,s.default.createElement(a.Global,{styles:i.globalStyles}),s.default.createElement("div",{className:d},e))},17746:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HomeTreeRoot=void 0;const r=n(o(67294)),a=o(69274),s=o(77255),i=o(7117),l=o(82067);t.HomeTreeRoot=()=>{const{setMenuOpen:e}=(0,i.useMobileContext)();return r.default.createElement(l.TreeNode,{value:void 0,level:0,getIcon:()=>a.HiHome,getLabel:()=>"Home",isActive:()=>!1,onClick:()=>e(!1),getHref:()=>s.links.index()})}},3930:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const r=n(o(67294)),a=o(18592),s=o(19446),i=o(96486),l=a.css`
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
`;t.Link=({children:e,className:t,onClick:o,...n})=>(0,i.isNil)(o)?r.default.createElement("a",{className:(0,a.cx)(l,t),...n},e):r.default.createElement("span",{className:(0,a.cx)(l,t),onClick:o,...n},e)},66118:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const r=o(18592),a=o(67535),s=o(96486),i=n(o(67294)),l=o(19446),d=o(20519),c=r.css`
  label: side-bar-logo;
  display: flex;
  gap: ${l.theme.spacing.m};
  align-items: center;
  text-decoration: none;
`,u=r.css`
  display: flex;
  flex-direction: column;
`,m=r.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: ${l.theme.spacing.zero};
  padding: ${l.theme.spacing.zero};
  font-size: ${l.theme.fontSize.l};
  color: ${l.theme.colors.text};
`,p=r.css`
  color: ${l.theme.colors.muted};
`,h=r.css`
  font-size: ${l.theme.fontSize.s};
  color: ${l.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:o})=>i.default.createElement("a",{className:c,href:o},i.default.createElement(d.SvgLogo,{width:60}),i.default.createElement("div",{className:u},i.default.createElement("h1",{className:m},"Oats ",(0,s.isNil)(e)?null:i.default.createElement("span",{className:p},e)),t&&i.default.createElement("span",{className:h},"v",a.version)))},19187:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const r=o(18592),a=n(o(67294)),s=o(80887),i=o(19446),l=r.css`
  margin: ${i.theme.spacing.m} ${i.theme.spacing.m} ${i.theme.spacing.xxxl} ${i.theme.spacing.m};
  @media ${s.breakpoints.phone} {
    margin: ${i.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>a.default.createElement("div",{className:l},e)},40704:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const i=o(18592),l=o(96486),d=s(o(67294)),c=a(o(23209)),u=s(o(34112)),m=o(82509),p=o(77255),h=o(19446),f=o(4074),g=o(3930),b=o(44702),v=o(66999),y=i.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.l};
  margin-top: ${h.theme.spacing.zero};
`,k=i.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.xm};
`,x=i.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.m};
`,_=i.css`
  margin: ${h.theme.spacing.l};
`,w=Object.values(m.markdownPages),P=e=>{const t=w.find((t=>e.startsWith(t.md)));return(0,l.isNil)(t)?(0,c.uriTransformer)(e):p.links.doc(t.md)},S=[u.default],$={h1:({children:e})=>d.default.createElement("h1",{className:y},e),h2:({children:e})=>d.default.createElement("h2",{className:k},e),h3:({children:e})=>d.default.createElement("h3",{className:x},e),table:({children:e})=>d.default.createElement(v.Table,null,e),tr:({children:e,isHeader:t})=>d.default.createElement(v.Tr,{isHeader:t},e),th:({children:e})=>d.default.createElement(v.Th,null,e),td:({children:e})=>d.default.createElement(v.Td,null,e),a:({href:e,children:t})=>d.default.createElement(g.Link,{href:e},t),code({node:e,inline:t,className:o,children:n,...r}){const a=/language-(\w+)/.exec(o||"");return null===a||t?d.default.createElement(f.Code,{...r},n):d.default.createElement(b.SyntaxHighlighter,{language:a[1],kind:"docs"},String(n).replace(/\n$/,""))}};t.MarkdownView=({content:e})=>d.default.createElement(c.default,{remarkPlugins:S,components:$,transformLinkUri:P,className:_},e??"")},7117:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const n=o(96486),r=o(67294);t.MobileContext=(0,r.createContext)({isMenuOpen:!1,setMenuOpen:n.noop}),t.useMobileContext=()=>(0,r.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,r.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},35625:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const r=o(18592),a=n(o(67294)),s=o(19446),i=o(19187),l=o(66118),d=r.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,c=r.css`
  color: ${s.theme.colors.muted};
  font-size: ${s.theme.fontSize.xxl};
  cursor: pointer;
  margin: ${s.theme.spacing.m};
  &:hover {
    color: ${s.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:o,actionIcon:n,onAction:r})=>a.default.createElement("div",{className:d},a.default.createElement(i.LogoContainer,null,a.default.createElement(l.Logo,{name:e,version:t,href:o})),a.default.createElement(n,{className:c,onClick:r}))},8015:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const r=n(o(67294)),a=o(69274),s=o(7117),i=o(35625),l=o(99102);t.MobileHeaderWithOverlay=({name:e,version:t,href:o,children:n})=>{const{setMenuOpen:d}=(0,s.useMobileContext)();return r.default.createElement(r.default.Fragment,null,r.default.createElement(i.MobileHeader,{href:o,name:e,version:t,actionIcon:a.HiBars3,onAction:()=>d(!0)}),r.default.createElement(l.MobileOverlay,{href:o,name:e,version:t},n))}},99102:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const r=o(18592),a=n(o(67294)),s=o(69274),i=o(19446),l=o(7117),d=o(35625),c=r.css`
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
`,u=r.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:o,version:n})=>{const{isMenuOpen:i,setMenuOpen:m}=(0,l.useMobileContext)();return a.default.createElement("div",{className:(0,r.cx)(c,i?void 0:u)},a.default.createElement(d.MobileHeader,{href:o,actionIcon:s.HiXMark,onAction:()=>m(!1),name:e,version:n}),t)}},86229:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const r=o(18592),a=n(o(67294)),s=o(80887),i=o(19446),l=r.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${i.theme.colors.dark2};
  @media ${s.breakpoints.phone} {
    display: none;
  }
`;t.SideBar=({children:e})=>a.default.createElement("div",{className:l},e)},21710:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const r=o(18592),a=o(96486),s=n(o(67294)),i=o(19446),l=r.css`
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: ${i.theme.spacing.m} ${i.theme.spacing.m};
`,d=r.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${i.theme.spacing.xxm};
`;t.SideBarSection=({children:e,title:t})=>s.default.createElement(s.default.Fragment,null,(0,a.isNil)(t)?null:s.default.createElement("div",{className:l},t),s.default.createElement("div",{className:d},e))},20519:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const r=n(o(67294)),a=o(19446),s=o(14757);t.SvgLogo=({color:e=a.theme.colors.green,width:t,height:o})=>{const[n,i]=(0,s.getSizeWithAspectRatio)(172.439,111.543,t,o);return r.default.createElement("svg",{width:n,height:i,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},44702:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const s=o(18592),i=a(o(67294)),l=o(67361),d=a(o(29012)),c=o(74855),u=o(19446),m=o(69274),p=o(96486),h=o(98452),f=(0,h.createPrismTheme)(d.vscDarkPlus,u.theme.colors.dark1),g=(0,h.createPrismTheme)(d.vscDarkPlus,u.theme.colors.dark4),b=s.css`
  label: syntax-hl-copy;
  top: ${u.theme.spacing.m};
  right: ${u.theme.spacing.m};
  position: absolute;
  display: flex;
  gap: ${u.theme.spacing.s};
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear, opacity 150ms linear;
  padding: ${u.theme.spacing.s} ${u.theme.spacing.m};
  border: unset;
  border-radius: ${u.theme.spacing.s};
  font-weight: 400;
  cursor: pointer;
  font-size: ${u.theme.fontSize.m};
  background-color: ${u.theme.colors.dark2};
  color: ${u.theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) ${u.theme.spacing.zero} ${u.theme.spacing.xs} ${u.theme.spacing.s};
`,v=s.css`
  label: docs-syntax-hl;
  border-radius: ${u.theme.spacing.m};
  padding: ${u.theme.spacing.zero};
  /** TODO */
  margin: ${u.theme.spacing.xm} ${u.theme.spacing.zero};
  overflow: hidden;
  position: relative;
  * {
    font-family: 'Source Code Pro', monospace;
    font-size: ${u.theme.fontSize.code};
  }
`,y=s.css`
  position: relative;
  flex-grow: ${u.theme.flex.grow};
  height: 100vh;

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:o,kind:n})=>{const[r,a]=(0,i.useState)(!1),[d,u]=(0,i.useState)(!1),[h,k]=(0,i.useState)(void 0),x=(0,s.cx)("editor"===n?y:v),_="editor"===n?g:f,w=(0,s.cx)(b);return i.default.createElement("div",{className:x,onMouseEnter:()=>{u(!0)},onMouseLeave:()=>{u(!1)}},i.default.createElement(l.Prism,{language:t,style:_,wrapLongLines:o,showLineNumbers:"editor"===n},e),i.default.createElement(c.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,p.isNil)(h)||(clearTimeout(h),k(void 0)),a(t),k(setTimeout((()=>{a(!1)}),2e3))}},i.default.createElement("button",{className:w,style:{opacity:d?1:0}},r?i.default.createElement(m.HiCheck,null):i.default.createElement(m.HiClipboard,null))))}},66999:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const r=o(18592),a=n(o(67294)),s=o(19446),i=r.css`
  border-radius: ${s.theme.spacing.m};
  border: ${s.theme.spacing.xxxs} solid ${s.theme.colors.dark1};
  margin: 1px;
`,l=r.css`
  border-collapse: collapse;
  width: 100%;
  border-width: ${s.theme.spacing.zero};
`;t.Table=({children:e,className:t,...o})=>a.default.createElement("div",{className:i},a.default.createElement("table",{className:(0,r.cx)(l,t),...o},e));const d=r.css`
  border: ${s.theme.spacing.xxxs} solid ${s.theme.colors.dark1};
  border-left-width: ${s.theme.spacing.zero};
  border-right-width: ${s.theme.spacing.zero};
  &:last-of-type {
    border-bottom-width: ${s.theme.spacing.zero};
  }
`,c=r.css`
  background-color: ${s.theme.colors.dark1};
  border-width: ${s.theme.spacing.zero};
  border-radius: ${s.theme.spacing.m};
`;t.Tr=({children:e,isHeader:t,className:o,...n})=>{const s=(0,r.cx)(t?c:d,o);return a.default.createElement("tr",{...n,className:s},e)};const u=r.css`
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
`;t.Th=({children:e,className:t,...o})=>a.default.createElement("th",{...o,className:(0,r.cx)(u,t)},e);const m=r.css`
  padding: ${s.theme.spacing.m};
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.muted};
`;t.Td=({children:e,className:t,...o})=>a.default.createElement("td",{...o,className:(0,r.cx)(m,t)},e);const p=r.css`
  border-width: ${s.theme.spacing.zero};
`;t.THead=({children:e,className:t,...o})=>a.default.createElement("thead",{...o,className:(0,r.cx)(p,t)},e);const h=r.css`
  border-width: ${s.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...o})=>a.default.createElement("tbody",{...o,className:(0,r.cx)(h,t)},e)},82067:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const r=o(18592),a=n(o(67294)),s=o(69274),i=o(19446),l=r.css`
  position: relative;
`,d=(e,t)=>r.css`
  label: tree-node-content-${e};
  display: flex;
  flex-direction: row;
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
`,c=r.css`
  flex: ${i.theme.flex.grow};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${i.theme.spacing.xxs};
`,u=({isContainer:e,isOpen:t,isEmpty:o})=>e?o?a.default.createElement(s.HiChevronLeft,null):t?a.default.createElement(s.HiChevronDown,null):a.default.createElement(s.HiChevronRight,null):null;t.TreeNode=function e({value:t,level:o,getLabel:n,isActive:s=(()=>!1),isOpen:m=(()=>!1),isContainer:p=(()=>!1),getChildren:h=(()=>[]),onClick:f=(()=>{}),getHref:g=(()=>{}),getIcon:b=(()=>{})}){const v=h(t),y=m(t),k=s(t),x=p(t),_=b(t),w=x&&y?(0,r.cx)(l,(e=>r.css`
  &::before {
    z-index: 5;
    label: tree-node-line-${e};
    border-left: 1px solid #555;
    content: '';
    left: ${22+14*e}px;
    position: absolute;
    top: ${i.theme.spacing.xxl};
    height: calc(100% - ${i.theme.spacing.xxl});
  }
`)(o)):l,P=g(t),S=n(t);return a.default.createElement("div",{className:w},a.default.createElement("a",{className:d(o,k),href:P,onClick:()=>f(t,y)},a.default.createElement("span",{className:c},a.default.createElement(u,{isContainer:x,isEmpty:0===v.length,isOpen:y}),void 0===_?null:a.default.createElement(_,null),S)),y&&v.map(((t,r)=>a.default.createElement(e,{key:`${r}-${S}`,value:t,level:o+1,getLabel:n,getHref:g,isContainer:p,getChildren:h,isOpen:m,isActive:s,onClick:f}))))}},98452:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const n=o(96486),r=o(19446);t.createPrismTheme=function(e,t){const o={'pre[class*="language-"]':{backgroundColor:t,borderRadius:r.theme.spacing.zero,padding:r.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:r.theme.spacing.zero,margin:r.theme.spacing.zero,fontSize:r.theme.fontSize.code,fontFamily:r.theme.fontFamily.monospace}},a=(0,n.cloneDeep)(e);return(0,n.values)(a).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${r.theme.spacing.zero} ${r.theme.spacing.zero} ${r.theme.spacing.xxs}`,e.fontSize=r.theme.fontSize.code,e.fontFamily=r.theme.fontFamily.monospace})),(0,n.merge)(a,o)}},14757:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,o,n){return void 0!==o&&void 0===n?[o,t/e*o]:void 0!==n&&void 0===o?[n,e/t*n]:void 0!==o&&void 0!==n?[o,n]:[e,t]}},63413:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const n=o(26729),r=o(80887),a=o(19446);t.globalStyles=n.css`
  #root {
    margin: ${a.theme.spacing.zero};
    padding: ${a.theme.spacing.zero};
    width: 100vw;
    height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${a.theme.fontFamily.sansSerif};
  }

  html {
    font-size: 100%;

    @media ${r.breakpoints.tablet} {
      font-size: 120%;
    }

    @media ${r.breakpoints.phone} {
      font-size: 200%;
    }
  }

  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${a.theme.colors.dark2} ${a.theme.colors.dark5};
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 14px;
    height: 14px;
  }

  *::-webkit-scrollbar-track {
    background: ${a.theme.colors.dark5};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${a.theme.colors.dark2};
    border-radius: 7px;
    border: 2px solid ${a.theme.colors.dark5};
  }
  *::-webkit-scrollbar-corner {
    background: ${a.theme.colors.dark5};
  }
`},77255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,t.links={docs:()=>"/docs/documentation",doc:e=>`/docs/documentation/${e}`,editor:()=>"/docs/editor",index:()=>"/docs"}},82509:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdownPages=void 0,t.markdownPages={commonMistakesPage:{bundle:"documentation-CommonMistakes",name:"Common mistakes",description:"OpenAPI it is an extremely loosely defined spec, that in turn lets you define your API and your schemas in many different ways. In this article Im listing the most common mistakes that you can make, that doesnt make your OpenAPI document invalid, but effectively prevents tooling from outputing usable documentation or code.",importPath:"src/bundles/documentation/DocumentationBundle_CommonMistakes.tsx",md:"CommonMistakes"},customGeneratorsPage:{bundle:"documentation-CustomGenerators",name:"Custom Generators",description:"Documentation is in progress.",importPath:"src/bundles/documentation/DocumentationBundle_CustomGenerators.tsx",md:"CustomGenerators"},generatePage:{bundle:"documentation-Generate",name:"Generate",description:"The generator step is responsible for taking the validated output of the [reader](OpenAPI-Reader), and turning it into an intermediate representation (Typescript [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) in this case), that can be then turned into source code. The OpenAPI generator itself doesnt do much, the work is distributed to single responsiblity generators, that are responsible for generating one thing (like types from the JSON schemas, or serializers for parameters). They also provide means for other generators to access references to their generated content.",importPath:"src/bundles/documentation/DocumentationBundle_Generate.tsx",md:"Generate"},gettingStartedPage:{bundle:"documentation-GettingStarted",name:"Getting Started",description:"In this guide youll learn how to set up and generate with Oats.",importPath:"src/bundles/documentation/DocumentationBundle_GettingStarted.tsx",md:"GettingStarted"},homePage:{bundle:"documentation-Home",name:"🌱 oats",description:"This project aims to provide a solution for generating quality Typescript code from API-describing documents. The only supported format currently is [OpenAPI 3.x](https://www.openapis.org), but there are plans to introduce generators for [AsyncAPI](https://www.asyncapi.com/) as well.",importPath:"src/bundles/documentation/DocumentationBundle_Home.tsx",md:"Home"},readPage:{bundle:"documentation-Read",name:"Read",description:"The reader step is responsible for",importPath:"src/bundles/documentation/DocumentationBundle_Read.tsx",md:"Read"},sdkErrorHandlingPage:{bundle:"documentation-SdkErrorHandling",name:"Error handling",description:"Oats generated SDKs dont `throw` (or rather reject, as we are dealing with `Promise`s), unless the response is invalid according to the source OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_SdkErrorHandling.tsx",md:"SdkErrorHandling"},sdkGettingStartedPage:{bundle:"documentation-SdkGettingStarted",name:"Getting started (SDK)",description:"In this guide youll learn how to generate an SDK and (necessary related code) based on your OpenAPI document. As for all examples, we are going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example (so its recommended you try using this first, if you are unfamiliar with Oats)!",importPath:"src/bundles/documentation/DocumentationBundle_SdkGettingStarted.tsx",md:"SdkGettingStarted"},sdkTypesPage:{bundle:"documentation-SdkTypes",name:"SDK related types",description:"This guide will showcase the main types generated for the client side. A big chunk of the generated types is the same as for the server side (JSON schema based types and parameter types), so in this chapter Im highlighting the differences.",importPath:"src/bundles/documentation/DocumentationBundle_SdkTypes.tsx",md:"SdkTypes"},sdkUsagePage:{bundle:"documentation-SdkUsage",name:"SDK usage",description:"To start using the SDK, you will need an implementation of the previously described SDK type. Oats generates an SDK implementation class (`BookStoreSdkImpl` in our case), that you can find next to the SDK type (in `src/generated/sdk`).",importPath:"src/bundles/documentation/DocumentationBundle_SdkUsage.tsx",md:"SdkUsage"},serverApiImplPage:{bundle:"documentation-ServerApiImpl",name:"Example API implementation",description:"Lets go back to `BookStoreApiImpl` and implement some simple logic. In this guide Im going to store data in memory, but since all API methods return `Promise`s, you can use whatever data storage you choose.",importPath:"src/bundles/documentation/DocumentationBundle_ServerApiImpl.tsx",md:"ServerApiImpl"},serverCorsPage:{bundle:"documentation-ServerCors",name:"Implement CORS",description:"In this guide youll learn how to make your Oats+express based server CORS enabled.",importPath:"src/bundles/documentation/DocumentationBundle_ServerCors.tsx",md:"ServerCors"},serverGettingStartedPage:{bundle:"documentation-ServerGettingStarted",name:"Getting started (Server)",description:"This guide will help you getting started with generating server side code using Oats. As for all examples, we are going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example (so its recommended you try using this first, if you are unfamiliar with Oats)!",importPath:"src/bundles/documentation/DocumentationBundle_ServerGettingStarted.tsx",md:"ServerGettingStarted"},serverSetupPage:{bundle:"documentation-ServerSetup",name:"Express server setup",description:"Before we write any business logic, lets create a functional server that exposes the appropriate endpoints, and we can test it locally. This involves the following steps:",importPath:"src/bundles/documentation/DocumentationBundle_ServerSetup.tsx",md:"ServerSetup"},serverTypesPage:{bundle:"documentation-ServerTypes",name:"Server types",description:"This guide will showcase the main types generated for the server side. A big chunk of the generated types is the same as for the client side (JSON schema based types and parameter types), so in this chapter Im highlighting the differences.",importPath:"src/bundles/documentation/DocumentationBundle_ServerTypes.tsx",md:"ServerTypes"},validatePage:{bundle:"documentation-Validate",name:"Validate",description:"The valididator step is responsible for taking the output of the [reader](OpenAPI-Reader) step, and checking for structural and semantic errors.",importPath:"src/bundles/documentation/DocumentationBundle_Validate.tsx",md:"Validate"},welcomePage:{bundle:"documentation-Welcome",name:"Welcome to the docs!",description:"Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.",importPath:"src/bundles/documentation/DocumentationBundle_Welcome.tsx",md:"Welcome"},workflowPage:{bundle:"documentation-Workflow",name:"Workflow",description:"This guide will walk you through on how to get started with oats and OpenAPI.",importPath:"src/bundles/documentation/DocumentationBundle_Workflow.tsx",md:"Workflow"},writePage:{bundle:"documentation-Write",name:"Write",description:"The writer step is responsible for taking the output of the [generator step](OpenAPI-Generator) and writing its outputs to the disk. The typescript writer takes typescript `SourceFile`s (this is Typescripts in-memory representation of an AST + file location) and writes them to the desired location.",importPath:"src/bundles/documentation/DocumentationBundle_Write.tsx",md:"Write"}}},42946:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const n=o(96486),r=o(82509),a=[{items:[r.markdownPages.welcomePage]},{name:"Server Guide",items:[r.markdownPages.serverGettingStartedPage,r.markdownPages.serverTypesPage,r.markdownPages.serverSetupPage,r.markdownPages.serverApiImplPage,r.markdownPages.serverCorsPage]},{name:"(Client) SDK Guide",items:[r.markdownPages.sdkGettingStartedPage,r.markdownPages.sdkTypesPage,r.markdownPages.sdkUsagePage,r.markdownPages.sdkErrorHandlingPage]},{name:"Other Guides",items:[r.markdownPages.commonMistakesPage]},{name:"Generator api",items:[r.markdownPages.readPage,r.markdownPages.validatePage,r.markdownPages.generatePage,r.markdownPages.customGeneratorsPage,r.markdownPages.writePage]}];t.sections=a,t.docs=(0,n.flatMap)(t.sections,(e=>e.items))},11149:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const s=o(18592),i=o(96486),l=a(o(67294)),d=o(69274),c=o(3930),u=o(77255),m=o(19446),p=o(10603),h=s.css`
  padding: ${m.theme.spacing.l};
  display: flex;
  flex-direction: column;
  gap: ${m.theme.spacing.l};
`,f=s.css`
  display: flex;
  flex-direction: row;
  align-items: center;
`,g=s.css`
  padding: ${m.theme.spacing.xxm};
  background-color: ${m.theme.colors.dark2};
  border-radius: ${m.theme.spacing.m};
  color: ${m.theme.colors.muted};
`,b=s.css`
  flex: ${m.theme.flex.grow};
`,v=s.css`
  font-weight: bold;
`;function y(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,o]=(0,p.useNeighbours)(),n=!(0,i.isNil)(e),r=!(0,i.isNil)(o),a=!(0,i.isNil)(t),s=(0,l.useMemo)((()=>{if(!(0,i.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${y(t.name)}+(in+${t.md}.md)&body=${y("Please describe the issue with as much detail as possible!")}`}),[t]);return n||r||a?l.default.createElement("div",{className:h},(n||r)&&l.default.createElement("div",{className:f},n&&l.default.createElement(c.Link,{href:u.links.doc(e.md),className:v},l.default.createElement(d.HiChevronLeft,null),e.name),l.default.createElement("div",{className:b}),r&&l.default.createElement(c.Link,{href:u.links.doc(o.md),className:v},o.name,l.default.createElement(d.HiChevronRight,null))),a&&l.default.createElement("div",{className:g},l.default.createElement("b",null,"Found an issue with this page?"),l.default.createElement("br",null),"Please let me know by ",l.default.createElement(c.Link,{href:s},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},97281:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const s=a(o(67294)),i=o(17746),l=o(21710),d=o(54711),c=o(42946);t.DocumentationMenu=()=>s.default.createElement(s.default.Fragment,null,s.default.createElement(l.SideBarSection,null,s.default.createElement(i.HomeTreeRoot,null)),c.sections.map((e=>s.default.createElement(s.Fragment,{key:e.name},s.default.createElement(l.SideBarSection,{title:e.name},e.items.map((e=>s.default.createElement(d.DocumentationTreeRoot,{node:e,key:e.md}))))))))},15529:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const r=o(18592),a=n(o(67294)),s=o(80887),i=o(98378),l=o(40704),d=o(7117),c=o(8015),u=o(86229),m=o(66118),p=o(19187),h=o(19446),f=o(97281),g=o(11149),b=o(49098),v=o(77255),y="docs",k=r.css`
  flex: ${h.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${h.theme.colors.muted};
  font-size: ${h.theme.fontSize.m};
  background-color: ${h.theme.colors.dark4};
`,x=()=>{const e=(0,d.useProvideMobileContext)();return a.default.createElement(d.MobileContext.Provider,{value:e},a.default.createElement(c.MobileHeaderWithOverlay,{name:y,version:!0,href:v.links.docs()},a.default.createElement(f.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>a.default.createElement(b.MarkdownContext.Provider,{value:{page:e,content:t}},a.default.createElement(i.DocContainer,null,a.default.createElement(u.SideBar,null,a.default.createElement(p.LogoContainer,null,a.default.createElement(m.Logo,{name:y,version:!0,href:v.links.docs()})),a.default.createElement(f.DocumentationMenu,null)),a.default.createElement("div",{className:k},a.default.createElement(s.BreakPoint,{Component:x,breakpoint:"phone"}),a.default.createElement(l.MarkdownView,{content:t}),a.default.createElement(g.DocumentationFooter,null))))},54711:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const r=n(o(67294)),a=o(82067),s=o(7117),i=o(49098),l=o(77255);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,s.useMobileContext)(),{page:o}=(0,i.useMarkdown)();return r.default.createElement(a.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===o,onClick:()=>t(!1),getHref:e=>l.links.doc(e.md)})}},49098:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const n=o(67294);t.MarkdownContext=(0,n.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,n.useContext)(t.MarkdownContext)},10603:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const n=o(96486),r=o(67294),a=o(42946),s=o(49098);function i(e,t=0){const o=function(e){return a.sections.find((t=>t.items.some((t=>t.md===e))))}(e);if((0,n.isNil)(o))return;const r=function(e,t){return t.items.findIndex((t=>t.md===e))}(e,o)+t;return o.items[r]}t.useNeighbours=function(){const{page:e}=(0,s.useMarkdown)(),t=(0,r.useMemo)((()=>i(e)),[e]);return[(0,r.useMemo)((()=>i(e,-1)),[e]),t,(0,r.useMemo)((()=>i(e,1)),[e])]}},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=16339)}]);
//# sourceMappingURL=documentation-ServerTypes.bundle.js.map