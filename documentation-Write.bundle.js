"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[393],{84287:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Write\n\nIn this guide you'll learn how the writer step works.\n\nThe writer step is responsible for taking the output of the [generator step](OpenAPI-Generator) and writing it's outputs to the disk. The typescript writer takes typescript `SourceFile`s (this is Typescript's in-memory representation of an AST + file location) and writes them to the desired location.\n\nAdditionally it can add leading / trailing comments to each of your generated files. This is ideal for warning people that the file is generated and should be edited manually, or for disabling certain linter rules for the generated files.\n\n## Example\n\n### Basic usage\n\nBasic usage, formats the code using your project's prettier configuration. Formatter can be omitted, but the generated code won't be pretty in this case.\n\n```ts\nimport { writers, formatters } from '@oats-ts/openapi'\nimport prettierConfig from './.prettierrc.json'\n\nconst writer = writers.typescript.file({\n  format: formatters.prettier(prettierConfig),\n})\n```\n\n### With comments\n\nAdds comments. First leading comment warns about the fact that the file is generated, the second disables some `eslint` rules. The trailing comment re-enables these rules, so other code is not affected **(this is just an example, generated code will not break these specific rules)**.\n\n```ts\nimport { writers, formatters } from '@oats-ts/openapi'\nimport prettierConfig from './.prettierrc.json'\n\nconst writer = writers.typescript.file({\n  format: formatters.prettier(prettierConfig),\n  comments: {\n    leadingComments: [\n      {\n        type: 'block',\n        text: 'This is a generated file, please do not edit by hand!',\n      },\n      {\n        type: 'block',\n        text: 'eslint-disable no-console, no-alert',\n      },\n    ],\n    trailingComments: [\n      {\n        type: 'block',\n        text: 'eslint-enable no-console, no-alert',\n      },\n    ],\n  },\n})\n```\n\n## Configuration\n\nThe `writers.typescript` object exposes 3 factory functions:\n\n- `file` - Writes the generated code to the disk. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n- `memory` - Doesn't write the output to the disk, returns the generated code instead as `{ path: string; content: string }[]` instead. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n- `custom` - Customizeable `write` function, ideal if you want to send the output over the wire for example. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n  - `write(path: string, content: string): Promise<void>` - Writes the stringified, possibly formatted `content` to the disk at `path`.\n"},80887:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const i=a(n(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:n})=>{const[o,r]=(0,i.useState)((()=>window.matchMedia(t.breakpoints[n]).matches));return(0,i.useEffect)((()=>{window.matchMedia(t.breakpoints[n]).addEventListener("change",(e=>r(e.matches)))}),[]),o?i.default.createElement(e,null):null}},41096:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(n(67294)),a=n(20745),i=n(15529),s=o(n(84287));(0,a.createRoot)(document.getElementById("root")).render(r.default.createElement(i.DocumentationPage,{page:"Write",content:s.default}))},4074:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const r=n(18592),a=o(n(67294)),i=n(19446),s=r.css`
  font-size: ${i.theme.fontSize.code};
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};
  padding: ${i.theme.spacing.xxxs} ${i.theme.spacing.xxs};
  border-radius: ${i.theme.spacing.xs};
`;t.Code=({className:e,children:t,...n})=>a.default.createElement("code",{className:(0,r.cx)(s,e),...n},t)},98378:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const r=n(18592),a=n(26729),i=o(n(67294)),s=n(63413),l=n(19446),c=r.css`
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
`;t.DocContainer=({children:e})=>i.default.createElement(i.default.Fragment,null,i.default.createElement(a.Global,{styles:s.globalStyles}),i.default.createElement("div",{className:c},e))},17746:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HomeTreeRoot=void 0;const r=o(n(67294)),a=n(69274),i=n(77255),s=n(7117),l=n(82067);t.HomeTreeRoot=()=>{const{setMenuOpen:e}=(0,s.useMobileContext)();return r.default.createElement(l.TreeNode,{value:void 0,level:0,getIcon:()=>a.HiHome,getLabel:()=>"Home",isActive:()=>!1,onClick:()=>e(!1),getHref:()=>i.links.index()})}},3930:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const r=o(n(67294)),a=n(18592),i=n(19446),s=n(96486),l=a.css`
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
`;t.Link=({children:e,className:t,onClick:n,...o})=>(0,s.isNil)(n)?r.default.createElement("a",{className:(0,a.cx)(l,t),...o},e):r.default.createElement("span",{className:(0,a.cx)(l,t),onClick:n,...o},e)},66118:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const r=n(18592),a=n(67535),i=n(96486),s=o(n(67294)),l=n(19446),c=n(20519),d=r.css`
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
`,f=r.css`
  color: ${l.theme.colors.muted};
`,h=r.css`
  font-size: ${l.theme.fontSize.s};
  color: ${l.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:n})=>s.default.createElement("a",{className:d,href:n},s.default.createElement(c.SvgLogo,{width:60}),s.default.createElement("div",{className:u},s.default.createElement("h1",{className:m},"Oats ",(0,i.isNil)(e)?null:s.default.createElement("span",{className:f},e)),t&&s.default.createElement("span",{className:h},"v",a.version)))},19187:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const r=n(18592),a=o(n(67294)),i=n(80887),s=n(19446),l=r.css`
  margin: ${s.theme.spacing.m} ${s.theme.spacing.m} ${s.theme.spacing.xxxl} ${s.theme.spacing.m};
  @media ${i.breakpoints.phone} {
    margin: ${s.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>a.default.createElement("div",{className:l},e)},40704:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const s=n(18592),l=n(96486),c=i(n(67294)),d=a(n(23209)),u=i(n(34112)),m=n(82509),f=n(77255),h=n(19446),p=n(4074),g=n(3930),b=n(44702),v=n(66999),x=s.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.l};
  margin-top: ${h.theme.spacing.zero};
