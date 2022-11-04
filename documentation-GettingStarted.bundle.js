"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[578],{71870:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Getting Started\n\nIn this guide you'll learn how to set up and generate with Oats.\n\n## Prepare your OpenAPI document\n\nTo get started you'll need a valid OpenAPI document. If you are unsure about how to put together an OpenAPI document, a few pointers:\n\n- The [latest specification](https://spec.openapis.org/oas/latest.html)\n- Guide about [common mistakes](CommonMistakes), when defining your OpenAPI document\n\nOats works with both remotely hosted OpenAPI documents - accessible using the HTTP(S) protocol - and local documents in your file system. In these guides I'm going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example:\n\n```text\nhttps://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json\n```\n\n## Install Oats generator modules\n\nTo get generating, you'll need the main Oats module. This simply contains all that you need to generate, but you won't need anything from this module, when using the generated code:\n\n```text\nnpm i --dev @oats-ts/openapi\n```\n\n## Configure Oats\n\nOats borrows its configuration philosophy from Webpack, meaning code is configuration. Let's create a file called `oats.js` (you can call it whatever you want), and add a basic Oats configuration:\n\n```javascript\nconst oats = require('@oats-ts/openapi')\n\noats.generate({\n  logger: oats.loggers.simple(),\n  reader: oats.readers.https.json(\n    'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',\n  ),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    // Use presets.client() or presets.server() for just client/server side code\n    children: oats.presets.fullStack(),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n})\n```\n\nEach part of this code can be customized or even fully replaced. The main components are:\n\n- `generate` - The main generator harness function\n- `reader` - Reads the input, resolves it's dependencies, and structuraly validates it\n- `validator` - Semantically validates the resolved document\n- `generator` - Runs a set of code generators, either as a list of individual generators, or presets\n- `writer` - Writes the generator output to the disk\n- `logger` - Event-driven logger that logs important generator events\n\n## Run Oats\n\nNow that we have the generator set up, you can run it like any node.js script:\n\n```text\nnode ./oats.js\n```\n\n**NOTE:** In this example we are using Javascript for configuring and running the generator, even though the project is built in and for Typescript. In case you want to define your configuration in Typescript, you can, but you'll need to solve running it, for which the simplest solution is [`ts-node`](https://www.npmjs.com/package/ts-node). However in a decent IDE (like VSCode) you will still have good content assist in Javascript, when putting together this configuration, because of the type definitions exposed by the Oats packages.\n\n## Verify results\n\nIn case Oats successfully ran, you will see something like this in the terminal:\n\n```text\n✔ reader step completed using \"@oats-ts/openapi-reader\"\n✔ validator step completed using \"@oats-ts/openapi-validator\"\n✔ generator step completed using \"@oats-ts/openapi-generators\"\ni some outputs have runtime dependencies:\n  npm i \\\n    @oats-ts/openapi-express-server-adapter@0.0.43 \\\n    @oats-ts/openapi-fetch-client-adapter@0.0.43 \\\n    @oats-ts/openapi-runtime@0.0.43 \\\n    express@^4.18.1\n✔ writer step completed using \"@oats-ts/typescript-writer\"\n```\n\nSome generated outputs might have runtime dependencies (eg.: you generated `express` routers, therefore the generated code has a runtime depdency on `express`). These dependencies are summarized as a convenient `npm install` command after the generator step completes (on line `5` in this example).\n\nGrab this command, and run it:\n\n```text\nnpm i \\\n  @oats-ts/openapi-express-server-adapter@0.0.43 \\\n  @oats-ts/openapi-fetch-client-adapter@0.0.43 \\\n  @oats-ts/openapi-runtime@0.0.43 \\\n  express@^4.18.1\n```\n\n## Using the generated code\n\nDepending on what you generated (`client`, `server` or `fullStack` - meaning both), check out these guides highlighting how to use the generator output for each:\n\n- [Using the generated SDK](SdkGettingStarted)\n- [Using the generated server](ServerGettingStarted)\n"},80887:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const s=r(n(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:n})=>{const[o,a]=(0,s.useState)((()=>window.matchMedia(t.breakpoints[n]).matches));return(0,s.useEffect)((()=>{window.matchMedia(t.breakpoints[n]).addEventListener("change",(e=>a(e.matches)))}),[]),o?s.default.createElement(e,null):null}},20927:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=o(n(67294)),r=n(20745),s=n(15529),i=o(n(71870));(0,r.createRoot)(document.getElementById("root")).render(a.default.createElement(s.DocumentationPage,{page:"GettingStarted",content:i.default}))},4074:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const a=n(18592),r=o(n(67294)),s=n(19446),i=a.css`
  font-size: ${s.theme.fontSize.code};
  color: ${s.theme.colors.text};
  background-color: ${s.theme.colors.dark1};
  padding: ${s.theme.spacing.xxxs} ${s.theme.spacing.xxs};
  border-radius: ${s.theme.spacing.xs};
`;t.Code=({className:e,children:t,...n})=>r.default.createElement("code",{className:(0,a.cx)(i,e),...n},t)},98378:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const a=n(18592),r=n(26729),s=o(n(67294)),i=n(63413),l=n(19446),d=a.css`
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
`;t.DocContainer=({children:e})=>s.default.createElement(s.default.Fragment,null,s.default.createElement(r.Global,{styles:i.globalStyles}),s.default.createElement("div",{className:d},e))},17746:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HomeTreeRoot=void 0;const a=o(n(67294)),r=n(69274),s=n(77255),i=n(7117),l=n(82067);t.HomeTreeRoot=()=>{const{setMenuOpen:e}=(0,i.useMobileContext)();return a.default.createElement(l.TreeNode,{value:void 0,level:0,getIcon:()=>r.HiHome,getLabel:()=>"Home",isActive:()=>!1,onClick:()=>e(!1),getHref:()=>s.links.index()})}},3930:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const a=o(n(67294)),r=n(18592),s=n(19446),i=n(96486),l=r.css`
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
`;t.Link=({children:e,className:t,onClick:n,...o})=>(0,i.isNil)(n)?a.default.createElement("a",{className:(0,r.cx)(l,t),...o},e):a.default.createElement("span",{className:(0,r.cx)(l,t),onClick:n,...o},e)},66118:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const a=n(18592),r=n(67535),s=n(96486),i=o(n(67294)),l=n(19446),d=n(20519),c=a.css`
  label: side-bar-logo;
  display: flex;
  gap: ${l.theme.spacing.m};
  align-items: center;
  text-decoration: none;
`,u=a.css`
  display: flex;
  flex-direction: column;
`,m=a.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: ${l.theme.spacing.zero};
  padding: ${l.theme.spacing.zero};
  font-size: ${l.theme.fontSize.l};
  color: ${l.theme.colors.text};
