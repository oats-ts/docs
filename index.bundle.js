"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[826],{24085:(e,t,o)=>{o.r(t),o.d(t,{default:()=>a});const a='✔ reader step completed using "@oats-ts/openapi-reader"\n✔ validator step completed using "@oats-ts/openapi-validator"\n✔ generator step completed using "@oats-ts/openapi-generators"\ni some outputs have runtime dependencies:\n  npm i \\\n    @oats-ts/openapi-express-server-adapter@0.0.43 \\\n    @oats-ts/openapi-fetch-client-adapter@0.0.43 \\\n    @oats-ts/openapi-runtime@0.0.43 \\\n    express@^4.18.1\n✔ writer step completed using "@oats-ts/typescript-writer"'},43428:(e,t,o)=>{o.r(t),o.d(t,{default:()=>a});const a="const oats = require('@oats-ts/openapi')\n\noats.generate({\n  logger: oats.loggers.simple(),\n  // Use readers.file, to read from the local file system\n  reader: oats.readers.https.json(\n    'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',\n  ),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    // Use presets.client() or presets.server() for just client/server side code\n    children: oats.presets.fullStack(),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n})"},86032:(e,t,o)=>{o.r(t),o.d(t,{default:()=>a});const a={'pre[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#1e1e1e"},'code[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'pre[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},':not(pre) > code[class*="language-"]':{padding:".1em .3em",borderRadius:".3em",color:"#db4c69",background:"#1e1e1e"},".namespace":{Opacity:".7"},"doctype.doctype-tag":{color:"#569CD6"},"doctype.name":{color:"#9cdcfe"},comment:{color:"#6a9955"},prolog:{color:"#6a9955"},punctuation:{color:"#d4d4d4"},".language-html .language-css .token.punctuation":{color:"#d4d4d4"},".language-html .language-javascript .token.punctuation":{color:"#d4d4d4"},property:{color:"#9cdcfe"},tag:{color:"#569cd6"},boolean:{color:"#569cd6"},number:{color:"#b5cea8"},constant:{color:"#9cdcfe"},symbol:{color:"#b5cea8"},inserted:{color:"#b5cea8"},unit:{color:"#b5cea8"},selector:{color:"#d7ba7d"},"attr-name":{color:"#9cdcfe"},string:{color:"#ce9178"},char:{color:"#ce9178"},builtin:{color:"#ce9178"},deleted:{color:"#ce9178"},".language-css .token.string.url":{textDecoration:"underline"},operator:{color:"#d4d4d4"},entity:{color:"#569cd6"},"operator.arrow":{color:"#569CD6"},atrule:{color:"#ce9178"},"atrule.rule":{color:"#c586c0"},"atrule.url":{color:"#9cdcfe"},"atrule.url.function":{color:"#dcdcaa"},"atrule.url.punctuation":{color:"#d4d4d4"},keyword:{color:"#569CD6"},"keyword.module":{color:"#c586c0"},"keyword.control-flow":{color:"#c586c0"},function:{color:"#dcdcaa"},"function.maybe-class-name":{color:"#dcdcaa"},regex:{color:"#d16969"},important:{color:"#569cd6"},italic:{fontStyle:"italic"},"class-name":{color:"#4ec9b0"},"maybe-class-name":{color:"#4ec9b0"},console:{color:"#9cdcfe"},parameter:{color:"#9cdcfe"},interpolation:{color:"#9cdcfe"},"punctuation.interpolation-punctuation":{color:"#569cd6"},variable:{color:"#9cdcfe"},"imports.maybe-class-name":{color:"#9cdcfe"},"exports.maybe-class-name":{color:"#9cdcfe"},escape:{color:"#d7ba7d"},"tag.punctuation":{color:"#808080"},cdata:{color:"#808080"},"attr-value":{color:"#ce9178"},"attr-value.punctuation":{color:"#ce9178"},"attr-value.punctuation.attr-equals":{color:"#d4d4d4"},namespace:{color:"#4ec9b0"},'pre[class*="language-javascript"]':{color:"#9cdcfe"},'code[class*="language-javascript"]':{color:"#9cdcfe"},'pre[class*="language-jsx"]':{color:"#9cdcfe"},'code[class*="language-jsx"]':{color:"#9cdcfe"},'pre[class*="language-typescript"]':{color:"#9cdcfe"},'code[class*="language-typescript"]':{color:"#9cdcfe"},'pre[class*="language-tsx"]':{color:"#9cdcfe"},'code[class*="language-tsx"]':{color:"#9cdcfe"},'pre[class*="language-css"]':{color:"#ce9178"},'code[class*="language-css"]':{color:"#ce9178"},'pre[class*="language-html"]':{color:"#d4d4d4"},'code[class*="language-html"]':{color:"#d4d4d4"},".language-regex .token.anchor":{color:"#dcdcaa"},".language-html .token.punctuation":{color:"#808080"},'pre[class*="language-"] > code[class*="language-"]':{position:"relative",zIndex:"1"},".line-highlight.line-highlight":{background:"#f7ebc6",boxShadow:"inset 5px 0 0 #f7d87c",zIndex:"0"}}},80887:function(e,t,o){var a=this&&this.__createBinding||(Object.create?function(e,t,o,a){void 0===a&&(a=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,a,n)}:function(e,t,o,a){void 0===a&&(a=o),e[a]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&a(t,e,o);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const l=r(o(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:o})=>{const[a,n]=(0,l.useState)((()=>window.matchMedia(t.breakpoints[o]).matches));return(0,l.useEffect)((()=>{window.matchMedia(t.breakpoints[o]).addEventListener("change",(e=>n(e.matches)))}),[]),a?l.default.createElement(e,null):null}},34553:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(o(67294)),r=o(20745),l=o(802);(0,r.createRoot)(document.getElementById("root")).render(n.default.createElement(l.LandingPage,null))},90120:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppContainer=void 0;const n=o(18592),r=o(26729),l=a(o(67294)),i=o(63413),s=o(19446),c=n.css`
  label: app-container;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  background-color: ${s.theme.colors.dark3};
`;t.AppContainer=({children:e})=>l.default.createElement(l.default.Fragment,null,l.default.createElement(r.Global,{styles:i.globalStyles}),l.default.createElement("div",{className:c},e))},78436:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const n=o(18592),r=o(96486),l=a(o(67294)),i=o(19446),s=n.css`
  label: secondary-button;
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};

  &:hover {
    background-color: ${i.theme.colors.buttonHover};
  }
`,c=n.css`
  label: primary-button;
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.green};

  &:hover {
    background-color: #2ea043;
  }
