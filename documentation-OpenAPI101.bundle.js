"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[366],{38555:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o='# OpenAPI 101\n\nIn this guide I\'ll share some DOs and DON\'Ts, when constructing an OpenAPI document.\n\nOpenAPI it is an extremely loosely defined spec, that in turn lets you define your API and your schemas in many different ways. In this article I\'m listing the most common "mistakes" that you can make, that doesn\'t make your OpenAPI document invalid, but effectively prevents tooling from outputing usable documentation or code.\n\n## Reuse schemas\n\nIt\'s more important for code generators (like Oats), than it is for documentation tools. Keeping your `"schemas"` flat, and avoiding nested schemas as possible helps you construct better, a more thought out "type system". It also allows generated code to be more like as it was written by hand.\n\n### ✅ Would recommend\n\n```json\n{\n  "components": {\n    "schemas": {\n      "Book": {\n        "type": "object",\n        "required": ["title"],\n        "properties": {\n          "title": { "type": "string" }\n        }\n      },\n      "Person": {\n        "type": "object",\n        "required": ["likes"],\n        "properties": {\n          // We are reusing the previous Book schema\n          "likes": {\n            "type": "array",\n            "items": {\n              "$ref": "#/components/schemas/Book"\n            }\n          }\n        }\n      }\n    }\n  }\n  //...\n}\n```\n\n### ❌ Wouldn\'t recommend\n\n```json\n{\n  "components": {\n    "schemas": {\n      "Book": {\n        "type": "object",\n        "required": ["title"],\n        "properties": {\n          "title": { "type": "string" }\n        }\n      },\n      "Person": {\n        "type": "object",\n        "required": ["likes"],\n        "properties": {\n          // We are not reusing the previous schema.\n          "likes": {\n            "type": "array",\n            "items": {\n              "type": "object",\n              "required": ["title"],\n              "properties": {\n                "title": { "type": "string" }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n```\n\nThis neatly ties into the next point...\n\n## Use descriptive schema / field names\n\nIt helps everybody! Think of it as how you\'d name your types in your preferred language! Keep casing consistent, and name them describing their purpose!\n\n### ✅ Would recommend\n\n```json\n{\n  "components": {\n    "schemas": {\n      // Consistent, short descriptive names\n      "Book": {\n        "type": "object",\n        "required": ["title"],\n        "properties": {\n          // Same for fields\n          "title": { "type": "string" }\n        }\n      }\n    }\n  }\n  //...\n}\n```\n\n### ❌ Wouldn\'t recommend\n\n```json\n{\n  "components": {\n    "schemas": {\n      // Inconsistent casing\n      "__Book_2": {\n        "type": "object",\n        "required": ["a0fef8b4_title"],\n        "properties": {\n          // Random stuff in field names\n          "a0fef8b4_title": { "type": "string" }\n        }\n      }\n    }\n  }\n  //...\n}\n```\n\n## Name your operations\n\nOpenAPI [operations](https://spec.openapis.org/oas/v3.1.0#operation-object) have an optional `operationId` field. Use it! Think of it how you\'d name a procedure or function! While in the spec it\'s optional, the Oats validator fails if you are missing your `operationId`s, as it\'s literally impossible to generate reasonably named code without this consistently.\n\n### ✅ Would recommend\n\n```json\n{\n  "paths": {\n    "/books": {\n      "get": {\n        // Proper name and description for everyone\n        "operationId": "getBooks"\n        // ...\n      },\n      "post": {\n        "operationId": "addBook"\n        // ...\n      }\n    }\n  }\n}\n```\n\n### ❌ Wouldn\'t recommend\n\nOmitting the `operationId` field.\n\n## Describe your parameters\n\nThe OpenAPI [parameter](https://spec.openapis.org/oas/v3.1.0#parameter-object) spec is arguably not the most well defined part of the spec. There are many serialization styles, that doesn\'t contribute anything to the spec. Path parameters can be omitted according to the spec, but this leaves users clueless about the purpose and exact structure of given parameter. And you have cookie parameters among the request parameters, while it\'s a server produced concept.\n\nRegardless, when you are putting together your spec, define your parameters with intention: `name` and `schema` is a must, and `description` and `style` (serialization method) can be very useful as well, when appropriate. Both the readers of your documentation, and the users of your generated code will thank you!\n\n### ✅ Would recommend\n\n```json\n{\n  "paths": {\n    "/books/{bookId}": {\n      "get": {\n        "operationId": "getBook",\n        "description": "Returns the book associated with the given bookId",\n        "parameters": [\n          {\n            "in": "path",\n            "name": "bookId",\n            "description": "The id of the book",\n            "required": true,\n            "schema": {\n              "type": "number"\n            }\n          },\n          {\n            "name": "someQueryParam",\n            "style": "form",\n            "in": "query",\n            "required": false,\n            "schema": {\n              "type": "number"\n            }\n          },\n          {\n            "name": "x-some-header-param",\n            "style": "simple",\n            "in": "header",\n            "required": false,\n            "schema": {\n              "type": "boolean"\n            }\n          }\n        ]\n      }\n    }\n  }\n}\n```\n\n### ❌ Wouldn\'t recommend\n\n```json\n{\n  "paths": {\n    "/books/{bookId}": {\n      "get": {\n        "operationId": "getBook",\n        "description": "Returns the book associated with the given bookId",\n        "parameters": [\n          {\n            "name": "someQueryParam",\n            "in": "query",\n            "required": false\n          },\n          {\n            "name": "x-some-header-param",\n            "style": "simple",\n            "in": "header",\n            "required": false\n          }\n        ]\n      }\n    }\n  }\n}\n```\n'},86032:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o={'pre[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#1e1e1e"},'code[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'pre[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},':not(pre) > code[class*="language-"]':{padding:".1em .3em",borderRadius:".3em",color:"#db4c69",background:"#1e1e1e"},".namespace":{Opacity:".7"},"doctype.doctype-tag":{color:"#569CD6"},"doctype.name":{color:"#9cdcfe"},comment:{color:"#6a9955"},prolog:{color:"#6a9955"},punctuation:{color:"#d4d4d4"},".language-html .language-css .token.punctuation":{color:"#d4d4d4"},".language-html .language-javascript .token.punctuation":{color:"#d4d4d4"},property:{color:"#9cdcfe"},tag:{color:"#569cd6"},boolean:{color:"#569cd6"},number:{color:"#b5cea8"},constant:{color:"#9cdcfe"},symbol:{color:"#b5cea8"},inserted:{color:"#b5cea8"},unit:{color:"#b5cea8"},selector:{color:"#d7ba7d"},"attr-name":{color:"#9cdcfe"},string:{color:"#ce9178"},char:{color:"#ce9178"},builtin:{color:"#ce9178"},deleted:{color:"#ce9178"},".language-css .token.string.url":{textDecoration:"underline"},operator:{color:"#d4d4d4"},entity:{color:"#569cd6"},"operator.arrow":{color:"#569CD6"},atrule:{color:"#ce9178"},"atrule.rule":{color:"#c586c0"},"atrule.url":{color:"#9cdcfe"},"atrule.url.function":{color:"#dcdcaa"},"atrule.url.punctuation":{color:"#d4d4d4"},keyword:{color:"#569CD6"},"keyword.module":{color:"#c586c0"},"keyword.control-flow":{color:"#c586c0"},function:{color:"#dcdcaa"},"function.maybe-class-name":{color:"#dcdcaa"},regex:{color:"#d16969"},important:{color:"#569cd6"},italic:{fontStyle:"italic"},"class-name":{color:"#4ec9b0"},"maybe-class-name":{color:"#4ec9b0"},console:{color:"#9cdcfe"},parameter:{color:"#9cdcfe"},interpolation:{color:"#9cdcfe"},"punctuation.interpolation-punctuation":{color:"#569cd6"},variable:{color:"#9cdcfe"},"imports.maybe-class-name":{color:"#9cdcfe"},"exports.maybe-class-name":{color:"#9cdcfe"},escape:{color:"#d7ba7d"},"tag.punctuation":{color:"#808080"},cdata:{color:"#808080"},"attr-value":{color:"#ce9178"},"attr-value.punctuation":{color:"#ce9178"},"attr-value.punctuation.attr-equals":{color:"#d4d4d4"},namespace:{color:"#4ec9b0"},'pre[class*="language-javascript"]':{color:"#9cdcfe"},'code[class*="language-javascript"]':{color:"#9cdcfe"},'pre[class*="language-jsx"]':{color:"#9cdcfe"},'code[class*="language-jsx"]':{color:"#9cdcfe"},'pre[class*="language-typescript"]':{color:"#9cdcfe"},'code[class*="language-typescript"]':{color:"#9cdcfe"},'pre[class*="language-tsx"]':{color:"#9cdcfe"},'code[class*="language-tsx"]':{color:"#9cdcfe"},'pre[class*="language-css"]':{color:"#ce9178"},'code[class*="language-css"]':{color:"#ce9178"},'pre[class*="language-html"]':{color:"#d4d4d4"},'code[class*="language-html"]':{color:"#d4d4d4"},".language-regex .token.anchor":{color:"#dcdcaa"},".language-html .token.punctuation":{color:"#808080"},'pre[class*="language-"] > code[class*="language-"]':{position:"relative",zIndex:"1"},".line-highlight.line-highlight":{background:"#f7ebc6",boxShadow:"inset 5px 0 0 #f7d87c",zIndex:"0"}}},80887:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const i=r(n(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:n})=>{const[o,a]=(0,i.useState)((()=>window.matchMedia(t.breakpoints[n]).matches));return(0,i.useEffect)((()=>{window.matchMedia(t.breakpoints[n]).addEventListener("change",(e=>a(e.matches)))}),[]),o?i.default.createElement(e,null):null}},35313:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=o(n(67294)),r=n(20745),i=n(15529),s=o(n(38555));(0,r.createRoot)(document.getElementById("root")).render(a.default.createElement(i.DocumentationPage,{page:"OpenAPI101",content:s.default}))},4074:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const a=n(18592),r=o(n(67294)),i=n(19446),s=a.css`
  font-size: ${i.theme.fontSize.code};
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};
  padding: ${i.theme.spacing.xxxs} ${i.theme.spacing.xxs};
  border-radius: ${i.theme.spacing.xs};