`,h=a.css`
  color: ${l.theme.colors.muted};
`,p=a.css`
  font-size: ${l.theme.fontSize.s};
  color: ${l.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:n})=>i.default.createElement("a",{className:c,href:n},i.default.createElement(d.SvgLogo,{width:60}),i.default.createElement("div",{className:u},i.default.createElement("h1",{className:m},"Oats ",(0,s.isNil)(e)?null:i.default.createElement("span",{className:h},e)),t&&i.default.createElement("span",{className:p},"v",r.version)))},19187:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const a=n(18592),r=o(n(67294)),s=n(80887),i=n(19446),l=a.css`
  margin: ${i.theme.spacing.m} ${i.theme.spacing.m} ${i.theme.spacing.xxxl} ${i.theme.spacing.m};
  @media ${s.breakpoints.phone} {
    margin: ${i.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>r.default.createElement("div",{className:l},e)},40704:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const i=n(18592),l=n(96486),d=s(n(67294)),c=r(n(23209)),u=s(n(34112)),m=n(82509),h=n(77255),p=n(19446),f=n(4074),g=n(3930),b=n(44702),v=n(66999),y=i.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.l};
  margin-top: ${p.theme.spacing.zero};
`,x=i.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.xm};
`,k=i.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.m};
`,_=i.css`
  margin: ${p.theme.spacing.l};
`,w=Object.values(m.markdownPages),P=e=>{const t=w.find((t=>e.startsWith(t.md)));return(0,l.isNil)(t)?(0,c.uriTransformer)(e):h.links.doc(t.md)},S=[u.default],O={h1:({children:e})=>d.default.createElement("h1",{className:y},e),h2:({children:e})=>d.default.createElement("h2",{className:x},e),h3:({children:e})=>d.default.createElement("h3",{className:k},e),table:({children:e})=>d.default.createElement(v.Table,null,e),tr:({children:e,isHeader:t})=>d.default.createElement(v.Tr,{isHeader:t},e),th:({children:e})=>d.default.createElement(v.Th,null,e),td:({children:e})=>d.default.createElement(v.Td,null,e),a:({href:e,children:t})=>d.default.createElement(g.Link,{href:e},t),code({node:e,inline:t,className:n,children:o,...a}){const r=/language-(\w+)/.exec(n||"");return null===r||t?d.default.createElement(f.Code,{...a},o):d.default.createElement(b.SyntaxHighlighter,{language:r[1],kind:"docs"},String(o).replace(/\n$/,""))}};t.MarkdownView=({content:e})=>d.default.createElement(c.default,{remarkPlugins:S,components:O,transformLinkUri:P,className:_},e??"")},7117:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const o=n(96486),a=n(67294);t.MobileContext=(0,a.createContext)({isMenuOpen:!1,setMenuOpen:o.noop}),t.useMobileContext=()=>(0,a.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,a.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},35625:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const a=n(18592),r=o(n(67294)),s=n(19446),i=n(19187),l=n(66118),d=a.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,c=a.css`
  color: ${s.theme.colors.muted};
  font-size: ${s.theme.fontSize.xxl};
  cursor: pointer;
  margin: ${s.theme.spacing.m};
  &:hover {
    color: ${s.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:n,actionIcon:o,onAction:a})=>r.default.createElement("div",{className:d},r.default.createElement(i.LogoContainer,null,r.default.createElement(l.Logo,{name:e,version:t,href:n})),r.default.createElement(o,{className:c,onClick:a}))},8015:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const a=o(n(67294)),r=n(69274),s=n(7117),i=n(35625),l=n(99102);t.MobileHeaderWithOverlay=({name:e,version:t,href:n,children:o})=>{const{setMenuOpen:d}=(0,s.useMobileContext)();return a.default.createElement(a.default.Fragment,null,a.default.createElement(i.MobileHeader,{href:n,name:e,version:t,actionIcon:r.HiBars3,onAction:()=>d(!0)}),a.default.createElement(l.MobileOverlay,{href:n,name:e,version:t},o))}},99102:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const a=n(18592),r=o(n(67294)),s=n(69274),i=n(19446),l=n(7117),d=n(35625),c=a.css`
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
`,u=a.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:n,version:o})=>{const{isMenuOpen:i,setMenuOpen:m}=(0,l.useMobileContext)();return r.default.createElement("div",{className:(0,a.cx)(c,i?void 0:u)},r.default.createElement(d.MobileHeader,{href:n,actionIcon:s.HiXMark,onAction:()=>m(!1),name:e,version:o}),t)}},86229:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const a=n(18592),r=o(n(67294)),s=n(80887),i=n(19446),l=a.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${i.theme.colors.dark2};
  @media ${s.breakpoints.phone} {
    display: none;
  }
`;t.SideBar=({children:e})=>r.default.createElement("div",{className:l},e)},21710:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const a=n(18592),r=n(96486),s=o(n(67294)),i=n(19446),l=a.css`
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: ${i.theme.spacing.m} ${i.theme.spacing.m};
`,d=a.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${i.theme.spacing.xxm};
`;t.SideBarSection=({children:e,title:t})=>s.default.createElement(s.default.Fragment,null,(0,r.isNil)(t)?null:s.default.createElement("div",{className:l},t),s.default.createElement("div",{className:d},e))},20519:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const a=o(n(67294)),r=n(19446),s=n(14757);t.SvgLogo=({color:e=r.theme.colors.green,width:t,height:n})=>{const[o,i]=(0,s.getSizeWithAspectRatio)(172.439,111.543,t,n);return a.default.createElement("svg",{width:o,height:i,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},44702:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const s=n(18592),i=r(n(67294)),l=n(67361),d=r(n(29012)),c=n(74855),u=n(19446),m=n(69274),h=n(96486),p=n(98452),f=(0,p.createPrismTheme)(d.vscDarkPlus,u.theme.colors.dark1),g=(0,p.createPrismTheme)(d.vscDarkPlus,u.theme.colors.dark4),b=s.css`
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
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:n,kind:o})=>{const[a,r]=(0,i.useState)(!1),[d,u]=(0,i.useState)(!1),[p,x]=(0,i.useState)(void 0),k=(0,s.cx)("editor"===o?y:v),_="editor"===o?g:f,w=(0,s.cx)(b);return i.default.createElement("div",{className:k,onMouseEnter:()=>{u(!0)},onMouseLeave:()=>{u(!1)}},i.default.createElement(l.Prism,{language:t,style:_,wrapLongLines:n,showLineNumbers:"editor"===o},e),i.default.createElement(c.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,h.isNil)(p)||(clearTimeout(p),x(void 0)),r(t),x(setTimeout((()=>{r(!1)}),2e3))}},i.default.createElement("button",{className:w,style:{opacity:d?1:0}},a?i.default.createElement(m.HiCheck,null):i.default.createElement(m.HiClipboard,null))))}},66999:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const a=n(18592),r=o(n(67294)),s=n(19446),i=a.css`
  border-radius: ${s.theme.spacing.m};
  border: ${s.theme.spacing.xxxs} solid ${s.theme.colors.dark1};
  margin: 1px;
`,l=a.css`
  border-collapse: collapse;
  width: 100%;
  border-width: ${s.theme.spacing.zero};
`;t.Table=({children:e,className:t,...n})=>r.default.createElement("div",{className:i},r.default.createElement("table",{className:(0,a.cx)(l,t),...n},e));const d=a.css`
  border: ${s.theme.spacing.xxxs} solid ${s.theme.colors.dark1};
  border-left-width: ${s.theme.spacing.zero};
  border-right-width: ${s.theme.spacing.zero};
  &:last-of-type {
    border-bottom-width: ${s.theme.spacing.zero};
  }
`,c=a.css`
  background-color: ${s.theme.colors.dark1};
  border-width: ${s.theme.spacing.zero};
  border-radius: ${s.theme.spacing.m};
`;t.Tr=({children:e,isHeader:t,className:n,...o})=>{const s=(0,a.cx)(t?c:d,n);return r.default.createElement("tr",{...o,className:s},e)};const u=a.css`
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
`;t.Th=({children:e,className:t,...n})=>r.default.createElement("th",{...n,className:(0,a.cx)(u,t)},e);const m=a.css`
  padding: ${s.theme.spacing.m};
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.muted};
`;t.Td=({children:e,className:t,...n})=>r.default.createElement("td",{...n,className:(0,a.cx)(m,t)},e);const h=a.css`
  border-width: ${s.theme.spacing.zero};
`;t.THead=({children:e,className:t,...n})=>r.default.createElement("thead",{...n,className:(0,a.cx)(h,t)},e);const p=a.css`
  border-width: ${s.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...n})=>r.default.createElement("tbody",{...n,className:(0,a.cx)(p,t)},e)},82067:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const a=n(18592),r=o(n(67294)),s=n(69274),i=n(19446),l=a.css`
  position: relative;