`,_=s.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.xm};
`,k=s.css`
  color: ${h.theme.colors.text};
  font-size: ${h.theme.fontSize.m};
`,y=s.css`
  margin: ${h.theme.spacing.l};
`,w=Object.values(m.markdownPages),P=e=>{const t=w.find((t=>e.startsWith(t.md)));return(0,l.isNil)(t)?(0,d.uriTransformer)(e):f.links.doc(t.md)},$=[u.default],M={h1:({children:e})=>c.default.createElement("h1",{className:x},e),h2:({children:e})=>c.default.createElement("h2",{className:_},e),h3:({children:e})=>c.default.createElement("h3",{className:k},e),table:({children:e})=>c.default.createElement(v.Table,null,e),tr:({children:e,isHeader:t})=>c.default.createElement(v.Tr,{isHeader:t},e),th:({children:e})=>c.default.createElement(v.Th,null,e),td:({children:e})=>c.default.createElement(v.Td,null,e),a:({href:e,children:t})=>c.default.createElement(g.Link,{href:e},t),code({node:e,inline:t,className:n,children:o,...r}){const a=/language-(\w+)/.exec(n||"");return null===a||t?c.default.createElement(p.Code,{...r},o):c.default.createElement(b.SyntaxHighlighter,{language:a[1],kind:"docs"},String(o).replace(/\n$/,""))}};t.MarkdownView=({content:e})=>c.default.createElement(d.default,{remarkPlugins:$,components:M,transformLinkUri:P,className:y},e??"")},7117:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const o=n(96486),r=n(67294);t.MobileContext=(0,r.createContext)({isMenuOpen:!1,setMenuOpen:o.noop}),t.useMobileContext=()=>(0,r.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,r.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},35625:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const r=n(18592),a=o(n(67294)),i=n(19446),s=n(19187),l=n(66118),c=r.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,d=r.css`
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.xxl};
  cursor: pointer;
  margin: ${i.theme.spacing.m};
  &:hover {
    color: ${i.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:n,actionIcon:o,onAction:r})=>a.default.createElement("div",{className:c},a.default.createElement(s.LogoContainer,null,a.default.createElement(l.Logo,{name:e,version:t,href:n})),a.default.createElement(o,{className:d,onClick:r}))},8015:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const r=o(n(67294)),a=n(69274),i=n(7117),s=n(35625),l=n(99102);t.MobileHeaderWithOverlay=({name:e,version:t,href:n,children:o})=>{const{setMenuOpen:c}=(0,i.useMobileContext)();return r.default.createElement(r.default.Fragment,null,r.default.createElement(s.MobileHeader,{href:n,name:e,version:t,actionIcon:a.HiBars3,onAction:()=>c(!0)}),r.default.createElement(l.MobileOverlay,{href:n,name:e,version:t},o))}},99102:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const r=n(18592),a=o(n(67294)),i=n(69274),s=n(19446),l=n(7117),c=n(35625),d=r.css`
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
`,u=r.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:n,version:o})=>{const{isMenuOpen:s,setMenuOpen:m}=(0,l.useMobileContext)();return a.default.createElement("div",{className:(0,r.cx)(d,s?void 0:u)},a.default.createElement(c.MobileHeader,{href:n,actionIcon:i.HiXMark,onAction:()=>m(!1),name:e,version:o}),t)}},86229:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const r=n(18592),a=o(n(67294)),i=n(80887),s=n(19446),l=r.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${s.theme.colors.dark2};
  @media ${i.breakpoints.phone} {
    display: none;
  }
`;t.SideBar=({children:e})=>a.default.createElement("div",{className:l},e)},21710:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const r=n(18592),a=n(96486),i=o(n(67294)),s=n(19446),l=r.css`
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: ${s.theme.spacing.m} ${s.theme.spacing.m};
`,c=r.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${s.theme.spacing.xxm};
`;t.SideBarSection=({children:e,title:t})=>i.default.createElement(i.default.Fragment,null,(0,a.isNil)(t)?null:i.default.createElement("div",{className:l},t),i.default.createElement("div",{className:c},e))},20519:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const r=o(n(67294)),a=n(19446),i=n(14757);t.SvgLogo=({color:e=a.theme.colors.green,width:t,height:n})=>{const[o,s]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,n);return r.default.createElement("svg",{width:o,height:s,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},44702:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=n(18592),s=a(n(67294)),l=n(67361),c=a(n(29012)),d=n(74855),u=n(19446),m=n(69274),f=n(96486),h=n(98452),p=(0,h.createPrismTheme)(c.vscDarkPlus,u.theme.colors.dark1),g=(0,h.createPrismTheme)(c.vscDarkPlus,u.theme.colors.dark4),b=i.css`
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
`,v=i.css`
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
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:n,kind:o})=>{const[r,a]=(0,s.useState)(!1),[c,u]=(0,s.useState)(!1),[h,_]=(0,s.useState)(void 0),k=(0,i.cx)("editor"===o?x:v),y="editor"===o?g:p,w=(0,i.cx)(b);return s.default.createElement("div",{className:k,onMouseEnter:()=>{u(!0)},onMouseLeave:()=>{u(!1)}},s.default.createElement(l.Prism,{language:t,style:y,wrapLongLines:n,showLineNumbers:"editor"===o},e),s.default.createElement(d.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,f.isNil)(h)||(clearTimeout(h),_(void 0)),a(t),_(setTimeout((()=>{a(!1)}),2e3))}},s.default.createElement("button",{className:w,style:{opacity:c?1:0}},r?s.default.createElement(m.HiCheck,null):s.default.createElement(m.HiClipboard,null))))}},66999:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const r=n(18592),a=o(n(67294)),i=n(19446),s=r.css`
  border-radius: ${i.theme.spacing.m};
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  margin: 1px;
`,l=r.css`
  border-collapse: collapse;
  width: 100%;
  border-width: ${i.theme.spacing.zero};
`;t.Table=({children:e,className:t,...n})=>a.default.createElement("div",{className:s},a.default.createElement("table",{className:(0,r.cx)(l,t),...n},e));const c=r.css`
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  border-left-width: ${i.theme.spacing.zero};
  border-right-width: ${i.theme.spacing.zero};
  &:last-of-type {
    border-bottom-width: ${i.theme.spacing.zero};
  }
`,d=r.css`
  background-color: ${i.theme.colors.dark1};
  border-width: ${i.theme.spacing.zero};
  border-radius: ${i.theme.spacing.m};
`;t.Tr=({children:e,isHeader:t,className:n,...o})=>{const i=(0,r.cx)(t?d:c,n);return a.default.createElement("tr",{...o,className:i},e)};const u=r.css`
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
`;t.Th=({children:e,className:t,...n})=>a.default.createElement("th",{...n,className:(0,r.cx)(u,t)},e);const m=r.css`
  padding: ${i.theme.spacing.m};
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.muted};
`;t.Td=({children:e,className:t,...n})=>a.default.createElement("td",{...n,className:(0,r.cx)(m,t)},e);const f=r.css`
  border-width: ${i.theme.spacing.zero};
`;t.THead=({children:e,className:t,...n})=>a.default.createElement("thead",{...n,className:(0,r.cx)(f,t)},e);const h=r.css`
  border-width: ${i.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...n})=>a.default.createElement("tbody",{...n,className:(0,r.cx)(h,t)},e)},82067:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const r=n(18592),a=o(n(67294)),i=n(69274),s=n(19446),l=r.css`
  label: tree-node;
  position: relative;
