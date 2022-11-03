"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[393],{84287:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Write\n\nThe writer step is responsible for taking the output of the [generator step](OpenAPI-Generator) and writing it's outputs to the disk. The typescript writer takes typescript `SourceFile`s (this is Typescript's in-memory representation of an AST + file location) and writes them to the desired location.\n\nAdditionally it can add leading / trailing comments to each of your generated files. This is ideal for warning people that the file is generated and should be edited manually, or for disabling certain linter rules for the generated files.\n\n## Example\n\n### Basic usage\n\nBasic usage, formats the code using your project's prettier configuration. Formatter can be omitted, but the generated code won't be pretty in this case.\n\n```ts\nimport { writers, formatters } from '@oats-ts/openapi'\nimport prettierConfig from './.prettierrc.json'\n\nconst writer = writers.typescript.file({\n  format: formatters.prettier(prettierConfig),\n})\n```\n\n### With comments\n\nAdds comments. First leading comment warns about the fact that the file is generated, the second disables some `eslint` rules. The trailing comment re-enables these rules, so other code is not affected **(this is just an example, generated code will not break these specific rules)**.\n\n```ts\nimport { writers, formatters } from '@oats-ts/openapi'\nimport prettierConfig from './.prettierrc.json'\n\nconst writer = writers.typescript.file({\n  format: formatters.prettier(prettierConfig),\n  comments: {\n    leadingComments: [\n      {\n        type: 'block',\n        text: 'This is a generated file, please do not edit by hand!',\n      },\n      {\n        type: 'block',\n        text: 'eslint-disable no-console, no-alert',\n      },\n    ],\n    trailingComments: [\n      {\n        type: 'block',\n        text: 'eslint-enable no-console, no-alert',\n      },\n    ],\n  },\n})\n```\n\n## Configuration\n\nThe `writers.typescript` object exposes 3 factory functions:\n\n- `file` - Writes the generated code to the disk. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n- `memory` - Doesn't write the output to the disk, returns the generated code instead as `{ path: string; content: string }[]` instead. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n- `custom` - Customizeable `write` function, ideal if you want to send the output over the wire for example. Configuration:\n  - `comments: CommentsConfig` - Adds leading / trailing comments to each generated file.\n  - `format(code: string): string` - Formats the code, before writing to the disk. Default formatter shipping with oats is `formatters.prettier()`.\n  - `write(path: string, content: string): Promise<void>` - Writes the stringified, possibly formatted `content` to the disk at `path`.\n"},11761:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdown=void 0,t.markdown={CommonMistakes:"CommonMistakes",CustomGenerators:"CustomGenerators",Generate:"Generate",GettingStarted:"GettingStarted",Home:"Home",Read:"Read",SdkErrorHandling:"SdkErrorHandling",SdkGettingStarted:"SdkGettingStarted",SdkTypes:"SdkTypes",SdkUsage:"SdkUsage",ServerApiImpl:"ServerApiImpl",ServerCors:"ServerCors",ServerGettingStarted:"ServerGettingStarted",ServerSetup:"ServerSetup",ServerTypes:"ServerTypes",Validate:"Validate",Welcome:"Welcome",Workflow:"Workflow",Write:"Write"}},42946:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const o=n(96486),r=n(11761),a=[{items:[{md:"Welcome",name:"Welcome"}]},{name:"Server Guide",items:[{md:"ServerGettingStarted",name:"Getting started"},{md:"ServerTypes",name:"Server related types"},{md:"ServerSetup",name:"Express server setup"},{md:"ServerApiImpl",name:"API Example"},{md:"ServerCors",name:"Add CORS"}]},{name:"(Client) SDK Guide",items:[{md:"SdkGettingStarted",name:"Getting started"},{md:"SdkTypes",name:"SDK related types"},{md:"SdkUsage",name:"SDK usage"},{md:"SdkErrorHandling",name:"Error handling"}]},{name:"Other Guides",items:[{md:"CommonMistakes",name:"Common mistakes"}]},{name:"Generator api",items:[{md:"Read",name:"Reader"},{md:"Validate",name:"Validator"},{md:"Generate",name:"Generators"},{md:"CustomGenerators",name:"Custom generators"},{md:"Write",name:"Writer"}]}];!function(){const e=(0,o.flatMap)(a,(e=>e.items)).map((({md:e})=>e));(0,o.keys)(r.markdown).filter((t=>!e.includes(t))).map((e=>({md:e,name:e})))}(),t.sections=[...a],t.docs=(0,o.flatMap)(t.sections,(e=>e.items))},39226:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const i=a(n(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:n})=>{const[o,r]=(0,i.useState)((()=>window.matchMedia(t.breakpoints[n]).matches));return(0,i.useEffect)((()=>{window.matchMedia(t.breakpoints[n]).addEventListener("change",(e=>r(e.matches)))}),[]),o?i.default.createElement(e,null):null}},41298:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const r=n(18592),a=o(n(67294)),i=n(61329),s=r.css`
  font-size: ${i.theme.fontSize.code};
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};
  padding: ${i.theme.spacing.xxxs} ${i.theme.spacing.xxs};
  border-radius: ${i.theme.spacing.xs};
`;t.Code=({className:e,children:t,...n})=>a.default.createElement("code",{className:(0,r.cx)(s,e),...n},t)},40782:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const r=n(18592),a=n(26729),i=o(n(67294)),s=n(72050),l=n(61329),c=r.css`
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
`;t.DocContainer=({children:e})=>i.default.createElement(i.default.Fragment,null,i.default.createElement(a.Global,{styles:s.globalStyles}),i.default.createElement("div",{className:c},e))},12259:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HomeTreeRoot=void 0;const r=o(n(67294)),a=n(69274),i=n(81911),s=n(5838);t.HomeTreeRoot=()=>{const{setMenuOpen:e}=(0,i.useMobileContext)();return r.default.createElement(s.TreeNode,{value:void 0,level:0,getIcon:()=>a.HiHome,getLabel:()=>"Home",isActive:()=>!1,onClick:()=>e(!1),getHref:()=>"/"})}},86299:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const r=o(n(67294)),a=n(18592),i=n(61329),s=n(96486),l=a.css`
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
`;t.Link=({children:e,className:t,onClick:n,...o})=>(0,s.isNil)(n)?r.default.createElement("a",{className:(0,a.cx)(l,t),...o},e):r.default.createElement("span",{className:(0,a.cx)(l,t),onClick:n,...o},e)},15435:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const r=n(18592),a=n(67535),i=n(96486),s=o(n(67294)),l=n(61329),c=n(79129),d=r.css`
  label: side-bar-logo;
  display: flex;
  gap: ${l.theme.spacing.m};
  align-items: center;
  text-decoration: none;
`,m=r.css`
  display: flex;
  flex-direction: column;
`,u=r.css`
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
`;t.Logo=({name:e,version:t,href:n})=>s.default.createElement("a",{className:d,href:n},s.default.createElement(c.SvgLogo,{width:60}),s.default.createElement("div",{className:m},s.default.createElement("h1",{className:u},"Oats ",(0,i.isNil)(e)?null:s.default.createElement("span",{className:f},e)),t&&s.default.createElement("span",{className:h},"v",a.version)))},39550:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const r=n(18592),a=o(n(67294)),i=n(39226),s=n(61329),l=r.css`
  margin: ${s.theme.spacing.m} ${s.theme.spacing.m} ${s.theme.spacing.xxxl} ${s.theme.spacing.m};
  @media ${i.breakpoints.phone} {
    margin: ${s.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>a.default.createElement("div",{className:l},e)},76197:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const s=n(18592),l=i(n(67294)),c=a(n(23209)),d=i(n(34112)),m=n(11761),u=n(9572),f=n(61329),h=n(41298),p=n(86299),g=n(7807),b=n(89937),v=s.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.l};
  margin-top: ${f.theme.spacing.zero};
`,_=s.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.xm};
`,x=s.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.m};
`,y=s.css`
  margin: ${f.theme.spacing.l};
`,k=Object.keys(m.markdown),w=e=>k.some((t=>e.startsWith(t)))?u.links.doc(e):(0,c.uriTransformer)(e),$=[d.default],M={h1:({children:e})=>l.default.createElement("h1",{className:v},e),h2:({children:e})=>l.default.createElement("h2",{className:_},e),h3:({children:e})=>l.default.createElement("h3",{className:x},e),table:({children:e})=>l.default.createElement(b.Table,null,e),tr:({children:e,isHeader:t})=>l.default.createElement(b.Tr,{isHeader:t},e),th:({children:e})=>l.default.createElement(b.Th,null,e),td:({children:e})=>l.default.createElement(b.Td,null,e),a:({href:e,children:t})=>l.default.createElement(p.Link,{href:e},t),code({node:e,inline:t,className:n,children:o,...r}){const a=/language-(\w+)/.exec(n||"");return null===a||t?l.default.createElement(h.Code,{...r},o):l.default.createElement(g.SyntaxHighlighter,{language:a[1],kind:"docs"},String(o).replace(/\n$/,""))}};t.MarkdownView=({content:e})=>l.default.createElement(c.default,{remarkPlugins:$,components:M,transformLinkUri:w,className:y},e??"")},81911:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const o=n(96486),r=n(67294);t.MobileContext=(0,r.createContext)({isMenuOpen:!1,setMenuOpen:o.noop}),t.useMobileContext=()=>(0,r.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,r.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},52630:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const r=n(18592),a=o(n(67294)),i=n(61329),s=n(39550),l=n(15435),c=r.css`
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
`;t.MobileHeader=({name:e,version:t,href:n,actionIcon:o,onAction:r})=>a.default.createElement("div",{className:c},a.default.createElement(s.LogoContainer,null,a.default.createElement(l.Logo,{name:e,version:t,href:n})),a.default.createElement(o,{className:d,onClick:r}))},48265:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const r=o(n(67294)),a=n(69274),i=n(81911),s=n(52630),l=n(54104);t.MobileHeaderWithOverlay=({name:e,version:t,href:n,children:o})=>{const{setMenuOpen:c}=(0,i.useMobileContext)();return r.default.createElement(r.default.Fragment,null,r.default.createElement(s.MobileHeader,{href:n,name:e,version:t,actionIcon:a.HiBars3,onAction:()=>c(!0)}),r.default.createElement(l.MobileOverlay,{href:n,name:e,version:t},o))}},54104:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const r=n(18592),a=o(n(67294)),i=n(69274),s=n(61329),l=n(81911),c=n(52630),d=r.css`
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
`,m=r.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:n,version:o})=>{const{isMenuOpen:s,setMenuOpen:u}=(0,l.useMobileContext)();return a.default.createElement("div",{className:(0,r.cx)(d,s?void 0:m)},a.default.createElement(c.MobileHeader,{href:n,actionIcon:i.HiXMark,onAction:()=>u(!1),name:e,version:o}),t)}},39201:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const r=n(18592),a=o(n(67294)),i=n(39226),s=n(61329),l=r.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${s.theme.colors.dark2};
  @media ${i.breakpoints.phone} {
    display: none;
  }
