"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[539],{91447:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Welcome to the docs!\n\nOats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.\n\n## How to get started?\n\n- [**SDK Guide**](SdkGenerate) - If you are a frontend developer, or you want to generate a Typescript SDK based on an OpenAPI document\n- [**Server guide**](ServerGenerate) - If you are a backend developer, you want to focus on moving data, and generate the tedious parts (routing, parameter parsing etc.)\n\n## Motivation\n\n**Why does this project exist?**\n\nDuring my job as a Typescript dev, I'm continously running into the same problem: while the frontend (and usually the backend too) is strictly typed, the integration between them is unclear to everyone. Backend devs produce usually poorly written wiki pages about their services, that then nobody updates. In turn the frontend continously breaks, as there is no way to figure out at compile time, if its still in sync with the backend, and the only solution is extremely extensive testing.\n\nDescribing a service / Rest API in a language agnostic way (like OpenAPI), and building upon that is a good first step, but it still needs maintenance on both the backend and frontend side. Here comes the idea of generating the code thats used for the interaction between the 2 (or more) sides. The idea is not new, unfortunately I had many issues with the existing tooling.\n\nIf you want to use the official OpenAPI code generators, you need Java, a Java library that you either build yourself or download as a jar, then you run it and hope whatever comes out of it is usable (which for me it wasn't).\n\nThere are other open source alternatives, that fit in the Javascript/Typescript ecosystem well. However they are usually characterized by limited configuration, no clear path to extend them, without forking the project or redoing most of the work the devs have already done. They also often implemented the easy stuff (types from schemas, and basic client side SDK), however more involved things (like advanced types, references to other OpenAPI documents, different style parameter serialization, etc.) are left out, as the original developers didn't need these.\n\n**This is why I started Oats.** I want to provide code generators, that produce well thought out, spec compliant code, for both the frontend and backend.\n\nThe goals in short were:\n\n- Make it work for 1 language (Typescript), and do that well.\n- Make every part of the public API replaceable (without forking the project) in case it doesn't suit your needs.\n- Make it easy to customize, to suit a wide variety of use cases out of the box.\n- Make the generated code as easy to read, as if a dev would have written it by hand (or get as close to this as possible).\n"},80887:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const i=r(n(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:n})=>{const[o,a]=(0,i.useState)((()=>window.matchMedia(t.breakpoints[n]).matches));return(0,i.useEffect)((()=>{window.matchMedia(t.breakpoints[n]).addEventListener("change",(e=>a(e.matches)))}),[]),o?i.default.createElement(e,null):null}},88171:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=o(n(67294)),r=n(20745),i=n(15529),s=o(n(91447));(0,r.createRoot)(document.getElementById("root")).render(a.default.createElement(i.DocumentationPage,{page:"Welcome",content:s.default}))},4074:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const a=n(18592),r=o(n(67294)),i=n(19446),s=a.css`
  font-size: ${i.theme.fontSize.code};
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};
  padding: ${i.theme.spacing.xxxs} ${i.theme.spacing.xxs};
  border-radius: ${i.theme.spacing.xs};
`;t.Code=({className:e,children:t,...n})=>r.default.createElement("code",{className:(0,a.cx)(s,e),...n},t)},98378:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocContainer=void 0;const a=n(18592),r=n(26729),i=o(n(67294)),s=n(63413),l=n(19446),d=a.css`
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
`;t.DocContainer=({children:e})=>i.default.createElement(i.default.Fragment,null,i.default.createElement(r.Global,{styles:s.globalStyles}),i.default.createElement("div",{className:d},e))},17746:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HomeTreeRoot=void 0;const a=o(n(67294)),r=n(69274),i=n(77255),s=n(7117),l=n(82067);t.HomeTreeRoot=()=>{const{setMenuOpen:e}=(0,s.useMobileContext)();return a.default.createElement(l.TreeNode,{value:void 0,level:0,getIcon:()=>r.HiHome,getLabel:()=>"Home",isActive:()=>!1,onClick:()=>e(!1),getHref:()=>i.links.index()})}},3930:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const a=o(n(67294)),r=n(18592),i=n(19446),s=n(96486),l=r.css`
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
`;t.Link=({children:e,className:t,onClick:n,...o})=>(0,s.isNil)(n)?a.default.createElement("a",{className:(0,r.cx)(l,t),...o},e):a.default.createElement("span",{className:(0,r.cx)(l,t),onClick:n,...o},e)},66118:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const a=n(18592),r=n(67535),i=n(96486),s=o(n(67294)),l=n(19446),d=n(20519),c=a.css`
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
`,f=a.css`
  font-size: ${l.theme.fontSize.s};
  color: ${l.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:n})=>s.default.createElement("a",{className:c,href:n},s.default.createElement(d.SvgLogo,{width:60}),s.default.createElement("div",{className:u},s.default.createElement("h1",{className:m},"Oats ",(0,i.isNil)(e)?null:s.default.createElement("span",{className:h},e)),t&&s.default.createElement("span",{className:f},"v",r.version)))},19187:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const a=n(18592),r=o(n(67294)),i=n(80887),s=n(19446),l=a.css`
  margin: ${s.theme.spacing.m} ${s.theme.spacing.m} ${s.theme.spacing.xxxl} ${s.theme.spacing.m};
  @media ${i.breakpoints.phone} {
    margin: ${s.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>r.default.createElement("div",{className:l},e)},40704:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const s=n(18592),l=n(96486),d=i(n(67294)),c=r(n(23209)),u=i(n(34112)),m=n(82509),h=n(77255),f=n(19446),p=n(4074),g=n(3930),b=n(44702),v=n(66999),y=s.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.l};
  margin-top: ${f.theme.spacing.zero};
