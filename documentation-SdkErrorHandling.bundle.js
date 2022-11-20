"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[768],{68642:(e,t,o)=>{o.r(t),o.d(t,{default:()=>n});const n="# Error handling\n\nIn this example you'll learn the recommended approach to handle errors when using the generated SDK.\n\n> As for all guides, this one is based on the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example.\n\nOats generated SDKs don't `throw` (or rather reject, as we are dealing with `Promise`s), unless the response is invalid according to the source OpenAPI document.\n\n## Examples of rejections:\n\n- The `statusCode` doesn't match any of the statuses defined in the source OpenAPI document (eg.: it defines `200`, `400` and `500` but the response has a `403` status code).\n- The `mimeType` doesn't match any of the mime types defined for the given Operation and status code, defined in the source OpenAPI document (eg.: it defines `application/json` and `text/plain` but we get `application/xml`)\n- Parsing of the response `body` fails\n- The response `body` doesn't validate against the schema described in the OpenAPI document\n\nIn all of these cases the server doesn't respect the same OpenAPI document we are working against, this is considered an unexpected situation. Oats throws, as this is something that **NEEDS** a developers attention, as the SDK and the server \"don't speak the same language\".\n\n## Examples of no rejection:\n\n- The `statusCode`, the response `body` + its `mimeType`, and optionally the response `headers` together match a response option described in the source OpenAPI document.\n- The `statusCode` is outside of the `2xx`, but the first condition is fulfilled (given status code is documented in the source OpenAPI document)\n\nIn this cases the response is documented, and so the responses will be properly parsed, validated, etc, as according to the source OpenAPI document they are to be expected, even if it's not in the `2xx` range. If the OpenAPI document the SDK was generated from lists `4xx` and `5xx` statuses as possibilites that can happen, then the client **SHOULD** be ready for these cases too, and handle them properly.\n\nThis gives you a flexible and consistent way of error handling, that doesn't hide anything, but rather transparently reflects the servers described behaviour. This is reflected in the [previous (usage) example](SdkUsage) as well.\n\nAn example displaying really detailed error handling:\n\n```typescript\ntry {\n  // Make a request\n  const response = await sdk.getBook({ path: { bookId: 42 } })\n  // Check each option for status code\n  switch (response.statusCode) {\n    case 200: {\n      // The body is known to be of Book type, and you can safely access fields on it:\n      console.log(response.body.title)\n      break\n    }\n    case 400: {\n      // The body is known to be of AppError[] type:\n      console.error('400 Status code')\n      response.body.forEach((err) => console.error(err.message))\n      break\n    }\n    case 500: {\n      // The body is also known to be of AppError[] type:\n      console.error('500 Status code')\n      response.body.forEach((err) => console.error(err.message))\n      break\n    }\n  }\n} catch (e) {\n  console.error('The server did something unexpected:')\n  // Thrown error will have detailed explanation about what was unexpected.\n  // This can be wrong status code + mime type, response body or response\n  // header format or structure.\n  console.error(e)\n}\n```\n"},86032:(e,t,o)=>{o.r(t),o.d(t,{default:()=>n});const n={'pre[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#1e1e1e"},'code[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'pre[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},':not(pre) > code[class*="language-"]':{padding:".1em .3em",borderRadius:".3em",color:"#db4c69",background:"#1e1e1e"},".namespace":{Opacity:".7"},"doctype.doctype-tag":{color:"#569CD6"},"doctype.name":{color:"#9cdcfe"},comment:{color:"#6a9955"},prolog:{color:"#6a9955"},punctuation:{color:"#d4d4d4"},".language-html .language-css .token.punctuation":{color:"#d4d4d4"},".language-html .language-javascript .token.punctuation":{color:"#d4d4d4"},property:{color:"#9cdcfe"},tag:{color:"#569cd6"},boolean:{color:"#569cd6"},number:{color:"#b5cea8"},constant:{color:"#9cdcfe"},symbol:{color:"#b5cea8"},inserted:{color:"#b5cea8"},unit:{color:"#b5cea8"},selector:{color:"#d7ba7d"},"attr-name":{color:"#9cdcfe"},string:{color:"#ce9178"},char:{color:"#ce9178"},builtin:{color:"#ce9178"},deleted:{color:"#ce9178"},".language-css .token.string.url":{textDecoration:"underline"},operator:{color:"#d4d4d4"},entity:{color:"#569cd6"},"operator.arrow":{color:"#569CD6"},atrule:{color:"#ce9178"},"atrule.rule":{color:"#c586c0"},"atrule.url":{color:"#9cdcfe"},"atrule.url.function":{color:"#dcdcaa"},"atrule.url.punctuation":{color:"#d4d4d4"},keyword:{color:"#569CD6"},"keyword.module":{color:"#c586c0"},"keyword.control-flow":{color:"#c586c0"},function:{color:"#dcdcaa"},"function.maybe-class-name":{color:"#dcdcaa"},regex:{color:"#d16969"},important:{color:"#569cd6"},italic:{fontStyle:"italic"},"class-name":{color:"#4ec9b0"},"maybe-class-name":{color:"#4ec9b0"},console:{color:"#9cdcfe"},parameter:{color:"#9cdcfe"},interpolation:{color:"#9cdcfe"},"punctuation.interpolation-punctuation":{color:"#569cd6"},variable:{color:"#9cdcfe"},"imports.maybe-class-name":{color:"#9cdcfe"},"exports.maybe-class-name":{color:"#9cdcfe"},escape:{color:"#d7ba7d"},"tag.punctuation":{color:"#808080"},cdata:{color:"#808080"},"attr-value":{color:"#ce9178"},"attr-value.punctuation":{color:"#ce9178"},"attr-value.punctuation.attr-equals":{color:"#d4d4d4"},namespace:{color:"#4ec9b0"},'pre[class*="language-javascript"]':{color:"#9cdcfe"},'code[class*="language-javascript"]':{color:"#9cdcfe"},'pre[class*="language-jsx"]':{color:"#9cdcfe"},'code[class*="language-jsx"]':{color:"#9cdcfe"},'pre[class*="language-typescript"]':{color:"#9cdcfe"},'code[class*="language-typescript"]':{color:"#9cdcfe"},'pre[class*="language-tsx"]':{color:"#9cdcfe"},'code[class*="language-tsx"]':{color:"#9cdcfe"},'pre[class*="language-css"]':{color:"#ce9178"},'code[class*="language-css"]':{color:"#ce9178"},'pre[class*="language-html"]':{color:"#d4d4d4"},'code[class*="language-html"]':{color:"#d4d4d4"},".language-regex .token.anchor":{color:"#dcdcaa"},".language-html .token.punctuation":{color:"#808080"},'pre[class*="language-"] > code[class*="language-"]':{position:"relative",zIndex:"1"},".line-highlight.line-highlight":{background:"#f7ebc6",boxShadow:"inset 5px 0 0 #f7d87c",zIndex:"0"}}},80887:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var a=Object.getOwnPropertyDescriptor(t,o);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,a)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const s=r(o(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:o})=>{const[n,a]=(0,s.useState)((()=>window.matchMedia(t.breakpoints[o]).matches));return(0,s.useEffect)((()=>{window.matchMedia(t.breakpoints[o]).addEventListener("change",(e=>a(e.matches)))}),[]),n?s.default.createElement(e,null):null}},28353:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(o(67294)),r=o(20745),s=o(15529),i=n(o(68642));(0,r.createRoot)(document.getElementById("root")).render(a.default.createElement(s.DocumentationPage,{page:"SdkErrorHandling",content:i.default}))},4074:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const a=o(18592),r=n(o(67294)),s=o(19446),i=a.css`
  font-size: ${s.theme.fontSize.code};
  color: ${s.theme.colors.text};
  background-color: ${s.theme.colors.dark1};
  padding: ${s.theme.spacing.xxxs} ${s.theme.spacing.xxs};
  border-radius: ${s.theme.spacing.xs};