`,d=n.css`
  label: button;
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  gap: ${i.theme.spacing.s};
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  border: unset;
  border-radius: ${i.theme.spacing.s};
  padding: ${i.theme.spacing.m} ${i.theme.spacing.xm};
  position: relative;
  font-weight: 400;
  cursor: pointer;
  font-size: ${i.theme.fontSize.m};
  box-shadow: rgba(0, 0, 0, 0.05) ${i.theme.spacing.zero} ${i.theme.spacing.xs} ${i.theme.spacing.s};
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) ${i.theme.spacing.zero} ${i.theme.spacing.xs} ${i.theme.spacing.xxm};
  }
`;t.Button=({children:e,variant:t,className:o,href:a,onClick:i})=>{const u=(0,n.cx)(d,"primary"===t?c:s,o);return(0,r.isNil)(a)?l.default.createElement("button",{className:u,onClick:i},e):l.default.createElement("a",{className:u,onClick:i,href:a},e)}},4074:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const n=o(18592),r=a(o(67294)),l=o(19446),i=n.css`
  font-size: ${l.theme.fontSize.code};
  color: ${l.theme.colors.text};
  background-color: ${l.theme.colors.dark1};
  padding: ${l.theme.spacing.xxxs} ${l.theme.spacing.xxs};
  border-radius: ${l.theme.spacing.xs};
