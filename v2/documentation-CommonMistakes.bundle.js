"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[631],{37974:(e,t,o)=>{o.r(t),o.d(t,{default:()=>n});const n="# Common mistakes\n\nOpenAPI it is an extremely loosely defined spec, that in turn lets you define your API and your schemas in many different ways. In this article I'm listing the most common \"mistakes\" that you can make, that doesn't make your OpenAPI document invalid, but effectively prevents tooling from outputing usable documentation or code.\n\n## TODO"},11761:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdown=void 0,t.markdown={CommonMistakes:"CommonMistakes",CustomGenerators:"CustomGenerators",Generate:"Generate",GettingStarted:"GettingStarted",Home:"Home",Read:"Read",SdkErrorHandling:"SdkErrorHandling",SdkGettingStarted:"SdkGettingStarted",SdkTypes:"SdkTypes",SdkUsage:"SdkUsage",ServerApiImpl:"ServerApiImpl",ServerCors:"ServerCors",ServerGettingStarted:"ServerGettingStarted",ServerSetup:"ServerSetup",ServerTypes:"ServerTypes",Validate:"Validate",Welcome:"Welcome",Workflow:"Workflow",Write:"Write"}},42946:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const n=o(96486),r=o(11761),a=[{items:[{md:"Welcome",name:"Welcome"}]},{name:"Server Guide",items:[{md:"ServerGettingStarted",name:"Getting started"},{md:"ServerTypes",name:"Server related types"},{md:"ServerSetup",name:"Express server setup"},{md:"ServerApiImpl",name:"API Example"},{md:"ServerCors",name:"Add CORS"}]},{name:"(Client) SDK Guide",items:[{md:"SdkGettingStarted",name:"Getting started"},{md:"SdkTypes",name:"SDK related types"},{md:"SdkUsage",name:"SDK usage"},{md:"SdkErrorHandling",name:"Error handling"}]},{name:"Other Guides",items:[{md:"CommonMistakes",name:"Common mistakes"}]},{name:"Generator api",items:[{md:"Read",name:"Reader"},{md:"Validate",name:"Validator"},{md:"Generate",name:"Generators"},{md:"CustomGenerators",name:"Custom generators"},{md:"Write",name:"Writer"}]}];!function(){const e=(0,n.flatMap)(a,(e=>e.items)).map((({md:e})=>e));(0,n.keys)(r.markdown).filter((t=>!e.includes(t))).map((e=>({md:e,name:e})))}(),t.sections=[...a],t.docs=(0,n.flatMap)(t.sections,(e=>e.items))},39226:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const i=a(o(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:o})=>{const[n,r]=(0,i.useState)((()=>window.matchMedia(t.breakpoints[o]).matches));return(0,i.useEffect)((()=>{window.matchMedia(t.breakpoints[o]).addEventListener("change",(e=>r(e.matches)))}),[]),n?i.default.createElement(e,null):null}},41298:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const r=o(18592),a=n(o(67294)),i=o(61329),l=r.css`
  font-size: ${i.theme.fontSize.code};
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};
  padding: ${i.theme.spacing.xxxs} ${i.theme.spacing.xxs};
  border-radius: ${i.theme.spacing.xs};
`;t.Code=({className:e,children:t,...o})=>a.default.createElement("code",{className:(0,r.cx)(l,e),...o},t)},40782:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const r=o(18592),a=o(26729),i=n(o(67294)),l=o(72050),s=o(61329),c=r.css`
  label: doc-container;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  background-color: ${s.theme.colors.dark3};
`;t.DocContainer=({children:e})=>i.default.createElement(i.default.Fragment,null,i.default.createElement(a.Global,{styles:l.globalStyles}),i.default.createElement("div",{className:c},e))},12259:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HomeTreeRoot=void 0;const r=n(o(67294)),a=o(69274),i=o(81911),l=o(5838);t.HomeTreeRoot=()=>{const{setMenuOpen:e}=(0,i.useMobileContext)();return r.default.createElement(l.TreeNode,{value:void 0,level:0,getIcon:()=>a.HiHome,getLabel:()=>"Home",isActive:()=>!1,onClick:()=>e(!1),getHref:()=>"/"})}},86299:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const r=n(o(67294)),a=o(18592),i=o(61329),l=o(96486),s=a.css`
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
`;t.Link=({children:e,className:t,onClick:o,...n})=>(0,l.isNil)(o)?r.default.createElement("a",{className:(0,a.cx)(s,t),...n},e):r.default.createElement("span",{className:(0,a.cx)(s,t),onClick:o,...n},e)},15435:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const r=o(18592),a=o(67535),i=o(96486),l=n(o(67294)),s=o(61329),c=o(79129),d=r.css`
  label: side-bar-logo;
  display: flex;
  gap: ${s.theme.spacing.m};
  align-items: center;
  text-decoration: none;
