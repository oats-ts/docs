"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[427],{28102:(e,t,o)=>{o.r(t),o.d(t,{default:()=>r});const r="# Implement CORS\n\nIn this guide you'll learn how to make your Oats+express based server CORS enabled.\n\n## What is CORS?\n\nCORS or cross site resource sharing is a mechanism used between HTTP servers and web browsers. When browser scripts make an HTTP request (using [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)) to a different origin, there are a few additional rules the server need to comply with in order to allow communication with the browser. If you want to learn more about CORS (which I would highly recommend) check out the [**official CORS docs**](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), but in this guide I summarized the most relevant parts.\n\n## What is a different origin?\n\nA different origin is defined as different domain or port.\n\n- So if you open `https://foo.com` in the browser, and it's script makes a request to `https://bar.com`, or even `https://foo.com:5000` (same domain, protocol, etc but different port), it counts as a cross origin request.\n- But from `https://foo.com` to `https://foo.com/api/something` or `https://foo.com/api/foo?foo=bar`, is the same origin, as only the path and query part of the URL are different.\n\nThis means if you are serving your frontend using the same express server (domain + port) as where you serve your API from, and you don't want to expose your API for other browser apps to be used, you are lucky, as you don't need to worry about the rest of this guide.\n\n## What are the CORS mechanics?\n\nThere are two ways the browser may inspect, if the request a client side script made is \"approved\" by the server or not.\n\n### 1. Simple requests\n\n`GET`, `POST` or `HEAD` request, without any extra request headers are called simple requests. In this case the browser simply hits your endpoint, and expects the response to have certain `Access-Control-*` response headers confirming, that the origin, the request is coming from is allowed. If it doesn't, the request will error out, and your client side code will not have access to the response.\n\n### 2. Pre-flight requests\n\nIn cases when you are using other request methods, or you want to send extra request headers, it is a pre-flighted request. In this case the client will first attempt a request to the same URL, but with the `OPTIONS` method, which is called a pre-flight request. In this request it communicates using certain `Access-Control-*` request headers, what method and optionally what request headers did you originally intend to use, from what origin. If the server sends back the appropriate response headers to this OPTIONS request, the client will then attempt to make the original request you intended to, otherwise it rejects your request, and your client side code will not have access to the response.\n\n## How does Oats help?\n\nOats can generate express `Router`s that deal with CORS, customized to your exact OpenAPI based backend. To enable this, you need to modify your generator preset a bit, as CORS is off by default. The minimum amount of configuration you need to provide for functional CORS is the allowed origins, but you can customize the full suite of CORS headers:\n\n```typescript\nconst oats = require('@oats-ts/openapi')\n\noats.generate({\n  logger: oats.loggers.simple(),\n  reader: oats.readers.https.json(\n    'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',\n  ),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    children: oats.presets.server({\n      cors: {\n        getAllowedOrigins: (path, method, operation) => ['http://localhost:5000'],\n        isMethodAllowed: (path, method, operation) => true,\n        isRequestHeaderAllowed: (header, path, method, operation) => true,\n        isResponseHeaderAllowed: (header, path, method, operation) => true,\n        isCredentialsAllowed: (path, method, operation) => false,\n        getMaxAge: (path, method, operation) => 10,\n      },\n    }),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n})\n```\n\n### Configuration\n\n- `getAllowedOrigins` **`(mandatory)`** - Either return an array of allowed origins, eg.: `['https://foo.com']`, or return a `boolean` to either allow or disallow any origin.\n- `isMethodAllowed` **`(optional)`** - Only called with `path`s and `method`s occuring in the OpenAPI document, and allows you to further restrict these. Return `true` to allow the given `path` and `method` combination (default) or `false` to disallow it.\n- `isRequestHeaderAllowed` and `isResponseHeaderAllowed` **`(optional)`** - Only called with headers (request or response respectively) that occur in your OpenAPI document, and allows you to further restrict them. Return `true` to allow given header for given path and method (default) or `false` to disallow it.\n- `isCredentialsAllowed` **`(optional)`** - Only called with `path`s and `method`s occuring in the OpenAPI document, and sets the `Access-Control-Allow-Credentials` header. This effectively gives cross-origin access to cookies set by CORS requests. Return `true` to allow this or `false` (default) to disallow\n- `getMaxAge` **`(optional)`** - Sets how long pre-flight requests can be cached (in seconds). By default caching is not specified.\n\n## Using the generated output\n\nIf you generate again with CORS enabled for the same document:\n\n- You'll have a new CORS configuration object, `bookStoreCorsConfiguration.ts`\n- Your express routers will now respond to simple CORS requests with the appropriate CORS headers using the above configuration\n- A new CORS router has been generated, responsible for handling the pre-flight `OPTIONS` requests, you'll need to add this router to your app.\n\nIf you followed the server guides so far, then the only thing you have to change is the commented lines:\n\n```typescript\n// createBookStoreApp.ts\nimport express from 'express'\nimport { ExpressServerAdapter } from '@oats-ts/openapi-express-server-adapter'\n\nimport { BookStoreApiImpl } from './BookStoreApiImpl'\nimport { createBookStoreAppRouter } from './generated/routers/createBookStoreAppRouter'\nimport { createBookStoreContextRouter } from './generated/routers/createBookStoreContextRouter'\n// This is new\nimport { createBookStoreCorsRouter } from './generated/routers/createBookStoreCorsRouter'\n\nexport function createBookStoreApp() {\n  const app = express()\n  app.use(json())\n\n  createBookStoreContextRouter(app, new BookStoreApiImpl(), new ExpressServerAdapter())\n  // This is new, make sure it's AFTER the Context router\n  createBookStoreCorsRouter(app)\n  createBookStoreAppRouter(app)\n\n  return app\n}\n```\n\nThat's it your server should be CORS enabled based on your OpenAPI document, respecting your restrictions, and using your origins.\n"},11761:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdown=void 0,t.markdown={CommonMistakes:"CommonMistakes",CustomGenerators:"CustomGenerators",Generate:"Generate",GettingStarted:"GettingStarted",Home:"Home",Read:"Read",SdkErrorHandling:"SdkErrorHandling",SdkGettingStarted:"SdkGettingStarted",SdkTypes:"SdkTypes",SdkUsage:"SdkUsage",ServerApiImpl:"ServerApiImpl",ServerCors:"ServerCors",ServerGettingStarted:"ServerGettingStarted",ServerSetup:"ServerSetup",ServerTypes:"ServerTypes",Validate:"Validate",Welcome:"Welcome",Workflow:"Workflow",Write:"Write"}},42946:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const r=o(96486),n=o(11761),a=[{items:[{md:"Welcome",name:"Welcome"}]},{name:"Server Guide",items:[{md:"ServerGettingStarted",name:"Getting started"},{md:"ServerTypes",name:"Server related types"},{md:"ServerSetup",name:"Express server setup"},{md:"ServerApiImpl",name:"API Example"},{md:"ServerCors",name:"Add CORS"}]},{name:"(Client) SDK Guide",items:[{md:"SdkGettingStarted",name:"Getting started"},{md:"SdkTypes",name:"SDK related types"},{md:"SdkUsage",name:"SDK usage"},{md:"SdkErrorHandling",name:"Error handling"}]},{name:"Other Guides",items:[{md:"CommonMistakes",name:"Common mistakes"}]},{name:"Generator api",items:[{md:"Read",name:"Reader"},{md:"Validate",name:"Validator"},{md:"Generate",name:"Generators"},{md:"CustomGenerators",name:"Custom generators"},{md:"Write",name:"Writer"}]}];!function(){const e=(0,r.flatMap)(a,(e=>e.items)).map((({md:e})=>e));(0,r.keys)(n.markdown).filter((t=>!e.includes(t))).map((e=>({md:e,name:e})))}(),t.sections=[...a],t.docs=(0,r.flatMap)(t.sections,(e=>e.items))},39226:function(e,t,o){var r=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,n)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&r(t,e,o);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const i=a(o(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:o})=>{const[r,n]=(0,i.useState)((()=>window.matchMedia(t.breakpoints[o]).matches));return(0,i.useEffect)((()=>{window.matchMedia(t.breakpoints[o]).addEventListener("change",(e=>n(e.matches)))}),[]),r?i.default.createElement(e,null):null}},41298:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const n=o(18592),a=r(o(67294)),i=o(61329),s=n.css`
  font-size: ${i.theme.fontSize.code};
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};
  padding: ${i.theme.spacing.xxxs} ${i.theme.spacing.xxs};
  border-radius: ${i.theme.spacing.xs};