`;t.Code=({className:e,children:t,...o})=>r.default.createElement("code",{className:(0,a.cx)(i,e),...o},t)},98378:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const a=o(18592),r=o(26729),s=n(o(67294)),i=o(63413),l=o(19446),c=a.css`
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
`;t.DocContainer=({children:e})=>s.default.createElement(s.default.Fragment,null,s.default.createElement(r.Global,{styles:i.globalStyles}),s.default.createElement("div",{className:c},e))},3930:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const a=n(o(67294)),r=o(18592),s=o(19446),i=o(96486),l=r.css`
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
`;t.Link=({children:e,className:t,onClick:o,...n})=>(0,i.isNil)(o)?a.default.createElement("a",{className:(0,r.cx)(l,t),...n},e):a.default.createElement("span",{className:(0,r.cx)(l,t),onClick:o,...n},e)},66118:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const a=o(18592),r=o(67535),s=o(96486),i=n(o(67294)),l=o(19446),c=o(20519),d=a.css`
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
`;t.Logo=({name:e,version:t,href:o})=>i.default.createElement("a",{className:d,href:o},i.default.createElement(c.SvgLogo,{width:60}),i.default.createElement("div",{className:u},i.default.createElement("h1",{className:m},"Oats ",(0,s.isNil)(e)?null:i.default.createElement("span",{className:h},e)),t&&i.default.createElement("span",{className:p},"v",r.version)))},19187:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const a=o(18592),r=n(o(67294)),s=o(80887),i=o(19446),l=a.css`
  margin: ${i.theme.spacing.m} ${i.theme.spacing.m} ${i.theme.spacing.xxxl} ${i.theme.spacing.m};
  @media ${s.breakpoints.phone} {
    margin: ${i.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>r.default.createElement("div",{className:l},e)},40704:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var a=Object.getOwnPropertyDescriptor(t,o);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,a)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return a(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const i=o(18592),l=o(96486),c=r(o(67294)),d=r(o(23209)),u=s(o(34112)),m=o(82509),h=o(77255),p=o(19446),f=o(4074),g=o(3930),b=o(44702),v=o(66999),x=i.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.l};
  margin-top: ${p.theme.spacing.zero};
