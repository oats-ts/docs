"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[826],{1050:(e,t,a)=>{a.r(t),a.d(t,{default:()=>n});const n='✔ reader step completed using "@oats-ts/openapi-reader"\n✔ validator step completed using "@oats-ts/openapi-validator"\n✔ generator step completed using "@oats-ts/openapi-generators"\ni some outputs have runtime dependencies:\n  npm i \\\n    @oats-ts/openapi-express-server-adapter@0.0.43 \\\n    @oats-ts/openapi-fetch-client-adapter@0.0.43 \\\n    @oats-ts/openapi-runtime@0.0.43 \\\n    express@^4.18.1\n✔ writer step completed using "@oats-ts/typescript-writer"'},23939:(e,t,a)=>{a.r(t),a.d(t,{default:()=>n});const n="const oats = require('@oats-ts/openapi')\n\noats.generate({\n  logger: oats.loggers.simple(),\n  // Use readers.file, to read from the local file system\n  reader: oats.readers.https.json(\n    'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',\n  ),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    // Use presets.client() or presets.server() for just client/server side code\n    children: oats.presets.fullStack(),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n})"},39226:function(e,t,a){var n=this&&this.__createBinding||(Object.create?function(e,t,a,n){void 0===n&&(n=a);var o=Object.getOwnPropertyDescriptor(t,a);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,n,o)}:function(e,t,a,n){void 0===n&&(n=a),e[n]=t[a]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&n(t,e,a);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const i=r(a(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:a})=>{const[n,o]=(0,i.useState)((()=>window.matchMedia(t.breakpoints[a]).matches));return(0,i.useEffect)((()=>{window.matchMedia(t.breakpoints[a]).addEventListener("change",(e=>o(e.matches)))}),[]),n?i.default.createElement(e,null):null}},12872:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppContainer=void 0;const o=a(18592),r=a(26729),i=n(a(67294)),l=a(72050),s=a(61329),c=o.css`
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
`;t.AppContainer=({children:e})=>i.default.createElement(i.default.Fragment,null,i.default.createElement(r.Global,{styles:l.globalStyles}),i.default.createElement("div",{className:c},e))},79514:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const o=a(18592),r=a(96486),i=n(a(67294)),l=a(61329),s=o.css`
  label: secondary-button;
  color: ${l.theme.colors.text};
  background-color: ${l.theme.colors.dark1};

  &:hover {
    background-color: ${l.theme.colors.buttonHover};
  }
`,c=o.css`
  label: primary-button;
  color: ${l.theme.colors.text};
  background-color: ${l.theme.colors.green};

  &:hover {
    background-color: #2ea043;
  }
`,d=o.css`
  label: button;
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  gap: ${l.theme.spacing.s};
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  border: unset;
  border-radius: ${l.theme.spacing.s};
  padding: ${l.theme.spacing.m} ${l.theme.spacing.xm};
  position: relative;
  font-weight: 400;
  cursor: pointer;
  font-size: ${l.theme.fontSize.m};
  box-shadow: rgba(0, 0, 0, 0.05) ${l.theme.spacing.zero} ${l.theme.spacing.xs} ${l.theme.spacing.s};
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) ${l.theme.spacing.zero} ${l.theme.spacing.xs} ${l.theme.spacing.xxm};
  }
`;t.Button=({children:e,variant:t,className:a,href:n,onClick:l})=>{const m=(0,o.cx)(d,"primary"===t?c:s,a);return(0,r.isNil)(n)?i.default.createElement("button",{className:m,onClick:l},e):i.default.createElement("a",{className:m,onClick:l,href:n},e)}},41298:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const o=a(18592),r=n(a(67294)),i=a(61329),l=o.css`
  font-size: ${i.theme.fontSize.code};
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};
  padding: ${i.theme.spacing.xxxs} ${i.theme.spacing.xxs};
  border-radius: ${i.theme.spacing.xs};