`;t.Code=({className:e,children:t,...o})=>r.default.createElement("code",{className:(0,n.cx)(i,e),...o},t)},60488:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Content=void 0;const n=a(o(67294)),r=o(18592),l=o(46161),i=o(19446),s=r.css`
  label: content;
  width: 100%;
  flex: ${i.theme.flex.grow};
  margin: ${i.theme.spacing.zero};
  padding: ${i.theme.spacing.zero};
  display: flex;
  flex-direction: column;
`;t.Content=({children:e})=>n.default.createElement("main",{className:(0,r.cx)(s,l.containerStyle)},e)},18023:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Footer=void 0;const n=o(18592),r=a(o(67294)),l=o(20519),i=o(19446),s=o(3930),c=o(77255),d=n.css`
  label: footer;
  background-color: ${i.theme.colors.dark1};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${i.theme.spacing.xxxl} ${i.theme.spacing.m};
  gap: ${i.theme.spacing.m};
`,u=n.css`
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.muted};
`,m=n.css`
  font-size: ${i.theme.fontSize.s};
  color: ${i.theme.colors.muted};
`,h=n.css`
  display: flex;
  gap: ${i.theme.spacing.s};
  align-items: center;
  text-decoration: none;
  margin-bottom: ${i.theme.spacing.xxm};
`,p=n.css`
  font-weight: 700;
  margin: ${i.theme.spacing.zero};
  padding: ${i.theme.spacing.zero};
  font-size: ${i.theme.fontSize.l};
  color: ${i.theme.colors.muted};
`;t.Footer=()=>r.default.createElement("footer",{className:d},r.default.createElement("a",{className:h,href:c.links.index()},r.default.createElement(l.SvgLogo,{width:60,color:i.theme.colors.muted}),r.default.createElement("h1",{className:p},"Oats")),r.default.createElement("span",{className:u},"Copyright © 2022 Balázs Édes"),r.default.createElement("span",{className:m},"All Oats modules under the ",r.default.createElement(s.Link,{href:"https://opensource.org/licenses/MIT"},"MIT license")))},3930:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const n=a(o(67294)),r=o(18592),l=o(19446),i=o(96486),s=r.css`
  label: link;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  gap: ${l.theme.spacing.s};
  align-items: center;
  transition: color 150ms linear;
  text-decoration: underline;
  color: ${l.theme.colors.muted};

  &:hover {
    text-decoration: none;
    color: ${l.theme.colors.text};
  }
`;t.Link=({children:e,className:t,onClick:o,...a})=>(0,i.isNil)(o)?n.default.createElement("a",{className:(0,r.cx)(s,t),...a},e):n.default.createElement("span",{className:(0,r.cx)(s,t),onClick:o,...a},e)},66118:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const n=o(18592),r=o(67535),l=o(96486),i=a(o(67294)),s=o(19446),c=o(20519),d=n.css`
  label: side-bar-logo;
  display: flex;
  gap: ${s.theme.spacing.m};
  align-items: center;
  text-decoration: none;
`,u=n.css`
  display: flex;
  flex-direction: column;