`,d=(e,t)=>a.css`
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
`,c=a.css`
  flex: ${i.theme.flex.grow};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${i.theme.spacing.xxs};
`,u=({isContainer:e,isOpen:t,isEmpty:n})=>e?n?r.default.createElement(s.HiChevronLeft,null):t?r.default.createElement(s.HiChevronDown,null):r.default.createElement(s.HiChevronRight,null):null;t.TreeNode=function e({value:t,level:n,getLabel:o,isActive:s=(()=>!1),isOpen:m=(()=>!1),isContainer:h=(()=>!1),getChildren:p=(()=>[]),onClick:f=(()=>{}),getHref:g=(()=>{}),getIcon:b=(()=>{})}){const v=p(t),y=m(t),x=s(t),k=h(t),_=b(t),w=k&&y?(0,a.cx)(l,(e=>a.css`
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
`)(n)):l,P=g(t),S=o(t);return r.default.createElement("div",{className:w},r.default.createElement("a",{className:d(n,x),href:P,onClick:()=>f(t,y)},r.default.createElement("span",{className:c},r.default.createElement(u,{isContainer:k,isEmpty:0===v.length,isOpen:y}),void 0===_?null:r.default.createElement(_,null),S)),y&&v.map(((t,a)=>r.default.createElement(e,{key:`${a}-${S}`,value:t,level:n+1,getLabel:o,getHref:g,isContainer:h,getChildren:p,isOpen:m,isActive:s,onClick:f}))))}},98452:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const o=n(96486),a=n(19446);t.createPrismTheme=function(e,t){const n={'pre[class*="language-"]':{backgroundColor:t,borderRadius:a.theme.spacing.zero,padding:a.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:a.theme.spacing.zero,margin:a.theme.spacing.zero,fontSize:a.theme.fontSize.code,fontFamily:a.theme.fontFamily.monospace}},r=(0,o.cloneDeep)(e);return(0,o.values)(r).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${a.theme.spacing.zero} ${a.theme.spacing.zero} ${a.theme.spacing.xxs}`,e.fontSize=a.theme.fontSize.code,e.fontFamily=a.theme.fontFamily.monospace})),(0,o.merge)(r,n)}},14757:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,n,o){return void 0!==n&&void 0===o?[n,t/e*n]:void 0!==o&&void 0===n?[o,e/t*o]:void 0!==n&&void 0!==o?[n,o]:[e,t]}},63413:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const o=n(26729),a=n(80887),r=n(19446);t.globalStyles=o.css`
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
`},77255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,t.links={docs:()=>"/docs/documentation",doc:e=>`/docs/documentation/${e}`,editor:()=>"/docs/editor",index:()=>"/docs"}},82509:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdownPages=void 0,t.markdownPages={commonMistakesPage:{bundle:"documentation-CommonMistakes",name:"Common mistakes",description:"OpenAPI it is an extremely loosely defined spec, that in turn lets you define your API and your schemas in many different ways. In this article Im listing the most common mistakes that you can make, that doesnt make your OpenAPI document invalid, but effectively prevents tooling from outputing usable documentation or code.",importPath:"src/bundles/documentation/DocumentationBundle_CommonMistakes.tsx",md:"CommonMistakes"},customGeneratorsPage:{bundle:"documentation-CustomGenerators",name:"Custom Generators",description:"Documentation is in progress.",importPath:"src/bundles/documentation/DocumentationBundle_CustomGenerators.tsx",md:"CustomGenerators"},generatePage:{bundle:"documentation-Generate",name:"Generate",description:"The generator step is responsible for taking the validated output of the [reader](OpenAPI-Reader), and turning it into an intermediate representation (Typescript [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) in this case), that can be then turned into source code. The OpenAPI generator itself doesnt do much, the work is distributed to single responsiblity generators, that are responsible for generating one thing (like types from the JSON schemas, or serializers for parameters). They also provide means for other generators to access references to their generated content.",importPath:"src/bundles/documentation/DocumentationBundle_Generate.tsx",md:"Generate"},gettingStartedPage:{bundle:"documentation-GettingStarted",name:"Getting Started",description:"In this guide youll learn how to set up and generate with Oats.",importPath:"src/bundles/documentation/DocumentationBundle_GettingStarted.tsx",md:"GettingStarted"},homePage:{bundle:"documentation-Home",name:"🌱 oats",description:"This project aims to provide a solution for generating quality Typescript code from API-describing documents. The only supported format currently is [OpenAPI 3.x](https://www.openapis.org), but there are plans to introduce generators for [AsyncAPI](https://www.asyncapi.com/) as well.",importPath:"src/bundles/documentation/DocumentationBundle_Home.tsx",md:"Home"},readPage:{bundle:"documentation-Read",name:"Read",description:"The reader step is responsible for",importPath:"src/bundles/documentation/DocumentationBundle_Read.tsx",md:"Read"},sdkErrorHandlingPage:{bundle:"documentation-SdkErrorHandling",name:"Error handling",description:"Oats generated SDKs dont `throw` (or rather reject, as we are dealing with `Promise`s), unless the response is invalid according to the source OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_SdkErrorHandling.tsx",md:"SdkErrorHandling"},sdkGettingStartedPage:{bundle:"documentation-SdkGettingStarted",name:"Getting started (SDK)",description:"In this guide youll learn how to generate an SDK and (necessary related code) based on your OpenAPI document. As for all examples, we are going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example (so its recommended you try using this first, if you are unfamiliar with Oats)!",importPath:"src/bundles/documentation/DocumentationBundle_SdkGettingStarted.tsx",md:"SdkGettingStarted"},sdkTypesPage:{bundle:"documentation-SdkTypes",name:"SDK related types",description:"This guide will showcase the main types generated for the client side. A big chunk of the generated types is the same as for the server side (JSON schema based types and parameter types), so in this chapter Im highlighting the differences.",importPath:"src/bundles/documentation/DocumentationBundle_SdkTypes.tsx",md:"SdkTypes"},sdkUsagePage:{bundle:"documentation-SdkUsage",name:"SDK usage",description:"To start using the SDK, you will need an implementation of the previously described SDK type. Oats generates an SDK implementation class (`BookStoreSdkImpl` in our case), that you can find next to the SDK type (in `src/generated/sdk`).",importPath:"src/bundles/documentation/DocumentationBundle_SdkUsage.tsx",md:"SdkUsage"},serverApiImplPage:{bundle:"documentation-ServerApiImpl",name:"Example API implementation",description:"Lets go back to `BookStoreApiImpl` and implement some simple logic. In this guide Im going to store data in memory, but since all API methods return `Promise`s, you can use whatever data storage you choose.",importPath:"src/bundles/documentation/DocumentationBundle_ServerApiImpl.tsx",md:"ServerApiImpl"},serverCorsPage:{bundle:"documentation-ServerCors",name:"Implement CORS",description:"In this guide youll learn how to make your Oats+express based server CORS enabled.",importPath:"src/bundles/documentation/DocumentationBundle_ServerCors.tsx",md:"ServerCors"},serverGettingStartedPage:{bundle:"documentation-ServerGettingStarted",name:"Getting started (Server)",description:"This guide will help you getting started with generating server side code using Oats. As for all examples, we are going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example (so its recommended you try using this first, if you are unfamiliar with Oats)!",importPath:"src/bundles/documentation/DocumentationBundle_ServerGettingStarted.tsx",md:"ServerGettingStarted"},serverSetupPage:{bundle:"documentation-ServerSetup",name:"Express server setup",description:"Before we write any business logic, lets create a functional server that exposes the appropriate endpoints, and we can test it locally. This involves the following steps:",importPath:"src/bundles/documentation/DocumentationBundle_ServerSetup.tsx",md:"ServerSetup"},serverTypesPage:{bundle:"documentation-ServerTypes",name:"Server types",description:"This guide will showcase the main types generated for the server side. A big chunk of the generated types is the same as for the client side (JSON schema based types and parameter types), so in this chapter Im highlighting the differences.",importPath:"src/bundles/documentation/DocumentationBundle_ServerTypes.tsx",md:"ServerTypes"},validatePage:{bundle:"documentation-Validate",name:"Validate",description:"The valididator step is responsible for taking the output of the [reader](OpenAPI-Reader) step, and checking for structural and semantic errors.",importPath:"src/bundles/documentation/DocumentationBundle_Validate.tsx",md:"Validate"},welcomePage:{bundle:"documentation-Welcome",name:"Welcome to the docs!",description:"Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.",importPath:"src/bundles/documentation/DocumentationBundle_Welcome.tsx",md:"Welcome"},workflowPage:{bundle:"documentation-Workflow",name:"Workflow",description:"This guide will walk you through on how to get started with oats and OpenAPI.",importPath:"src/bundles/documentation/DocumentationBundle_Workflow.tsx",md:"Workflow"},writePage:{bundle:"documentation-Write",name:"Write",description:"The writer step is responsible for taking the output of the [generator step](OpenAPI-Generator) and writing its outputs to the disk. The typescript writer takes typescript `SourceFile`s (this is Typescripts in-memory representation of an AST + file location) and writes them to the desired location.",importPath:"src/bundles/documentation/DocumentationBundle_Write.tsx",md:"Write"}}},42946:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const o=n(96486),a=n(82509),r=[{items:[a.markdownPages.welcomePage]},{name:"Server Guide",items:[a.markdownPages.serverGettingStartedPage,a.markdownPages.serverTypesPage,a.markdownPages.serverSetupPage,a.markdownPages.serverApiImplPage,a.markdownPages.serverCorsPage]},{name:"(Client) SDK Guide",items:[a.markdownPages.sdkGettingStartedPage,a.markdownPages.sdkTypesPage,a.markdownPages.sdkUsagePage,a.markdownPages.sdkErrorHandlingPage]},{name:"Other Guides",items:[a.markdownPages.commonMistakesPage]},{name:"Generator api",items:[a.markdownPages.readPage,a.markdownPages.validatePage,a.markdownPages.generatePage,a.markdownPages.customGeneratorsPage,a.markdownPages.writePage]}];t.sections=r,t.docs=(0,o.flatMap)(t.sections,(e=>e.items))},11149:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const s=n(18592),i=n(96486),l=r(n(67294)),d=n(69274),c=n(3930),u=n(77255),m=n(19446),h=n(10603),p=s.css`
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
`;function y(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,n]=(0,h.useNeighbours)(),o=!(0,i.isNil)(e),a=!(0,i.isNil)(n),r=!(0,i.isNil)(t),s=(0,l.useMemo)((()=>{if(!(0,i.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${y(t.name)}+(in+${t.md}.md)&body=${y("Please describe the issue with as much detail as possible!")}`}),[t]);return o||a||r?l.default.createElement("div",{className:p},(o||a)&&l.default.createElement("div",{className:f},o&&l.default.createElement(c.Link,{href:u.links.doc(e.md),className:v},l.default.createElement(d.HiChevronLeft,null),e.name),l.default.createElement("div",{className:b}),a&&l.default.createElement(c.Link,{href:u.links.doc(n.md),className:v},n.name,l.default.createElement(d.HiChevronRight,null))),r&&l.default.createElement("div",{className:g},l.default.createElement("b",null,"Found an issue with this page?"),l.default.createElement("br",null),"Please let me know by ",l.default.createElement(c.Link,{href:s},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},97281:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const s=r(n(67294)),i=n(17746),l=n(21710),d=n(54711),c=n(42946);t.DocumentationMenu=()=>s.default.createElement(s.default.Fragment,null,s.default.createElement(l.SideBarSection,null,s.default.createElement(i.HomeTreeRoot,null)),c.sections.map((e=>s.default.createElement(s.Fragment,{key:e.name},s.default.createElement(l.SideBarSection,{title:e.name},e.items.map((e=>s.default.createElement(d.DocumentationTreeRoot,{node:e,key:e.md}))))))))},15529:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const a=n(18592),r=o(n(67294)),s=n(80887),i=n(98378),l=n(40704),d=n(7117),c=n(8015),u=n(86229),m=n(66118),h=n(19187),p=n(19446),f=n(97281),g=n(11149),b=n(49098),v=n(77255),y="docs",x=a.css`
  flex: ${p.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${p.theme.colors.muted};
  font-size: ${p.theme.fontSize.m};
  background-color: ${p.theme.colors.dark4};
`,k=()=>{const e=(0,d.useProvideMobileContext)();return r.default.createElement(d.MobileContext.Provider,{value:e},r.default.createElement(c.MobileHeaderWithOverlay,{name:y,version:!0,href:v.links.docs()},r.default.createElement(f.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>r.default.createElement(b.MarkdownContext.Provider,{value:{page:e,content:t}},r.default.createElement(i.DocContainer,null,r.default.createElement(u.SideBar,null,r.default.createElement(h.LogoContainer,null,r.default.createElement(m.Logo,{name:y,version:!0,href:v.links.docs()})),r.default.createElement(f.DocumentationMenu,null)),r.default.createElement("div",{className:x},r.default.createElement(s.BreakPoint,{Component:k,breakpoint:"phone"}),r.default.createElement(l.MarkdownView,{content:t}),r.default.createElement(g.DocumentationFooter,null))))},54711:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const a=o(n(67294)),r=n(82067),s=n(7117),i=n(49098),l=n(77255);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,s.useMobileContext)(),{page:n}=(0,i.useMarkdown)();return a.default.createElement(r.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===n,onClick:()=>t(!1),getHref:e=>l.links.doc(e.md)})}},49098:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const o=n(67294);t.MarkdownContext=(0,o.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,o.useContext)(t.MarkdownContext)},10603:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const o=n(96486),a=n(67294),r=n(42946),s=n(49098);function i(e,t=0){const n=function(e){return r.sections.find((t=>t.items.some((t=>t.md===e))))}(e);if((0,o.isNil)(n))return;const a=function(e,t){return t.items.findIndex((t=>t.md===e))}(e,n)+t;return n.items[a]}t.useNeighbours=function(){const{page:e}=(0,s.useMarkdown)(),t=(0,a.useMemo)((()=>i(e)),[e]);return[(0,a.useMemo)((()=>i(e,-1)),[e]),t,(0,a.useMemo)((()=>i(e,1)),[e])]}},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=20927)}]);
//# sourceMappingURL=documentation-GettingStarted.bundle.js.map