`,x=s.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.xm};
`,k=s.css`
  color: ${f.theme.colors.text};
  font-size: ${f.theme.fontSize.m};
`,_=s.css`
  margin: ${f.theme.spacing.l};
`,w=Object.values(m.markdownPages),P=e=>{const t=w.find((t=>e.startsWith(t.md)));return(0,l.isNil)(t)?(0,c.uriTransformer)(e):h.links.doc(t.md)},S=[u.default],M={h1:({children:e})=>d.default.createElement("h1",{className:y},e),h2:({children:e})=>d.default.createElement("h2",{className:x},e),h3:({children:e})=>d.default.createElement("h3",{className:k},e),table:({children:e})=>d.default.createElement(v.Table,null,e),tr:({children:e,isHeader:t})=>d.default.createElement(v.Tr,{isHeader:t},e),th:({children:e})=>d.default.createElement(v.Th,null,e),td:({children:e})=>d.default.createElement(v.Td,null,e),a:({href:e,children:t})=>d.default.createElement(g.Link,{href:e},t),code({node:e,inline:t,className:n,children:o,...a}){const r=/language-(\w+)/.exec(n||"");return null===r||t?d.default.createElement(p.Code,{...a},o):d.default.createElement(b.SyntaxHighlighter,{language:r[1],kind:"docs"},String(o).replace(/\n$/,""))}};t.MarkdownView=({content:e})=>d.default.createElement(c.default,{remarkPlugins:S,components:M,transformLinkUri:P,className:_},e??"")},7117:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const o=n(96486),a=n(67294);t.MobileContext=(0,a.createContext)({isMenuOpen:!1,setMenuOpen:o.noop}),t.useMobileContext=()=>(0,a.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,a.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},35625:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const a=n(18592),r=o(n(67294)),i=n(19446),s=n(19187),l=n(66118),d=a.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,c=a.css`
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.xxl};
  cursor: pointer;
  margin: ${i.theme.spacing.m};
  &:hover {
    color: ${i.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:n,actionIcon:o,onAction:a})=>r.default.createElement("div",{className:d},r.default.createElement(s.LogoContainer,null,r.default.createElement(l.Logo,{name:e,version:t,href:n})),r.default.createElement(o,{className:c,onClick:a}))},8015:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const a=o(n(67294)),r=n(69274),i=n(7117),s=n(35625),l=n(99102);t.MobileHeaderWithOverlay=({name:e,version:t,href:n,children:o})=>{const{setMenuOpen:d}=(0,i.useMobileContext)();return a.default.createElement(a.default.Fragment,null,a.default.createElement(s.MobileHeader,{href:n,name:e,version:t,actionIcon:r.HiBars3,onAction:()=>d(!0)}),a.default.createElement(l.MobileOverlay,{href:n,name:e,version:t},o))}},99102:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const a=n(18592),r=o(n(67294)),i=n(69274),s=n(19446),l=n(7117),d=n(35625),c=a.css`
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
`;t.MobileOverlay=({name:e,children:t,href:n,version:o})=>{const{isMenuOpen:s,setMenuOpen:m}=(0,l.useMobileContext)();return r.default.createElement("div",{className:(0,a.cx)(c,s?void 0:u)},r.default.createElement(d.MobileHeader,{href:n,actionIcon:i.HiXMark,onAction:()=>m(!1),name:e,version:o}),t)}},86229:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SideBar=void 0;const a=n(18592),r=o(n(67294)),i=n(80887),s=n(19446),l=a.css`
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
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: ${s.theme.spacing.m} ${s.theme.spacing.m};
`,d=a.css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${s.theme.spacing.xxm};
`;t.SideBarSection=({children:e,title:t})=>i.default.createElement(i.default.Fragment,null,(0,r.isNil)(t)?null:i.default.createElement("div",{className:l},t),i.default.createElement("div",{className:d},e))},20519:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const a=o(n(67294)),r=n(19446),i=n(14757);t.SvgLogo=({color:e=r.theme.colors.green,width:t,height:n})=>{const[o,s]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,n);return a.default.createElement("svg",{width:o,height:s,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},44702:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=n(18592),s=r(n(67294)),l=n(67361),d=r(n(29012)),c=n(74855),u=n(19446),m=n(69274),h=n(96486),f=n(98452),p=(0,f.createPrismTheme)(d.vscDarkPlus,u.theme.colors.dark1),g=(0,f.createPrismTheme)(d.vscDarkPlus,u.theme.colors.dark4),b=i.css`
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
`,y=i.css`
  position: relative;
  flex-grow: ${u.theme.flex.grow};
  height: 100vh;

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:n,kind:o})=>{const[a,r]=(0,s.useState)(!1),[d,u]=(0,s.useState)(!1),[f,x]=(0,s.useState)(void 0),k=(0,i.cx)("editor"===o?y:v),_="editor"===o?g:p,w=(0,i.cx)(b);return s.default.createElement("div",{className:k,onMouseEnter:()=>{u(!0)},onMouseLeave:()=>{u(!1)}},s.default.createElement(l.Prism,{language:t,style:_,wrapLongLines:n,showLineNumbers:"editor"===o},e),s.default.createElement(c.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,h.isNil)(f)||(clearTimeout(f),x(void 0)),r(t),x(setTimeout((()=>{r(!1)}),2e3))}},s.default.createElement("button",{className:w,style:{opacity:d?1:0}},a?s.default.createElement(m.HiCheck,null):s.default.createElement(m.HiClipboard,null))))}},66999:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const a=n(18592),r=o(n(67294)),i=n(19446),s=a.css`
  border-radius: ${i.theme.spacing.m};
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  margin: 1px;
`,l=a.css`
  border-collapse: collapse;
  width: 100%;
  border-width: ${i.theme.spacing.zero};
`;t.Table=({children:e,className:t,...n})=>r.default.createElement("div",{className:s},r.default.createElement("table",{className:(0,a.cx)(l,t),...n},e));const d=a.css`
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.dark1};
  border-left-width: ${i.theme.spacing.zero};
  border-right-width: ${i.theme.spacing.zero};
  &:last-of-type {
    border-bottom-width: ${i.theme.spacing.zero};
  }