`;t.SideBar=({children:e})=>a.default.createElement("div",{className:l},e)},38938:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const r=n(18592),a=n(96486),i=o(n(67294)),s=n(61329),l=r.css`
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: ${s.theme.spacing.m} ${s.theme.spacing.m};
`,c=r.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${s.theme.spacing.xxm};
`;t.SideBarSection=({children:e,title:t})=>i.default.createElement(i.default.Fragment,null,(0,a.isNil)(t)?null:i.default.createElement("div",{className:l},t),i.default.createElement("div",{className:c},e))},79129:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const r=o(n(67294)),a=n(61329),i=n(86753);t.SvgLogo=({color:e=a.theme.colors.green,width:t,height:n})=>{const[o,s]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,n);return r.default.createElement("svg",{width:o,height:s,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},7807:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=n(18592),s=a(n(67294)),l=n(67361),c=a(n(29012)),d=n(74855),m=n(61329),u=n(69274),f=n(96486),h=n(71400),p=(0,h.createPrismTheme)(c.vscDarkPlus,m.theme.colors.dark1),g=(0,h.createPrismTheme)(c.vscDarkPlus,m.theme.colors.dark4),b=i.css`
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
`,_=i.css`
  position: relative;
  flex-grow: ${m.theme.flex.grow};
  height: 100vh;

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:n,kind:o})=>{const[r,a]=(0,s.useState)(!1),[c,m]=(0,s.useState)(!1),[h,x]=(0,s.useState)(void 0),y=(0,i.cx)("editor"===o?_:v),k="editor"===o?g:p,w=(0,i.cx)(b);return s.default.createElement("div",{className:y,onMouseEnter:()=>{m(!0)},onMouseLeave:()=>{m(!1)}},s.default.createElement(l.Prism,{language:t,style:k,wrapLongLines:n,showLineNumbers:"editor"===o},e),s.default.createElement(d.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,f.isNil)(h)||(clearTimeout(h),x(void 0)),a(t),x(setTimeout((()=>{a(!1)}),2e3))}},s.default.createElement("button",{className:w,style:{opacity:c?1:0}},r?s.default.createElement(u.HiCheck,null):s.default.createElement(u.HiClipboard,null))))}},89937:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const r=n(18592),a=o(n(67294)),i=n(61329),s=r.css`
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
`;t.Tr=({children:e,isHeader:t,className:n,...o})=>{const i=(0,r.cx)(t?d:c,n);return a.default.createElement("tr",{...o,className:i},e)};const m=r.css`
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
`;t.Th=({children:e,className:t,...n})=>a.default.createElement("th",{...n,className:(0,r.cx)(m,t)},e);const u=r.css`
  padding: ${i.theme.spacing.m};
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.muted};
`;t.Td=({children:e,className:t,...n})=>a.default.createElement("td",{...n,className:(0,r.cx)(u,t)},e);const f=r.css`
  border-width: ${i.theme.spacing.zero};