`,u=r.css`
  display: flex;
  flex-direction: column;
`,m=r.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  font-size: ${s.theme.fontSize.l};
  color: ${s.theme.colors.text};
`,f=r.css`
  color: ${s.theme.colors.muted};
`,h=r.css`
  font-size: ${s.theme.fontSize.s};
  color: ${s.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:o})=>l.default.createElement("a",{className:d,href:o},l.default.createElement(c.SvgLogo,{width:60}),l.default.createElement("div",{className:u},l.default.createElement("h1",{className:m},"Oats ",(0,i.isNil)(e)?null:l.default.createElement("span",{className:f},e)),t&&l.default.createElement("span",{className:h},"v",a.version)))},39550:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const r=o(18592),a=n(o(67294)),i=o(39226),l=o(61329),s=r.css`
  margin: ${l.theme.spacing.m} ${l.theme.spacing.m} ${l.theme.spacing.xxxl} ${l.theme.spacing.m};
  @media ${i.breakpoints.phone} {
    margin: ${l.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>a.default.createElement("div",{className:s},e)},76197:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const l=o(18592),s=i(o(67294)),c=a(o(23209)),d=i(o(34112)),u=o(11761),m=o(9572),f=o(61329),h=o(41298),p=o(86299),g=o(7807),v=o(89937),b=l.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.l};
  margin-top: ${f.theme.spacing.zero};
`,_=l.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.xm};
`,x=l.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.m};
`,k=l.css`
  margin: ${f.theme.spacing.l};
`,y=Object.keys(u.markdown),$=e=>y.some((t=>e.startsWith(t)))?m.links.doc(e):(0,c.uriTransformer)(e),M=[d.default],E={h1:({children:e})=>s.default.createElement("h1",{className:b},e),h2:({children:e})=>s.default.createElement("h2",{className:_},e),h3:({children:e})=>s.default.createElement("h3",{className:x},e),table:({children:e})=>s.default.createElement(v.Table,null,e),tr:({children:e,isHeader:t})=>s.default.createElement(v.Tr,{isHeader:t},e),th:({children:e})=>s.default.createElement(v.Th,null,e),td:({children:e})=>s.default.createElement(v.Td,null,e),a:({href:e,children:t})=>s.default.createElement(p.Link,{href:e},t),code({node:e,inline:t,className:o,children:n,...r}){const a=/language-(\w+)/.exec(o||"");return null===a||t?s.default.createElement(h.Code,{...r},n):s.default.createElement(g.SyntaxHighlighter,{language:a[1],kind:"docs"},String(n).replace(/\n$/,""))}};t.MarkdownView=({content:e})=>s.default.createElement(c.default,{remarkPlugins:M,components:E,transformLinkUri:$,className:k},e??"")},81911:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const n=o(96486),r=o(67294);t.MobileContext=(0,r.createContext)({isMenuOpen:!1,setMenuOpen:n.noop}),t.useMobileContext=()=>(0,r.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,r.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},52630:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const r=o(18592),a=n(o(67294)),i=o(61329),l=o(39550),s=o(15435),c=r.css`
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
`;t.MobileHeader=({name:e,version:t,href:o,actionIcon:n,onAction:r})=>a.default.createElement("div",{className:c},a.default.createElement(l.LogoContainer,null,a.default.createElement(s.Logo,{name:e,version:t,href:o})),a.default.createElement(n,{className:d,onClick:r}))},48265:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const r=n(o(67294)),a=o(69274),i=o(81911),l=o(52630),s=o(54104);t.MobileHeaderWithOverlay=({name:e,version:t,href:o,children:n})=>{const{setMenuOpen:c}=(0,i.useMobileContext)();return r.default.createElement(r.default.Fragment,null,r.default.createElement(l.MobileHeader,{href:o,name:e,version:t,actionIcon:a.HiBars3,onAction:()=>c(!0)}),r.default.createElement(s.MobileOverlay,{href:o,name:e,version:t},n))}},54104:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const r=o(18592),a=n(o(67294)),i=o(69274),l=o(61329),s=o(81911),c=o(52630),d=r.css`
  position: fixed;
  top: ${l.theme.spacing.zero};
  left: ${l.theme.spacing.zero};
  width: 100vw;
  height: 100vh;
  background-color: ${l.theme.colors.dark2};
  pointer-events: all;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: auto;