`,c=(e,t)=>r.css`
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
`,d=r.css`
  label: tree-node-item-label;
  flex: 1 0 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s.theme.spacing.xxs};
`,u=r.css`
  margin-left: 0.6rem;
`,m=({isOpen:e,isEmpty:t})=>t?a.default.createElement(i.HiChevronLeft,null):e?a.default.createElement(i.HiChevronDown,null):a.default.createElement(i.HiChevronRight,null);t.TreeNode=function e({value:t,level:n,getLabel:o,isActive:i=(()=>!1),isOpen:s=(()=>!1),isContainer:f=(()=>!1),getChildren:h=(()=>[]),onClick:p=(()=>{}),getHref:g=(()=>{}),getIcon:b=(()=>{})}){const v=h(t),x=s(t),_=i(t),k=f(t),y=b(t),w=k&&x?(0,r.cx)(l,(e=>r.css`
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
`)(n)):l,P=g(t),$=o(t);return a.default.createElement("div",{className:w},a.default.createElement("a",{className:c(n,_),href:P,onClick:()=>p(t,x)},a.default.createElement("span",{className:d},k&&a.default.createElement(m,{isEmpty:0===v.length,isOpen:x}),void 0===y?null:a.default.createElement(y,null),k||void 0!==y?a.default.createElement("span",null,$):a.default.createElement("span",{className:u},$))),x&&v.map(((t,r)=>a.default.createElement(e,{key:`${r}-${$}`,value:t,level:n+1,getLabel:o,getHref:g,isContainer:f,getChildren:h,isOpen:s,isActive:i,onClick:p}))))}},98452:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const o=n(96486),r=n(19446);t.createPrismTheme=function(e,t){const n={'pre[class*="language-"]':{backgroundColor:t,borderRadius:r.theme.spacing.zero,padding:r.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:r.theme.spacing.zero,margin:r.theme.spacing.zero,fontSize:r.theme.fontSize.code,fontFamily:r.theme.fontFamily.monospace}},a=(0,o.cloneDeep)(e);return(0,o.values)(a).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${r.theme.spacing.zero} ${r.theme.spacing.zero} ${r.theme.spacing.xxs}`,e.fontSize=r.theme.fontSize.code,e.fontFamily=r.theme.fontFamily.monospace})),(0,o.merge)(a,n)}},14757:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,n,o){return void 0!==n&&void 0===o?[n,t/e*n]:void 0!==o&&void 0===n?[o,e/t*o]:void 0!==n&&void 0!==o?[n,o]:[e,t]}},63413:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const o=n(26729),r=n(80887),a=n(19446);t.globalStyles=o.css`
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
`},77255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,t.links={docs:()=>"/docs/documentation",doc:e=>`/docs/documentation/${e}`,editor:()=>"/docs/editor",index:()=>"/docs"}},82509:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdownPages=void 0,t.markdownPages={commonMistakesPage:{bundle:"documentation-CommonMistakes",name:"Common mistakes",description:"In this guide I'll share the most common mistakes, when constructing an OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_CommonMistakes.tsx",md:"CommonMistakes"},customGeneratorsPage:{bundle:"documentation-CustomGenerators",name:"Custom Generators",description:"In this guide you'll learn how to create custom generators using Oats",importPath:"src/bundles/documentation/DocumentationBundle_CustomGenerators.tsx",md:"CustomGenerators"},generatePage:{bundle:"documentation-Generate",name:"Generate",description:"In this guide you'll learn how the generator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Generate.tsx",md:"Generate"},readPage:{bundle:"documentation-Read",name:"Read",description:"In this guide you'll learn how the reader step works.",importPath:"src/bundles/documentation/DocumentationBundle_Read.tsx",md:"Read"},sdkErrorHandlingPage:{bundle:"documentation-SdkErrorHandling",name:"Error handling",description:"In this example you'll learn the recommended approach to handle errors using the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkErrorHandling.tsx",md:"SdkErrorHandling"},sdkGettingStartedPage:{bundle:"documentation-SdkGettingStarted",name:"Getting started",description:"In this guide you'll learn how to generate an SDK and (necessary related code) based on your OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_SdkGettingStarted.tsx",md:"SdkGettingStarted"},sdkTypesPage:{bundle:"documentation-SdkTypes",name:"SDK related types",description:"This guide will showcase the main types generated for the client side.",importPath:"src/bundles/documentation/DocumentationBundle_SdkTypes.tsx",md:"SdkTypes"},sdkUsagePage:{bundle:"documentation-SdkUsage",name:"SDK usage",description:"In this guide you'll learn the basic usage of the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkUsage.tsx",md:"SdkUsage"},serverApiExamplePage:{bundle:"documentation-ServerApiExample",name:"Example API",description:"In this guide you'll see a basic API implementation using the book store example.",importPath:"src/bundles/documentation/DocumentationBundle_ServerApiExample.tsx",md:"ServerApiExample"},serverCorsPage:{bundle:"documentation-ServerCors",name:"Implement CORS",description:"In this guide you'll learn how to make your Oats and express based server CORS enabled.",importPath:"src/bundles/documentation/DocumentationBundle_ServerCors.tsx",md:"ServerCors"},serverGettingStartedPage:{bundle:"documentation-ServerGettingStarted",name:"Getting started",description:"This guide will help you getting started with generating server side code using Oats.",importPath:"src/bundles/documentation/DocumentationBundle_ServerGettingStarted.tsx",md:"ServerGettingStarted"},serverSetupPage:{bundle:"documentation-ServerSetup",name:"Express server setup",description:"In this guide you'll learn how to set up generated Oats code with your existing express backend.",importPath:"src/bundles/documentation/DocumentationBundle_ServerSetup.tsx",md:"ServerSetup"},serverTypesPage:{bundle:"documentation-ServerTypes",name:"Server types",description:"This guide will showcase the main types generated for the server side.",importPath:"src/bundles/documentation/DocumentationBundle_ServerTypes.tsx",md:"ServerTypes"},validatePage:{bundle:"documentation-Validate",name:"Validate",description:"In this guide you'll learn how the validator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Validate.tsx",md:"Validate"},welcomePage:{bundle:"documentation-Welcome",name:"Welcome to the docs!",description:"Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.",importPath:"src/bundles/documentation/DocumentationBundle_Welcome.tsx",md:"Welcome"},writePage:{bundle:"documentation-Write",name:"Write",description:"In this guide you'll learn how the writer step works.",importPath:"src/bundles/documentation/DocumentationBundle_Write.tsx",md:"Write"}}},42946:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const o=n(96486),r=n(82509),a=[{useNavigation:!1,items:[r.markdownPages.welcomePage,r.markdownPages.commonMistakesPage]},{name:"Server Guide",useNavigation:!0,items:[r.markdownPages.serverGettingStartedPage,r.markdownPages.serverTypesPage,r.markdownPages.serverSetupPage,r.markdownPages.serverApiExamplePage,r.markdownPages.serverCorsPage]},{name:"(Client) SDK Guide",useNavigation:!0,items:[r.markdownPages.sdkGettingStartedPage,r.markdownPages.sdkTypesPage,r.markdownPages.sdkUsagePage,r.markdownPages.sdkErrorHandlingPage]},{name:"Generator api",useNavigation:!0,items:[r.markdownPages.readPage,r.markdownPages.validatePage,r.markdownPages.generatePage,r.markdownPages.customGeneratorsPage,r.markdownPages.writePage]}];t.sections=a,t.docs=(0,o.flatMap)(t.sections,(e=>e.items))},11149:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const i=n(18592),s=n(96486),l=a(n(67294)),c=n(69274),d=n(3930),u=n(77255),m=n(19446),f=n(10603),h=i.css`
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
`,b=i.css`
  flex: ${m.theme.flex.grow};
`,v=i.css`
  font-weight: bold;
`;function x(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,n]=(0,f.useNeighbours)(),o=!(0,s.isNil)(e),r=!(0,s.isNil)(n),a=!(0,s.isNil)(t),i=(0,l.useMemo)((()=>{if(!(0,s.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${x(t.name)}+(in+${t.md}.md)&body=${x("Please describe the issue with as much detail as possible!")}`}),[t]);return o||r||a?l.default.createElement("div",{className:h},(o||r)&&l.default.createElement("div",{className:p},o&&l.default.createElement(d.Link,{href:u.links.doc(e.md),className:v},l.default.createElement(c.HiChevronLeft,null),e.name),l.default.createElement("div",{className:b}),r&&l.default.createElement(d.Link,{href:u.links.doc(n.md),className:v},n.name,l.default.createElement(c.HiChevronRight,null))),a&&l.default.createElement("div",{className:g},l.default.createElement("b",null,"Found an issue with this page?"),l.default.createElement("br",null),"Please let me know by ",l.default.createElement(d.Link,{href:i},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},97281:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const i=a(n(67294)),s=n(17746),l=n(21710),c=n(54711),d=n(42946);t.DocumentationMenu=()=>i.default.createElement(i.default.Fragment,null,i.default.createElement(l.SideBarSection,null,i.default.createElement(s.HomeTreeRoot,null)),d.sections.map(((e,t)=>i.default.createElement(i.Fragment,{key:e.name??`item-${t}`},i.default.createElement(l.SideBarSection,{title:e.name},e.items.map((e=>i.default.createElement(c.DocumentationTreeRoot,{node:e,key:e.md}))))))))},15529:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const r=n(18592),a=o(n(67294)),i=n(80887),s=n(98378),l=n(40704),c=n(7117),d=n(8015),u=n(86229),m=n(66118),f=n(19187),h=n(19446),p=n(97281),g=n(11149),b=n(49098),v=n(77255),x="docs",_=r.css`
  flex: ${h.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${h.theme.colors.muted};
  font-size: ${h.theme.fontSize.m};
  background-color: ${h.theme.colors.dark4};
`,k=()=>{const e=(0,c.useProvideMobileContext)();return a.default.createElement(c.MobileContext.Provider,{value:e},a.default.createElement(d.MobileHeaderWithOverlay,{name:x,version:!0,href:v.links.docs()},a.default.createElement(p.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>a.default.createElement(b.MarkdownContext.Provider,{value:{page:e,content:t}},a.default.createElement(s.DocContainer,null,a.default.createElement(u.SideBar,null,a.default.createElement(f.LogoContainer,null,a.default.createElement(m.Logo,{name:x,version:!0,href:v.links.docs()})),a.default.createElement(p.DocumentationMenu,null)),a.default.createElement("div",{className:_},a.default.createElement(i.BreakPoint,{Component:k,breakpoint:"phone"}),a.default.createElement(l.MarkdownView,{content:t}),a.default.createElement(g.DocumentationFooter,null))))},54711:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const r=o(n(67294)),a=n(82067),i=n(7117),s=n(49098),l=n(77255);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,i.useMobileContext)(),{page:n}=(0,s.useMarkdown)();return r.default.createElement(a.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===n,onClick:()=>t(!1),getHref:e=>l.links.doc(e.md)})}},49098:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const o=n(67294);t.MarkdownContext=(0,o.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,o.useContext)(t.MarkdownContext)},10603:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const o=n(96486),r=n(67294),a=n(42946),i=n(49098);function s(e,t,n=0){if((0,o.isNil)(e)||0!==n&&!e.useNavigation)return;const r=function(e,t){return t.items.findIndex((t=>t.md===e))}(t,e)+n;return e.items[r]}t.useNeighbours=function(){const{page:e}=(0,i.useMarkdown)(),t=(0,r.useMemo)((()=>function(e){return a.sections.find((t=>t.items.some((t=>t.md===e))))}(e)),[e]),n=(0,r.useMemo)((()=>s(t,e)),[e,t]);return[(0,r.useMemo)((()=>s(t,e,-1)),[e,t]),n,(0,r.useMemo)((()=>s(t,e,1)),[e,t])]}},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=41096)}]);
//# sourceMappingURL=documentation-Write.bundle.js.map