`,y=i.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.xm};
`,k=i.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.m};
`,_=i.css`
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
`,w=Object.values(m.markdownPages),P=e=>{const t=w.find((t=>e.startsWith(t.md)));return(0,l.isNil)(t)?e===encodeURIComponent("{{documentation}}")?h.links.docs():e===encodeURIComponent("{{editor}}")?h.links.editor():(0,d.uriTransformer)(e):h.links.doc(t.md)},S=[u.default];t.MarkdownView=({content:e,syntaxHighlighterProps:t={}})=>{const o=(0,c.useMemo)((()=>{return e=t,{h1:({children:e})=>c.default.createElement("h1",{className:x},e),h2:({children:e})=>c.default.createElement("h2",{className:y},e),h3:({children:e})=>c.default.createElement("h3",{className:k},e),table:({children:e})=>c.default.createElement(v.Table,null,e),tr:({children:e,isHeader:t})=>c.default.createElement(v.Tr,{isHeader:t},e),th:({children:e})=>c.default.createElement(v.Th,null,e),td:({children:e})=>c.default.createElement(v.Td,null,e),a:({href:e,children:t})=>c.default.createElement(g.Link,{href:e},t),code({node:t,inline:o,className:n,children:a,...r}){const s=/language-(\w+)/.exec(n||"");return null===s||o?c.default.createElement(f.Code,{...r},a):c.default.createElement(b.SyntaxHighlighter,{language:s[1],host:e.host??"docs",theme:e.theme??"medium",lineWrap:e.lineWrap??!1},String(a).replace(/\n$/,""))},blockquote:({children:e})=>c.default.createElement("div",{className:_},e)};var e}),[t.host,t.lineWrap,t.theme]);return c.default.createElement(d.default,{remarkPlugins:S,components:o,transformLinkUri:P},e??"")}},96487:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuTreeItem=void 0;const a=n(o(67294)),r=o(69274),s=o(77255),i=o(7117),l=o(82067),c={index:"Home",docs:"Documentation",editor:"Editor"},d={index:r.HiHome,docs:r.HiDocument,editor:r.HiCog6Tooth};t.MenuTreeItem=({link:e})=>{const{setMenuOpen:t}=(0,i.useMobileContext)();return a.default.createElement(l.TreeNode,{value:void 0,level:0,getIcon:()=>d[e],getLabel:()=>c[e],isActive:()=>!1,onClick:()=>t(!1),getHref:()=>s.links[e]()})}},7117:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const n=o(96486),a=o(67294);t.MobileContext=(0,a.createContext)({isMenuOpen:!1,setMenuOpen:n.noop}),t.useMobileContext=()=>(0,a.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,a.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},35625:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const a=o(18592),r=n(o(67294)),s=o(19446),i=o(19187),l=o(66118),c=a.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,d=a.css`
  color: ${s.theme.colors.muted};
  font-size: ${s.theme.fontSize.xxl};
  cursor: pointer;
  margin: ${s.theme.spacing.m};
  &:hover {
    color: ${s.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:o,actionIcon:n,onAction:a})=>r.default.createElement("div",{className:c},r.default.createElement(i.LogoContainer,null,r.default.createElement(l.Logo,{name:e,version:t,href:o})),r.default.createElement(n,{className:d,onClick:a}))},8015:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const a=n(o(67294)),r=o(69274),s=o(7117),i=o(35625),l=o(99102);t.MobileHeaderWithOverlay=({name:e,version:t,href:o,children:n})=>{const{setMenuOpen:c}=(0,s.useMobileContext)();return a.default.createElement(a.default.Fragment,null,a.default.createElement(i.MobileHeader,{href:o,name:e,version:t,actionIcon:r.HiBars3,onAction:()=>c(!0)}),a.default.createElement(l.MobileOverlay,{href:o,name:e,version:t},n))}},99102:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const a=o(18592),r=n(o(67294)),s=o(69274),i=o(19446),l=o(7117),c=o(35625),d=a.css`
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
`;t.MobileOverlay=({name:e,children:t,href:o,version:n})=>{const{isMenuOpen:i,setMenuOpen:m}=(0,l.useMobileContext)();return r.default.createElement("div",{className:(0,a.cx)(d,i?void 0:u)},r.default.createElement(c.MobileHeader,{href:o,actionIcon:s.HiXMark,onAction:()=>m(!1),name:e,version:n}),t)}},86229:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const a=o(18592),r=n(o(67294)),s=o(80887),i=o(19446),l=a.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${i.theme.colors.dark2};
  @media ${s.breakpoints.phone} {
    display: none;
  }