`,u=r.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:o,version:n})=>{const{isMenuOpen:l,setMenuOpen:m}=(0,s.useMobileContext)();return a.default.createElement("div",{className:(0,r.cx)(d,l?void 0:u)},a.default.createElement(c.MobileHeader,{href:o,actionIcon:i.HiXMark,onAction:()=>m(!1),name:e,version:n}),t)}},39201:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const r=o(18592),a=n(o(67294)),i=o(39226),l=o(61329),s=r.css`
  label: side-bar;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${l.theme.colors.dark2};
  @media ${i.breakpoints.phone} {
    display: none;
  }
`;t.SideBar=({children:e})=>a.default.createElement("div",{className:s},e)},38938:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBarSection=void 0;const r=o(18592),a=o(96486),i=n(o(67294)),l=o(61329),s=r.css`
  font-size: ${l.theme.fontSize.m};
  color: ${l.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: ${l.theme.spacing.m} ${l.theme.spacing.m};
`,c=r.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${l.theme.spacing.xxm};
`;t.SideBarSection=({children:e,title:t})=>i.default.createElement(i.default.Fragment,null,(0,a.isNil)(t)?null:i.default.createElement("div",{className:s},t),i.default.createElement("div",{className:c},e))},79129:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const r=n(o(67294)),a=o(61329),i=o(86753);t.SvgLogo=({color:e=a.theme.colors.green,width:t,height:o})=>{const[n,l]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,o);return r.default.createElement("svg",{width:n,height:l,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},7807:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=o(18592),l=a(o(67294)),s=o(67361),c=a(o(29012)),d=o(74855),u=o(61329),m=o(69274),f=o(96486),h=o(71400),p=(0,h.createPrismTheme)(c.vscDarkPlus,u.theme.colors.dark1),g=(0,h.createPrismTheme)(c.vscDarkPlus,u.theme.colors.dark4),v=i.css`
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
`,_=i.css`
  position: relative;
  flex-grow: ${u.theme.flex.grow};
  height: 100vh;

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:o,kind:n})=>{const[r,a]=(0,l.useState)(!1),[c,u]=(0,l.useState)(!1),[h,x]=(0,l.useState)(void 0),k=(0,i.cx)("editor"===n?_:b),y="editor"===n?g:p,$=(0,i.cx)(v);return l.default.createElement("div",{className:k,onMouseEnter:()=>{u(!0)},onMouseLeave:()=>{u(!1)}},l.default.createElement(s.Prism,{language:t,style:y,wrapLongLines:o,showLineNumbers:"editor"===n},e),l.default.createElement(d.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,f.isNil)(h)||(clearTimeout(h),x(void 0)),a(t),x(setTimeout((()=>{a(!1)}),2e3))}},l.default.createElement("button",{className:$,style:{opacity:c?1:0}},r?l.default.createElement(m.HiCheck,null):l.default.createElement(m.HiClipboard,null))))}},89937:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const r=o(18592),a=n(o(67294)),i=o(61329),l=r.css`
  border-radius: ${i.theme.spacing.m};
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  margin: 1px;
`,s=r.css`
  border-collapse: collapse;
  width: 100%;
  border-width: ${i.theme.spacing.zero};
`;t.Table=({children:e,className:t,...o})=>a.default.createElement("div",{className:l},a.default.createElement("table",{className:(0,r.cx)(s,t),...o},e));const c=r.css`
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
`;t.Tr=({children:e,isHeader:t,className:o,...n})=>{const i=(0,r.cx)(t?d:c,o);return a.default.createElement("tr",{...n,className:i},e)};const u=r.css`
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
`;t.Th=({children:e,className:t,...o})=>a.default.createElement("th",{...o,className:(0,r.cx)(u,t)},e);const m=r.css`
  padding: ${i.theme.spacing.m};
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.muted};
`;t.Td=({children:e,className:t,...o})=>a.default.createElement("td",{...o,className:(0,r.cx)(m,t)},e);const f=r.css`
  border-width: ${i.theme.spacing.zero};
