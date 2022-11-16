"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[427],{28102:(e,t,o)=>{o.r(t),o.d(t,{default:()=>n});const n="# Implement CORS\n\nIn this guide you'll learn how to make your Oats and express based server CORS enabled.\n\n> As for all guides, this one is based on the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example.\n\n## What is CORS?\n\nCORS or cross site resource sharing is a mechanism used between HTTP servers and web browsers. When browser scripts make an HTTP request (using [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)) to a different origin, there are a few additional rules the server need to comply with in order to allow communication with the browser. If you want to learn more about CORS (which I would highly recommend) check out the [**official CORS docs**](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), but in this guide I summarized the most relevant parts.\n\n## What is a different origin?\n\nA different origin is defined as different domain or port.\n\n- So if you open `https://foo.com` in the browser, and it's script makes a request to `https://bar.com`, or even `https://foo.com:5000` (same domain, protocol, etc but different port), it counts as a cross origin request.\n- But from `https://foo.com` to `https://foo.com/api/something` or `https://foo.com/api/foo?foo=bar`, is the same origin, as only the path and query part of the URL are different.\n\nThis means if you are serving your frontend using the same express server (domain + port) as where you serve your API from, and you don't want to expose your API for other browser apps to be used, you are lucky, as you don't need to worry about the rest of this guide.\n\n## What are the CORS mechanics?\n\nThere are two ways the browser may inspect, if the request a client side script made is \"approved\" by the server or not.\n\n### 1. Simple requests\n\n`GET`, `POST` or `HEAD` request, without any extra request headers are called simple requests. In this case the browser simply hits your endpoint, and expects the response to have certain `Access-Control-*` response headers confirming, that the origin, the request is coming from is allowed. If it doesn't, the request will error out, and your client side code will not have access to the response.\n\n### 2. Pre-flight requests\n\nIn cases when you are using other request methods, or you want to send extra request headers, it is a pre-flighted request. In this case the client will first attempt a request to the same URL, but with the `OPTIONS` method, which is called a pre-flight request. In this request it communicates using certain `Access-Control-*` request headers, what method and optionally what request headers did you originally intend to use, from what origin. If the server sends back the appropriate response headers to this OPTIONS request, the client will then attempt to make the original request you intended to, otherwise it rejects your request, and your client side code will not have access to the response.\n\n## How does Oats help?\n\nOats can generate express `Router`s that deal with CORS, customized to your exact OpenAPI based backend. To enable this, you need to modify your generator preset a bit, as CORS is off by default. The minimum amount of configuration you need to provide for functional CORS is the allowed origins, but you can customize the full suite of CORS headers:\n\n```typescript\nconst oats = require('@oats-ts/openapi')\n\noats.generate({\n  logger: oats.loggers.simple(),\n  reader: oats.readers.https.json(\n    'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',\n  ),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    children: oats.presets.server({\n      cors: {\n        getAllowedOrigins: (path, method, operation) => [\n          'http://localhost:5000',\n        ],\n        isMethodAllowed: (path, method, operation) => true,\n        isRequestHeaderAllowed: (header, path, method, operation) => true,\n        isResponseHeaderAllowed: (header, path, method, operation) => true,\n        isCredentialsAllowed: (path, method, operation) => false,\n        getMaxAge: (path, method, operation) => 10,\n      },\n    }),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n})\n```\n\n### Configuration\n\n- `getAllowedOrigins` **`(mandatory)`** - Either return an array of allowed origins, eg.: `['https://foo.com']`, or return a `boolean` to either allow or disallow any origin.\n- `isMethodAllowed` **`(optional)`** - Only called with `path`s and `method`s occuring in the OpenAPI document, and allows you to further restrict these. Return `true` to allow the given `path` and `method` combination (default) or `false` to disallow it.\n- `isRequestHeaderAllowed` and `isResponseHeaderAllowed` **`(optional)`** - Only called with headers (request or response respectively) that occur in your OpenAPI document, and allows you to further restrict them. Return `true` to allow given header for given path and method (default) or `false` to disallow it.\n- `isCredentialsAllowed` **`(optional)`** - Only called with `path`s and `method`s occuring in the OpenAPI document, and sets the `Access-Control-Allow-Credentials` header. This effectively gives cross-origin access to cookies set by CORS requests. Return `true` to allow this or `false` (default) to disallow\n- `getMaxAge` **`(optional)`** - Sets how long pre-flight requests can be cached (in seconds). By default caching is not specified.\n\n## Using the generated output\n\nIf you generate again with CORS enabled for the same document:\n\n- You'll have a new CORS configuration object, `bookStoreCorsConfiguration.ts`\n- Your express routers will now respond to simple CORS requests with the appropriate CORS headers using the above configuration\n- A new CORS router has been generated, responsible for handling the pre-flight `OPTIONS` requests, you'll need to add this router to your app.\n\nIf you followed the server guides so far, then the only thing you have to change is the commented lines:\n\n```typescript\n// createBookStoreApp.ts\nimport express from 'express'\nimport { ExpressServerAdapter } from '@oats-ts/openapi-express-server-adapter'\n\nimport { BookStoreApiImpl } from './BookStoreApiImpl'\nimport { createBookStoreAppRouter } from './generated/routers/createBookStoreAppRouter'\nimport { createBookStoreContextRouter } from './generated/routers/createBookStoreContextRouter'\n// This is new\nimport { createBookStoreCorsRouter } from './generated/routers/createBookStoreCorsRouter'\n\nexport function createBookStoreApp() {\n  const app = express()\n  app.use(json())\n\n  createBookStoreContextRouter(\n    app,\n    new BookStoreApiImpl(),\n    new ExpressServerAdapter(),\n  )\n  // This is new, make sure it's AFTER the Context router\n  createBookStoreCorsRouter(app)\n  createBookStoreAppRouter(app)\n\n  return app\n}\n```\n\nThat's it your server should be CORS enabled based on your OpenAPI document, respecting your restrictions, and using your origins.\n"},86032:(e,t,o)=>{o.r(t),o.d(t,{default:()=>n});const n={'pre[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#1e1e1e"},'code[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'pre[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},':not(pre) > code[class*="language-"]':{padding:".1em .3em",borderRadius:".3em",color:"#db4c69",background:"#1e1e1e"},".namespace":{Opacity:".7"},"doctype.doctype-tag":{color:"#569CD6"},"doctype.name":{color:"#9cdcfe"},comment:{color:"#6a9955"},prolog:{color:"#6a9955"},punctuation:{color:"#d4d4d4"},".language-html .language-css .token.punctuation":{color:"#d4d4d4"},".language-html .language-javascript .token.punctuation":{color:"#d4d4d4"},property:{color:"#9cdcfe"},tag:{color:"#569cd6"},boolean:{color:"#569cd6"},number:{color:"#b5cea8"},constant:{color:"#9cdcfe"},symbol:{color:"#b5cea8"},inserted:{color:"#b5cea8"},unit:{color:"#b5cea8"},selector:{color:"#d7ba7d"},"attr-name":{color:"#9cdcfe"},string:{color:"#ce9178"},char:{color:"#ce9178"},builtin:{color:"#ce9178"},deleted:{color:"#ce9178"},".language-css .token.string.url":{textDecoration:"underline"},operator:{color:"#d4d4d4"},entity:{color:"#569cd6"},"operator.arrow":{color:"#569CD6"},atrule:{color:"#ce9178"},"atrule.rule":{color:"#c586c0"},"atrule.url":{color:"#9cdcfe"},"atrule.url.function":{color:"#dcdcaa"},"atrule.url.punctuation":{color:"#d4d4d4"},keyword:{color:"#569CD6"},"keyword.module":{color:"#c586c0"},"keyword.control-flow":{color:"#c586c0"},function:{color:"#dcdcaa"},"function.maybe-class-name":{color:"#dcdcaa"},regex:{color:"#d16969"},important:{color:"#569cd6"},italic:{fontStyle:"italic"},"class-name":{color:"#4ec9b0"},"maybe-class-name":{color:"#4ec9b0"},console:{color:"#9cdcfe"},parameter:{color:"#9cdcfe"},interpolation:{color:"#9cdcfe"},"punctuation.interpolation-punctuation":{color:"#569cd6"},variable:{color:"#9cdcfe"},"imports.maybe-class-name":{color:"#9cdcfe"},"exports.maybe-class-name":{color:"#9cdcfe"},escape:{color:"#d7ba7d"},"tag.punctuation":{color:"#808080"},cdata:{color:"#808080"},"attr-value":{color:"#ce9178"},"attr-value.punctuation":{color:"#ce9178"},"attr-value.punctuation.attr-equals":{color:"#d4d4d4"},namespace:{color:"#4ec9b0"},'pre[class*="language-javascript"]':{color:"#9cdcfe"},'code[class*="language-javascript"]':{color:"#9cdcfe"},'pre[class*="language-jsx"]':{color:"#9cdcfe"},'code[class*="language-jsx"]':{color:"#9cdcfe"},'pre[class*="language-typescript"]':{color:"#9cdcfe"},'code[class*="language-typescript"]':{color:"#9cdcfe"},'pre[class*="language-tsx"]':{color:"#9cdcfe"},'code[class*="language-tsx"]':{color:"#9cdcfe"},'pre[class*="language-css"]':{color:"#ce9178"},'code[class*="language-css"]':{color:"#ce9178"},'pre[class*="language-html"]':{color:"#d4d4d4"},'code[class*="language-html"]':{color:"#d4d4d4"},".language-regex .token.anchor":{color:"#dcdcaa"},".language-html .token.punctuation":{color:"#808080"},'pre[class*="language-"] > code[class*="language-"]':{position:"relative",zIndex:"1"},".line-highlight.line-highlight":{background:"#f7ebc6",boxShadow:"inset 5px 0 0 #f7d87c",zIndex:"0"}}},80887:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const s=a(o(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:o})=>{const[n,r]=(0,s.useState)((()=>window.matchMedia(t.breakpoints[o]).matches));return(0,s.useEffect)((()=>{window.matchMedia(t.breakpoints[o]).addEventListener("change",(e=>r(e.matches)))}),[]),n?s.default.createElement(e,null):null}},83514:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(o(67294)),a=o(20745),s=o(15529),i=n(o(28102));(0,a.createRoot)(document.getElementById("root")).render(r.default.createElement(s.DocumentationPage,{page:"ServerCors",content:i.default}))},4074:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const r=o(18592),a=n(o(67294)),s=o(19446),i=r.css`
  font-size: ${s.theme.fontSize.code};
  color: ${s.theme.colors.text};
  background-color: ${s.theme.colors.dark1};
  padding: ${s.theme.spacing.xxxs} ${s.theme.spacing.xxs};
  border-radius: ${s.theme.spacing.xs};