`;t.Code=({className:e,children:t,...o})=>a.default.createElement("code",{className:(0,n.cx)(s,e),...o},t)},40782:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const n=o(18592),a=o(26729),i=r(o(67294)),s=o(72050),l=o(61329),c=n.css`
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
`;t.DocContainer=({children:e})=>i.default.createElement(i.default.Fragment,null,i.default.createElement(a.Global,{styles:s.globalStyles}),i.default.createElement("div",{className:c},e))},12259:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HomeTreeRoot=void 0;const n=r(o(67294)),a=o(69274),i=o(81911),s=o(5838);t.HomeTreeRoot=()=>{const{setMenuOpen:e}=(0,i.useMobileContext)();return n.default.createElement(s.TreeNode,{value:void 0,level:0,getIcon:()=>a.HiHome,getLabel:()=>"Home",isActive:()=>!1,onClick:()=>e(!1),getHref:()=>"/"})}},86299:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const n=r(o(67294)),a=o(18592),i=o(61329),s=o(96486),l=a.css`
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
`;t.Link=({children:e,className:t,onClick:o,...r})=>(0,s.isNil)(o)?n.default.createElement("a",{className:(0,a.cx)(l,t),...r},e):n.default.createElement("span",{className:(0,a.cx)(l,t),onClick:o,...r},e)},15435:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const n=o(18592),a=o(67535),i=o(96486),s=r(o(67294)),l=o(61329),c=o(79129),d=n.css`
  label: side-bar-logo;
  display: flex;
  gap: ${l.theme.spacing.m};
  align-items: center;
  text-decoration: none;