`;t.THead=({children:e,className:t,...o})=>a.default.createElement("thead",{...o,className:(0,r.cx)(f,t)},e);const h=r.css`
  border-width: ${i.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...o})=>a.default.createElement("tbody",{...o,className:(0,r.cx)(h,t)},e)},5838:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const r=o(18592),a=n(o(67294)),i=o(69274),l=o(61329),s=r.css`
  position: relative;
`,c=(e,t)=>r.css`
  label: tree-node-content-${e};
  display: flex;
  flex-direction: row;
  padding: ${l.theme.spacing.s};
  transition: background-color 150ms linear, color 150ms linear;
  cursor: pointer;
  text-decoration: none;

  padding-left: ${14+14*e}px;
  font-size: ${l.theme.fontSize.m};
  background-color: ${t?l.theme.colors.dark1:l.theme.colors.transparent};
  color: ${t?l.theme.colors.text:l.theme.colors.muted};
  &:hover {
    background-color: ${l.theme.colors.dark1};
  }
`,d=r.css`
  flex: ${l.theme.flex.grow};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${l.theme.spacing.xxs};
`,u=({isContainer:e,isOpen:t,isEmpty:o})=>e?o?a.default.createElement(i.HiChevronLeft,null):t?a.default.createElement(i.HiChevronDown,null):a.default.createElement(i.HiChevronRight,null):null;t.TreeNode=function e({value:t,level:o,getLabel:n,isActive:i=(()=>!1),isOpen:m=(()=>!1),isContainer:f=(()=>!1),getChildren:h=(()=>[]),onClick:p=(()=>{}),getHref:g=(()=>{}),getIcon:v=(()=>{})}){const b=h(t),_=m(t),x=i(t),k=f(t),y=v(t),$=k&&_?(0,r.cx)(s,(e=>r.css`
  &::before {
    z-index: 5;
    label: tree-node-line-${e};
    border-left: 1px solid #555;
    content: '';
    left: ${22+14*e}px;
    position: absolute;
    top: ${l.theme.spacing.xxl};
    height: calc(100% - ${l.theme.spacing.xxl});
  }
`)(o)):s,M=g(t),E=n(t);return a.default.createElement("div",{className:$},a.default.createElement("a",{className:c(o,x),href:M,onClick:()=>p(t,_)},a.default.createElement("span",{className:d},a.default.createElement(u,{isContainer:k,isEmpty:0===b.length,isOpen:_}),void 0===y?null:a.default.createElement(y,null),E)),_&&b.map(((t,r)=>a.default.createElement(e,{key:`${r}-${E}`,value:t,level:o+1,getLabel:n,getHref:g,isContainer:f,getChildren:h,isOpen:m,isActive:i,onClick:p}))))}},71400:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const n=o(96486),r=o(61329);t.createPrismTheme=function(e,t){const o={'pre[class*="language-"]':{backgroundColor:t,borderRadius:r.theme.spacing.zero,padding:r.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:r.theme.spacing.zero,margin:r.theme.spacing.zero,fontSize:r.theme.fontSize.code,fontFamily:r.theme.fontFamily.monospace}},a=(0,n.cloneDeep)(e);return(0,n.values)(a).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${r.theme.spacing.zero} ${r.theme.spacing.zero} ${r.theme.spacing.xxs}`,e.fontSize=r.theme.fontSize.code,e.fontFamily=r.theme.fontFamily.monospace})),(0,n.merge)(a,o)}},86753:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,o,n){return void 0!==o&&void 0===n?[o,t/e*o]:void 0!==n&&void 0===o?[n,e/t*n]:void 0!==o&&void 0!==n?[o,n]:[e,t]}},72050:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const n=o(26729),r=o(39226),a=o(61329);t.globalStyles=n.css`
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
`},9572:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,console.log("production"),t.links={docs:()=>"/docs/v2/documentation",doc:e=>`/docs/v2/documentation/${e}`,editor:()=>"/docs/v2/editor",index:()=>"/docs/v2"}},2684:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const i=o(18592),l=o(96486),s=a(o(67294)),c=o(69274),d=o(86299),u=o(9572),m=o(61329),f=o(82704),h=i.css`
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
`;function _(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,o]=(0,f.useNeighbours)(),n=!(0,l.isNil)(e),r=!(0,l.isNil)(o),a=!(0,l.isNil)(t),i=(0,s.useMemo)((()=>{if(!(0,l.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${_(t.name)}+(in+${t.md}.md)&body=${_("Please describe the issue with as much detail as possible!")}`}),[t]);return n||r||a?s.default.createElement("div",{className:h},(n||r)&&s.default.createElement("div",{className:p},n&&s.default.createElement(d.Link,{href:u.links.doc(e.md),className:b},s.default.createElement(c.HiChevronLeft,null),e.name),s.default.createElement("div",{className:v}),r&&s.default.createElement(d.Link,{href:u.links.doc(o.md),className:b},o.name,s.default.createElement(c.HiChevronRight,null))),a&&s.default.createElement("div",{className:g},s.default.createElement("b",null,"Found an issue with this page?"),s.default.createElement("br",null),"Please let me know by ",s.default.createElement(d.Link,{href:i},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},44376:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&n(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const i=a(o(67294)),l=o(12259),s=o(38938),c=o(21521),d=o(42946);t.DocumentationMenu=()=>i.default.createElement(i.default.Fragment,null,i.default.createElement(s.SideBarSection,null,i.default.createElement(l.HomeTreeRoot,null)),d.sections.map((e=>i.default.createElement(i.Fragment,{key:e.name},i.default.createElement(s.SideBarSection,{title:e.name},e.items.map((e=>i.default.createElement(c.DocumentationTreeRoot,{node:e,key:e.md}))))))))},95462:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const r=o(18592),a=n(o(67294)),i=o(39226),l=o(40782),s=o(76197),c=o(81911),d=o(48265),u=o(39201),m=o(15435),f=o(39550),h=o(61329),p=o(44376),g=o(2684),v=o(50059),b=o(9572),_="docs",x=r.css`
  flex: ${h.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${h.theme.colors.muted};
  font-size: ${h.theme.fontSize.m};
  background-color: ${h.theme.colors.dark4};
`,k=()=>{const e=(0,c.useProvideMobileContext)();return a.default.createElement(c.MobileContext.Provider,{value:e},a.default.createElement(d.MobileHeaderWithOverlay,{name:_,version:!0,href:b.links.docs()},a.default.createElement(p.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>a.default.createElement(v.MarkdownContext.Provider,{value:{page:e,content:t}},a.default.createElement(l.DocContainer,null,a.default.createElement(u.SideBar,null,a.default.createElement(f.LogoContainer,null,a.default.createElement(m.Logo,{name:_,version:!0,href:b.links.docs()})),a.default.createElement(p.DocumentationMenu,null)),a.default.createElement("div",{className:x},a.default.createElement(i.BreakPoint,{Component:k,breakpoint:"phone"}),a.default.createElement(s.MarkdownView,{content:t}),a.default.createElement(g.DocumentationFooter,null))))},21521:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const r=n(o(67294)),a=o(5838),i=o(81911),l=o(50059),s=o(9572);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,i.useMobileContext)(),{page:o}=(0,l.useMarkdown)();return r.default.createElement(a.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===o,onClick:()=>t(!1),getHref:e=>s.links.doc(e.md)})}},50059:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const n=o(67294);t.MarkdownContext=(0,n.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,n.useContext)(t.MarkdownContext)},82704:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const n=o(96486),r=o(67294),a=o(42946),i=o(50059);function l(e,t=0){const o=function(e){return a.sections.find((t=>t.items.some((t=>t.md===e))))}(e);if((0,n.isNil)(o))return;const r=function(e,t){return t.items.findIndex((t=>t.md===e))}(e,o)+t;return o.items[r]}t.useNeighbours=function(){const{page:e}=(0,i.useMarkdown)(),t=(0,r.useMemo)((()=>l(e)),[e]);return[(0,r.useMemo)((()=>l(e,-1)),[e]),t,(0,r.useMemo)((()=>l(e,1)),[e])]}},2433:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(o(67294)),a=o(20745),i=o(95462),l=n(o(37974));(0,a.createRoot)(document.getElementById("root")).render(r.default.createElement(i.DocumentationPage,{page:"CommonMistakes",content:l.default}))},61329:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=2433)}]);
//# sourceMappingURL=documentation-CommonMistakes.bundle.js.map