`;t.THead=({children:e,className:t,...n})=>a.default.createElement("thead",{...n,className:(0,r.cx)(f,t)},e);const h=r.css`
  border-width: ${i.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...n})=>a.default.createElement("tbody",{...n,className:(0,r.cx)(h,t)},e)},5838:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const r=n(18592),a=o(n(67294)),i=n(69274),s=n(61329),l=r.css`
  position: relative;
`,c=(e,t)=>r.css`
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
`,d=r.css`
  flex: ${s.theme.flex.grow};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s.theme.spacing.xxs};
`,m=({isContainer:e,isOpen:t,isEmpty:n})=>e?n?a.default.createElement(i.HiChevronLeft,null):t?a.default.createElement(i.HiChevronDown,null):a.default.createElement(i.HiChevronRight,null):null;t.TreeNode=function e({value:t,level:n,getLabel:o,isActive:i=(()=>!1),isOpen:u=(()=>!1),isContainer:f=(()=>!1),getChildren:h=(()=>[]),onClick:p=(()=>{}),getHref:g=(()=>{}),getIcon:b=(()=>{})}){const v=h(t),_=u(t),x=i(t),y=f(t),k=b(t),w=y&&_?(0,r.cx)(l,(e=>r.css`
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
`)(n)):l,$=g(t),M=o(t);return a.default.createElement("div",{className:w},a.default.createElement("a",{className:c(n,x),href:$,onClick:()=>p(t,_)},a.default.createElement("span",{className:d},a.default.createElement(m,{isContainer:y,isEmpty:0===v.length,isOpen:_}),void 0===k?null:a.default.createElement(k,null),M)),_&&v.map(((t,r)=>a.default.createElement(e,{key:`${r}-${M}`,value:t,level:n+1,getLabel:o,getHref:g,isContainer:f,getChildren:h,isOpen:u,isActive:i,onClick:p}))))}},71400:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const o=n(96486),r=n(61329);t.createPrismTheme=function(e,t){const n={'pre[class*="language-"]':{backgroundColor:t,borderRadius:r.theme.spacing.zero,padding:r.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:r.theme.spacing.zero,margin:r.theme.spacing.zero,fontSize:r.theme.fontSize.code,fontFamily:r.theme.fontFamily.monospace}},a=(0,o.cloneDeep)(e);return(0,o.values)(a).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${r.theme.spacing.zero} ${r.theme.spacing.zero} ${r.theme.spacing.xxs}`,e.fontSize=r.theme.fontSize.code,e.fontFamily=r.theme.fontFamily.monospace})),(0,o.merge)(a,n)}},86753:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,n,o){return void 0!==n&&void 0===o?[n,t/e*n]:void 0!==o&&void 0===n?[o,e/t*o]:void 0!==n&&void 0!==o?[n,o]:[e,t]}},72050:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const o=n(26729),r=n(39226),a=n(61329);t.globalStyles=o.css`
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
  }

  *::-webkit-scrollbar-track {
    background: ${a.theme.colors.dark5};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${a.theme.colors.dark2};
    border-radius: 7px;
    border: 2px solid ${a.theme.colors.dark5};
  }