`;t.Code=({className:e,children:t,...n})=>r.default.createElement("code",{className:(0,a.cx)(s,e),...n},t)},98378:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const a=n(18592),r=n(26729),i=o(n(67294)),s=n(63413),l=n(19446),c=a.css`
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
`;t.DocContainer=({children:e})=>i.default.createElement(i.default.Fragment,null,i.default.createElement(r.Global,{styles:s.globalStyles}),i.default.createElement("div",{className:c},e))},3930:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const a=o(n(67294)),r=n(18592),i=n(19446),s=n(96486),l=r.css`
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
`;t.Link=({children:e,className:t,onClick:n,...o})=>(0,s.isNil)(n)?a.default.createElement("a",{className:(0,r.cx)(l,t),...o},e):a.default.createElement("span",{className:(0,r.cx)(l,t),onClick:n,...o},e)},66118:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const a=n(18592),r=n(67535),i=n(96486),s=o(n(67294)),l=n(19446),c=n(20519),d=a.css`
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
`,p=a.css`
  color: ${l.theme.colors.muted};
`,h=a.css`
  font-size: ${l.theme.fontSize.s};
  color: ${l.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:n})=>s.default.createElement("a",{className:d,href:n},s.default.createElement(c.SvgLogo,{width:60}),s.default.createElement("div",{className:u},s.default.createElement("h1",{className:m},"Oats ",(0,i.isNil)(e)?null:s.default.createElement("span",{className:p},e)),t&&s.default.createElement("span",{className:h},"v",r.version)))},19187:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const a=n(18592),r=o(n(67294)),i=n(80887),s=n(19446),l=a.css`
  margin: ${s.theme.spacing.m} ${s.theme.spacing.m} ${s.theme.spacing.xxxl} ${s.theme.spacing.m};
  @media ${i.breakpoints.phone} {
    margin: ${s.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>r.default.createElement("div",{className:l},e)},40704:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const s=n(18592),l=n(96486),c=r(n(67294)),d=r(n(23209)),u=i(n(34112)),m=n(82509),p=n(77255),h=n(19446),f=n(4074),g=n(3930),b=n(44702),v=n(66999),y=s.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.l};
  margin-top: ${h.theme.spacing.zero};
`,x=s.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.xm};
`,k=s.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.m};
`,_=s.css`
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
`,w=Object.values(m.markdownPages),P=e=>{const t=w.find((t=>e.startsWith(t.md)));return(0,l.isNil)(t)?e===encodeURIComponent("{{documentation}}")?p.links.docs():e===encodeURIComponent("{{editor}}")?p.links.editor():(0,d.uriTransformer)(e):p.links.doc(t.md)},M=[u.default];t.MarkdownView=({content:e,syntaxHighlighterProps:t={}})=>{const n=(0,c.useMemo)((()=>{return e=t,{h1:({children:e})=>c.default.createElement("h1",{className:y},e),h2:({children:e})=>c.default.createElement("h2",{className:x},e),h3:({children:e})=>c.default.createElement("h3",{className:k},e),table:({children:e})=>c.default.createElement(v.Table,null,e),tr:({children:e,isHeader:t})=>c.default.createElement(v.Tr,{isHeader:t},e),th:({children:e})=>c.default.createElement(v.Th,null,e),td:({children:e})=>c.default.createElement(v.Td,null,e),a:({href:e,children:t})=>c.default.createElement(g.Link,{href:e},t),code({node:t,inline:n,className:o,children:a,...r}){const i=/language-(\w+)/.exec(o||"");return null===i||n?c.default.createElement(f.Code,{...r},a):c.default.createElement(b.SyntaxHighlighter,{language:i[1],host:e.host??"docs",theme:e.theme??"medium",lineWrap:e.lineWrap??!1},String(a).replace(/\n$/,""))},blockquote:({children:e})=>c.default.createElement("div",{className:_},e)};var e}),[t.host,t.lineWrap,t.theme]);return c.default.createElement(d.default,{remarkPlugins:M,components:n,transformLinkUri:P},e??"")}},96487:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuTreeItem=void 0;const a=o(n(67294)),r=n(69274),i=n(77255),s=n(7117),l=n(82067),c={index:"Home",docs:"Documentation",editor:"Editor"},d={index:r.HiHome,docs:r.HiDocument,editor:r.HiCog6Tooth};t.MenuTreeItem=({link:e})=>{const{setMenuOpen:t}=(0,s.useMobileContext)();return a.default.createElement(l.TreeNode,{value:void 0,level:0,getIcon:()=>d[e],getLabel:()=>c[e],isActive:()=>!1,onClick:()=>t(!1),getHref:()=>i.links[e]()})}},7117:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const o=n(96486),a=n(67294);t.MobileContext=(0,a.createContext)({isMenuOpen:!1,setMenuOpen:o.noop}),t.useMobileContext=()=>(0,a.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,a.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},35625:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const a=n(18592),r=o(n(67294)),i=n(19446),s=n(19187),l=n(66118),c=a.css`
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
`;t.MobileHeader=({name:e,version:t,href:n,actionIcon:o,onAction:a})=>r.default.createElement("div",{className:c},r.default.createElement(s.LogoContainer,null,r.default.createElement(l.Logo,{name:e,version:t,href:n})),r.default.createElement(o,{className:d,onClick:a}))},8015:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const a=o(n(67294)),r=n(69274),i=n(7117),s=n(35625),l=n(99102);t.MobileHeaderWithOverlay=({name:e,version:t,href:n,children:o})=>{const{setMenuOpen:c}=(0,i.useMobileContext)();return a.default.createElement(a.default.Fragment,null,a.default.createElement(s.MobileHeader,{href:n,name:e,version:t,actionIcon:r.HiBars3,onAction:()=>c(!0)}),a.default.createElement(l.MobileOverlay,{href:n,name:e,version:t},o))}},99102:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const a=n(18592),r=o(n(67294)),i=n(69274),s=n(19446),l=n(7117),c=n(35625),d=a.css`
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
`,u=a.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:n,version:o})=>{const{isMenuOpen:s,setMenuOpen:m}=(0,l.useMobileContext)();return r.default.createElement("div",{className:(0,a.cx)(d,s?void 0:u)},r.default.createElement(c.MobileHeader,{href:n,actionIcon:i.HiXMark,onAction:()=>m(!1),name:e,version:o}),t)}},86229:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const a=n(18592),r=o(n(67294)),i=n(80887),s=n(19446),l=a.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${s.theme.colors.dark2};
  @media ${i.breakpoints.phone} {
    display: none;
  }