`;t.Code=({className:e,children:t,...a})=>r.default.createElement("code",{className:(0,o.cx)(l,e),...a},t)},4151:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Content=void 0;const o=n(a(67294)),r=a(18592),i=a(69512),l=a(61329),s=r.css`
  label: content;
  width: 100%;
  flex: ${l.theme.flex.grow};
  margin: ${l.theme.spacing.zero};
  padding: ${l.theme.spacing.zero};
  display: flex;
  flex-direction: column;
`;t.Content=({children:e})=>o.default.createElement("main",{className:(0,r.cx)(s,i.containerStyle)},e)},55050:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Footer=void 0;const o=a(18592),r=n(a(67294)),i=a(79129),l=a(61329),s=a(86299),c=a(9572),d=o.css`
  label: footer;
  background-color: ${l.theme.colors.dark1};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${l.theme.spacing.xxxl} ${l.theme.spacing.m};
  gap: ${l.theme.spacing.m};
`,m=o.css`
  font-size: ${l.theme.fontSize.m};
  color: ${l.theme.colors.muted};
`,u=o.css`
  font-size: ${l.theme.fontSize.s};
  color: ${l.theme.colors.muted};
`,h=o.css`
  display: flex;
  gap: ${l.theme.spacing.s};
  align-items: center;
  text-decoration: none;
  margin-bottom: ${l.theme.spacing.xxm};
`,f=o.css`
  font-weight: 700;
  margin: ${l.theme.spacing.zero};
  padding: ${l.theme.spacing.zero};
  font-size: ${l.theme.fontSize.l};
  color: ${l.theme.colors.muted};
`;t.Footer=()=>r.default.createElement("footer",{className:d},r.default.createElement("a",{className:h,href:c.links.index()},r.default.createElement(i.SvgLogo,{width:60,color:l.theme.colors.muted}),r.default.createElement("h1",{className:f},"Oats")),r.default.createElement("span",{className:m},"Copyright © 2022 Balázs Édes"),r.default.createElement("span",{className:u},"All Oats modules under the ",r.default.createElement(s.Link,{href:"https://opensource.org/licenses/MIT"},"MIT license")))},86299:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const o=n(a(67294)),r=a(18592),i=a(61329),l=a(96486),s=r.css`
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
`;t.Link=({children:e,className:t,onClick:a,...n})=>(0,l.isNil)(a)?o.default.createElement("a",{className:(0,r.cx)(s,t),...n},e):o.default.createElement("span",{className:(0,r.cx)(s,t),onClick:a,...n},e)},15435:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const o=a(18592),r=a(67535),i=a(96486),l=n(a(67294)),s=a(61329),c=a(79129),d=o.css`
  label: side-bar-logo;
  display: flex;
  gap: ${s.theme.spacing.m};
  align-items: center;
  text-decoration: none;
`,m=o.css`
  display: flex;
  flex-direction: column;
