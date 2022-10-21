(()=>{"use strict";var e,t,a,o={91482:(e,t,a)=>{a.r(t),a.d(t,{default:()=>o});const o="import * as oats from '@oats-ts/openapi'\n\nconst generatorConfig: oats.GeneratorConfig = {\n  logger: oats.loggers.simple(),\n  reader: oats.readers.https.json('https://your.openapi.doc'),\n  // Or if you are generating from a local file:\n  // reader: oats.readers.file.json('openapi.json'),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    children: oats.presets.fullStack(),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n}\n\nexport default generatorConfig\n"},78135:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppV2=void 0;const n=o(a(67294)),r=a(26068),l=a(95462),i=a(16381);t.AppV2=()=>n.default.createElement(r.Routes,null,n.default.createElement(r.Route,{index:!0,element:n.default.createElement(i.LandingPage,null)}),n.default.createElement(r.Route,{path:"documentation",element:n.default.createElement(l.DocumentationPage,null)}))},12872:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppContainer=void 0;const n=a(18592),r=o(a(67294)),l=a(61329),i=n.css`
  label: app-container;
  max-width: 100vw;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  background-color: ${l.theme.colors.dark2};
`;t.AppContainer=({children:e})=>r.default.createElement("div",{className:i},e)},79514:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const n=a(18592),r=o(a(67294)),l=a(61329),i=n.css`
  label: secondary-button;
  color: ${l.theme.colors.text};
  background-color: ${l.theme.colors.dark1};

  &:hover {
    background-color: ${l.theme.colors.buttonHover};
  }
`,s=n.css`
  label: primary-button;
  color: ${l.theme.colors.text};
  background-color: ${l.theme.colors.green};

  &:hover {
    background-color: #2ea043;
  }
`,c=n.css`
  label: button;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  padding: 12px 20px;
  border: unset;
  border-radius: 14px;
  position: relative;
  font-weight: 400;
  cursor: pointer;
  font-size: ${l.theme.font.m};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 8px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 18px;
  }
`;t.Button=({children:e,variant:t,className:a})=>{const o=(0,n.cx)(c,"primary"===t?s:i,a);return r.default.createElement("button",{className:o},e)}},4151:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Content=void 0;const n=o(a(67294)),r=a(18592),l=a(158),i=r.css`
  label: content;
  width: 100%;
  flex: 1 1 1px;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
`;t.Content=({children:e})=>n.default.createElement("main",{className:(0,r.cx)(i,l.ctnr)},e)},55050:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Footer=void 0;const n=a(18592),r=o(a(67294)),l=a(15435),i=a(61329),s=a(86299),c=n.css`
  label: footer;
  background-color: ${i.theme.colors.dark1};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10px;
  gap: 10px;
`,u=n.css`
  font-size: ${i.theme.font.m};
  color: ${i.theme.colors.muted};
`,d=n.css`
  font-size: ${i.theme.font.s};
  color: ${i.theme.colors.muted};
`,m=n.css`
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  margin-bottom: 20px;
`,f=n.css`
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${i.theme.font.l};
  color: ${i.theme.colors.muted};
`;t.Footer=()=>r.default.createElement("footer",{className:c},r.default.createElement("a",{className:m,href:"#"},r.default.createElement(l.Logo,{width:60,color:i.theme.colors.muted}),r.default.createElement("h1",{className:f},"Oats")),r.default.createElement("span",{className:u},"Copyright © 2022 Balázs Édes"),r.default.createElement("span",{className:d},"All Oats modules under the ",r.default.createElement(s.Link,{href:"https://opensource.org/licenses/MIT"},"MIT license")))},73976:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;const n=a(18592),r=o(a(67294)),l=a(69274),i=a(61329),s=a(158),c=a(20012),u=a(16045),d=n.css`
  label: header;
  width: 100%;
  margin: 0px;
  padding: 0px;
`,m=n.css`
  label: header-content;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: ${i.theme.font.m};
`,f=n.css`
  label: header-menu-items-container;
  display: flex;
  flex-direction: row;
  ${s.breakpoints.phone} {
    /* TODO */
    display: none;
  }
`;t.Header=()=>r.default.createElement("header",{className:d},r.default.createElement("div",{className:(0,n.cx)(m,s.ctnr)},r.default.createElement(u.MenuLogo,{href:""}),r.default.createElement("ul",{className:f},r.default.createElement(c.MenuItem,{label:"Home",icon:l.HiHome,href:"#/",active:!0}),r.default.createElement(c.MenuItem,{label:"Documentation",icon:l.HiDocument,href:"#/documentation"}),r.default.createElement(c.MenuItem,{label:"Configuration Editor",icon:l.HiCog6Tooth,href:"#/"}))))},20364:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Headlines=void 0;const n=a(18592),r=o(a(67294)),l=a(69274),i=a(61329),s=a(79514),c=a(158),u=n.css`
  label: headlines;
  display: flex;
  flex-direction: row;
  gap: 24px;

  ${c.breakpoints.phone} {
    flex-direction: column;
    gap: 50px;
  }
`,d=n.css`
  label: headlines-items-container;
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.font.m};
`,m=n.css`
  label: headlines-item-header;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  color: ${i.theme.colors.text};
  font-size: ${i.theme.font.m};
  margin-top: 0px;
`,f=n.css`
  label: headlines-item-content;
  margin-bottom: 24px;
  flex: 1 1 1px;
`;t.Headlines=()=>r.default.createElement("div",{className:u},r.default.createElement("div",{className:d},r.default.createElement("h3",{className:m},r.default.createElement(l.HiPuzzlePiece,null),"Generate an SDK"),r.default.createElement("section",{className:f},"Create an easy to use, statically typed SDK for your backend, with all the bells and whistles, and either use it in house, or expose it to your customers."),r.default.createElement(s.Button,null,r.default.createElement(l.HiBookOpen,null),"Learn more")),r.default.createElement("div",{className:d},r.default.createElement("h3",{className:m},r.default.createElement(l.HiServerStack,null),"Generate the backend"),r.default.createElement("section",{className:f},"Generate all the tedious parts of your backend, like routing, parameter and body parsing and serialization, and CORS, and just implement moving data."),r.default.createElement(s.Button,null,r.default.createElement(l.HiBookOpen,null),"Learn more")),r.default.createElement("div",{className:d},r.default.createElement("h3",{className:m},r.default.createElement(l.HiWrenchScrewdriver,null),"Customize generators"),r.default.createElement("section",{className:f},"The available generators don't fully suit your needs, or you need more? Customize existing generators, or create your own, without writing everything from scratch."),r.default.createElement(s.Button,null,r.default.createElement(l.HiBookOpen,null),"Learn more")))},48732:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HeroSection=void 0;const n=a(18592),r=o(a(67294)),l=a(61329),i=a(79514),s=a(158),c=a(66653),u=a(69274),d=a(86299),m=n.css`
  label: hero-section;
  width: 100%;
  margin: 0px;
  padding: 80px 0px;
  ${s.breakpoints.desktop} {
    padding: 100px 0px;
  }
  ${s.breakpoints.tablet} {
    padding: 80px 0px;
  }
`,f=n.css`
  label: hero-section-content;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: 18px;
  height: 100%;
`,p=n.css`
  label: hero-text-1;
  font-size: ${l.theme.font.xl};
  color: ${l.theme.colors.text};
  margin: 0px;
  text-align: center;
`,h=n.css`
  label: hero-text-2;
  color: ${l.theme.colors.muted};
  font-size: ${l.theme.font.m};
  font-weight: 400;
  margin: 0px 0px 20px 0px;
  width: 70%;
  text-align: center;
  flex-shrink: 0;
`,g=n.css`
  label: hero-button-container;
  display: flex;
  gap: 12px;
`;t.HeroSection=()=>r.default.createElement("div",{className:m},r.default.createElement("div",{className:(0,n.cx)(s.ctnr,f)},r.default.createElement("h2",{className:p},"Generate TypeScript from OpenAPI, that makes sense."),r.default.createElement("h3",{className:h},"Customizable, extensible and ",r.default.createElement("b",null,"open source")," code generators, that output quality"," ",r.default.createElement(d.Link,{href:"https://www.typescriptlang.org"},"TypeScript"),", from your"," ",r.default.createElement(d.Link,{href:"https://www.openapis.org"},"OpenAPI")," definitions."),r.default.createElement("div",{className:g},r.default.createElement(i.Button,{variant:"primary"},r.default.createElement(u.HiPlay,null)," Get Started"),r.default.createElement(i.Button,null,r.default.createElement(u.HiCog6Tooth,null)," Try Editor"),r.default.createElement(i.Button,null,r.default.createElement(c.GoOctoface,null)," Github"))))},86299:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const n=o(a(67294)),r=a(18592),l=a(61329),i=r.css`
  label: link;
  position: relative;
  text-decoration: none;
  gap: 8px;
  align-items: center;
  transition: color 150ms linear;
  text-decoration: underline;
  color: ${l.theme.colors.muted};

  &:hover {
    text-decoration: none;
    color: ${l.theme.colors.text};
  }
`;t.Link=({children:e,className:t,...a})=>n.default.createElement("a",{className:(0,r.cx)(i,t),...a},e)},15435:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const n=o(a(67294)),r=a(61329),l=a(86753);t.Logo=({color:e=r.theme.colors.green,width:t,height:a})=>{const[o,i]=(0,l.getSizeWithAspectRatio)(172.439,111.543,t,a);return n.default.createElement("svg",{width:o,height:i,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},n.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),n.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},20012:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuItem=void 0;const n=a(18592),r=o(a(67294)),l=a(61329),i=n.css`
  label: active-menu-item;
  color: ${l.theme.colors.text};
`,s=n.css`
  label: menu-item-anchor;
  position: relative;
  text-decoration: none;
  color: ${l.theme.colors.muted};
  display: flex;
  gap: 8px;
  align-items: center;
  transition: color 150ms linear;

  &:hover {
    color: ${l.theme.colors.text};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${l.theme.colors.text};
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
`,c=n.css`
  label: menu-item;
  height: 100%;
  padding: 0px 24px;
  color: ${l.theme.colors.text};
  display: flex;
  gap: 8px;
  align-items: center;
`;t.MenuItem=({label:e,active:t,href:a,icon:o})=>{const l=(0,n.cx)(s,t?i:void 0);return r.default.createElement("li",{className:c},r.default.createElement("a",{href:a,className:l},r.default.createElement(o,{size:"20px"}),r.default.createElement("span",null,e)))}},16045:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuLogo=void 0;const n=a(18592),r=o(a(67294)),l=a(15435),i=a(61329),s=n.css`
  label: menu-logo;
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
`,c=n.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${i.theme.font.l};
  color: ${i.theme.colors.text};
