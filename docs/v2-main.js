(()=>{"use strict";var e,t,o,a={85069:(e,t,o)=>{o.r(t),o.d(t,{default:()=>a});const a="import * as oats from '@oats-ts/openapi'\n\nconst generatorConfig: oats.GeneratorConfig = {\n  logger: oats.loggers.simple(),\n  reader: oats.readers.https.json('https://your.openapi.doc'),\n  // Or if you are generating from a local file:\n  // reader: oats.readers.file.json('openapi.json'),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    children: oats.presets.fullStack(),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n}\n\nexport default generatorConfig\n"},51459:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppV2=void 0;const r=a(o(67294)),n=o(26068),l=o(63099);t.AppV2=()=>r.default.createElement(n.Routes,null,r.default.createElement(n.Route,{index:!0,element:r.default.createElement(l.LandingPage,null)}))},64542:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const r=o(18592),n=a(o(67294)),l=o(19446),i=r.css`
  color: ${l.theme.colors.text};
  background-color: ${l.theme.colors.dark1};

  &:hover {
    background-color: ${l.theme.colors.buttonHover};
  }
`,s=r.css`
  color: ${l.theme.colors.text};
  background-color: ${l.theme.colors.green};

  &:hover {
    background-color: #2ea043;
  }
`,c=r.css`
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
`;t.Button=({children:e,variant:t,className:o})=>{const a=(0,r.cx)(c,"primary"===t?s:i,o);return n.default.createElement("button",{className:a},e)}},96112:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Content=void 0;const r=a(o(67294)),n=o(18592),l=o(4772),i=n.css`
  width: 100%;
  flex: 1 1 1px;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
`;t.Content=({children:e})=>r.default.createElement("main",{className:(0,n.cx)(i,l.ctnr)},e)},38025:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Footer=void 0;const r=o(18592),n=a(o(67294)),l=o(86383),i=o(19446),s=o(31580),c=r.css`
  background-color: ${i.theme.colors.dark1};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10px;
  gap: 10px;
`,d=r.css`
  font-size: ${i.theme.font.m};
  color: ${i.theme.colors.muted};
`,u=r.css`
  font-size: ${i.theme.font.s};
  color: ${i.theme.colors.muted};
`,f=r.css`
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  margin-bottom: 20px;
`,m=r.css`
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${i.theme.font.l};
  color: ${i.theme.colors.muted};
`;t.Footer=()=>n.default.createElement("footer",{className:c},n.default.createElement("a",{className:f,href:"#"},n.default.createElement(l.Logo,{width:60,color:i.theme.colors.muted}),n.default.createElement("h1",{className:m},"Oats")),n.default.createElement("span",{className:d},"Copyright © 2022 Balázs Édes"),n.default.createElement("span",{className:u},"All Oats modules under the ",n.default.createElement(s.Link,{href:"https://opensource.org/licenses/MIT"},"MIT license")))},97269:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;const r=o(18592),n=a(o(67294)),l=o(69274),i=o(19446),s=o(4772),c=o(42890),d=o(77159),u=r.css`
  width: 100%;
  margin: 0px;
  padding: 0px;
`,f=r.css`
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: ${i.theme.font.m};
`,m=r.css`
  display: flex;
  flex-direction: row;
  ${s.breakpoints.phone} {
    /* TODO */
    display: none;
  }
`;t.Header=()=>n.default.createElement("header",{className:u},n.default.createElement("div",{className:(0,r.cx)(f,s.ctnr)},n.default.createElement(d.MenuLogo,{href:""}),n.default.createElement("ul",{className:m},n.default.createElement(c.MenuItem,{label:"Home",icon:l.HiHome,href:"",active:!0}),n.default.createElement(c.MenuItem,{label:"Documentation",icon:l.HiDocument,href:""}),n.default.createElement(c.MenuItem,{label:"Editor",icon:l.HiCog6Tooth,href:""}))))},42890:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuItem=void 0;const r=o(18592),n=a(o(67294)),l=o(19446),i=r.css`
  color: ${l.theme.colors.text};
  /* &::after {
    transform: scale(1) !important;
    background-color: ${l.theme.colors.text};
  } */
`,s=r.css`
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
`,c=r.css`
  height: 100%;
  padding: 0px 24px;
  color: ${l.theme.colors.text};
  display: flex;
  gap: 8px;
  align-items: center;
`;t.MenuItem=({label:e,active:t,href:o,icon:a})=>{const l=(0,r.cx)(s,t?i:void 0);return n.default.createElement("li",{className:c},n.default.createElement("a",{href:`#${o}`,className:l},n.default.createElement(a,{size:"20px"}),n.default.createElement("span",null,e)))}},77159:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuLogo=void 0;const r=o(18592),n=a(o(67294)),l=o(86383),i=o(19446),s=r.css`
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
`,c=r.css`
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${i.theme.font.l};
  color: ${i.theme.colors.text};
`;t.MenuLogo=({href:e})=>n.default.createElement("a",{className:s,href:`#${e}`},n.default.createElement(l.Logo,{width:60}),n.default.createElement("h1",{className:c},"Oats"))},95242:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Headlines=void 0;const r=o(18592),n=a(o(67294)),l=o(69274),i=o(19446),s=o(64542),c=o(4772),d=r.css`
  display: flex;
  flex-direction: row;
  gap: 24px;

  ${c.breakpoints.phone} {
    flex-direction: column;
    gap: 50px;
  }
`,u=r.css`
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.font.m};
`,f=r.css`
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  color: ${i.theme.colors.text};
  font-size: ${i.theme.font.m};
  margin-top: 0px;
`,m=r.css`
  margin-bottom: 24px;
  flex: 1 1 1px;
`;t.Headlines=()=>n.default.createElement("div",{className:d},n.default.createElement("div",{className:u},n.default.createElement("h3",{className:f},n.default.createElement(l.HiPuzzlePiece,null),"Generate an SDK"),n.default.createElement("section",{className:m},"Create an easy to use, statically typed SDK for your backend, with all the bells and whistles, and either use it in house, or expose it to your customers."),n.default.createElement(s.Button,null,n.default.createElement(l.HiBookOpen,null),"Learn more")),n.default.createElement("div",{className:u},n.default.createElement("h3",{className:f},n.default.createElement(l.HiServerStack,null),"Generate the backend"),n.default.createElement("section",{className:m},"Generate all the tedious parts of your backend, like routing, parameter and body parsing and serialization, and CORS, and just implement moving data."),n.default.createElement(s.Button,null,n.default.createElement(l.HiBookOpen,null),"Learn more")),n.default.createElement("div",{className:u},n.default.createElement("h3",{className:f},n.default.createElement(l.HiWrenchScrewdriver,null),"Customize generators"),n.default.createElement("section",{className:m},"The available generators don't fully suit your needs, or you need more? Customize existing generators, or create your own, without writing everything from scratch."),n.default.createElement(s.Button,null,n.default.createElement(l.HiBookOpen,null),"Learn more")))},3148:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HeroSection=void 0;const r=o(18592),n=a(o(67294)),l=o(19446),i=o(64542),s=o(4772),c=o(66653),d=o(69274),u=o(31580),f=r.css`
  width: 100%;
  margin: 0px;
  padding: 80px 0px;
  ${s.breakpoints.desktop} {
    padding: 100px 0px;
  }
  ${s.breakpoints.tablet} {
    padding: 80px 0px;
  }
`,m=r.css`
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: 18px;
  height: 100%;
`,p=r.css`
  font-size: ${l.theme.font.xl};
  color: ${l.theme.colors.text};
  margin: 0px;
  text-align: center;
`,h=r.css`
  color: ${l.theme.colors.muted};
  font-size: ${l.theme.font.m};
  font-weight: 400;
  margin: 0px 0px 20px 0px;
  width: 70%;
  text-align: center;
  flex-shrink: 0;
`,g=r.css`
  display: flex;
  gap: 12px;
`;t.HeroSection=()=>n.default.createElement("div",{className:f},n.default.createElement("div",{className:(0,r.cx)(s.ctnr,m)},n.default.createElement("h2",{className:p},"Generate TypeScript from OpenAPI, that makes sense."),n.default.createElement("h3",{className:h},"Customizable, extensible and ",n.default.createElement("b",null,"open source")," code generators, that output quality"," ",n.default.createElement(u.Link,{href:"https://www.typescriptlang.org"},"TypeScript"),", from your"," ",n.default.createElement(u.Link,{href:"https://www.openapis.org"},"OpenAPI")," definitions."),n.default.createElement("div",{className:g},n.default.createElement(i.Button,{variant:"primary"},n.default.createElement(d.HiPlay,null)," Get Started"),n.default.createElement(i.Button,null,n.default.createElement(c.GoOctoface,null)," Github"))))},63099:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPage=void 0;const r=o(18592),n=a(o(67294)),l=o(19446),i=o(96112),s=o(38025),c=o(95242),d=o(3148),u=o(97269),f=o(66595),m=r.css`
  max-width: 100vw;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  background-color: ${l.theme.colors.dark2};
`;t.LandingPage=()=>n.default.createElement("div",{className:m},n.default.createElement(u.Header,null),n.default.createElement(d.HeroSection,null),n.default.createElement(i.Content,null,n.default.createElement(c.Headlines,null),n.default.createElement(f.QuickStart,null)),n.default.createElement(s.Footer,null))},31580:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const r=a(o(67294)),n=o(18592),l=o(19446),i=n.css`
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

  /* &:hover {
    color: ${l.theme.colors.text};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    opacity: 1;
    background-color: ${l.theme.colors.muted};
    transition: opacity 300ms, transform 300ms;
    transform: translate3d(0, 2px, 0);
    transform: scale(1);
  }

  &:hover::after {
    opacity: 0;
    transform: scale(0);
    transform-origin: center;
  } */
`;t.Link=({children:e,className:t,...o})=>r.default.createElement("a",{className:(0,n.cx)(i,t),...o},e)},66595:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStart=void 0;const r=o(18592),n=a(o(67294)),l=o(60155),i=o(19446),s=o(55893),c=o(9691),d=a(o(85069)),u=o(31580),f=r.css`
  margin-bottom: 40px;
`,m=r.css`
  font-size: ${i.theme.font.xl};
  color: ${i.theme.colors.text};
  margin-top: 70px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;t.QuickStart=()=>n.default.createElement(n.default.Fragment,null,n.default.createElement("h2",{className:m},n.default.createElement(l.IoRocketSharp,null)," Quick start"),n.default.createElement("div",{className:f},n.default.createElement(s.QuickStartItem,{index:1,title:"Prepare your OpenAPI document"},"You need an OpenAPI document to start with. In case you don't have one already, try this example:",n.default.createElement(c.SyntaxHighlighter,null,"https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json")),n.default.createElement(s.QuickStartItem,{index:2,title:"Install Oats generator modules"},"Install the necessary Oats modules to make the code generator work:",n.default.createElement(c.SyntaxHighlighter,null,"npm i @oats-ts/openapi @oats-ts/cli")),n.default.createElement(s.QuickStartItem,{index:3,title:"Configure the generator"},"Create a file called ",n.default.createElement("b",null,"oats.ts")," in your project root (you can call it anything you like), and the configuration:",n.default.createElement(c.SyntaxHighlighter,{language:"typescript"},d.default)),n.default.createElement(s.QuickStartItem,{index:4,title:"Run the generator"},"Open a terminal and simply run:",n.default.createElement(c.SyntaxHighlighter,null,"npx oats --config oats.ts")),n.default.createElement(s.QuickStartItem,{index:5,title:"What now?"},"Check out the ",n.default.createElement(u.Link,{href:"#"},"documentation"),", where you can learn how to use the generator output, create custom generators and more. Also have a look at the ",n.default.createElement(u.Link,{href:"#"},"configuration builder"),", where you can put together your Oats configuration right in the browser, while observing the generated output (without downloading or installing anything).")))},55893:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStartItem=void 0;const r=o(18592),n=a(o(67294)),l=o(19446),i=o(4772),s=r.css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 40px;
  width: 100%;
`,c=r.css`
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
`,d=r.css`
  font-size: ${l.theme.font.m};
  color: ${l.theme.colors.text};
  text-transform: uppercase;
`,u=r.css`
  color: ${l.theme.colors.muted};
  font-size: ${l.theme.font.m};
`,f=r.css`
  width: 100%;
`;t.QuickStartItem=({children:e,index:t,title:o})=>n.default.createElement("div",{className:s},n.default.createElement("div",{className:c},t),n.default.createElement("div",{className:f},n.default.createElement("h3",{className:d},o),n.default.createElement("div",{className:u},e)))},9691:function(e,t,o){var a=this&&this.__createBinding||(Object.create?function(e,t,o,a){void 0===a&&(a=o);var r=Object.getOwnPropertyDescriptor(t,o);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,a,r)}:function(e,t,o,a){void 0===a&&(a=o),e[a]=t[o]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&a(t,e,o);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const l=o(18592),i=n(o(67294)),s=o(67361),c=n(o(29012)),d=o(74855),u=o(19446),f=o(69274),m=o(96486),p=function(e){const t={'pre[class*="language-"]':{backgroundColor:u.theme.colors.dark1,borderRadius:"10px",padding:"18px",width:"100%",maxWidth:"100%",borderWidth:"0px"}},o=(0,m.cloneDeep)(e);return(0,m.values)(o).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow="rgb(0 0 0 / 30%) 0px 1px"})),(0,m.merge)(o,t)}(c.vscDarkPlus),h=l.css`
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
  font-size: ${u.theme.font.m};
  background-color: ${u.theme.colors.dark2};
  color: ${u.theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 8px;
`,g=l.css`
  position: relative;
  * {
    font-family: 'Source Code Pro', monospace;
    font-size: ${u.theme.font.code};
  }
`;t.SyntaxHighlighter=({children:e,language:t})=>{const[o,a]=(0,i.useState)(!1),[r,n]=(0,i.useState)(!1),[l,c]=(0,i.useState)(void 0);return i.default.createElement("div",{className:g,onMouseEnter:()=>{n(!0)},onMouseLeave:()=>{n(!1)}},i.default.createElement(s.Prism,{language:t,style:p},e),i.default.createElement(d.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,m.isNil)(l)||(clearTimeout(l),c(void 0)),a(t),c(setTimeout((()=>{a(!1)}),2e3))}},i.default.createElement("button",{className:h,style:{opacity:r?1:0}},o?i.default.createElement(f.HiCheck,null):i.default.createElement(f.HiClipboard,null))))}},4772:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ctnr=t.breakpoints=void 0;const a=o(18592);t.breakpoints={desktop:"@media (min-width: 1201px)",tablet:"@media (min-width: 651px) and (max-width: 1200px) ",phone:"@media (max-width: 650px) "},t.ctnr=a.css`
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
`},86383:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const r=a(o(67294)),n=o(19446);function l(e,t){return void 0!==e&&void 0===t?[e,.6468548298238798*e]:void 0!==t&&void 0===e?[t,1.545941923742413*t]:void 0!==e&&void 0!==t?[e,t]:[172.439,111.543]}t.Logo=({color:e=n.theme.colors.green,width:t,height:o})=>{const[a,i]=l(t,o);return r.default.createElement("svg",{width:a,height:i,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),r.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},63413:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const a=o(26729);t.globalStyles=a.css`
  * {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
  }
`},76778:function(e,t,o){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(26729),n=a(o(67294)),l=o(20745),i=o(26068),s=o(51459),c=o(63413);(0,l.createRoot)(document.getElementById("root")).render(n.default.createElement(i.HashRouter,null,n.default.createElement(r.Global,{styles:c.globalStyles}),n.default.createElement(s.AppV2,null)))},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{dark1:"#323232",dark2:"#212121",text:"#ffffff",muted:"#aaaaaa",green:"#238636",button:"#eeeeee",buttonHover:"#444444"},font:{code:"17px",s:"16px",m:"18px",l:"24px",xl:"28px"}}}},r={};function n(e){var t=r[e];if(void 0!==t)return t.exports;var o=r[e]={id:e,loaded:!1,exports:{}};return a[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}n.m=a,e=[],n.O=(t,o,a,r)=>{if(!o){var l=1/0;for(d=0;d<e.length;d++){for(var[o,a,r]=e[d],i=!0,s=0;s<o.length;s++)(!1&r||l>=r)&&Object.keys(n.O).every((e=>n.O[e](o[s])))?o.splice(s--,1):(i=!1,r<l&&(l=r));if(i){e.splice(d--,1);var c=a();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[o,a,r]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},o=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,n.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var r=Object.create(null);n.r(r);var l={};t=t||[null,o({}),o([]),o(o)];for(var i=2&a&&e;"object"==typeof i&&!~t.indexOf(i);i=o(i))Object.getOwnPropertyNames(i).forEach((t=>l[t]=()=>e[t]));return l.default=()=>e,n.d(r,l),r},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={179:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var a,r,[l,i,s]=o,c=0;if(l.some((t=>0!==e[t]))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(s)var d=s(n)}for(t&&t(o);c<l.length;c++)r=l[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(d)},o=self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var l=n.O(void 0,[984],(()=>n(76778)));l=n.O(l)})();
//# sourceMappingURL=v2-main.js.map