`,m=n.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  font-size: ${s.theme.fontSize.l};
  color: ${s.theme.colors.text};
`,h=n.css`
  color: ${s.theme.colors.muted};
`,p=n.css`
  font-size: ${s.theme.fontSize.s};
  color: ${s.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:o})=>i.default.createElement("a",{className:d,href:o},i.default.createElement(c.SvgLogo,{width:60}),i.default.createElement("div",{className:u},i.default.createElement("h1",{className:m},"Oats ",(0,l.isNil)(e)?null:i.default.createElement("span",{className:h},e)),t&&i.default.createElement("span",{className:p},"v",r.version)))},19187:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const n=o(18592),r=a(o(67294)),l=o(80887),i=o(19446),s=n.css`
  margin: ${i.theme.spacing.m} ${i.theme.spacing.m} ${i.theme.spacing.xxxl} ${i.theme.spacing.m};
  @media ${l.breakpoints.phone} {
    margin: ${i.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>r.default.createElement("div",{className:s},e)},16507:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuBar=void 0;const n=o(18592),r=a(o(67294)),l=o(80887),i=o(19446),s=n.css`
  label: menu-bar;
  display: flex;
  flex-direction: row;
  padding: ${i.theme.spacing.zero};
  @media ${l.breakpoints.phone} {
    flex-direction: column;
    gap: ${i.theme.spacing.l};
  }
`;t.MenuBar=({children:e})=>r.default.createElement("ul",{className:s},e)},69585:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuItem=void 0;const n=o(18592),r=o(96486),l=a(o(67294)),i=o(80887),s=o(19446),c=n.css`
  label: active-menu-item;
  color: ${s.theme.colors.text};
`,d=n.css`
  label: menu-item-anchor;
  position: relative;
  text-decoration: none;
  color: ${s.theme.colors.muted};
  display: flex;
  gap: ${s.theme.spacing.s};
  align-items: center;
  transition: color 150ms linear;

  &:hover {
    color: ${s.theme.colors.text};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -${s.theme.spacing.xxs};
    left: 0;
    width: 100%;
    height: ${s.theme.spacing.xxxs};
    background-color: ${s.theme.colors.text};
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
  }

  &:hover::after,
  &:focus::after {
    opacity: 1;
    transform: translate3d(0, 0.2em, 0);
  }

  &::after,
  &:focus::after {
    opacity: 1;
    transform: scale(0);
    transform-origin: center;
  }

  &:hover::after {
    transform: scale(1);
  }
`,u=n.css`
  label: menu-item;
  height: 100%;
  padding: ${s.theme.spacing.zero} ${s.theme.spacing.l};
  display: flex;
  gap: ${s.theme.spacing.s};
  align-items: center;
  cursor: pointer;
  color: ${s.theme.colors.text};
  font-size: ${s.theme.fontSize.m};
  @media ${i.breakpoints.phone} {
    padding: ${s.theme.spacing.zero} ${s.theme.spacing.m};
  }
`;t.MenuItem=({label:e,active:t,href:o,onClick:a,icon:i})=>{const s=(0,n.cx)(d,t?c:void 0),m=(0,r.isNil)(o)?a:void 0;return l.default.createElement("li",{className:u,onClick:m},l.default.createElement("a",{href:o,className:s},l.default.createElement(i,null),l.default.createElement("span",null,e)))}},7117:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const a=o(96486),n=o(67294);t.MobileContext=(0,n.createContext)({isMenuOpen:!1,setMenuOpen:a.noop}),t.useMobileContext=()=>(0,n.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,n.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},35625:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const n=o(18592),r=a(o(67294)),l=o(19446),i=o(19187),s=o(66118),c=n.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,d=n.css`
  color: ${l.theme.colors.muted};
  font-size: ${l.theme.fontSize.xxl};
  cursor: pointer;
  margin: ${l.theme.spacing.m};
  &:hover {
    color: ${l.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:o,actionIcon:a,onAction:n})=>r.default.createElement("div",{className:c},r.default.createElement(i.LogoContainer,null,r.default.createElement(s.Logo,{name:e,version:t,href:o})),r.default.createElement(a,{className:d,onClick:n}))},8015:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const n=a(o(67294)),r=o(69274),l=o(7117),i=o(35625),s=o(99102);t.MobileHeaderWithOverlay=({name:e,version:t,href:o,children:a})=>{const{setMenuOpen:c}=(0,l.useMobileContext)();return n.default.createElement(n.default.Fragment,null,n.default.createElement(i.MobileHeader,{href:o,name:e,version:t,actionIcon:r.HiBars3,onAction:()=>c(!0)}),n.default.createElement(s.MobileOverlay,{href:o,name:e,version:t},a))}},99102:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const n=o(18592),r=a(o(67294)),l=o(69274),i=o(19446),s=o(7117),c=o(35625),d=n.css`
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
`,u=n.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:o,version:a})=>{const{isMenuOpen:i,setMenuOpen:m}=(0,s.useMobileContext)();return r.default.createElement("div",{className:(0,n.cx)(d,i?void 0:u)},r.default.createElement(c.MobileHeader,{href:o,actionIcon:l.HiXMark,onAction:()=>m(!1),name:e,version:a}),t)}},65601:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStartItem=void 0;const n=o(18592),r=a(o(67294)),l=o(19446),i=o(80887),s=n.css`
  label: quick-start-item;
  display: flex;
  flex-direction: row;
  gap: ${l.theme.spacing.xxm};
  margin-top: ${l.theme.spacing.xxxl};
  width: 100%;