`;t.MenuLogo=({href:e})=>r.default.createElement("a",{className:s,href:`#${e}`},r.default.createElement(l.Logo,{width:60}),r.default.createElement("h1",{className:c},"Oats"))},56005:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStart=void 0;const n=a(18592),r=o(a(67294)),l=a(60155),i=a(61329),s=a(43418),c=a(7807),u=a(86299),d=o(a(91482)),m=n.css`
  label: quick-start;
  margin-bottom: 40px;
`,f=n.css`
  label: quick-start-title;
  font-size: ${i.theme.font.xl};
  color: ${i.theme.colors.text};
  margin-top: 70px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;t.QuickStart=()=>r.default.createElement(r.default.Fragment,null,r.default.createElement("h2",{className:f},r.default.createElement(l.IoRocketSharp,null)," Quick start"),r.default.createElement("div",{className:m},r.default.createElement(s.QuickStartItem,{index:1,title:"Prepare your OpenAPI document"},"You need an OpenAPI document to start with. In case you don't have one already, try this example:",r.default.createElement(c.SyntaxHighlighter,null,"https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json")),r.default.createElement(s.QuickStartItem,{index:2,title:"Install Oats generator modules"},"Install the necessary Oats modules to make the code generator work:",r.default.createElement(c.SyntaxHighlighter,null,"npm i @oats-ts/openapi @oats-ts/cli")),r.default.createElement(s.QuickStartItem,{index:3,title:"Configure the generator"},"Create a file called ",r.default.createElement("b",null,"oats.ts")," in your project root (you can call it anything you like), and the configuration:",r.default.createElement(c.SyntaxHighlighter,{language:"typescript"},d.default)),r.default.createElement(s.QuickStartItem,{index:4,title:"Run the generator"},"Open a terminal and simply run:",r.default.createElement(c.SyntaxHighlighter,null,"npx oats --config oats.ts")),r.default.createElement(s.QuickStartItem,{index:5,title:"What now?"},"Check out the ",r.default.createElement(u.Link,{href:"#"},"documentation"),", where you can learn how to use the generator output, create custom generators and more. Also have a look at the ",r.default.createElement(u.Link,{href:"#"},"configuration editor"),", where you can put together your Oats configuration right in the browser, while observing the generated output (without downloading or installing anything).")))},43418:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStartItem=void 0;const n=a(18592),r=o(a(67294)),l=a(61329),i=a(158),s=n.css`
  label: quick-start-item;
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 40px;
  width: 100%;
`,c=n.css`
  label: quick-start-item-circle;
  ${i.breakpoints.phone} {
    /* TODO */
    display: none;
  }
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  margin-top: 12px;
  border-radius: 50%;
  border: 1px solid ${l.theme.colors.text};
  color: ${l.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${l.theme.font.l};
`,u=n.css`
  label: quick-start-item-title;
  font-size: ${l.theme.font.m};
  color: ${l.theme.colors.text};
  text-transform: uppercase;
`,d=n.css`
  label: quick-start-item-content;
  color: ${l.theme.colors.muted};
  font-size: ${l.theme.font.m};
`,m=n.css`
  label: quick-start-item-container;
  width: 100%;
`;t.QuickStartItem=({children:e,index:t,title:a})=>r.default.createElement("div",{className:s},r.default.createElement("div",{className:c},t),r.default.createElement("div",{className:m},r.default.createElement("h3",{className:u},a),r.default.createElement("div",{className:d},e)))},7807:function(e,t,a){var o=this&&this.__createBinding||(Object.create?function(e,t,a,o){void 0===o&&(o=a);var n=Object.getOwnPropertyDescriptor(t,a);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,o,n)}:function(e,t,a,o){void 0===o&&(o=a),e[o]=t[a]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&o(t,e,a);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const l=a(18592),i=r(a(67294)),s=a(67361),c=r(a(29012)),u=a(74855),d=a(61329),m=a(69274),f=a(96486),p=function(e){const t={'pre[class*="language-"]':{backgroundColor:d.theme.colors.dark1,borderRadius:"10px",padding:"18px",width:"100%",maxWidth:"100%",borderWidth:"0px"}},a=(0,f.cloneDeep)(e);return(0,f.values)(a).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow="rgb(0 0 0 / 30%) 0px 1px"})),(0,f.merge)(a,t)}(c.vscDarkPlus),h=l.css`
  label: syntax-hl-copy;
  top: 10px;
  right: 10px;
  position: absolute;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear, opacity 150ms linear;
  padding: 8px 12px;
  border: unset;
  border-radius: 8px;
  font-weight: 400;
  cursor: pointer;
  font-size: ${d.theme.font.m};
  background-color: ${d.theme.colors.dark2};
  color: ${d.theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 8px;
`,g=l.css`
  label: syntax-hl;
  position: relative;
  * {
    font-family: 'Source Code Pro', monospace;
    font-size: ${d.theme.font.code};
  }
`;t.SyntaxHighlighter=({children:e,language:t})=>{const[a,o]=(0,i.useState)(!1),[n,r]=(0,i.useState)(!1),[l,c]=(0,i.useState)(void 0);return i.default.createElement("div",{className:g,onMouseEnter:()=>{r(!0)},onMouseLeave:()=>{r(!1)}},i.default.createElement(s.Prism,{language:t,style:p,wrapLongLines:!0},e),i.default.createElement(u.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,f.isNil)(l)||(clearTimeout(l),c(void 0)),o(t),c(setTimeout((()=>{o(!1)}),2e3))}},i.default.createElement("button",{className:h,style:{opacity:n?1:0}},a?i.default.createElement(m.HiCheck,null):i.default.createElement(m.HiClipboard,null))))}},86753:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,a,o){return void 0!==a&&void 0===o?[a,t/e*a]:void 0!==o&&void 0===a?[o,e/t*o]:void 0!==a&&void 0!==o?[a,o]:[e,t]}},158:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ctnr=t.breakpoints=void 0;const o=a(18592);t.breakpoints={desktop:"@media (min-width: 1201px)",tablet:"@media (min-width: 651px) and (max-width: 1200px) ",phone:"@media (max-width: 650px) "},t.ctnr=o.css`
  label: container;
  display: flex;

  ${t.breakpoints.desktop} {
    width: 90%;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  ${t.breakpoints.tablet} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: 0px 10px;
    margin-left: auto;
    margin-right: auto;
  }

  ${t.breakpoints.phone} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: 0px 10px;
    margin-left: auto;
    margin-right: auto;
  }
`},72050:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const o=a(26729);t.globalStyles=o.css`
  * {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
  }
`},12299:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(26729),r=o(a(67294)),l=a(20745),i=a(26068),s=a(78135),c=a(72050);(0,l.createRoot)(document.getElementById("root")).render(r.default.createElement(i.HashRouter,null,r.default.createElement(n.Global,{styles:c.globalStyles}),r.default.createElement(s.AppV2,null)))},95462:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentationPage=void 0;const n=o(a(67294)),r=a(12872);t.DocumentationPage=()=>n.default.createElement(r.AppContainer,null,"Hi")},16381:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPage=void 0;const n=o(a(67294)),r=a(4151),l=a(55050),i=a(20364),s=a(48732),c=a(73976),u=a(56005),d=a(12872);t.LandingPage=()=>n.default.createElement(d.AppContainer,null,n.default.createElement(c.Header,null),n.default.createElement(r.Content,null,n.default.createElement(s.HeroSection,null),n.default.createElement(i.Headlines,null),n.default.createElement(u.QuickStart,null)),n.default.createElement(l.Footer,null))},61329:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{dark1:"#323232",dark2:"#212121",text:"#ffffff",muted:"#aaaaaa",green:"#238636",button:"#eeeeee",buttonHover:"#444444"},font:{code:"1.1em",s:"0.8em",m:"1.2em",l:"1.8em",xl:"2em"}}}},n={};function r(e){var t=n[e];if(void 0!==t)return t.exports;var a=n[e]={id:e,loaded:!1,exports:{}};return o[e].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}r.m=o,e=[],r.O=(t,a,o,n)=>{if(!a){var l=1/0;for(u=0;u<e.length;u++){for(var[a,o,n]=e[u],i=!0,s=0;s<a.length;s++)(!1&n||l>=n)&&Object.keys(r.O).every((e=>r.O[e](a[s])))?a.splice(s--,1):(i=!1,n<l&&(l=n));if(i){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[a,o,n]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},a=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,r.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var n=Object.create(null);r.r(n);var l={};t=t||[null,a({}),a([]),a(a)];for(var i=2&o&&e;"object"==typeof i&&!~t.indexOf(i);i=a(i))Object.getOwnPropertyNames(i).forEach((t=>l[t]=()=>e[t]));return l.default=()=>e,r.d(n,l),n},r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={179:0};r.O.j=t=>0===e[t];var t=(t,a)=>{var o,n,[l,i,s]=a,c=0;if(l.some((t=>0!==e[t]))){for(o in i)r.o(i,o)&&(r.m[o]=i[o]);if(s)var u=s(r)}for(t&&t(a);c<l.length;c++)n=l[c],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(u)},a=self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var l=r.O(void 0,[984],(()=>r(12299)));l=r.O(l)})();
//# sourceMappingURL=v2-main.js.map