`,u=n.css`
  display: flex;
  flex-direction: column;
`,m=n.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: ${l.theme.spacing.zero};
  padding: ${l.theme.spacing.zero};
  font-size: ${l.theme.fontSize.l};
  color: ${l.theme.colors.text};
`,h=n.css`
  color: ${l.theme.colors.muted};
`,f=n.css`
  font-size: ${l.theme.fontSize.s};
  color: ${l.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:o})=>s.default.createElement("a",{className:d,href:o},s.default.createElement(c.SvgLogo,{width:60}),s.default.createElement("div",{className:u},s.default.createElement("h1",{className:m},"Oats ",(0,i.isNil)(e)?null:s.default.createElement("span",{className:h},e)),t&&s.default.createElement("span",{className:f},"v",a.version)))},39550:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const n=o(18592),a=r(o(67294)),i=o(39226),s=o(61329),l=n.css`
  margin: ${s.theme.spacing.m} ${s.theme.spacing.m} ${s.theme.spacing.xxxl} ${s.theme.spacing.m};
  @media ${i.breakpoints.phone} {
    margin: ${s.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>a.default.createElement("div",{className:l},e)},76197:function(e,t,o){var r=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,n)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&r(t,e,o);return n(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const s=o(18592),l=i(o(67294)),c=a(o(23209)),d=i(o(34112)),u=o(11761),m=o(9572),h=o(61329),f=o(41298),p=o(86299),g=o(7807),v=o(89937),b=s.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.l};
  margin-top: ${h.theme.spacing.zero};
`,x=s.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.xm};
`,y=s.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.m};
`,_=s.css`
  margin: ${h.theme.spacing.l};