`;t.Code=({className:e,children:t,...o})=>a.default.createElement("code",{className:(0,r.cx)(i,e),...o},t)},98378:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const r=o(18592),a=o(26729),s=n(o(67294)),i=o(63413),l=o(19446),c=r.css`
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
`;t.DocContainer=({children:e})=>s.default.createElement(s.default.Fragment,null,s.default.createElement(a.Global,{styles:i.globalStyles}),s.default.createElement("div",{className:c},e))},3930:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const r=n(o(67294)),a=o(18592),s=o(19446),i=o(96486),l=a.css`
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
`;t.Link=({children:e,className:t,onClick:o,...n})=>(0,i.isNil)(o)?r.default.createElement("a",{className:(0,a.cx)(l,t),...n},e):r.default.createElement("span",{className:(0,a.cx)(l,t),onClick:o,...n},e)},66118:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const r=o(18592),a=o(67535),s=o(96486),i=n(o(67294)),l=o(19446),c=o(20519),d=r.css`
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
`,h=r.css`
  color: ${l.theme.colors.muted};
`,p=r.css`
  font-size: ${l.theme.fontSize.s};
  color: ${l.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:o})=>i.default.createElement("a",{className:d,href:o},i.default.createElement(c.SvgLogo,{width:60}),i.default.createElement("div",{className:u},i.default.createElement("h1",{className:m},"Oats ",(0,s.isNil)(e)?null:i.default.createElement("span",{className:h},e)),t&&i.default.createElement("span",{className:p},"v",a.version)))},19187:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const r=o(18592),a=n(o(67294)),s=o(80887),i=o(19446),l=r.css`
  margin: ${i.theme.spacing.m} ${i.theme.spacing.m} ${i.theme.spacing.xxxl} ${i.theme.spacing.m};
  @media ${s.breakpoints.phone} {
    margin: ${i.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>a.default.createElement("div",{className:l},e)},40704:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const i=o(18592),l=o(96486),c=s(o(67294)),d=a(o(23209)),u=s(o(34112)),m=o(82509),h=o(77255),p=o(19446),f=o(4074),g=o(3930),b=o(44702),v=o(66999),x=i.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.l};
  margin-top: ${p.theme.spacing.zero};
`,y=i.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.xm};
`,w=i.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.m};
`,k=i.css`
  margin-top: ${p.theme.spacing.l};
  padding: ${p.theme.spacing.xxm};
  background-color: ${p.theme.colors.dark2};
  border-radius: ${p.theme.spacing.m};
  color: ${p.theme.colors.muted};
  p {
    &:first-of-type {
      margin-top: 0px;
    }
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
`,_=i.css`
  margin: ${p.theme.spacing.l};
`,S=Object.values(m.markdownPages),P=e=>{const t=S.find((t=>e.startsWith(t.md)));return(0,l.isNil)(t)?(0,d.uriTransformer)(e):h.links.doc(t.md)},O=[u.default],M={h1:({children:e})=>c.default.createElement("h1",{className:x},e),h2:({children:e})=>c.default.createElement("h2",{className:y},e),h3:({children:e})=>c.default.createElement("h3",{className:w},e),table:({children:e})=>c.default.createElement(v.Table,null,e),tr:({children:e,isHeader:t})=>c.default.createElement(v.Tr,{isHeader:t},e),th:({children:e})=>c.default.createElement(v.Th,null,e),td:({children:e})=>c.default.createElement(v.Td,null,e),a:({href:e,children:t})=>c.default.createElement(g.Link,{href:e},t),code({node:e,inline:t,className:o,children:n,...r}){const a=/language-(\w+)/.exec(o||"");return null===a||t?c.default.createElement(f.Code,{...r},n):c.default.createElement(b.SyntaxHighlighter,{language:a[1],host:"docs",theme:"medium"},String(n).replace(/\n$/,""))},blockquote:({children:e})=>c.default.createElement("div",{className:k},e)};t.MarkdownView=({content:e})=>c.default.createElement(d.default,{remarkPlugins:O,components:M,transformLinkUri:P,className:_},e??"")},96487:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuTreeItem=void 0;const r=n(o(67294)),a=o(69274),s=o(77255),i=o(7117),l=o(82067),c={index:"Home",docs:"Documentation",editor:"Editor"},d={index:a.HiHome,docs:a.HiDocument,editor:a.HiCog6Tooth};t.MenuTreeItem=({link:e})=>{const{setMenuOpen:t}=(0,i.useMobileContext)();return r.default.createElement(l.TreeNode,{value:void 0,level:0,getIcon:()=>d[e],getLabel:()=>c[e],isActive:()=>!1,onClick:()=>t(!1),getHref:()=>s.links[e]()})}},7117:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const n=o(96486),r=o(67294);t.MobileContext=(0,r.createContext)({isMenuOpen:!1,setMenuOpen:n.noop}),t.useMobileContext=()=>(0,r.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,r.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},35625:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const r=o(18592),a=n(o(67294)),s=o(19446),i=o(19187),l=o(66118),c=r.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,d=r.css`
  color: ${s.theme.colors.muted};
  font-size: ${s.theme.fontSize.xxl};
  cursor: pointer;
  margin: ${s.theme.spacing.m};
  &:hover {
    color: ${s.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:o,actionIcon:n,onAction:r})=>a.default.createElement("div",{className:c},a.default.createElement(i.LogoContainer,null,a.default.createElement(l.Logo,{name:e,version:t,href:o})),a.default.createElement(n,{className:d,onClick:r}))},8015:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const r=n(o(67294)),a=o(69274),s=o(7117),i=o(35625),l=o(99102);t.MobileHeaderWithOverlay=({name:e,version:t,href:o,children:n})=>{const{setMenuOpen:c}=(0,s.useMobileContext)();return r.default.createElement(r.default.Fragment,null,r.default.createElement(i.MobileHeader,{href:o,name:e,version:t,actionIcon:a.HiBars3,onAction:()=>c(!0)}),r.default.createElement(l.MobileOverlay,{href:o,name:e,version:t},n))}},99102:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const r=o(18592),a=n(o(67294)),s=o(69274),i=o(19446),l=o(7117),c=o(35625),d=r.css`
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
`;t.MobileOverlay=({name:e,children:t,href:o,version:n})=>{const{isMenuOpen:i,setMenuOpen:m}=(0,l.useMobileContext)();return a.default.createElement("div",{className:(0,r.cx)(d,i?void 0:u)},a.default.createElement(c.MobileHeader,{href:o,actionIcon:s.HiXMark,onAction:()=>m(!1),name:e,version:n}),t)}},86229:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const r=o(18592),a=n(o(67294)),s=o(80887),i=o(19446),l=r.css`
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
`,c=r.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${i.theme.spacing.xxm};
`;t.SideBarSection=({children:e,title:t})=>s.default.createElement(s.default.Fragment,null,(0,a.isNil)(t)?null:s.default.createElement("div",{className:l},t),s.default.createElement("div",{className:c},e))},20519:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const r=n(o(67294)),a=o(19446),s=o(14757);t.SvgLogo=({color:e=a.theme.colors.green,width:t,height:o})=>{const[n,i]=(0,s.getSizeWithAspectRatio)(172.439,111.543,t,o);return r.default.createElement("svg",{width:n,height:i,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},44702:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=o(18592),l=a(o(67294)),c=o(70077),d=s(o(86032)),u=o(74855),m=o(19446),h=o(69274),p=o(96486),f=o(98452),g={light:(0,f.createPrismTheme)(d.default,m.theme.colors.dark1),medium:(0,f.createPrismTheme)(d.default,m.theme.colors.dark2),dark:(0,f.createPrismTheme)(d.default,m.theme.colors.dark4)},b=i.css`
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
`,x=i.css`
  position: relative;
  flex-grow: ${m.theme.flex.grow};
  height: 100vh;

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:o,theme:n,host:r})=>{const[a,s]=(0,l.useState)(!1),[d,m]=(0,l.useState)(!1),[f,y]=(0,l.useState)(void 0),w=(0,i.cx)("editor"===r?x:v),k=g[n],_=(0,i.cx)(b);return l.default.createElement("div",{className:w,onMouseEnter:()=>{m(!0)},onMouseLeave:()=>{m(!1)}},l.default.createElement(c.Prism,{language:t,style:k,wrapLongLines:o,showLineNumbers:"editor"===r},e),l.default.createElement(u.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,p.isNil)(f)||(clearTimeout(f),y(void 0)),s(t),y(setTimeout((()=>{s(!1)}),2e3))}},l.default.createElement("button",{className:_,style:{opacity:d?1:0}},a?l.default.createElement(h.HiCheck,null):l.default.createElement(h.HiClipboard,null))))}},66999:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const r=o(18592),a=n(o(67294)),s=o(19446),i=r.css`
  border-radius: ${s.theme.spacing.m};
  border: ${s.theme.spacing.xxxs} solid ${s.theme.colors.dark1};
  margin: 1px;
`,l=r.css`
  border-collapse: collapse;
  max-width: 100%;
  width: 100%;
  border-width: ${s.theme.spacing.zero};
`;t.Table=({children:e,className:t,...o})=>a.default.createElement("div",{className:i},a.default.createElement("table",{className:(0,r.cx)(l,t),...o},e));const c=r.css`
  border: ${s.theme.spacing.xxxs} solid ${s.theme.colors.dark1};
  border-left-width: ${s.theme.spacing.zero};
  border-right-width: ${s.theme.spacing.zero};
  max-width: 100%;
  &:last-of-type {
    border-bottom-width: ${s.theme.spacing.zero};
  }
`,d=r.css`
  background-color: ${s.theme.colors.dark1};
  border-width: ${s.theme.spacing.zero};
  border-radius: ${s.theme.spacing.m};
`;t.Tr=({children:e,isHeader:t,className:o,...n})=>{const s=(0,r.cx)(t?d:c,o);return a.default.createElement("tr",{...n,className:s},e)};const u=r.css`
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
`;t.Td=({children:e,className:t,...o})=>a.default.createElement("td",{...o,className:(0,r.cx)(m,t)},e);const h=r.css`
  border-width: ${s.theme.spacing.zero};
`;t.THead=({children:e,className:t,...o})=>a.default.createElement("thead",{...o,className:(0,r.cx)(h,t)},e);const p=r.css`
  border-width: ${s.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...o})=>a.default.createElement("tbody",{...o,className:(0,r.cx)(p,t)},e)},82067:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const r=o(18592),a=n(o(67294)),s=o(69274),i=o(19446),l=r.css`
  label: tree-node;
  position: relative;
`,c=(e,t)=>r.css`
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
`,d=r.css`
  label: tree-node-item-label;
  flex: 1 0 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${i.theme.spacing.xxs};
`,u=r.css`
  margin-left: 0.6rem;
`,m=({isOpen:e,isEmpty:t})=>t?a.default.createElement(s.HiChevronLeft,null):e?a.default.createElement(s.HiChevronDown,null):a.default.createElement(s.HiChevronRight,null);t.TreeNode=function e({value:t,level:o,getLabel:n,isActive:s=(()=>!1),isOpen:i=(()=>!1),isContainer:h=(()=>!1),getChildren:p=(()=>[]),onClick:f=(()=>{}),getHref:g=(()=>{}),getIcon:b=(()=>{})}){const v=p(t),x=i(t),y=s(t),w=h(t),k=b(t),_=w&&x?(0,r.cx)(l,(e=>r.css`
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
`)(o)):l,S=g(t),P=n(t),O=!(w||void 0!==k||0===o);return a.default.createElement("div",{className:_},a.default.createElement("a",{className:c(o,y),href:S,onClick:()=>f(t,x)},a.default.createElement("span",{className:d},w&&a.default.createElement(m,{isEmpty:0===v.length,isOpen:x}),void 0===k?null:a.default.createElement(k,null),O?a.default.createElement("span",{className:u},P):a.default.createElement("span",null,P))),x&&v.map(((t,r)=>a.default.createElement(e,{key:`${r}-${P}`,value:t,level:o+1,getLabel:n,getHref:g,isContainer:h,getChildren:p,isOpen:i,isActive:s,onClick:f}))))}},98452:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const n=o(96486),r=o(19446);t.createPrismTheme=function(e,t){const o={'pre[class*="language-"]':{backgroundColor:t,borderRadius:r.theme.spacing.zero,padding:r.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:r.theme.spacing.zero,margin:r.theme.spacing.zero,fontSize:r.theme.fontSize.code,fontFamily:r.theme.fontFamily.monospace}},a=(0,n.cloneDeep)(e);return(0,n.values)(a).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${r.theme.spacing.zero} ${r.theme.spacing.zero} ${r.theme.spacing.xxs}`,e.fontSize=r.theme.fontSize.code,e.fontFamily=r.theme.fontFamily.monospace})),(0,n.merge)(a,o)}},14757:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,o,n){return void 0!==o&&void 0===n?[o,t/e*o]:void 0!==n&&void 0===o?[n,e/t*n]:void 0!==o&&void 0!==n?[o,n]:[e,t]}},63413:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const n=o(26729),r=o(80887),a=o(19446);t.globalStyles=n.css`
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
`},77255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,t.links={docs:()=>"/docs/documentation",doc:e=>`/docs/documentation/${e}`,editor:()=>"/docs/editor",index:()=>"/docs"}},82509:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdownPages=void 0,t.markdownPages={customGeneratorsPage:{bundle:"documentation-CustomGenerators",name:"Custom Generators",description:"In this guide you'll learn how to create custom generators using Oats",importPath:"src/bundles/documentation/DocumentationBundle_CustomGenerators.tsx",md:"CustomGenerators"},generatePage:{bundle:"documentation-Generate",name:"Generate",description:"In this guide you'll learn how the generator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Generate.tsx",md:"Generate"},openApi101Page:{bundle:"documentation-OpenAPI101",name:"OpenAPI 101",description:"In this guide I'll share some DOs and DON'Ts, when constructing an OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_OpenAPI101.tsx",md:"OpenAPI101"},readPage:{bundle:"documentation-Read",name:"Read",description:"In this guide you'll learn how the reader step works.",importPath:"src/bundles/documentation/DocumentationBundle_Read.tsx",md:"Read"},sdkErrorHandlingPage:{bundle:"documentation-SdkErrorHandling",name:"Error handling",description:"In this example you'll learn the recommended approach to handle errors using the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkErrorHandling.tsx",md:"SdkErrorHandling"},sdkGettingStartedPage:{bundle:"documentation-SdkGettingStarted",name:"Getting started",description:"In this guide you'll learn how to generate an SDK and (necessary related code) based on your OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_SdkGettingStarted.tsx",md:"SdkGettingStarted"},sdkTypesPage:{bundle:"documentation-SdkTypes",name:"SDK related types",description:"This guide will showcase the main types generated for the client side.",importPath:"src/bundles/documentation/DocumentationBundle_SdkTypes.tsx",md:"SdkTypes"},sdkUsagePage:{bundle:"documentation-SdkUsage",name:"SDK usage",description:"In this guide you'll learn the basic usage of the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkUsage.tsx",md:"SdkUsage"},serverApiExamplePage:{bundle:"documentation-ServerApiExample",name:"Example API",description:"In this guide you'll see a basic API implementation using the book store example.",importPath:"src/bundles/documentation/DocumentationBundle_ServerApiExample.tsx",md:"ServerApiExample"},serverCorsPage:{bundle:"documentation-ServerCors",name:"Implement CORS",description:"In this guide you'll learn how to make your Oats and express based server CORS enabled.",importPath:"src/bundles/documentation/DocumentationBundle_ServerCors.tsx",md:"ServerCors"},serverGettingStartedPage:{bundle:"documentation-ServerGettingStarted",name:"Getting started",description:"This guide will help you getting started with generating server side code using Oats.",importPath:"src/bundles/documentation/DocumentationBundle_ServerGettingStarted.tsx",md:"ServerGettingStarted"},serverSetupPage:{bundle:"documentation-ServerSetup",name:"Express server setup",description:"In this guide you'll learn how to set up generated Oats code with your existing express backend.",importPath:"src/bundles/documentation/DocumentationBundle_ServerSetup.tsx",md:"ServerSetup"},serverTypesPage:{bundle:"documentation-ServerTypes",name:"Server types",description:"This guide will showcase the main types generated for the server side.",importPath:"src/bundles/documentation/DocumentationBundle_ServerTypes.tsx",md:"ServerTypes"},validatePage:{bundle:"documentation-Validate",name:"Validate",description:"In this guide you'll learn how the validator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Validate.tsx",md:"Validate"},welcomePage:{bundle:"documentation-Welcome",name:"Welcome to the docs!",description:"Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.",importPath:"src/bundles/documentation/DocumentationBundle_Welcome.tsx",md:"Welcome"},writePage:{bundle:"documentation-Write",name:"Write",description:"In this guide you'll learn how the writer step works.",importPath:"src/bundles/documentation/DocumentationBundle_Write.tsx",md:"Write"}}},42946:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const n=o(96486),r=o(82509),a=[{name:"General",useNavigation:!1,items:[r.markdownPages.welcomePage,r.markdownPages.openApi101Page]},{name:"Server Guide",useNavigation:!0,items:[r.markdownPages.serverGettingStartedPage,r.markdownPages.serverTypesPage,r.markdownPages.serverSetupPage,r.markdownPages.serverApiExamplePage,r.markdownPages.serverCorsPage]},{name:"(Client) SDK Guide",useNavigation:!0,items:[r.markdownPages.sdkGettingStartedPage,r.markdownPages.sdkTypesPage,r.markdownPages.sdkUsagePage,r.markdownPages.sdkErrorHandlingPage]},{name:"Generator api",useNavigation:!0,items:[r.markdownPages.readPage,r.markdownPages.validatePage,r.markdownPages.generatePage,r.markdownPages.customGeneratorsPage,r.markdownPages.writePage]}];t.sections=a,t.docs=(0,n.flatMap)(t.sections,(e=>e.items))},11149:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const s=o(18592),i=o(96486),l=a(o(67294)),c=o(69274),d=o(3930),u=o(77255),m=o(19446),h=o(10603),p=s.css`
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
`;function x(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,o]=(0,h.useNeighbours)(),n=!(0,i.isNil)(e),r=!(0,i.isNil)(o),a=!(0,i.isNil)(t),s=(0,l.useMemo)((()=>{if(!(0,i.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${x(t.name)}+(in+${t.md}.md)&body=${x("Please describe the issue!")}`}),[t]);return n||r||a?l.default.createElement("div",{className:p},(n||r)&&l.default.createElement("div",{className:f},n&&l.default.createElement(d.Link,{href:u.links.doc(e.md),className:v},l.default.createElement(c.HiChevronLeft,null),e.name),l.default.createElement("div",{className:b}),r&&l.default.createElement(d.Link,{href:u.links.doc(o.md),className:v},o.name,l.default.createElement(c.HiChevronRight,null))),a&&l.default.createElement("div",{className:g},l.default.createElement("b",null,"Found an issue on this page?"),l.default.createElement("br",null),"Please let me know by ",l.default.createElement(d.Link,{href:s},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},97281:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const s=a(o(67294)),i=o(96487),l=o(21710),c=o(54711),d=o(42946);t.DocumentationMenu=()=>s.default.createElement(s.default.Fragment,null,s.default.createElement(l.SideBarSection,null,s.default.createElement(i.MenuTreeItem,{link:"index"}),s.default.createElement(i.MenuTreeItem,{link:"editor"})),d.sections.map(((e,t)=>s.default.createElement(s.Fragment,{key:e.name??`item-${t}`},s.default.createElement(l.SideBarSection,{title:e.name},e.items.map((e=>s.default.createElement(c.DocumentationTreeRoot,{node:e,key:e.md}))))))))},15529:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const r=o(18592),a=n(o(67294)),s=o(80887),i=o(98378),l=o(40704),c=o(7117),d=o(8015),u=o(86229),m=o(66118),h=o(19187),p=o(19446),f=o(97281),g=o(11149),b=o(49098),v=o(77255),x="docs",y=r.css`
  flex: ${p.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${p.theme.colors.muted};
  font-size: ${p.theme.fontSize.m};
  background-color: ${p.theme.colors.dark4};
`,w=()=>{const e=(0,c.useProvideMobileContext)();return a.default.createElement(c.MobileContext.Provider,{value:e},a.default.createElement(d.MobileHeaderWithOverlay,{name:x,version:!0,href:v.links.docs()},a.default.createElement(f.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>a.default.createElement(b.MarkdownContext.Provider,{value:{page:e,content:t}},a.default.createElement(i.DocContainer,null,a.default.createElement(u.SideBar,null,a.default.createElement(h.LogoContainer,null,a.default.createElement(m.Logo,{name:x,version:!0,href:v.links.docs()})),a.default.createElement(f.DocumentationMenu,null)),a.default.createElement("div",{className:y},a.default.createElement(s.BreakPoint,{Component:w,breakpoint:"phone"}),a.default.createElement(l.MarkdownView,{content:t}),a.default.createElement(g.DocumentationFooter,null))))},54711:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const r=n(o(67294)),a=o(82067),s=o(7117),i=o(49098),l=o(77255);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,s.useMobileContext)(),{page:o}=(0,i.useMarkdown)();return r.default.createElement(a.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===o,onClick:()=>t(!1),getHref:e=>l.links.doc(e.md)})}},49098:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const n=o(67294);t.MarkdownContext=(0,n.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,n.useContext)(t.MarkdownContext)},10603:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const n=o(96486),r=o(67294),a=o(42946),s=o(49098);function i(e,t,o=0){if((0,n.isNil)(e)||0!==o&&!e.useNavigation)return;const r=function(e,t){return t.items.findIndex((t=>t.md===e))}(t,e)+o;return e.items[r]}t.useNeighbours=function(){const{page:e}=(0,s.useMarkdown)(),t=(0,r.useMemo)((()=>function(e){return a.sections.find((t=>t.items.some((t=>t.md===e))))}(e)),[e]),o=(0,r.useMemo)((()=>i(t,e)),[e,t]);return[(0,r.useMemo)((()=>i(t,e,-1)),[e,t]),o,(0,r.useMemo)((()=>i(t,e,1)),[e,t])]}},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=83514)}]);
//# sourceMappingURL=documentation-ServerCors.bundle.js.map