`,u=o.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  font-size: ${s.theme.fontSize.l};
  color: ${s.theme.colors.text};
`,h=o.css`
  color: ${s.theme.colors.muted};
`,f=o.css`
  font-size: ${s.theme.fontSize.s};
  color: ${s.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:a})=>l.default.createElement("a",{className:d,href:a},l.default.createElement(c.SvgLogo,{width:60}),l.default.createElement("div",{className:m},l.default.createElement("h1",{className:u},"Oats ",(0,i.isNil)(e)?null:l.default.createElement("span",{className:h},e)),t&&l.default.createElement("span",{className:f},"v",r.version)))},39550:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const o=a(18592),r=n(a(67294)),i=a(39226),l=a(61329),s=o.css`
  margin: ${l.theme.spacing.m} ${l.theme.spacing.m} ${l.theme.spacing.xxxl} ${l.theme.spacing.m};
  @media ${i.breakpoints.phone} {
    margin: ${l.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>r.default.createElement("div",{className:s},e)},55023:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuBar=void 0;const o=a(18592),r=n(a(67294)),i=a(39226),l=a(61329),s=o.css`
  label: menu-bar;
  display: flex;
  flex-direction: row;
  padding: ${l.theme.spacing.zero};
  @media ${i.breakpoints.phone} {
    flex-direction: column;
    gap: ${l.theme.spacing.l};
  }
`;t.MenuBar=({children:e})=>r.default.createElement("ul",{className:s},e)},20012:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuItem=void 0;const o=a(18592),r=a(96486),i=n(a(67294)),l=a(39226),s=a(61329),c=o.css`
  label: active-menu-item;
  color: ${s.theme.colors.text};
`,d=o.css`
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
`,m=o.css`
  label: menu-item;
  height: 100%;
  padding: ${s.theme.spacing.zero} ${s.theme.spacing.l};
  display: flex;
  gap: ${s.theme.spacing.s};
  align-items: center;
  cursor: pointer;
  color: ${s.theme.colors.text};
  font-size: ${s.theme.fontSize.m};
  @media ${l.breakpoints.phone} {
    padding: ${s.theme.spacing.zero} ${s.theme.spacing.m};
  }
`;t.MenuItem=({label:e,active:t,href:a,onClick:n,icon:l})=>{const s=(0,o.cx)(d,t?c:void 0),u=(0,r.isNil)(a)?n:void 0;return i.default.createElement("li",{className:m,onClick:u},i.default.createElement("a",{href:a,className:s},i.default.createElement(l,null),i.default.createElement("span",null,e)))}},81911:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const n=a(96486),o=a(67294);t.MobileContext=(0,o.createContext)({isMenuOpen:!1,setMenuOpen:n.noop}),t.useMobileContext=()=>(0,o.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,o.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},52630:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const o=a(18592),r=n(a(67294)),i=a(61329),l=a(39550),s=a(15435),c=o.css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,d=o.css`
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.xxl};
  cursor: pointer;
  margin: ${i.theme.spacing.m};
  &:hover {
    color: ${i.theme.colors.text};
  }
`;t.MobileHeader=({name:e,version:t,href:a,actionIcon:n,onAction:o})=>r.default.createElement("div",{className:c},r.default.createElement(l.LogoContainer,null,r.default.createElement(s.Logo,{name:e,version:t,href:a})),r.default.createElement(n,{className:d,onClick:o}))},48265:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeaderWithOverlay=void 0;const o=n(a(67294)),r=a(69274),i=a(81911),l=a(52630),s=a(54104);t.MobileHeaderWithOverlay=({name:e,version:t,href:a,children:n})=>{const{setMenuOpen:c}=(0,i.useMobileContext)();return o.default.createElement(o.default.Fragment,null,o.default.createElement(l.MobileHeader,{href:a,name:e,version:t,actionIcon:r.HiBars3,onAction:()=>c(!0)}),o.default.createElement(s.MobileOverlay,{href:a,name:e,version:t},n))}},54104:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOverlay=void 0;const o=a(18592),r=n(a(67294)),i=a(69274),l=a(61329),s=a(81911),c=a(52630),d=o.css`
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
`,m=o.css`
  opacity: 0;
  pointer-events: none;
`;t.MobileOverlay=({name:e,children:t,href:a,version:n})=>{const{isMenuOpen:l,setMenuOpen:u}=(0,s.useMobileContext)();return r.default.createElement("div",{className:(0,o.cx)(d,l?void 0:m)},r.default.createElement(c.MobileHeader,{href:a,actionIcon:i.HiXMark,onAction:()=>u(!1),name:e,version:n}),t)}},43418:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStartItem=void 0;const o=a(18592),r=n(a(67294)),i=a(61329),l=a(39226),s=o.css`
  label: quick-start-item;
  display: flex;
  flex-direction: row;
  gap: ${i.theme.spacing.xxm};
  margin-top: ${i.theme.spacing.xxxl};
  width: 100%;
`,c=o.css`
  label: quick-start-item-circle;
  @media ${l.breakpoints.phone} {
    /* TODO */
    display: none;
  }
  width: ${i.theme.spacing.xh};
  height: ${i.theme.spacing.xh};
  min-width: ${i.theme.spacing.xh};
  min-height: ${i.theme.spacing.xh};
  margin-top: ${i.theme.spacing.m};
  border-radius: 50%;
  border: ${i.theme.spacing.xxxs} solid ${i.theme.colors.text};
  color: ${i.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${i.theme.fontSize.l};
`,d=o.css`
  label: quick-start-item-title;
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.text};
  text-transform: uppercase;
`,m=o.css`
  label: quick-start-item-content;
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.m};
`,u=o.css`
  label: quick-start-item-container;
  width: 100%;
`;t.QuickStartItem=({children:e,index:t,title:a})=>r.default.createElement("div",{className:s},r.default.createElement("div",{className:c},t),r.default.createElement("div",{className:u},r.default.createElement("h3",{className:d},a),r.default.createElement("div",{className:m},e)))},79129:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const o=n(a(67294)),r=a(61329),i=a(86753);t.SvgLogo=({color:e=r.theme.colors.green,width:t,height:a})=>{const[n,l]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,a);return o.default.createElement("svg",{width:n,height:l,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},o.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),o.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},7807:function(e,t,a){var n=this&&this.__createBinding||(Object.create?function(e,t,a,n){void 0===n&&(n=a);var o=Object.getOwnPropertyDescriptor(t,a);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,n,o)}:function(e,t,a,n){void 0===n&&(n=a),e[n]=t[a]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&n(t,e,a);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const i=a(18592),l=r(a(67294)),s=a(67361),c=r(a(29012)),d=a(74855),m=a(61329),u=a(69274),h=a(96486),f=a(71400),p=(0,f.createPrismTheme)(c.vscDarkPlus,m.theme.colors.dark1),g=(0,f.createPrismTheme)(c.vscDarkPlus,m.theme.colors.dark4),x=i.css`
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
`,b=i.css`
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
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:a,kind:n})=>{const[o,r]=(0,l.useState)(!1),[c,m]=(0,l.useState)(!1),[f,$]=(0,l.useState)(void 0),_=(0,i.cx)("editor"===n?v:b),y="editor"===n?g:p,k=(0,i.cx)(x);return l.default.createElement("div",{className:_,onMouseEnter:()=>{m(!0)},onMouseLeave:()=>{m(!1)}},l.default.createElement(s.Prism,{language:t,style:y,wrapLongLines:a,showLineNumbers:"editor"===n},e),l.default.createElement(d.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,h.isNil)(f)||(clearTimeout(f),$(void 0)),r(t),$(setTimeout((()=>{r(!1)}),2e3))}},l.default.createElement("button",{className:k,style:{opacity:c?1:0}},o?l.default.createElement(u.HiCheck,null):l.default.createElement(u.HiClipboard,null))))}},69512:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.containerStyle=void 0;const n=a(18592),o=a(39226),r=a(61329);t.containerStyle=n.css`
  label: container;
  display: flex;
  @media ${o.breakpoints.desktop} {
    width: 90%;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  @media ${o.breakpoints.tablet} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: ${r.theme.spacing.zero} ${r.theme.spacing.m};
    margin-left: auto;
    margin-right: auto;
  }

  @media ${o.breakpoints.phone} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: ${r.theme.spacing.zero} ${r.theme.spacing.m};
    margin-left: auto;
    margin-right: auto;
  }
`},71400:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const n=a(96486),o=a(61329);t.createPrismTheme=function(e,t){const a={'pre[class*="language-"]':{backgroundColor:t,borderRadius:o.theme.spacing.zero,padding:o.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:o.theme.spacing.zero,margin:o.theme.spacing.zero,fontSize:o.theme.fontSize.code,fontFamily:o.theme.fontFamily.monospace}},r=(0,n.cloneDeep)(e);return(0,n.values)(r).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${o.theme.spacing.zero} ${o.theme.spacing.zero} ${o.theme.spacing.xxs}`,e.fontSize=o.theme.fontSize.code,e.fontFamily=o.theme.fontFamily.monospace})),(0,n.merge)(r,a)}},86753:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,a,n){return void 0!==a&&void 0===n?[a,t/e*a]:void 0!==n&&void 0===a?[n,e/t*n]:void 0!==a&&void 0!==n?[a,n]:[e,t]}},72050:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const n=a(26729),o=a(39226),r=a(61329);t.globalStyles=n.css`
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

    @media ${o.breakpoints.tablet} {
      font-size: 120%;
    }

    @media ${o.breakpoints.phone} {
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
  }

  *::-webkit-scrollbar-track {
    background: ${r.theme.colors.dark5};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${r.theme.colors.dark2};
    border-radius: 7px;
    border: 2px solid ${r.theme.colors.dark5};
  }
`},9572:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,console.log("production"),t.links={docs:()=>"/docs/v2/documentation",doc:e=>`/docs/v2/documentation/${e}`,editor:()=>"/docs/v2/editor",index:()=>"/docs/v2"}},10895:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;const o=a(18592),r=n(a(67294)),i=a(69512),l=a(61329),s=a(39226),c=a(15435),d=a(81154),m=a(9572),u=o.css`
  label: header;
  width: 100%;
  margin: ${l.theme.spacing.zero};
  padding: ${l.theme.spacing.zero};
  @media ${s.breakpoints.phone} {
    display: none;
  }
`,h=o.css`
  label: header-content;
  height: ${l.theme.spacing.xxh};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;t.Header=()=>r.default.createElement("header",{className:u},r.default.createElement("div",{className:(0,o.cx)(h,i.containerStyle)},r.default.createElement(c.Logo,{version:!1,href:m.links.index()}),r.default.createElement(d.LandingPageMenu,null)))},40835:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Headlines=void 0;const o=a(18592),r=n(a(67294)),i=a(69274),l=a(61329),s=a(79514),c=a(39226),d=a(9572),m=o.css`
  label: headlines;
  display: flex;
  flex-direction: row;
  gap: ${l.theme.spacing.l};

  @media ${c.breakpoints.phone} {
    flex-direction: column;
    gap: ${l.theme.spacing.h};
  }