`,w=Object.keys(u.markdown),k=e=>w.some((t=>e.startsWith(t)))?m.links.doc(e):(0,c.uriTransformer)(e),S=[d.default],O={h1:({children:e})=>l.default.createElement("h1",{className:b},e),h2:({children:e})=>l.default.createElement("h2",{className:x},e),h3:({children:e})=>l.default.createElement("h3",{className:y},e),table:({children:e})=>l.default.createElement(v.Table,null,e),tr:({children:e,isHeader:t})=>l.default.createElement(v.Tr,{isHeader:t},e),th:({children:e})=>l.default.createElement(v.Th,null,e),td:({children:e})=>l.default.createElement(v.Td,null,e),a:({href:e,children:t})=>l.default.createElement(p.Link,{href:e},t),code({node:e,inline:t,className:o,children:r,...n}){const a=/language-(\w+)/.exec(o||"");return null===a||t?l.default.createElement(f.Code,{...n},r):l.default.createElement(g.SyntaxHighlighter,{language:a[1],kind:"docs"},String(r).replace(/\n$/,""))}};t.MarkdownView=({content:e})=>l.default.createElement(c.default,{remarkPlugins:S,components:O,transformLinkUri:k,className:_},e??"")},81911:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const r=o(96486),n=o(67294);t.MobileContext=(0,n.createContext)({isMenuOpen:!1,setMenuOpen:r.noop}),t.useMobileContext=()=>(0,n.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,n.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},52630:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const n=o(18592),a=r(o(67294)),i=o(61329),s=o(39550),l=o(15435),c=n.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,d=n.css`
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.xxl};
  cursor: pointer;
  margin: ${i.theme.spacing.m};
  &:hover {
    color: ${i.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:o,actionIcon:r,onAction:n})=>a.default.createElement("div",{className:c},a.default.createElement(s.LogoContainer,null,a.default.createElement(l.Logo,{name:e,version:t,href:o})),a.default.createElement(r,{className:d,onClick:n}))},48265:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const n=r(o(67294)),a=o(69274),i=o(81911),s=o(52630),l=o(54104);t.MobileHeaderWithOverlay=({name:e,version:t,href:o,children:r})=>{const{setMenuOpen:c}=(0,i.useMobileContext)();return n.default.createElement(n.default.Fragment,null,n.default.createElement(s.MobileHeader,{href:o,name:e,version:t,actionIcon:a.HiBars3,onAction:()=>c(!0)}),n.default.createElement(l.MobileOverlay,{href:o,name:e,version:t},r))}},54104:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const n=o(18592),a=r(o(67294)),i=o(69274),s=o(61329),l=o(81911),c=o(52630),d=n.css`
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
`,u=n.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:o,version:r})=>{const{isMenuOpen:s,setMenuOpen:m}=(0,l.useMobileContext)();return a.default.createElement("div",{className:(0,n.cx)(d,s?void 0:u)},a.default.createElement(c.MobileHeader,{href:o,actionIcon:i.HiXMark,onAction:()=>m(!1),name:e,version:r}),t)}},39201:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const n=o(18592),a=r(o(67294)),i=o(39226),s=o(61329),l=n.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${s.theme.colors.dark2};
  @media ${i.breakpoints.phone} {
    display: none;
  }