`},9572:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,console.log("production"),t.links={docs:()=>"/docs/v2/documentation",doc:e=>`/docs/v2/documentation/${e}`,editor:()=>"/docs/v2/editor",index:()=>"/docs/v2"}},2684:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const i=n(18592),s=n(96486),l=a(n(67294)),c=n(69274),d=n(86299),m=n(9572),u=n(61329),f=n(82704),h=i.css`
  padding: ${u.theme.spacing.l};
  display: flex;
  flex-direction: column;
  gap: ${u.theme.spacing.l};
`,p=i.css`
  display: flex;
  flex-direction: row;
  align-items: center;
`,g=i.css`
  padding: ${u.theme.spacing.xxm};
  background-color: ${u.theme.colors.dark2};
  border-radius: ${u.theme.spacing.m};
  color: ${u.theme.colors.muted};
`,b=i.css`
  flex: ${u.theme.flex.grow};
`,v=i.css`
  font-weight: bold;
`;function _(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,n]=(0,f.useNeighbours)(),o=!(0,s.isNil)(e),r=!(0,s.isNil)(n),a=!(0,s.isNil)(t),i=(0,l.useMemo)((()=>{if(!(0,s.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${_(t.name)}+(in+${t.md}.md)&body=${_("Please describe the issue with as much detail as possible!")}`}),[t]);return o||r||a?l.default.createElement("div",{className:h},(o||r)&&l.default.createElement("div",{className:p},o&&l.default.createElement(d.Link,{href:m.links.doc(e.md),className:v},l.default.createElement(c.HiChevronLeft,null),e.name),l.default.createElement("div",{className:b}),r&&l.default.createElement(d.Link,{href:m.links.doc(n.md),className:v},n.name,l.default.createElement(c.HiChevronRight,null))),a&&l.default.createElement("div",{className:g},l.default.createElement("b",null,"Found an issue with this page?"),l.default.createElement("br",null),"Please let me know by ",l.default.createElement(d.Link,{href:i},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},44376:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const i=a(n(67294)),s=n(12259),l=n(38938),c=n(21521),d=n(42946);t.DocumentationMenu=()=>i.default.createElement(i.default.Fragment,null,i.default.createElement(l.SideBarSection,null,i.default.createElement(s.HomeTreeRoot,null)),d.sections.map((e=>i.default.createElement(i.Fragment,{key:e.name},i.default.createElement(l.SideBarSection,{title:e.name},e.items.map((e=>i.default.createElement(c.DocumentationTreeRoot,{node:e,key:e.md}))))))))},95462:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const r=n(18592),a=o(n(67294)),i=n(39226),s=n(40782),l=n(76197),c=n(81911),d=n(48265),m=n(39201),u=n(15435),f=n(39550),h=n(61329),p=n(44376),g=n(2684),b=n(50059),v=n(9572),_="docs",x=r.css`
  flex: ${h.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${h.theme.colors.muted};
  font-size: ${h.theme.fontSize.m};
  background-color: ${h.theme.colors.dark4};
`,y=()=>{const e=(0,c.useProvideMobileContext)();return a.default.createElement(c.MobileContext.Provider,{value:e},a.default.createElement(d.MobileHeaderWithOverlay,{name:_,version:!0,href:v.links.docs()},a.default.createElement(p.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>a.default.createElement(b.MarkdownContext.Provider,{value:{page:e,content:t}},a.default.createElement(s.DocContainer,null,a.default.createElement(m.SideBar,null,a.default.createElement(f.LogoContainer,null,a.default.createElement(u.Logo,{name:_,version:!0,href:v.links.docs()})),a.default.createElement(p.DocumentationMenu,null)),a.default.createElement("div",{className:x},a.default.createElement(i.BreakPoint,{Component:y,breakpoint:"phone"}),a.default.createElement(l.MarkdownView,{content:t}),a.default.createElement(g.DocumentationFooter,null))))},21521:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const r=o(n(67294)),a=n(5838),i=n(81911),s=n(50059),l=n(9572);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,i.useMobileContext)(),{page:n}=(0,s.useMarkdown)();return r.default.createElement(a.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===n,onClick:()=>t(!1),getHref:e=>l.links.doc(e.md)})}},50059:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const o=n(67294);t.MarkdownContext=(0,o.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,o.useContext)(t.MarkdownContext)},82704:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const o=n(96486),r=n(67294),a=n(42946),i=n(50059);function s(e,t=0){const n=function(e){return a.sections.find((t=>t.items.some((t=>t.md===e))))}(e);if((0,o.isNil)(n))return;const r=function(e,t){return t.items.findIndex((t=>t.md===e))}(e,n)+t;return n.items[r]}t.useNeighbours=function(){const{page:e}=(0,i.useMarkdown)(),t=(0,r.useMemo)((()=>s(e)),[e]);return[(0,r.useMemo)((()=>s(e,-1)),[e]),t,(0,r.useMemo)((()=>s(e,1)),[e])]}},74949:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(n(67294)),a=n(20745),i=n(95462),s=o(n(84287));(0,a.createRoot)(document.getElementById("root")).render(r.default.createElement(i.DocumentationPage,{page:"Write",content:s.default}))},61329:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=74949)}]);
//# sourceMappingURL=documentation-Write.bundle.js.map