`,u=o.css`
  label: headlines-items-container;
  color: ${l.theme.colors.muted};
  display: flex;
  flex-direction: column;
  font-size: ${l.theme.fontSize.m};
`,h=o.css`
  label: headlines-item-header;
  display: flex;
  align-items: center;
  gap: ${l.theme.spacing.xs};
  text-transform: uppercase;
  color: ${l.theme.colors.text};
  font-size: ${l.theme.fontSize.m};
  margin-top: ${l.theme.spacing.zero};
`,f=o.css`
  label: headlines-item-content;
  margin-bottom: ${l.theme.spacing.l};
  flex: ${l.theme.flex.grow};
`;t.Headlines=()=>r.default.createElement("div",{className:m},r.default.createElement("div",{className:u},r.default.createElement("h3",{className:h},r.default.createElement(i.HiPuzzlePiece,null),"Generate an SDK"),r.default.createElement("section",{className:f},"Create an easy to use, statically typed SDK for your backend, with all the bells and whistles, and either use it in house, or expose it to your customers."),r.default.createElement(s.Button,{href:d.links.doc("SdkGettingStarted")},r.default.createElement(i.HiBookOpen,null),"Learn more")),r.default.createElement("div",{className:u},r.default.createElement("h3",{className:h},r.default.createElement(i.HiServerStack,null),"Generate the backend"),r.default.createElement("section",{className:f},"Generate all the tedious parts of your backend, like routing, parameter and body parsing and serialization, and CORS, and just implement moving data."),r.default.createElement(s.Button,{href:d.links.doc("ServerGettingStarted")},r.default.createElement(i.HiBookOpen,null),"Learn more")),r.default.createElement("div",{className:u},r.default.createElement("h3",{className:h},r.default.createElement(i.HiWrenchScrewdriver,null),"Customize generators"),r.default.createElement("section",{className:f},"The available generators don't fully suit your needs, or you need more? Customize existing generators, or create your own, without writing everything from scratch."),r.default.createElement(s.Button,{href:d.links.doc("SdkGettingStarted")},r.default.createElement(i.HiBookOpen,null),"Learn more")))},91917:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HeroSection=void 0;const o=a(18592),r=n(a(67294)),i=a(61329),l=a(79514),s=a(39226),c=a(69274),d=a(86299),m=a(69512),u=a(9572),h=o.css`
  label: hero-section;
  width: 100%;
  margin: ${i.theme.spacing.zero};
  padding: ${i.theme.spacing.xh} ${i.theme.spacing.zero};
  @media ${s.breakpoints.desktop} {
    padding: ${i.theme.spacing.xxh} ${i.theme.spacing.zero};
  }
  @media ${s.breakpoints.tablet} {
    padding: ${i.theme.spacing.xh} ${i.theme.spacing.zero};
  }