`;t.SideBar=({children:e})=>a.default.createElement("div",{className:l},e)},38938:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const n=o(18592),a=o(96486),i=r(o(67294)),s=o(61329),l=n.css`
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: ${s.theme.spacing.m} ${s.theme.spacing.m};
`,c=n.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${s.theme.spacing.xxm};
`;t.SideBarSection=({children:e,title:t})=>i.default.createElement(i.default.Fragment,null,(0,a.isNil)(t)?null:i.default.createElement("div",{className:l},t),i.default.createElement("div",{className:c},e))},79129:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const n=r(o(67294)),a=o(61329),i=o(86753);t.SvgLogo=({color:e=a.theme.colors.green,width:t,height:o})=>{const[r,s]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,o);return n.default.createElement("svg",{width:r,height:s,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},n.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),n.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},7807:function(e,t,o){var r=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,n)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&r(t,e,o);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=o(18592),s=a(o(67294)),l=o(67361),c=a(o(29012)),d=o(74855),u=o(61329),m=o(69274),h=o(96486),f=o(71400),p=(0,f.createPrismTheme)(c.vscDarkPlus,u.theme.colors.dark1),g=(0,f.createPrismTheme)(c.vscDarkPlus,u.theme.colors.dark4),v=i.css`
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
`,b=i.css`
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
`,x=i.css`
  position: relative;
  flex-grow: ${u.theme.flex.grow};
  height: 100vh;

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:o,kind:r})=>{const[n,a]=(0,s.useState)(!1),[c,u]=(0,s.useState)(!1),[f,y]=(0,s.useState)(void 0),_=(0,i.cx)("editor"===r?x:b),w="editor"===r?g:p,k=(0,i.cx)(v);return s.default.createElement("div",{className:_,onMouseEnter:()=>{u(!0)},onMouseLeave:()=>{u(!1)}},s.default.createElement(l.Prism,{language:t,style:w,wrapLongLines:o,showLineNumbers:"editor"===r},e),s.default.createElement(d.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,h.isNil)(f)||(clearTimeout(f),y(void 0)),a(t),y(setTimeout((()=>{a(!1)}),2e3))}},s.default.createElement("button",{className:k,style:{opacity:c?1:0}},n?s.default.createElement(m.HiCheck,null):s.default.createElement(m.HiClipboard,null))))}},89937:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const n=o(18592),a=r(o(67294)),i=o(61329),s=n.css`
  border-radius: ${i.theme.spacing.m};
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  margin: 1px;
`,l=n.css`
  border-collapse: collapse;
  width: 100%;
  border-width: ${i.theme.spacing.zero};
`;t.Table=({children:e,className:t,...o})=>a.default.createElement("div",{className:s},a.default.createElement("table",{className:(0,n.cx)(l,t),...o},e));const c=n.css`
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  border-left-width: ${i.theme.spacing.zero};
  border-right-width: ${i.theme.spacing.zero};
  &:last-of-type {
    border-bottom-width: ${i.theme.spacing.zero};
  }
`,d=n.css`
  background-color: ${i.theme.colors.dark1};
  border-width: ${i.theme.spacing.zero};
  border-radius: ${i.theme.spacing.m};
`;t.Tr=({children:e,isHeader:t,className:o,...r})=>{const i=(0,n.cx)(t?d:c,o);return a.default.createElement("tr",{...r,className:i},e)};const u=n.css`
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
`;t.Th=({children:e,className:t,...o})=>a.default.createElement("th",{...o,className:(0,n.cx)(u,t)},e);const m=n.css`
  padding: ${i.theme.spacing.m};
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.muted};
`;t.Td=({children:e,className:t,...o})=>a.default.createElement("td",{...o,className:(0,n.cx)(m,t)},e);const h=n.css`
  border-width: ${i.theme.spacing.zero};