`,c=n.css`
  label: quick-start-item-circle;
  @media ${i.breakpoints.phone} {
    /* TODO */
    display: none;
  }
  width: ${l.theme.spacing.xh};
  height: ${l.theme.spacing.xh};
  min-width: ${l.theme.spacing.xh};
  min-height: ${l.theme.spacing.xh};
  margin-top: ${l.theme.spacing.m};
  border-radius: 50%;
  border: ${l.theme.spacing.xxxs} solid ${l.theme.colors.text};
  color: ${l.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${l.theme.fontSize.l};
`,d=n.css`
  label: quick-start-item-title;
  font-size: ${l.theme.fontSize.m};
  color: ${l.theme.colors.text};
  text-transform: uppercase;
`,u=n.css`
  label: quick-start-item-content;
  color: ${l.theme.colors.muted};
  font-size: ${l.theme.fontSize.m};
`,m=n.css`
  label: quick-start-item-container;
  width: 100%;
`;t.QuickStartItem=({children:e,index:t,title:o})=>r.default.createElement("div",{className:s},r.default.createElement("div",{className:c},t),r.default.createElement("div",{className:m},r.default.createElement("h3",{className:d},o),r.default.createElement("div",{className:u},e)))},20519:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const n=a(o(67294)),r=o(19446),l=o(14757);t.SvgLogo=({color:e=r.theme.colors.green,width:t,height:o})=>{const[a,i]=(0,l.getSizeWithAspectRatio)(172.439,111.543,t,o);return n.default.createElement("svg",{width:a,height:i,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},n.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),n.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},44702:function(e,t,o){var a=this&&this.__createBinding||(Object.create?function(e,t,o,a){void 0===a&&(a=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,a,n)}:function(e,t,o,a){void 0===a&&(a=o),e[a]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&a(t,e,o);return n(t,e),t},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=o(18592),s=r(o(67294)),c=o(70077),d=l(o(86032)),u=o(74855),m=o(19446),h=o(69274),p=o(96486),f=o(98452),g={light:(0,f.createPrismTheme)(d.default,m.theme.colors.dark1),medium:(0,f.createPrismTheme)(d.default,m.theme.colors.dark2),dark:(0,f.createPrismTheme)(d.default,m.theme.colors.dark4)},b=i.css`
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
`,x=i.css`
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
`,v=i.css`
  position: relative;
  flex-grow: ${m.theme.flex.grow};
  height: 100vh;

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:o,theme:a,host:n})=>{const[r,l]=(0,s.useState)(!1),[d,m]=(0,s.useState)(!1),[f,y]=(0,s.useState)(void 0),$=(0,i.cx)("editor"===n?v:x),_=g[a],k=(0,i.cx)(b);return s.default.createElement("div",{className:$,onMouseEnter:()=>{m(!0)},onMouseLeave:()=>{m(!1)}},s.default.createElement(c.Prism,{language:t,style:_,wrapLongLines:o,showLineNumbers:"editor"===n},e),s.default.createElement(u.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,p.isNil)(f)||(clearTimeout(f),y(void 0)),l(t),y(setTimeout((()=>{l(!1)}),2e3))}},s.default.createElement("button",{className:k,style:{opacity:d?1:0}},r?s.default.createElement(h.HiCheck,null):s.default.createElement(h.HiClipboard,null))))}},46161:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.containerStyle=void 0;const a=o(18592),n=o(80887),r=o(19446);t.containerStyle=a.css`
  label: container;
  display: flex;
  @media ${n.breakpoints.desktop} {
    width: 90%;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  @media ${n.breakpoints.tablet} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: ${r.theme.spacing.zero} ${r.theme.spacing.m};
    margin-left: auto;
    margin-right: auto;
  }

  @media ${n.breakpoints.phone} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: ${r.theme.spacing.zero} ${r.theme.spacing.m};
    margin-left: auto;
    margin-right: auto;
  }
`},98452:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const a=o(96486),n=o(19446);t.createPrismTheme=function(e,t){const o={'pre[class*="language-"]':{backgroundColor:t,borderRadius:n.theme.spacing.zero,padding:n.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:n.theme.spacing.zero,margin:n.theme.spacing.zero,fontSize:n.theme.fontSize.code,fontFamily:n.theme.fontFamily.monospace}},r=(0,a.cloneDeep)(e);return(0,a.values)(r).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${n.theme.spacing.zero} ${n.theme.spacing.zero} ${n.theme.spacing.xxs}`,e.fontSize=n.theme.fontSize.code,e.fontFamily=n.theme.fontFamily.monospace})),(0,a.merge)(r,o)}},14757:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,o,a){return void 0!==o&&void 0===a?[o,t/e*o]:void 0!==a&&void 0===o?[a,e/t*a]:void 0!==o&&void 0!==a?[o,a]:[e,t]}},63413:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const a=o(26729),n=o(80887),r=o(19446);t.globalStyles=a.css`
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
`},77255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,t.links={docs:()=>"/docs/documentation",doc:e=>`/docs/documentation/${e}`,editor:()=>"/docs/editor",index:()=>"/docs"}},5973:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;const n=o(18592),r=a(o(67294)),l=o(46161),i=o(19446),s=o(80887),c=o(66118),d=o(26638),u=o(77255),m=n.css`
  label: header;
  width: 100%;
  margin: ${i.theme.spacing.zero};
  padding: ${i.theme.spacing.zero};
  @media ${s.breakpoints.phone} {
    display: none;
  }
`,h=n.css`
  label: header-content;
  height: ${i.theme.spacing.xxh};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;t.Header=()=>r.default.createElement("header",{className:m},r.default.createElement("div",{className:(0,n.cx)(h,l.containerStyle)},r.default.createElement(c.Logo,{version:!1,href:u.links.index()}),r.default.createElement(d.LandingPageMenu,null)))},51442:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Headlines=void 0;const n=o(18592),r=a(o(67294)),l=o(69274),i=o(19446),s=o(78436),c=o(80887),d=o(77255),u=n.css`
  label: headlines;
  display: flex;
  flex-direction: row;
  gap: ${i.theme.spacing.l};

  @media ${c.breakpoints.phone} {
    flex-direction: column;
    gap: ${i.theme.spacing.h};
  }
`,m=n.css`
  label: headlines-items-container;
  color: ${i.theme.colors.muted};
  display: flex;
  flex-direction: column;
  flex: 1 0 1px;
  font-size: ${i.theme.fontSize.m};
`,h=n.css`
  label: headlines-item-header;
  display: flex;
  align-items: center;
  gap: ${i.theme.spacing.xs};
  text-transform: uppercase;
  color: ${i.theme.colors.text};
  font-size: ${i.theme.fontSize.m};
  margin-top: ${i.theme.spacing.zero};
`,p=n.css`
  label: headlines-item-content;
  margin-bottom: ${i.theme.spacing.l};
  flex: ${i.theme.flex.grow};
  flex-shrink: 0;
`;t.Headlines=()=>r.default.createElement("div",{className:u},r.default.createElement("div",{className:m},r.default.createElement("h3",{className:h},r.default.createElement(l.HiPuzzlePiece,null),"Generate an SDK"),r.default.createElement("section",{className:p},"Create an easy to use, statically typed SDK for your backend, with all the bells and whistles, and either use it in house, or expose it to your customers."),r.default.createElement(s.Button,{href:d.links.doc("SdkGettingStarted")},r.default.createElement(l.HiBookOpen,null),"Learn more")),r.default.createElement("div",{className:m},r.default.createElement("h3",{className:h},r.default.createElement(l.HiServerStack,null),"Generate the backend"),r.default.createElement("section",{className:p},"Generate all the tedious parts of your backend, like routing, parameter and body parsing and serialization, and CORS, and just implement moving data."),r.default.createElement(s.Button,{href:d.links.doc("ServerGettingStarted")},r.default.createElement(l.HiBookOpen,null),"Learn more")),r.default.createElement("div",{className:m},r.default.createElement("h3",{className:h},r.default.createElement(l.HiWrenchScrewdriver,null),"See it in action!"),r.default.createElement("section",{className:p},"Check out the configuration editor, right here in your browser! See the generated output changing in real time as you edit the configuration! ",r.default.createElement("b",null,"Your data stays in your browser!")),r.default.createElement(s.Button,{href:d.links.editor()},r.default.createElement(l.HiCog6Tooth,null),"Get started")))},19388:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HeroSection=void 0;const n=o(18592),r=a(o(67294)),l=o(19446),i=o(78436),s=o(80887),c=o(69274),d=o(3930),u=o(46161),m=o(77255),h=n.css`
  label: hero-section;
  width: 100%;
  margin: ${l.theme.spacing.zero};
  padding: ${l.theme.spacing.xh} ${l.theme.spacing.zero};
  @media ${s.breakpoints.desktop} {
    padding: ${l.theme.spacing.xxh} ${l.theme.spacing.zero};
  }
  @media ${s.breakpoints.tablet} {
    padding: ${l.theme.spacing.xh} ${l.theme.spacing.zero};
  }
`,p=n.css`
  label: hero-section-content;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: ${l.theme.spacing.xxm};
  height: 100%;
`,f=n.css`
  label: hero-text-1;
  font-size: ${l.theme.fontSize.xl};
  color: ${l.theme.colors.text};
  margin: ${l.theme.spacing.zero};
  text-align: center;
`,g=n.css`
  label: hero-text-2;
  color: ${l.theme.colors.muted};
  font-size: ${l.theme.fontSize.m};
  font-weight: 400;
  margin: ${l.theme.spacing.zero} ${l.theme.spacing.zero} ${l.theme.spacing.xxm} ${l.theme.spacing.zero};
  width: 70%;
  text-align: center;
  flex-shrink: 0;
`,b=n.css`
  label: hero-button-container;
  display: flex;
  gap: ${l.theme.spacing.m};
`;t.HeroSection=()=>r.default.createElement("div",{className:h},r.default.createElement("div",{className:(0,n.cx)(u.containerStyle,p)},r.default.createElement("h2",{className:f},"Generate TypeScript from OpenAPI, that makes sense."),r.default.createElement("h3",{className:g},"Customizable, extensible and ",r.default.createElement("b",null,"open source")," code generators, that output quality"," ",r.default.createElement(d.Link,{href:"https://www.typescriptlang.org"},"TypeScript"),", from your"," ",r.default.createElement(d.Link,{href:"https://www.openapis.org"},"OpenAPI")," definitions."),r.default.createElement("div",{className:b},r.default.createElement(i.Button,{variant:"primary",href:m.links.doc("SdkGettingStarted")},r.default.createElement(c.HiPlay,null)," Get Started"),r.default.createElement(i.Button,{href:"https://github.com/oats-ts/oats-ts"},r.default.createElement(c.HiCodeBracket,null)," Github"))))},802:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPage=void 0;const n=a(o(67294)),r=o(60488),l=o(18023),i=o(51442),s=o(19388),c=o(5973),d=o(10186),u=o(90120),m=o(8015),h=o(7117),p=o(80887),f=o(26638),g=o(77255),b=()=>{const e=(0,h.useProvideMobileContext)();return n.default.createElement(h.MobileContext.Provider,{value:e},n.default.createElement(m.MobileHeaderWithOverlay,{version:!1,href:g.links.index()},n.default.createElement(f.LandingPageMenu,null)))};t.LandingPage=()=>n.default.createElement(u.AppContainer,null,n.default.createElement(c.Header,null),n.default.createElement(p.BreakPoint,{Component:b,breakpoint:"phone"}),n.default.createElement(r.Content,null,n.default.createElement(s.HeroSection,null),n.default.createElement(i.Headlines,null),n.default.createElement(d.QuickStart,null)),n.default.createElement(l.Footer,null))},26638:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPageMenu=void 0;const n=a(o(67294)),r=o(69274),l=o(16507),i=o(69585),s=o(77255);t.LandingPageMenu=()=>n.default.createElement(l.MenuBar,null,n.default.createElement(i.MenuItem,{label:"Home",icon:r.HiHome,href:s.links.index(),active:!0}),n.default.createElement(i.MenuItem,{label:"Documentation",icon:r.HiDocument,href:s.links.docs()}),n.default.createElement(i.MenuItem,{label:"Editor",icon:r.HiCog6Tooth,href:s.links.editor()}))},10186:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStart=void 0;const n=o(18592),r=a(o(67294)),l=o(69274),i=o(19446),s=o(65601),c=o(44702),d=o(3930),u=a(o(43428)),m=a(o(24085)),h=o(4074),p=o(77255),f=n.css`
  label: quick-start;
  margin-bottom: ${i.theme.spacing.xxxl};
`,g=n.css`
  label: quick-start-title;
  font-size: ${i.theme.fontSize.xl};
  color: ${i.theme.colors.text};
  margin-top: ${i.theme.spacing.xh};
  margin-bottom: ${i.theme.spacing.zero};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${i.theme.spacing.s};
`,b=n.css`
  margin-top: ${i.theme.spacing.xm};
`;t.QuickStart=()=>r.default.createElement(r.default.Fragment,null,r.default.createElement("h2",{className:g},r.default.createElement(l.HiBeaker,null)," Quick start"),r.default.createElement("div",{className:f},r.default.createElement(s.QuickStartItem,{index:1,title:"Prepare your OpenAPI document"},"You need an OpenAPI document to start with. In case you don't have one already, try this example:",r.default.createElement(c.SyntaxHighlighter,{host:"docs",lineWrap:!0,theme:"light"},"https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json")),r.default.createElement(s.QuickStartItem,{index:2,title:"Install Oats generator modules"},"Install the necessary Oats modules to make the code generator work:",r.default.createElement(c.SyntaxHighlighter,{host:"docs",lineWrap:!0,theme:"light"},"npm i @oats-ts/openapi")),r.default.createElement(s.QuickStartItem,{index:3,title:"Configure the generator"},"Create a file called ",r.default.createElement("b",null,"oats.js")," in your project root (you can call it anything you like), and the configuration:",r.default.createElement(c.SyntaxHighlighter,{language:"typescript",host:"docs",lineWrap:!0,theme:"light"},u.default)),r.default.createElement(s.QuickStartItem,{index:4,title:"Run the generator"},"Open a terminal and simply run:",r.default.createElement(c.SyntaxHighlighter,{host:"docs",theme:"light"},"node ./oats.js")),r.default.createElement(s.QuickStartItem,{index:5,title:"Verify results"},"In case the generators ran successfully, you will see something like this in the terminal:",r.default.createElement(c.SyntaxHighlighter,{host:"docs",lineWrap:!0,theme:"light"},m.default),"The ",r.default.createElement(h.Code,null,"npm i")," command lists the necessary dependencies, that the generated output needs, to function at runtime. Run this command, and you are ready to use the generated output.",r.default.createElement("div",{className:b},"In case you see errors (and the explanations don't help), check out the"," ",r.default.createElement(d.Link,{href:p.links.doc("OpenAPI101")},"OpenAPI 101")," guide, describing the most common issues with OpenAPI documents! In case it doesn't help either please open an"," ",r.default.createElement(d.Link,{href:"https://github.com/oats-ts/oats-ts/issues"},"issue"),", and describe the problem in detail!")),r.default.createElement(s.QuickStartItem,{index:6,title:"What's next?"},"Check out the ",r.default.createElement(d.Link,{href:p.links.docs()},"documentation"),", where you can learn how to use the generator output, create custom generators and more. Also have a look at the"," ",r.default.createElement(d.Link,{href:p.links.editor()},"configuration editor"),", where you can put together your Oats configuration right in the browser, while observing the generated output (without downloading or installing anything).")))},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=34553)}]);
//# sourceMappingURL=index.bundle.js.map