`,f=o.css`
  label: hero-section-content;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: ${i.theme.spacing.xxm};
  height: 100%;
`,p=o.css`
  label: hero-text-1;
  font-size: ${i.theme.fontSize.xl};
  color: ${i.theme.colors.text};
  margin: ${i.theme.spacing.zero};
  text-align: center;
`,g=o.css`
  label: hero-text-2;
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.m};
  font-weight: 400;
  margin: ${i.theme.spacing.zero} ${i.theme.spacing.zero} ${i.theme.spacing.xxm} ${i.theme.spacing.zero};
  width: 70%;
  text-align: center;
  flex-shrink: 0;
`,x=o.css`
  label: hero-button-container;
  display: flex;
  gap: ${i.theme.spacing.m};
`;t.HeroSection=()=>r.default.createElement("div",{className:h},r.default.createElement("div",{className:(0,o.cx)(m.containerStyle,f)},r.default.createElement("h2",{className:p},"Generate TypeScript from OpenAPI, that makes sense."),r.default.createElement("h3",{className:g},"Customizable, extensible and ",r.default.createElement("b",null,"open source")," code generators, that output quality"," ",r.default.createElement(d.Link,{href:"https://www.typescriptlang.org"},"TypeScript"),", from your"," ",r.default.createElement(d.Link,{href:"https://www.openapis.org"},"OpenAPI")," definitions."),r.default.createElement("div",{className:x},r.default.createElement(l.Button,{variant:"primary",href:u.links.doc("SdkGettingStarted")},r.default.createElement(c.HiPlay,null)," Get Started"),r.default.createElement(l.Button,{href:"https://github.com/oats-ts/oats-ts"},r.default.createElement(c.HiCodeBracket,null)," Github"))))},16381:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPage=void 0;const o=n(a(67294)),r=a(4151),i=a(55050),l=a(40835),s=a(91917),c=a(10895),d=a(30821),m=a(12872),u=a(48265),h=a(81911),f=a(39226),p=a(81154),g=a(9572),x=()=>{const e=(0,h.useProvideMobileContext)();return o.default.createElement(h.MobileContext.Provider,{value:e},o.default.createElement(u.MobileHeaderWithOverlay,{version:!1,href:g.links.index()},o.default.createElement(p.LandingPageMenu,null)))};t.LandingPage=()=>o.default.createElement(m.AppContainer,null,o.default.createElement(c.Header,null),o.default.createElement(f.BreakPoint,{Component:x,breakpoint:"phone"}),o.default.createElement(r.Content,null,o.default.createElement(s.HeroSection,null),o.default.createElement(l.Headlines,null),o.default.createElement(d.QuickStart,null)),o.default.createElement(i.Footer,null))},81154:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPageMenu=void 0;const o=n(a(67294)),r=a(69274),i=a(55023),l=a(20012),s=a(9572);t.LandingPageMenu=()=>o.default.createElement(i.MenuBar,null,o.default.createElement(l.MenuItem,{label:"Home",icon:r.HiHome,href:s.links.index(),active:!0}),o.default.createElement(l.MenuItem,{label:"Documentation",icon:r.HiDocument,href:s.links.docs()}),o.default.createElement(l.MenuItem,{label:"Editor",icon:r.HiCog6Tooth,href:s.links.editor()}))},30821:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStart=void 0;const o=a(18592),r=n(a(67294)),i=a(69274),l=a(61329),s=a(43418),c=a(7807),d=a(86299),m=n(a(23939)),u=n(a(1050)),h=a(41298),f=a(9572),p=o.css`
  label: quick-start;
  margin-bottom: ${l.theme.spacing.xxxl};