`;t.THead=({children:e,className:t,...o})=>a.default.createElement("thead",{...o,className:(0,n.cx)(h,t)},e);const f=n.css`
  border-width: ${i.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...o})=>a.default.createElement("tbody",{...o,className:(0,n.cx)(f,t)},e)},5838:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const n=o(18592),a=r(o(67294)),i=o(69274),s=o(61329),l=n.css`
  position: relative;
`,c=(e,t)=>n.css`
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
`,d=n.css`
  flex: ${s.theme.flex.grow};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s.theme.spacing.xxs};
`,u=({isContainer:e,isOpen:t,isEmpty:o})=>e?o?a.default.createElement(i.HiChevronLeft,null):t?a.default.createElement(i.HiChevronDown,null):a.default.createElement(i.HiChevronRight,null):null;t.TreeNode=function e({value:t,level:o,getLabel:r,isActive:i=(()=>!1),isOpen:m=(()=>!1),isContainer:h=(()=>!1),getChildren:f=(()=>[]),onClick:p=(()=>{}),getHref:g=(()=>{}),getIcon:v=(()=>{})}){const b=f(t),x=m(t),y=i(t),_=h(t),w=v(t),k=_&&x?(0,n.cx)(l,(e=>n.css`
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
`)(o)):l,S=g(t),O=r(t);return a.default.createElement("div",{className:k},a.default.createElement("a",{className:c(o,y),href:S,onClick:()=>p(t,x)},a.default.createElement("span",{className:d},a.default.createElement(u,{isContainer:_,isEmpty:0===b.length,isOpen:x}),void 0===w?null:a.default.createElement(w,null),O)),x&&b.map(((t,n)=>a.default.createElement(e,{key:`${n}-${O}`,value:t,level:o+1,getLabel:r,getHref:g,isContainer:h,getChildren:f,isOpen:m,isActive:i,onClick:p}))))}},71400:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const r=o(96486),n=o(61329);t.createPrismTheme=function(e,t){const o={'pre[class*="language-"]':{backgroundColor:t,borderRadius:n.theme.spacing.zero,padding:n.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:n.theme.spacing.zero,margin:n.theme.spacing.zero,fontSize:n.theme.fontSize.code,fontFamily:n.theme.fontFamily.monospace}},a=(0,r.cloneDeep)(e);return(0,r.values)(a).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${n.theme.spacing.zero} ${n.theme.spacing.zero} ${n.theme.spacing.xxs}`,e.fontSize=n.theme.fontSize.code,e.fontFamily=n.theme.fontFamily.monospace})),(0,r.merge)(a,o)}},86753:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,o,r){return void 0!==o&&void 0===r?[o,t/e*o]:void 0!==r&&void 0===o?[r,e/t*r]:void 0!==o&&void 0!==r?[o,r]:[e,t]}},72050:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const r=o(26729),n=o(39226),a=o(61329);t.globalStyles=r.css`
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
    scrollbar-color: ${a.theme.colors.dark2} ${a.theme.colors.dark5};
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 14px;
  }

  *::-webkit-scrollbar-track {
    background: ${a.theme.colors.dark5};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${a.theme.colors.dark2};
    border-radius: 7px;
    border: 2px solid ${a.theme.colors.dark5};
  }
`},9572:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,console.log("production"),t.links={docs:()=>"/docs/v2/documentation",doc:e=>`/docs/v2/documentation/${e}`,editor:()=>"/docs/v2/editor",index:()=>"/docs/v2"}},2684:function(e,t,o){var r=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,n)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&r(t,e,o);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const i=o(18592),s=o(96486),l=a(o(67294)),c=o(69274),d=o(86299),u=o(9572),m=o(61329),h=o(82704),f=i.css`
  padding: ${m.theme.spacing.l};
  display: flex;
  flex-direction: column;
  gap: ${m.theme.spacing.l};
`,p=i.css`
  display: flex;
  flex-direction: row;
  align-items: center;
`,g=i.css`
  padding: ${m.theme.spacing.xxm};
  background-color: ${m.theme.colors.dark2};
  border-radius: ${m.theme.spacing.m};
  color: ${m.theme.colors.muted};
`,v=i.css`
  flex: ${m.theme.flex.grow};
`,b=i.css`
  font-weight: bold;