`,c=a.css`
  background-color: ${i.theme.colors.dark1};
  border-width: ${i.theme.spacing.zero};
  border-radius: ${i.theme.spacing.m};
`;t.Tr=({children:e,isHeader:t,className:n,...o})=>{const i=(0,a.cx)(t?c:d,n);return r.default.createElement("tr",{...o,className:i},e)};const u=a.css`
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
`;t.Td=({children:e,className:t,...n})=>r.default.createElement("td",{...n,className:(0,a.cx)(m,t)},e);const h=a.css`
  border-width: ${i.theme.spacing.zero};
`;t.THead=({children:e,className:t,...n})=>r.default.createElement("thead",{...n,className:(0,a.cx)(h,t)},e);const f=a.css`
  border-width: ${i.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...n})=>r.default.createElement("tbody",{...n,className:(0,a.cx)(f,t)},e)},82067:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TreeNode=void 0;const a=n(18592),r=o(n(67294)),i=n(69274),s=n(19446),l=a.css`
  position: relative;
`,d=(e,t)=>a.css`
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
`,c=a.css`
  flex: ${s.theme.flex.grow};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s.theme.spacing.xxs};
`,u=({isContainer:e,isOpen:t,isEmpty:n})=>e?n?r.default.createElement(i.HiChevronLeft,null):t?r.default.createElement(i.HiChevronDown,null):r.default.createElement(i.HiChevronRight,null):null;t.TreeNode=function e({value:t,level:n,getLabel:o,isActive:i=(()=>!1),isOpen:m=(()=>!1),isContainer:h=(()=>!1),getChildren:f=(()=>[]),onClick:p=(()=>{}),getHref:g=(()=>{}),getIcon:b=(()=>{})}){const v=f(t),y=m(t),x=i(t),k=h(t),_=b(t),w=k&&y?(0,a.cx)(l,(e=>a.css`
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
`)(n)):l,P=g(t),S=o(t);return r.default.createElement("div",{className:w},r.default.createElement("a",{className:d(n,x),href:P,onClick:()=>p(t,y)},r.default.createElement("span",{className:c},r.default.createElement(u,{isContainer:k,isEmpty:0===v.length,isOpen:y}),void 0===_?null:r.default.createElement(_,null),S)),y&&v.map(((t,a)=>r.default.createElement(e,{key:`${a}-${S}`,value:t,level:n+1,getLabel:o,getHref:g,isContainer:h,getChildren:f,isOpen:m,isActive:i,onClick:p}))))}},98452:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const o=n(96486),a=n(19446);t.createPrismTheme=function(e,t){const n={'pre[class*="language-"]':{backgroundColor:t,borderRadius:a.theme.spacing.zero,padding:a.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:a.theme.spacing.zero,margin:a.theme.spacing.zero,fontSize:a.theme.fontSize.code,fontFamily:a.theme.fontFamily.monospace}},r=(0,o.cloneDeep)(e);return(0,o.values)(r).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${a.theme.spacing.zero} ${a.theme.spacing.zero} ${a.theme.spacing.xxs}`,e.fontSize=a.theme.fontSize.code,e.fontFamily=a.theme.fontFamily.monospace})),(0,o.merge)(r,n)}},14757:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,n,o){return void 0!==n&&void 0===o?[n,t/e*n]:void 0!==o&&void 0===n?[o,e/t*o]:void 0!==n&&void 0!==o?[n,o]:[e,t]}},63413:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const o=n(26729),a=n(80887),r=n(19446);t.globalStyles=o.css`
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
`},77255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,t.links={docs:()=>"/docs/documentation",doc:e=>`/docs/documentation/${e}`,editor:()=>"/docs/editor",index:()=>"/docs"}},82509:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdownPages=void 0,t.markdownPages={commonMistakesPage:{bundle:"documentation-CommonMistakes",name:"Common mistakes",description:"OpenAPI it is an extremely loosely defined spec, that in turn lets you define your API and your schemas in many different ways. In this article Im listing the most common mistakes that you can make, that doesnt make your OpenAPI document invalid, but effectively prevents tooling from outputing usable documentation or code.",importPath:"src/bundles/documentation/DocumentationBundle_CommonMistakes.tsx",md:"CommonMistakes"},customGeneratorsPage:{bundle:"documentation-CustomGenerators",name:"Custom Generators",description:"Documentation is in progress.",importPath:"src/bundles/documentation/DocumentationBundle_CustomGenerators.tsx",md:"CustomGenerators"},generatePage:{bundle:"documentation-Generate",name:"Generate",description:"The generator step is responsible for taking the validated output of the [reader](OpenAPI-Reader), and turning it into an intermediate representation (Typescript [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) in this case), that can be then turned into source code. The OpenAPI generator itself doesnt do much, the work is distributed to single responsiblity generators, that are responsible for generating one thing (like types from the JSON schemas, or serializers for parameters). They also provide means for other generators to access references to their generated content.",importPath:"src/bundles/documentation/DocumentationBundle_Generate.tsx",md:"Generate"},gettingStartedPage:{bundle:"documentation-GettingStarted",name:"Getting Started",description:"In this guide youll learn how to set up and generate with Oats.",importPath:"src/bundles/documentation/DocumentationBundle_GettingStarted.tsx",md:"GettingStarted"},homePage:{bundle:"documentation-Home",name:"🌱 oats",description:"This project aims to provide a solution for generating quality Typescript code from API-describing documents. The only supported format currently is [OpenAPI 3.x](https://www.openapis.org), but there are plans to introduce generators for [AsyncAPI](https://www.asyncapi.com/) as well.",importPath:"src/bundles/documentation/DocumentationBundle_Home.tsx",md:"Home"},readPage:{bundle:"documentation-Read",name:"Read",description:"The reader step is responsible for",importPath:"src/bundles/documentation/DocumentationBundle_Read.tsx",md:"Read"},sdkErrorHandlingPage:{bundle:"documentation-SdkErrorHandling",name:"Error handling",description:"Oats generated SDKs dont `throw` (or rather reject, as we are dealing with `Promise`s), unless the response is invalid according to the source OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_SdkErrorHandling.tsx",md:"SdkErrorHandling"},sdkGettingStartedPage:{bundle:"documentation-SdkGettingStarted",name:"Getting started (SDK)",description:"In this guide youll learn how to generate an SDK and (necessary related code) based on your OpenAPI document. As for all examples, we are going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example (so its recommended you try using this first, if you are unfamiliar with Oats)!",importPath:"src/bundles/documentation/DocumentationBundle_SdkGettingStarted.tsx",md:"SdkGettingStarted"},sdkTypesPage:{bundle:"documentation-SdkTypes",name:"SDK related types",description:"This guide will showcase the main types generated for the client side. A big chunk of the generated types is the same as for the server side (JSON schema based types and parameter types), so in this chapter Im highlighting the differences.",importPath:"src/bundles/documentation/DocumentationBundle_SdkTypes.tsx",md:"SdkTypes"},sdkUsagePage:{bundle:"documentation-SdkUsage",name:"SDK usage",description:"To start using the SDK, you will need an implementation of the previously described SDK type. Oats generates an SDK implementation class (`BookStoreSdkImpl` in our case), that you can find next to the SDK type (in `src/generated/sdk`).",importPath:"src/bundles/documentation/DocumentationBundle_SdkUsage.tsx",md:"SdkUsage"},serverApiImplPage:{bundle:"documentation-ServerApiImpl",name:"Example API implementation",description:"Lets go back to `BookStoreApiImpl` and implement some simple logic. In this guide Im going to store data in memory, but since all API methods return `Promise`s, you can use whatever data storage you choose.",importPath:"src/bundles/documentation/DocumentationBundle_ServerApiImpl.tsx",md:"ServerApiImpl"},serverCorsPage:{bundle:"documentation-ServerCors",name:"Implement CORS",description:"In this guide youll learn how to make your Oats+express based server CORS enabled.",importPath:"src/bundles/documentation/DocumentationBundle_ServerCors.tsx",md:"ServerCors"},serverGettingStartedPage:{bundle:"documentation-ServerGettingStarted",name:"Getting started (Server)",description:"This guide will help you getting started with generating server side code using Oats. As for all examples, we are going to use the [book store](https://github.com/oats-ts/oats-schemas/blob/master/schemas/book-store.json) example (so its recommended you try using this first, if you are unfamiliar with Oats)!",importPath:"src/bundles/documentation/DocumentationBundle_ServerGettingStarted.tsx",md:"ServerGettingStarted"},serverSetupPage:{bundle:"documentation-ServerSetup",name:"Express server setup",description:"Before we write any business logic, lets create a functional server that exposes the appropriate endpoints, and we can test it locally. This involves the following steps:",importPath:"src/bundles/documentation/DocumentationBundle_ServerSetup.tsx",md:"ServerSetup"},serverTypesPage:{bundle:"documentation-ServerTypes",name:"Server types",description:"This guide will showcase the main types generated for the server side. A big chunk of the generated types is the same as for the client side (JSON schema based types and parameter types), so in this chapter Im highlighting the differences.",importPath:"src/bundles/documentation/DocumentationBundle_ServerTypes.tsx",md:"ServerTypes"},validatePage:{bundle:"documentation-Validate",name:"Validate",description:"The valididator step is responsible for taking the output of the [reader](OpenAPI-Reader) step, and checking for structural and semantic errors.",importPath:"src/bundles/documentation/DocumentationBundle_Validate.tsx",md:"Validate"},welcomePage:{bundle:"documentation-Welcome",name:"Welcome to the docs!",description:"Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.",importPath:"src/bundles/documentation/DocumentationBundle_Welcome.tsx",md:"Welcome"},workflowPage:{bundle:"documentation-Workflow",name:"Workflow",description:"This guide will walk you through on how to get started with oats and OpenAPI.",importPath:"src/bundles/documentation/DocumentationBundle_Workflow.tsx",md:"Workflow"},writePage:{bundle:"documentation-Write",name:"Write",description:"The writer step is responsible for taking the output of the [generator step](OpenAPI-Generator) and writing its outputs to the disk. The typescript writer takes typescript `SourceFile`s (this is Typescripts in-memory representation of an AST + file location) and writes them to the desired location.",importPath:"src/bundles/documentation/DocumentationBundle_Write.tsx",md:"Write"}}},42946:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.sections=void 0;const o=n(96486),a=n(82509),r=[{items:[a.markdownPages.welcomePage]},{name:"Server Guide",items:[a.markdownPages.serverGettingStartedPage,a.markdownPages.serverTypesPage,a.markdownPages.serverSetupPage,a.markdownPages.serverApiImplPage,a.markdownPages.serverCorsPage]},{name:"(Client) SDK Guide",items:[a.markdownPages.sdkGettingStartedPage,a.markdownPages.sdkTypesPage,a.markdownPages.sdkUsagePage,a.markdownPages.sdkErrorHandlingPage]},{name:"Other Guides",items:[a.markdownPages.commonMistakesPage]},{name:"Generator api",items:[a.markdownPages.readPage,a.markdownPages.validatePage,a.markdownPages.generatePage,a.markdownPages.customGeneratorsPage,a.markdownPages.writePage]}];t.sections=r,t.docs=(0,o.flatMap)(t.sections,(e=>e.items))},11149:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationFooter=void 0;const i=n(18592),s=n(96486),l=r(n(67294)),d=n(69274),c=n(3930),u=n(77255),m=n(19446),h=n(10603),f=i.css`
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
`;function y(e){return e.replace(/\s+/g,"+")}t.DocumentationFooter=()=>{const[e,t,n]=(0,h.useNeighbours)(),o=!(0,s.isNil)(e),a=!(0,s.isNil)(n),r=!(0,s.isNil)(t),i=(0,l.useMemo)((()=>{if(!(0,s.isNil)(t))return`https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${y(t.name)}+(in+${t.md}.md)&body=${y("Please describe the issue with as much detail as possible!")}`}),[t]);return o||a||r?l.default.createElement("div",{className:f},(o||a)&&l.default.createElement("div",{className:p},o&&l.default.createElement(c.Link,{href:u.links.doc(e.md),className:v},l.default.createElement(d.HiChevronLeft,null),e.name),l.default.createElement("div",{className:b}),a&&l.default.createElement(c.Link,{href:u.links.doc(n.md),className:v},n.name,l.default.createElement(d.HiChevronRight,null))),r&&l.default.createElement("div",{className:g},l.default.createElement("b",null,"Found an issue with this page?"),l.default.createElement("br",null),"Please let me know by ",l.default.createElement(c.Link,{href:i},"opening an issue on GitHub!")," Please include all details that you think might be important!")):null}},97281:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationMenu=void 0;const i=r(n(67294)),s=n(17746),l=n(21710),d=n(54711),c=n(42946);t.DocumentationMenu=()=>i.default.createElement(i.default.Fragment,null,i.default.createElement(l.SideBarSection,null,i.default.createElement(s.HomeTreeRoot,null)),c.sections.map((e=>i.default.createElement(i.Fragment,{key:e.name},i.default.createElement(l.SideBarSection,{title:e.name},e.items.map((e=>i.default.createElement(d.DocumentationTreeRoot,{node:e,key:e.md}))))))))},15529:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const a=n(18592),r=o(n(67294)),i=n(80887),s=n(98378),l=n(40704),d=n(7117),c=n(8015),u=n(86229),m=n(66118),h=n(19187),f=n(19446),p=n(97281),g=n(11149),b=n(49098),v=n(77255),y="docs",x=a.css`
  flex: ${f.theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${f.theme.colors.muted};
  font-size: ${f.theme.fontSize.m};
  background-color: ${f.theme.colors.dark4};
`,k=()=>{const e=(0,d.useProvideMobileContext)();return r.default.createElement(d.MobileContext.Provider,{value:e},r.default.createElement(c.MobileHeaderWithOverlay,{name:y,version:!0,href:v.links.docs()},r.default.createElement(p.DocumentationMenu,null)))};t.DocumentationPage=({page:e,content:t})=>r.default.createElement(b.MarkdownContext.Provider,{value:{page:e,content:t}},r.default.createElement(s.DocContainer,null,r.default.createElement(u.SideBar,null,r.default.createElement(h.LogoContainer,null,r.default.createElement(m.Logo,{name:y,version:!0,href:v.links.docs()})),r.default.createElement(p.DocumentationMenu,null)),r.default.createElement("div",{className:x},r.default.createElement(i.BreakPoint,{Component:k,breakpoint:"phone"}),r.default.createElement(l.MarkdownView,{content:t}),r.default.createElement(g.DocumentationFooter,null))))},54711:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationTreeRoot=void 0;const a=o(n(67294)),r=n(82067),i=n(7117),s=n(49098),l=n(77255);t.DocumentationTreeRoot=({node:e})=>{const{setMenuOpen:t}=(0,i.useMobileContext)(),{page:n}=(0,s.useMarkdown)();return a.default.createElement(r.TreeNode,{value:e,level:0,getLabel:e=>e.name,isActive:e=>e.md===n,onClick:()=>t(!1),getHref:e=>l.links.doc(e.md)})}},49098:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useMarkdown=t.MarkdownContext=void 0;const o=n(67294);t.MarkdownContext=(0,o.createContext)({content:"",page:"Welcome"}),t.useMarkdown=()=>(0,o.useContext)(t.MarkdownContext)},10603:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useNeighbours=void 0;const o=n(96486),a=n(67294),r=n(42946),i=n(49098);function s(e,t=0){const n=function(e){return r.sections.find((t=>t.items.some((t=>t.md===e))))}(e);if((0,o.isNil)(n))return;const a=function(e,t){return t.items.findIndex((t=>t.md===e))}(e,n)+t;return n.items[a]}t.useNeighbours=function(){const{page:e}=(0,i.useMarkdown)(),t=(0,a.useMemo)((()=>s(e)),[e]);return[(0,a.useMemo)((()=>s(e,-1)),[e]),t,(0,a.useMemo)((()=>s(e,1)),[e])]}},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=88171)}]);
//# sourceMappingURL=documentation.bundle.js.map