`,g=o.css`
  label: quick-start-title;
  font-size: ${l.theme.fontSize.xl};
  color: ${l.theme.colors.text};
  margin-top: ${l.theme.spacing.xh};
  margin-bottom: ${l.theme.spacing.zero};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${l.theme.spacing.s};
`,x=o.css`
  margin-top: ${l.theme.spacing.xm};
`;t.QuickStart=()=>r.default.createElement(r.default.Fragment,null,r.default.createElement("h2",{className:g},r.default.createElement(i.HiBeaker,null)," Quick start"),r.default.createElement("div",{className:p},r.default.createElement(s.QuickStartItem,{index:1,title:"Prepare your OpenAPI document"},"You need an OpenAPI document to start with. In case you don't have one already, try this example:",r.default.createElement(c.SyntaxHighlighter,{kind:"docs",lineWrap:!0},"https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json")),r.default.createElement(s.QuickStartItem,{index:2,title:"Install Oats generator modules"},"Install the necessary Oats modules to make the code generator work:",r.default.createElement(c.SyntaxHighlighter,{kind:"docs",lineWrap:!0},"npm i @oats-ts/openapi")),r.default.createElement(s.QuickStartItem,{index:3,title:"Configure the generator"},"Create a file called ",r.default.createElement("b",null,"oats.js")," in your project root (you can call it anything you like), and the configuration:",r.default.createElement(c.SyntaxHighlighter,{language:"typescript",kind:"docs",lineWrap:!0},m.default)),r.default.createElement(s.QuickStartItem,{index:4,title:"Run the generator"},"Open a terminal and simply run:",r.default.createElement(c.SyntaxHighlighter,{kind:"docs"},"node ./oats.js")),r.default.createElement(s.QuickStartItem,{index:5,title:"Verify results"},"In case the generators ran successfully, you will see something like this in the terminal:",r.default.createElement(c.SyntaxHighlighter,{kind:"docs",lineWrap:!0},u.default),"The ",r.default.createElement(h.Code,null,"npm i")," command lists the necessary dependencies, that the generated output needs, to function at runtime. Run this command, and you are ready to use the generated output.",r.default.createElement("div",{className:x},"In case you see errors (and the explanations don't help), check out the"," ",r.default.createElement(d.Link,{href:f.links.doc("CommonMistakes")},"common mistakes")," guide, describing the most common issues with OpenAPI documents! In case it doesn't help either please open an"," ",r.default.createElement(d.Link,{href:"https://github.com/oats-ts/oats-ts/issues"},"issue"),", and describe the problem in detail!")),r.default.createElement(s.QuickStartItem,{index:6,title:"What's next?"},"Check out the ",r.default.createElement(d.Link,{href:f.links.docs()},"documentation"),", where you can learn how to use the generator output, create custom generators and more. Also have a look at the"," ",r.default.createElement(d.Link,{href:f.links.editor()},"configuration editor"),", where you can put together your Oats configuration right in the browser, while observing the generated output (without downloading or installing anything).")))},87778:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(a(67294)),r=a(20745),i=a(16381);(0,r.createRoot)(document.getElementById("root")).render(o.default.createElement(i.LandingPage,null))},61329:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444"},fontSize:{code:"1.1rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=87778)}]);
//# sourceMappingURL=index.bundle.js.map