`;function x(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,o]=(0,h.useNeighbours)(),r=!(0,s.isNil)(e),n=!(0,s.isNil)(o),a=!(0,s.isNil)(t),i=(0,l.useMemo)((()=>{if(!(0,s.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${x(t.name)}+(in+${t.md}.md)&body=${x("Please describe the issue with as much detail as possible!")}`}),[t]);return r||n||a?l.default.createElement("div",{className:f},(r||n)&&l.default.createElement("div",{className:p},r&&l.default.createElement(d.Link,{href:u.links.doc(e.md),className:b},l.default.createElement(c.HiChevronLeft,null),e.name),l.default.createElement("div",{className:v}),n&&l.default.createElement(d.Link,{href:u.links.doc(o.md),className:b},o.name,l.default.createElement(c.HiChevronRight,null))),a&&l.default.createElement("div",{className:g},l.default.createElement("b",null,"Found an issue with this page?"),l.default.createElement("br",null),"Please let me know by ",l.default.createElement(d.Link,{href:i},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},44376:function(e,t,o){var r=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,n)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&r(t,e,o);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const i=a(o(67294)),s=o(12259),l=o(38938),c=o(21521),d=o(42946);t.DocumentationMenu=()=>i.default.createElement(i.default.Fragment,null,i.default.createElement(l.SideBarSection,null,i.default.createElement(s.HomeTreeRoot,null)),d.sections.map((e=>i.default.createElement(i.Fragment,{key:e.name},i.default.createElement(l.SideBarSection,{title:e.name},e.items.map((e=>i.default.createElement(c.DocumentationTreeRoot,{node:e,key:e.md}))))))))},95462:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const n=o(18592),a=r(o(67294)),i=o(39226),s=o(40782),l=o(76197),c=o(81911),d=o(48265),u=o(39201),m=o(15435),h=o(39550),f=o(61329),p=o(44376),g=o(2684),v=o(50059),b=o(9572),x="docs",y=n.css`
  flex: ${f.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${f.theme.colors.muted};
  font-size: ${f.theme.fontSize.m};
  background-color: ${f.theme.colors.dark4};
`,_=()=>{const e=(0,c.useProvideMobileContext)();return a.default.createElement(c.MobileContext.Provider,{value:e},a.default.createElement(d.MobileHeaderWithOverlay,{name:x,version:!0,href:b.links.docs()},a.default.createElement(p.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>a.default.createElement(v.MarkdownContext.Provider,{value:{page:e,content:t}},a.default.createElement(s.DocContainer,null,a.default.createElement(u.SideBar,null,a.default.createElement(h.LogoContainer,null,a.default.createElement(m.Logo,{name:x,version:!0,href:b.links.docs()})),a.default.createElement(p.DocumentationMenu,null)),a.default.createElement("div",{className:y},a.default.createElement(i.BreakPoint,{Component:_,breakpoint:"phone"}),a.default.createElement(l.MarkdownView,{content:t}),a.default.createElement(g.DocumentationFooter,null))))},21521:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const n=r(o(67294)),a=o(5838),i=o(81911),s=o(50059),l=o(9572);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,i.useMobileContext)(),{page:o}=(0,s.useMarkdown)();return n.default.createElement(a.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===o,onClick:()=>t(!1),getHref:e=>l.links.doc(e.md)})}},50059:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const r=o(67294);t.MarkdownContext=(0,r.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,r.useContext)(t.MarkdownContext)},82704:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const r=o(96486),n=o(67294),a=o(42946),i=o(50059);function s(e,t=0){const o=function(e){return a.sections.find((t=>t.items.some((t=>t.md===e))))}(e);if((0,r.isNil)(o))return;const n=function(e,t){return t.items.findIndex((t=>t.md===e))}(e,o)+t;return o.items[n]}t.useNeighbours=function(){const{page:e}=(0,i.useMarkdown)(),t=(0,n.useMemo)((()=>s(e)),[e]);return[(0,n.useMemo)((()=>s(e,-1)),[e]),t,(0,n.useMemo)((()=>s(e,1)),[e])]}},29403:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(o(67294)),a=o(20745),i=o(95462),s=r(o(28102));(0,a.createRoot)(document.getElementById("root")).render(n.default.createElement(i.DocumentationPage,{page:"ServerCors",content:s.default}))},61329:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=29403)}]);
//# sourceMappingURL=documentation-ServerCors.bundle.js.map