`;t.SideBar=({children:e})=>r.default.createElement("div",{className:l},e)},21710:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const a=n(18592),r=n(96486),i=o(n(67294)),s=n(19446),l=a.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${s.theme.spacing.m} ${s.theme.spacing.m};
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.text};
  gap: ${s.theme.spacing.s};
`,c=a.css`
  text-transform: uppercase;
  font-weight: bold;
  flex: ${s.theme.flex.grow};
`,d=a.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${s.theme.spacing.xxm};
`;t.SideBarSection=({children:e,attachment:t,title:n})=>{const o=(0,r.isNil)(n)&&(0,r.isNil)(t);return i.default.createElement(i.default.Fragment,null,o?null:i.default.createElement("div",{className:l},i.default.createElement("span",{className:c},n),t),i.default.createElement("div",{className:d},e))}},20519:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const a=o(n(67294)),r=n(19446),i=n(14757);t.SvgLogo=({color:e=r.theme.colors.green,width:t,height:n})=>{const[o,s]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,n);return a.default.createElement("svg",{width:o,height:s,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},44702:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const s=n(18592),l=r(n(67294)),c=n(70077),d=i(n(86032)),u=n(74855),m=n(19446),p=n(69274),h=n(96486),f=n(98452),g={light:(0,f.createPrismTheme)(d.default,m.theme.colors.dark1),medium:(0,f.createPrismTheme)(d.default,m.theme.colors.dark2),dark:(0,f.createPrismTheme)(d.default,m.theme.colors.dark4)},b={light:m.theme.colors.dark2,medium:m.theme.colors.dark4,dark:m.theme.colors.dark1},v=s.css`
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
`,y=s.css`
  position: relative;
  flex-grow: ${m.theme.flex.grow};
  height: 100vh;

  pre {
    min-height: 100%;
  }

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:n,theme:o,host:a,renderer:r})=>{const[i,d]=(0,l.useState)(!1),[f,x]=(0,l.useState)(void 0),k="editor"===a?y:v;return l.default.createElement("div",{className:k},l.default.createElement(c.Prism,{language:t,style:g[o],wrapLongLines:n,showLineNumbers:"editor"===a,...(0,h.isNil)(r)?{}:{renderer:r}},e),l.default.createElement(u.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,h.isNil)(f)||(clearTimeout(f),x(void 0)),d(t),x(setTimeout((()=>{d(!1)}),2e3))}},l.default.createElement("button",{className:(_=b[o],s.css`
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
  background-color: ${_};
  color: ${m.theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) ${m.theme.spacing.zero} ${m.theme.spacing.xs} ${m.theme.spacing.s};
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`)},i?l.default.createElement(p.HiCheck,null):l.default.createElement(p.HiClipboard,null))));var _}},66999:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const a=n(18592),r=o(n(67294)),i=n(19446),s=a.css`
  border-radius: ${i.theme.spacing.m};
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  margin: 1px;
`,l=a.css`
  border-collapse: collapse;
  max-width: 100%;
  width: 100%;
  border-width: ${i.theme.spacing.zero};
`;t.Table=({children:e,className:t,...n})=>r.default.createElement("div",{className:s},r.default.createElement("table",{className:(0,a.cx)(l,t),...n},e));const c=a.css`
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  border-left-width: ${i.theme.spacing.zero};
  border-right-width: ${i.theme.spacing.zero};
  max-width: 100%;
  &:last-of-type {
    border-bottom-width: ${i.theme.spacing.zero};
  }
`,d=a.css`
  background-color: ${i.theme.colors.dark1};
  border-width: ${i.theme.spacing.zero};
  border-radius: ${i.theme.spacing.m};
`;t.Tr=({children:e,isHeader:t,className:n,...o})=>{const i=(0,a.cx)(t?d:c,n);return r.default.createElement("tr",{...o,className:i},e)};const u=a.css`
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
`;t.Th=({children:e,className:t,...n})=>r.default.createElement("th",{...n,className:(0,a.cx)(u,t)},e);const m=a.css`
  padding: ${i.theme.spacing.m};
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.muted};
`;t.Td=({children:e,className:t,...n})=>r.default.createElement("td",{...n,className:(0,a.cx)(m,t)},e);const p=a.css`
  border-width: ${i.theme.spacing.zero};
`;t.THead=({children:e,className:t,...n})=>r.default.createElement("thead",{...n,className:(0,a.cx)(p,t)},e);const h=a.css`
  border-width: ${i.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...n})=>r.default.createElement("tbody",{...n,className:(0,a.cx)(h,t)},e)},82067:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const a=n(18592),r=o(n(67294)),i=n(69274),s=n(19446),l=a.css`
  label: tree-node;
  position: relative;