`;t.SideBar=({children:e})=>r.default.createElement("div",{className:l},e)},21710:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const a=o(18592),r=o(96486),s=n(o(67294)),i=o(19446),l=a.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${i.theme.spacing.m} ${i.theme.spacing.m};
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.text};
  gap: ${i.theme.spacing.s};
`,c=a.css`
  text-transform: uppercase;
  font-weight: bold;
  flex: ${i.theme.flex.grow};
`,d=a.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${i.theme.spacing.xxm};
`;t.SideBarSection=({children:e,attachment:t,title:o})=>{const n=(0,r.isNil)(o)&&(0,r.isNil)(t);return s.default.createElement(s.default.Fragment,null,n?null:s.default.createElement("div",{className:l},s.default.createElement("span",{className:c},o),t),s.default.createElement("div",{className:d},e))}},20519:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const a=n(o(67294)),r=o(19446),s=o(14757);t.SvgLogo=({color:e=r.theme.colors.green,width:t,height:o})=>{const[n,i]=(0,s.getSizeWithAspectRatio)(172.439,111.543,t,o);return a.default.createElement("svg",{width:n,height:i,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},44702:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var a=Object.getOwnPropertyDescriptor(t,o);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,a)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return a(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=o(18592),l=r(o(67294)),c=o(70077),d=s(o(86032)),u=o(74855),m=o(19446),h=o(69274),p=o(96486),f=o(98452),g={light:(0,f.createPrismTheme)(d.default,m.theme.colors.dark1),medium:(0,f.createPrismTheme)(d.default,m.theme.colors.dark2),dark:(0,f.createPrismTheme)(d.default,m.theme.colors.dark4)},b={light:m.theme.colors.dark2,medium:m.theme.colors.dark4,dark:m.theme.colors.dark1},v=i.css`
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

  pre {
    min-height: 100%;
  }

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:o,theme:n,host:a,renderer:r})=>{const[s,d]=(0,l.useState)(!1),[f,y]=(0,l.useState)(void 0),k="editor"===a?x:v;return l.default.createElement("div",{className:k},l.default.createElement(c.Prism,{language:t,style:g[n],wrapLongLines:o,showLineNumbers:"editor"===a,...(0,p.isNil)(r)?{}:{renderer:r}},e),l.default.createElement(u.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,p.isNil)(f)||(clearTimeout(f),y(void 0)),d(t),y(setTimeout((()=>{d(!1)}),2e3))}},l.default.createElement("button",{className:(_=b[n],i.css`
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
`)},s?l.default.createElement(h.HiCheck,null):l.default.createElement(h.HiClipboard,null))));var _}},66999:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const a=o(18592),r=n(o(67294)),s=o(19446),i=a.css`
  border-radius: ${s.theme.spacing.m};
  border: ${s.theme.spacing.xxxs} solid ${s.theme.colors.dark1};
  margin: 1px;
`,l=a.css`
  border-collapse: collapse;
  max-width: 100%;
  width: 100%;
  border-width: ${s.theme.spacing.zero};
`;t.Table=({children:e,className:t,...o})=>r.default.createElement("div",{className:i},r.default.createElement("table",{className:(0,a.cx)(l,t),...o},e));const c=a.css`
  border: ${s.theme.spacing.xxxs} solid ${s.theme.colors.dark1};
  border-left-width: ${s.theme.spacing.zero};
  border-right-width: ${s.theme.spacing.zero};
  max-width: 100%;
  &:last-of-type {
    border-bottom-width: ${s.theme.spacing.zero};
  }
`,d=a.css`
  background-color: ${s.theme.colors.dark1};
  border-width: ${s.theme.spacing.zero};
  border-radius: ${s.theme.spacing.m};
`;t.Tr=({children:e,isHeader:t,className:o,...n})=>{const s=(0,a.cx)(t?d:c,o);return r.default.createElement("tr",{...n,className:s},e)};const u=a.css`
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
`;t.Th=({children:e,className:t,...o})=>r.default.createElement("th",{...o,className:(0,a.cx)(u,t)},e);const m=a.css`
  padding: ${s.theme.spacing.m};
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.muted};
`;t.Td=({children:e,className:t,...o})=>r.default.createElement("td",{...o,className:(0,a.cx)(m,t)},e);const h=a.css`
  border-width: ${s.theme.spacing.zero};
`;t.THead=({children:e,className:t,...o})=>r.default.createElement("thead",{...o,className:(0,a.cx)(h,t)},e);const p=a.css`
  border-width: ${s.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...o})=>r.default.createElement("tbody",{...o,className:(0,a.cx)(p,t)},e)},82067:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const a=o(18592),r=n(o(67294)),s=o(69274),i=o(19446),l=a.css`
  label: tree-node;
  position: relative;