`,c=(e,t)=>a.css`
  label: tree-node-content-level-${e};
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
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
  label: tree-node-item-label;
  flex: 1 0 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s.theme.spacing.xxs};
`,u=a.css`
  margin-left: 0.6rem;
`,m=({isOpen:e,isEmpty:t})=>t?r.default.createElement(i.HiChevronLeft,null):e?r.default.createElement(i.HiChevronDown,null):r.default.createElement(i.HiChevronRight,null);t.TreeNode=function e({value:t,level:n,getLabel:o,isActive:i=(()=>!1),isOpen:s=(()=>!1),isContainer:p=(()=>!1),getChildren:h=(()=>[]),onClick:f=(()=>{}),getHref:g=(()=>{}),getIcon:b=(()=>{})}){const v=h(t),y=s(t),x=i(t),k=p(t),_=b(t),w=k&&y?(0,a.cx)(l,(e=>a.css`
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
`)(n)):l,P=g(t),M=o(t),S=!(k||void 0!==_||0===n);return r.default.createElement("div",{className:w},r.default.createElement("a",{className:c(n,x),href:P,onClick:()=>f(t,y)},r.default.createElement("span",{className:d},k&&r.default.createElement(m,{isEmpty:0===v.length,isOpen:y}),void 0===_?null:r.default.createElement(_,null),S?r.default.createElement("span",{className:u},M):r.default.createElement("span",null,M))),y&&v.map(((t,a)=>r.default.createElement(e,{key:`${a}-${M}`,value:t,level:n+1,getLabel:o,getHref:g,isContainer:p,getChildren:h,isOpen:s,isActive:i,onClick:f}))))}},98452:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const o=n(96486),a=n(19446);t.createPrismTheme=function(e,t){const n={'pre[class*="language-"]':{backgroundColor:t,borderRadius:a.theme.spacing.zero,padding:a.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:a.theme.spacing.zero,margin:a.theme.spacing.zero,fontSize:a.theme.fontSize.code,fontFamily:a.theme.fontFamily.monospace}},r=(0,o.cloneDeep)(e);return(0,o.values)(r).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${a.theme.spacing.zero} ${a.theme.spacing.zero} ${a.theme.spacing.xxs}`,e.fontSize=a.theme.fontSize.code,e.fontFamily=a.theme.fontFamily.monospace})),(0,o.merge)(r,n)}},14757:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,n,o){return void 0!==n&&void 0===o?[n,t/e*n]:void 0!==o&&void 0===n?[o,e/t*o]:void 0!==n&&void 0!==o?[n,o]:[e,t]}},63413:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const o=n(26729),a=n(80887),r=n(19446);t.globalStyles=o.css`
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
`},77255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,t.links={docs:()=>"/docs/documentation",doc:e=>`/docs/documentation/${e}`,editor:()=>"/docs/editor",index:()=>"/docs"}},82509:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdownPages=void 0,t.markdownPages={customGeneratorsPage:{bundle:"documentation-CustomGenerators",name:"Custom Generators",description:"In this guide you'll learn how to create custom generators using Oats",importPath:"src/bundles/documentation/DocumentationBundle_CustomGenerators.tsx",md:"CustomGenerators"},generatePage:{bundle:"documentation-Generate",name:"Generate",description:"In this guide you'll learn how the generator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Generate.tsx",md:"Generate"},openApi101Page:{bundle:"documentation-OpenAPI101",name:"OpenAPI 101",description:"In this guide I'll share some DOs and DON'Ts, when constructing an OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_OpenAPI101.tsx",md:"OpenAPI101"},readPage:{bundle:"documentation-Read",name:"Read",description:"In this guide you'll learn how the reader step works.",importPath:"src/bundles/documentation/DocumentationBundle_Read.tsx",md:"Read"},sdkErrorHandlingPage:{bundle:"documentation-SdkErrorHandling",name:"Error handling",description:"In this example you'll learn the recommended approach to handle errors when using the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkErrorHandling.tsx",md:"SdkErrorHandling"},sdkGettingStartedPage:{bundle:"documentation-SdkGettingStarted",name:"Getting started",description:"In this guide you'll learn how to generate an SDK and (necessary related code) based on your OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_SdkGettingStarted.tsx",md:"SdkGettingStarted"},sdkPublishPage:{bundle:"documentation-SdkPublish",name:"Publish your SDK",description:"This guide will walk show how you can create an SDK (client side code that can talk to your backend) using Oats, and publish it as an npm package.",importPath:"src/bundles/documentation/DocumentationBundle_SdkPublish.tsx",md:"SdkPublish"},sdkTypesPage:{bundle:"documentation-SdkTypes",name:"SDK related types",description:"This guide will showcase the main types generated for the client side.",importPath:"src/bundles/documentation/DocumentationBundle_SdkTypes.tsx",md:"SdkTypes"},sdkUsagePage:{bundle:"documentation-SdkUsage",name:"SDK usage",description:"In this guide you'll learn the basic usage of the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkUsage.tsx",md:"SdkUsage"},serverApiExamplePage:{bundle:"documentation-ServerApiExample",name:"Example API",description:"In this guide you'll see a basic API implementation using the book store example.",importPath:"src/bundles/documentation/DocumentationBundle_ServerApiExample.tsx",md:"ServerApiExample"},serverCorsPage:{bundle:"documentation-ServerCors",name:"Implement CORS",description:"In this guide you'll learn how to make your Oats and express based server CORS enabled.",importPath:"src/bundles/documentation/DocumentationBundle_ServerCors.tsx",md:"ServerCors"},serverGettingStartedPage:{bundle:"documentation-ServerGettingStarted",name:"Getting started",description:"This guide will help you getting started with generating server side code using Oats.",importPath:"src/bundles/documentation/DocumentationBundle_ServerGettingStarted.tsx",md:"ServerGettingStarted"},serverSetupPage:{bundle:"documentation-ServerSetup",name:"Express server setup",description:"In this guide you'll learn how to set up generated Oats code with your existing [express](https://expressjs.com) backend.",importPath:"src/bundles/documentation/DocumentationBundle_ServerSetup.tsx",md:"ServerSetup"},serverTypesPage:{bundle:"documentation-ServerTypes",name:"Server types",description:"This guide will showcase the main types generated for the server side.",importPath:"src/bundles/documentation/DocumentationBundle_ServerTypes.tsx",md:"ServerTypes"},validatePage:{bundle:"documentation-Validate",name:"Validate",description:"In this guide you'll learn how the validator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Validate.tsx",md:"Validate"},welcomePage:{bundle:"documentation-Welcome",name:"Welcome to the docs!",description:"Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.",importPath:"src/bundles/documentation/DocumentationBundle_Welcome.tsx",md:"Welcome"},writePage:{bundle:"documentation-Write",name:"Write",description:"In this guide you'll learn how the writer step works.",importPath:"src/bundles/documentation/DocumentationBundle_Write.tsx",md:"Write"}}},42946:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const o=n(96486),a=n(82509),r=[{name:"General",useNavigation:!1,items:[a.markdownPages.welcomePage,a.markdownPages.openApi101Page]},{name:"Server Guide",useNavigation:!0,items:[a.markdownPages.serverGettingStartedPage,a.markdownPages.serverTypesPage,a.markdownPages.serverSetupPage,a.markdownPages.serverApiExamplePage,a.markdownPages.serverCorsPage]},{name:"(Client) SDK Guide",useNavigation:!0,items:[a.markdownPages.sdkGettingStartedPage,a.markdownPages.sdkTypesPage,a.markdownPages.sdkUsagePage,a.markdownPages.sdkErrorHandlingPage,a.markdownPages.sdkPublishPage]},{name:"Generator api",useNavigation:!0,items:[a.markdownPages.readPage,a.markdownPages.validatePage,a.markdownPages.generatePage,a.markdownPages.customGeneratorsPage,a.markdownPages.writePage]}];t.sections=r,t.docs=(0,o.flatMap)(t.sections,(e=>e.items))},11149:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const i=n(18592),s=n(96486),l=r(n(67294)),c=n(69274),d=n(3930),u=n(77255),m=n(19446),p=n(10603),h=i.css`
  padding: ${m.theme.spacing.l};
  display: flex;
  flex-direction: column;
  gap: ${m.theme.spacing.l};
`,f=i.css`
  display: flex;
  flex-direction: row;
  align-items: center;
`,g=i.css`
  padding: ${m.theme.spacing.xxm};
  background-color: ${m.theme.colors.dark2};
  border-radius: ${m.theme.spacing.m};
  color: ${m.theme.colors.muted};
`,b=i.css`
  flex: ${m.theme.flex.grow};
`,v=i.css`
  font-weight: bold;
`;function y(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,n]=(0,p.useNeighbours)(),o=!(0,s.isNil)(e),a=!(0,s.isNil)(n),r=!(0,s.isNil)(t),i=(0,l.useMemo)((()=>{if(!(0,s.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${y(t.name)}+(in+${t.md}.md)&body=${y("Please describe the issue!")}`}),[t]);return o||a||r?l.default.createElement("div",{className:h},(o||a)&&l.default.createElement("div",{className:f},o&&l.default.createElement(d.Link,{href:u.links.doc(e.md),className:v},l.default.createElement(c.HiChevronLeft,null),e.name),l.default.createElement("div",{className:b}),a&&l.default.createElement(d.Link,{href:u.links.doc(n.md),className:v},n.name,l.default.createElement(c.HiChevronRight,null))),r&&l.default.createElement("div",{className:g},l.default.createElement("b",null,"Found an issue on this page?"),l.default.createElement("br",null),"Please let me know by ",l.default.createElement(d.Link,{href:i},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},97281:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const i=r(n(67294)),s=n(96487),l=n(21710),c=n(54711),d=n(42946);t.DocumentationMenu=()=>i.default.createElement(i.default.Fragment,null,i.default.createElement(l.SideBarSection,null,i.default.createElement(s.MenuTreeItem,{link:"index"}),i.default.createElement(s.MenuTreeItem,{link:"editor"})),d.sections.map(((e,t)=>i.default.createElement(i.Fragment,{key:e.name??`item-${t}`},i.default.createElement(l.SideBarSection,{title:e.name},e.items.map((e=>i.default.createElement(c.DocumentationTreeRoot,{node:e,key:e.md}))))))))},15529:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const a=n(18592),r=o(n(67294)),i=n(80887),s=n(98378),l=n(40704),c=n(7117),d=n(8015),u=n(86229),m=n(66118),p=n(19187),h=n(19446),f=n(97281),g=n(11149),b=n(49098),v=n(77255),y="docs",x=a.css`
  flex: ${h.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${h.theme.colors.muted};
  font-size: ${h.theme.fontSize.m};
  background-color: ${h.theme.colors.dark4};
`,k=a.css`
  margin: ${h.theme.spacing.l};
`,_=()=>{const e=(0,c.useProvideMobileContext)();return r.default.createElement(c.MobileContext.Provider,{value:e},r.default.createElement(d.MobileHeaderWithOverlay,{name:y,version:!0,href:v.links.docs()},r.default.createElement(f.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>r.default.createElement(b.MarkdownContext.Provider,{value:{page:e,content:t}},r.default.createElement(s.DocContainer,null,r.default.createElement(u.SideBar,null,r.default.createElement(p.LogoContainer,null,r.default.createElement(m.Logo,{name:y,version:!0,href:v.links.docs()})),r.default.createElement(f.DocumentationMenu,null)),r.default.createElement("div",{className:x},r.default.createElement(i.BreakPoint,{Component:_,breakpoint:"phone"}),r.default.createElement("div",{className:k},r.default.createElement(l.MarkdownView,{content:t})),r.default.createElement(g.DocumentationFooter,null))))},54711:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const a=o(n(67294)),r=n(82067),i=n(7117),s=n(49098),l=n(77255);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,i.useMobileContext)(),{page:n}=(0,s.useMarkdown)();return a.default.createElement(r.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===n,onClick:()=>t(!1),getHref:e=>l.links.doc(e.md)})}},49098:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const o=n(67294);t.MarkdownContext=(0,o.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,o.useContext)(t.MarkdownContext)},10603:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const o=n(96486),a=n(67294),r=n(42946),i=n(49098);function s(e,t,n=0){if((0,o.isNil)(e)||0!==n&&!e.useNavigation)return;const a=function(e,t){return t.items.findIndex((t=>t.md===e))}(t,e)+n;return e.items[a]}t.useNeighbours=function(){const{page:e}=(0,i.useMarkdown)(),t=(0,a.useMemo)((()=>function(e){return r.sections.find((t=>t.items.some((t=>t.md===e))))}(e)),[e]),n=(0,a.useMemo)((()=>s(t,e)),[e,t]);return[(0,a.useMemo)((()=>s(t,e,-1)),[e,t]),n,(0,a.useMemo)((()=>s(t,e,1)),[e,t])]}},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444",transparentWhite:"rgba(255, 255, 255, 0.2)"},fontSize:{code:"1.1rem",xxs:"0.85rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=35313)}]);
//# sourceMappingURL=documentation-OpenAPI101.bundle.js.map