`,c=(e,t)=>a.css`
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
`,d=a.css`
  label: tree-node-item-label;
  flex: 1 0 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${i.theme.spacing.xxs};
`,u=a.css`
  margin-left: 0.6rem;
`,m=({isOpen:e,isEmpty:t})=>t?r.default.createElement(s.HiChevronLeft,null):e?r.default.createElement(s.HiChevronDown,null):r.default.createElement(s.HiChevronRight,null);t.TreeNode=function e({value:t,level:o,getLabel:n,isActive:s=(()=>!1),isOpen:i=(()=>!1),isContainer:h=(()=>!1),getChildren:p=(()=>[]),onClick:f=(()=>{}),getHref:g=(()=>{}),getIcon:b=(()=>{})}){const v=p(t),x=i(t),y=s(t),k=h(t),_=b(t),w=k&&x?(0,a.cx)(l,(e=>a.css`
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
`)(o)):l,P=g(t),S=n(t),M=!(k||void 0!==_||0===o);return r.default.createElement("div",{className:w},r.default.createElement("a",{className:c(o,y),href:P,onClick:()=>f(t,x)},r.default.createElement("span",{className:d},k&&r.default.createElement(m,{isEmpty:0===v.length,isOpen:x}),void 0===_?null:r.default.createElement(_,null),M?r.default.createElement("span",{className:u},S):r.default.createElement("span",null,S))),x&&v.map(((t,a)=>r.default.createElement(e,{key:`${a}-${S}`,value:t,level:o+1,getLabel:n,getHref:g,isContainer:h,getChildren:p,isOpen:i,isActive:s,onClick:f}))))}},98452:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const n=o(96486),a=o(19446);t.createPrismTheme=function(e,t){const o={'pre[class*="language-"]':{backgroundColor:t,borderRadius:a.theme.spacing.zero,padding:a.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:a.theme.spacing.zero,margin:a.theme.spacing.zero,fontSize:a.theme.fontSize.code,fontFamily:a.theme.fontFamily.monospace}},r=(0,n.cloneDeep)(e);return(0,n.values)(r).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${a.theme.spacing.zero} ${a.theme.spacing.zero} ${a.theme.spacing.xxs}`,e.fontSize=a.theme.fontSize.code,e.fontFamily=a.theme.fontFamily.monospace})),(0,n.merge)(r,o)}},14757:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,o,n){return void 0!==o&&void 0===n?[o,t/e*o]:void 0!==n&&void 0===o?[n,e/t*n]:void 0!==o&&void 0!==n?[o,n]:[e,t]}},63413:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const n=o(26729),a=o(80887),r=o(19446);t.globalStyles=n.css`
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
`},77255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,t.links={docs:()=>"/docs/documentation",doc:e=>`/docs/documentation/${e}`,editor:()=>"/docs/editor",index:()=>"/docs"}},82509:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdownPages=void 0,t.markdownPages={customGeneratorsPage:{bundle:"documentation-CustomGenerators",name:"Custom Generators",description:"In this guide you'll learn how to create custom generators using Oats",importPath:"src/bundles/documentation/DocumentationBundle_CustomGenerators.tsx",md:"CustomGenerators"},generatePage:{bundle:"documentation-Generate",name:"Generate",description:"In this guide you'll learn how the generator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Generate.tsx",md:"Generate"},openApi101Page:{bundle:"documentation-OpenAPI101",name:"OpenAPI 101",description:"In this guide I'll share some DOs and DON'Ts, when constructing an OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_OpenAPI101.tsx",md:"OpenAPI101"},readPage:{bundle:"documentation-Read",name:"Read",description:"In this guide you'll learn how the reader step works.",importPath:"src/bundles/documentation/DocumentationBundle_Read.tsx",md:"Read"},sdkErrorHandlingPage:{bundle:"documentation-SdkErrorHandling",name:"Error handling",description:"In this example you'll learn the recommended approach to handle errors when using the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkErrorHandling.tsx",md:"SdkErrorHandling"},sdkGettingStartedPage:{bundle:"documentation-SdkGettingStarted",name:"Getting started",description:"In this guide you'll learn how to generate an SDK and (necessary related code) based on your OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_SdkGettingStarted.tsx",md:"SdkGettingStarted"},sdkTypesPage:{bundle:"documentation-SdkTypes",name:"SDK related types",description:"This guide will showcase the main types generated for the client side.",importPath:"src/bundles/documentation/DocumentationBundle_SdkTypes.tsx",md:"SdkTypes"},sdkUsagePage:{bundle:"documentation-SdkUsage",name:"SDK usage",description:"In this guide you'll learn the basic usage of the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkUsage.tsx",md:"SdkUsage"},serverApiExamplePage:{bundle:"documentation-ServerApiExample",name:"Example API",description:"In this guide you'll see a basic API implementation using the book store example.",importPath:"src/bundles/documentation/DocumentationBundle_ServerApiExample.tsx",md:"ServerApiExample"},serverCorsPage:{bundle:"documentation-ServerCors",name:"Implement CORS",description:"In this guide you'll learn how to make your Oats and express based server CORS enabled.",importPath:"src/bundles/documentation/DocumentationBundle_ServerCors.tsx",md:"ServerCors"},serverGettingStartedPage:{bundle:"documentation-ServerGettingStarted",name:"Getting started",description:"This guide will help you getting started with generating server side code using Oats.",importPath:"src/bundles/documentation/DocumentationBundle_ServerGettingStarted.tsx",md:"ServerGettingStarted"},serverSetupPage:{bundle:"documentation-ServerSetup",name:"Express server setup",description:"In this guide you'll learn how to set up generated Oats code with your existing [express](https://expressjs.com) backend.",importPath:"src/bundles/documentation/DocumentationBundle_ServerSetup.tsx",md:"ServerSetup"},serverTypesPage:{bundle:"documentation-ServerTypes",name:"Server types",description:"This guide will showcase the main types generated for the server side.",importPath:"src/bundles/documentation/DocumentationBundle_ServerTypes.tsx",md:"ServerTypes"},validatePage:{bundle:"documentation-Validate",name:"Validate",description:"In this guide you'll learn how the validator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Validate.tsx",md:"Validate"},welcomePage:{bundle:"documentation-Welcome",name:"Welcome to the docs!",description:"Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.",importPath:"src/bundles/documentation/DocumentationBundle_Welcome.tsx",md:"Welcome"},writePage:{bundle:"documentation-Write",name:"Write",description:"In this guide you'll learn how the writer step works.",importPath:"src/bundles/documentation/DocumentationBundle_Write.tsx",md:"Write"}}},42946:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const n=o(96486),a=o(82509),r=[{name:"General",useNavigation:!1,items:[a.markdownPages.welcomePage,a.markdownPages.openApi101Page]},{name:"Server Guide",useNavigation:!0,items:[a.markdownPages.serverGettingStartedPage,a.markdownPages.serverTypesPage,a.markdownPages.serverSetupPage,a.markdownPages.serverApiExamplePage,a.markdownPages.serverCorsPage]},{name:"(Client) SDK Guide",useNavigation:!0,items:[a.markdownPages.sdkGettingStartedPage,a.markdownPages.sdkTypesPage,a.markdownPages.sdkUsagePage,a.markdownPages.sdkErrorHandlingPage]},{name:"Generator api",useNavigation:!0,items:[a.markdownPages.readPage,a.markdownPages.validatePage,a.markdownPages.generatePage,a.markdownPages.customGeneratorsPage,a.markdownPages.writePage]}];t.sections=r,t.docs=(0,n.flatMap)(t.sections,(e=>e.items))},11149:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var a=Object.getOwnPropertyDescriptor(t,o);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,a)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const s=o(18592),i=o(96486),l=r(o(67294)),c=o(69274),d=o(3930),u=o(77255),m=o(19446),h=o(10603),p=s.css`
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
`;function x(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,o]=(0,h.useNeighbours)(),n=!(0,i.isNil)(e),a=!(0,i.isNil)(o),r=!(0,i.isNil)(t),s=(0,l.useMemo)((()=>{if(!(0,i.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${x(t.name)}+(in+${t.md}.md)&body=${x("Please describe the issue!")}`}),[t]);return n||a||r?l.default.createElement("div",{className:p},(n||a)&&l.default.createElement("div",{className:f},n&&l.default.createElement(d.Link,{href:u.links.doc(e.md),className:v},l.default.createElement(c.HiChevronLeft,null),e.name),l.default.createElement("div",{className:b}),a&&l.default.createElement(d.Link,{href:u.links.doc(o.md),className:v},o.name,l.default.createElement(c.HiChevronRight,null))),r&&l.default.createElement("div",{className:g},l.default.createElement("b",null,"Found an issue on this page?"),l.default.createElement("br",null),"Please let me know by ",l.default.createElement(d.Link,{href:s},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},97281:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var a=Object.getOwnPropertyDescriptor(t,o);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,a)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const s=r(o(67294)),i=o(96487),l=o(21710),c=o(54711),d=o(42946);t.DocumentationMenu=()=>s.default.createElement(s.default.Fragment,null,s.default.createElement(l.SideBarSection,null,s.default.createElement(i.MenuTreeItem,{link:"index"}),s.default.createElement(i.MenuTreeItem,{link:"editor"})),d.sections.map(((e,t)=>s.default.createElement(s.Fragment,{key:e.name??`item-${t}`},s.default.createElement(l.SideBarSection,{title:e.name},e.items.map((e=>s.default.createElement(c.DocumentationTreeRoot,{node:e,key:e.md}))))))))},15529:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const a=o(18592),r=n(o(67294)),s=o(80887),i=o(98378),l=o(40704),c=o(7117),d=o(8015),u=o(86229),m=o(66118),h=o(19187),p=o(19446),f=o(97281),g=o(11149),b=o(49098),v=o(77255),x="docs",y=a.css`
  flex: ${p.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${p.theme.colors.muted};
  font-size: ${p.theme.fontSize.m};
  background-color: ${p.theme.colors.dark4};
`,k=a.css`
  margin: ${p.theme.spacing.l};
`,_=()=>{const e=(0,c.useProvideMobileContext)();return r.default.createElement(c.MobileContext.Provider,{value:e},r.default.createElement(d.MobileHeaderWithOverlay,{name:x,version:!0,href:v.links.docs()},r.default.createElement(f.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>r.default.createElement(b.MarkdownContext.Provider,{value:{page:e,content:t}},r.default.createElement(i.DocContainer,null,r.default.createElement(u.SideBar,null,r.default.createElement(h.LogoContainer,null,r.default.createElement(m.Logo,{name:x,version:!0,href:v.links.docs()})),r.default.createElement(f.DocumentationMenu,null)),r.default.createElement("div",{className:y},r.default.createElement(s.BreakPoint,{Component:_,breakpoint:"phone"}),r.default.createElement("div",{className:k},r.default.createElement(l.MarkdownView,{content:t})),r.default.createElement(g.DocumentationFooter,null))))},54711:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const a=n(o(67294)),r=o(82067),s=o(7117),i=o(49098),l=o(77255);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,s.useMobileContext)(),{page:o}=(0,i.useMarkdown)();return a.default.createElement(r.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===o,onClick:()=>t(!1),getHref:e=>l.links.doc(e.md)})}},49098:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const n=o(67294);t.MarkdownContext=(0,n.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,n.useContext)(t.MarkdownContext)},10603:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const n=o(96486),a=o(67294),r=o(42946),s=o(49098);function i(e,t,o=0){if((0,n.isNil)(e)||0!==o&&!e.useNavigation)return;const a=function(e,t){return t.items.findIndex((t=>t.md===e))}(t,e)+o;return e.items[a]}t.useNeighbours=function(){const{page:e}=(0,s.useMarkdown)(),t=(0,a.useMemo)((()=>function(e){return r.sections.find((t=>t.items.some((t=>t.md===e))))}(e)),[e]),o=(0,a.useMemo)((()=>i(t,e)),[e,t]);return[(0,a.useMemo)((()=>i(t,e,-1)),[e,t]),o,(0,a.useMemo)((()=>i(t,e,1)),[e,t])]}},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444",transparentWhite:"rgba(255, 255, 255, 0.2)"},fontSize:{code:"1.1rem",xxs:"0.85rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=28353)}]);
//# sourceMappingURL=documentation-SdkErrorHandling.bundle.js.map