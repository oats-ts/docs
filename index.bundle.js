"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[826],{57108:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Configure Oats\n\nCreate a file called `oats.js` in your project root with the following content:\n\n```javascript\nconst oats = require('@oats-ts/openapi')\n\noats.generate({\n  plugins: [oats.loggers.simple()],\n  // Use readers.file, to read from the local file system\n  reader: oats.readers.https.json(\n    'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',\n  ),\n  validator: oats.validator(),\n  generator: oats.generator({\n    nameProvider: oats.nameProviders.default(),\n    pathProvider: oats.pathProviders.default('src/generated'),\n    // Use presets.client() or presets.server() for just client/server side code\n    children: oats.presets.fullStack(),\n  }),\n  writer: oats.writers.typescript.file({\n    format: oats.formatters.prettier({\n      parser: 'typescript',\n    }),\n  }),\n})\n```\n\nExperiment with different configurations in the [configuration editor]({{editor}})\n"},47114:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Install Oats\n\nInstall the necessary Oats modules to make the code generator work:\n\n```bash\nnpm i @oats-ts/openapi\n```\n"},52219:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Next steps\n\nCheck out the [documentation]({{documentation}}), where you can learn how to use the generator output. Also have a look at the [configuration editor]({{editor}}), where you can put together your Oats configuration right in the browser, while observing the generated output in real time (without\ndownloading or installing anything, and without your data ever leaving your browser).\n"},43191:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Prepare your OpenAPI document\n\nNext, you need an OpenAPI document describing your API. In case you don't have one already, try this example:\n\n```text\nhttps://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json\n```\n\nAll guides are using the above example, so it's a good place to start.\n"},67470:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o="# Run Oats\n\nOpen a terminal and simply run:\n\n```bash\nnode ./oats.js\n```\n\nOats at this time doesn't have a CLI tool, as it doesn't need one."},29515:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o='# Verify results\n\nIn case the generators ran successfully, you will see something like this in the terminal:\n\n```bash\n✔ reader step completed using "@oats-ts/openapi-reader"\n✔ validator step completed using "@oats-ts/openapi-validator"\n✔ generator step completed using "@oats-ts/openapi-generators"\ni some outputs have runtime dependencies:\n  npm i \\\n    @oats-ts/openapi-express-server-adapter@0.0.43 \\\n    @oats-ts/openapi-fetch-client-adapter@0.0.43 \\\n    @oats-ts/openapi-runtime@0.0.43 \\\n    express@^4.18.1\n✔ writer step completed using "@oats-ts/typescript-writer"\n```\n\nThe `npm i` command lists the necessary dependencies, that the generated output needs, to function at runtime.\n\n**Run this command, and you are ready to use the generated output!**\n\nIn case you see errors (and the descriptions don\'t help), check out the [OpenAPI 101](OpenAPI101) guide, describing the most common DOs and DON\'Ts with OpenAPI documents! In case it doesn\'t help either, please open an [issue](https://github.com/oats-ts/oats-ts/issues), and describe the problem in detail!\n'},86032:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const o={'pre[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#1e1e1e"},'code[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'pre[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},':not(pre) > code[class*="language-"]':{padding:".1em .3em",borderRadius:".3em",color:"#db4c69",background:"#1e1e1e"},".namespace":{Opacity:".7"},"doctype.doctype-tag":{color:"#569CD6"},"doctype.name":{color:"#9cdcfe"},comment:{color:"#6a9955"},prolog:{color:"#6a9955"},punctuation:{color:"#d4d4d4"},".language-html .language-css .token.punctuation":{color:"#d4d4d4"},".language-html .language-javascript .token.punctuation":{color:"#d4d4d4"},property:{color:"#9cdcfe"},tag:{color:"#569cd6"},boolean:{color:"#569cd6"},number:{color:"#b5cea8"},constant:{color:"#9cdcfe"},symbol:{color:"#b5cea8"},inserted:{color:"#b5cea8"},unit:{color:"#b5cea8"},selector:{color:"#d7ba7d"},"attr-name":{color:"#9cdcfe"},string:{color:"#ce9178"},char:{color:"#ce9178"},builtin:{color:"#ce9178"},deleted:{color:"#ce9178"},".language-css .token.string.url":{textDecoration:"underline"},operator:{color:"#d4d4d4"},entity:{color:"#569cd6"},"operator.arrow":{color:"#569CD6"},atrule:{color:"#ce9178"},"atrule.rule":{color:"#c586c0"},"atrule.url":{color:"#9cdcfe"},"atrule.url.function":{color:"#dcdcaa"},"atrule.url.punctuation":{color:"#d4d4d4"},keyword:{color:"#569CD6"},"keyword.module":{color:"#c586c0"},"keyword.control-flow":{color:"#c586c0"},function:{color:"#dcdcaa"},"function.maybe-class-name":{color:"#dcdcaa"},regex:{color:"#d16969"},important:{color:"#569cd6"},italic:{fontStyle:"italic"},"class-name":{color:"#4ec9b0"},"maybe-class-name":{color:"#4ec9b0"},console:{color:"#9cdcfe"},parameter:{color:"#9cdcfe"},interpolation:{color:"#9cdcfe"},"punctuation.interpolation-punctuation":{color:"#569cd6"},variable:{color:"#9cdcfe"},"imports.maybe-class-name":{color:"#9cdcfe"},"exports.maybe-class-name":{color:"#9cdcfe"},escape:{color:"#d7ba7d"},"tag.punctuation":{color:"#808080"},cdata:{color:"#808080"},"attr-value":{color:"#ce9178"},"attr-value.punctuation":{color:"#ce9178"},"attr-value.punctuation.attr-equals":{color:"#d4d4d4"},namespace:{color:"#4ec9b0"},'pre[class*="language-javascript"]':{color:"#9cdcfe"},'code[class*="language-javascript"]':{color:"#9cdcfe"},'pre[class*="language-jsx"]':{color:"#9cdcfe"},'code[class*="language-jsx"]':{color:"#9cdcfe"},'pre[class*="language-typescript"]':{color:"#9cdcfe"},'code[class*="language-typescript"]':{color:"#9cdcfe"},'pre[class*="language-tsx"]':{color:"#9cdcfe"},'code[class*="language-tsx"]':{color:"#9cdcfe"},'pre[class*="language-css"]':{color:"#ce9178"},'code[class*="language-css"]':{color:"#ce9178"},'pre[class*="language-html"]':{color:"#d4d4d4"},'code[class*="language-html"]':{color:"#d4d4d4"},".language-regex .token.anchor":{color:"#dcdcaa"},".language-html .token.punctuation":{color:"#808080"},'pre[class*="language-"] > code[class*="language-"]':{position:"relative",zIndex:"1"},".line-highlight.line-highlight":{background:"#f7ebc6",boxShadow:"inset 5px 0 0 #f7d87c",zIndex:"0"}}},80887:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const i=r(n(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:n})=>{const[o,a]=(0,i.useState)((()=>window.matchMedia(t.breakpoints[n]).matches));return(0,i.useEffect)((()=>{window.matchMedia(t.breakpoints[n]).addEventListener("change",(e=>a(e.matches)))}),[]),o?i.default.createElement(e,null):null}},34553:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=o(n(67294)),r=n(20745),i=n(802);(0,r.createRoot)(document.getElementById("root")).render(a.default.createElement(i.LandingPage,null))},90120:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppContainer=void 0;const a=n(18592),r=n(26729),i=o(n(67294)),s=n(63413),l=n(19446),c=a.css`
  label: app-container;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin: ${l.theme.spacing.zero};
  padding: ${l.theme.spacing.zero};
  background-color: ${l.theme.colors.dark3};
`;t.AppContainer=({children:e})=>i.default.createElement(i.default.Fragment,null,i.default.createElement(r.Global,{styles:s.globalStyles}),i.default.createElement("div",{className:c},e))},78436:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const a=n(18592),r=n(96486),i=o(n(67294)),s=n(19446),l=a.css`
  label: button;
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  align-items: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  border: unset;
  position: relative;
  font-weight: 400;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) ${s.theme.spacing.zero} ${s.theme.spacing.xs} ${s.theme.spacing.s};
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) ${s.theme.spacing.zero} ${s.theme.spacing.xs} ${s.theme.spacing.xxm};
  }
`,c={secondary:a.css`
    label: secondary-button;
    color: ${s.theme.colors.text};
    background-color: ${s.theme.colors.dark1};

    &:hover {
      background-color: ${s.theme.colors.buttonHover};
    }
  `,primary:a.css`
    label: primary-button;
    color: ${s.theme.colors.text};
    background-color: ${s.theme.colors.green};

    &:hover {
      background-color: #2ea043;
    }
  `},d={default:a.css`
    gap: ${s.theme.spacing.s};
    padding: ${s.theme.spacing.m} ${s.theme.spacing.xm};
    border-radius: ${s.theme.spacing.s};
    font-size: ${s.theme.fontSize.m};
  `,mini:a.css`
    gap: ${s.theme.spacing.xs};
    padding: ${s.theme.spacing.xs} ${s.theme.spacing.m};
    border-radius: ${s.theme.spacing.xs};
    font-size: ${s.theme.fontSize.xxs};
  `};t.Button=({children:e,variant:t="secondary",size:n="default",className:o,href:s,title:u,onClick:m})=>{const h=(0,a.cx)(l,c[t],d[n],o);return(0,r.isNil)(s)?i.default.createElement("button",{className:h,onClick:m,title:u},e):i.default.createElement("a",{className:h,onClick:m,href:s,title:u},e)}},4074:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Code=void 0;const a=n(18592),r=o(n(67294)),i=n(19446),s=a.css`
  font-size: ${i.theme.fontSize.code};
  color: ${i.theme.colors.text};
  background-color: ${i.theme.colors.dark1};
  padding: ${i.theme.spacing.xxxs} ${i.theme.spacing.xxs};
  border-radius: ${i.theme.spacing.xs};
`;t.Code=({className:e,children:t,...n})=>r.default.createElement("code",{className:(0,a.cx)(s,e),...n},t)},60488:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Content=void 0;const a=o(n(67294)),r=n(18592),i=n(46161),s=n(19446),l=r.css`
  label: content;
  width: 100%;
  flex: ${s.theme.flex.grow};
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  display: flex;
  flex-direction: column;
`;t.Content=({children:e})=>a.default.createElement("main",{className:(0,r.cx)(l,i.containerStyle)},e)},18023:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Footer=void 0;const a=n(18592),r=o(n(67294)),i=n(20519),s=n(19446),l=n(3930),c=n(77255),d=a.css`
  label: footer;
  background-color: ${s.theme.colors.dark1};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${s.theme.spacing.xxxl} ${s.theme.spacing.m};
  gap: ${s.theme.spacing.m};
`,u=a.css`
  font-size: ${s.theme.fontSize.m};
  color: ${s.theme.colors.muted};
`,m=a.css`
  font-size: ${s.theme.fontSize.s};
  color: ${s.theme.colors.muted};
`,h=a.css`
  display: flex;
  gap: ${s.theme.spacing.s};
  align-items: center;
  text-decoration: none;
  margin-bottom: ${s.theme.spacing.xxm};
`,p=a.css`
  font-weight: 700;
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  font-size: ${s.theme.fontSize.l};
  color: ${s.theme.colors.muted};
`;t.Footer=()=>r.default.createElement("footer",{className:d},r.default.createElement("a",{className:h,href:c.links.index()},r.default.createElement(i.SvgLogo,{width:60,color:s.theme.colors.muted}),r.default.createElement("h1",{className:p},"Oats")),r.default.createElement("span",{className:u},"Copyright © 2022 Balázs Édes"),r.default.createElement("span",{className:m},"All Oats modules under the ",r.default.createElement(l.Link,{href:"https://opensource.org/licenses/MIT"},"MIT license")))},3930:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Link=void 0;const a=o(n(67294)),r=n(18592),i=n(19446),s=n(96486),l=r.css`
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
`,h=a.css`
  color: ${l.theme.colors.muted};
`,p=a.css`
  font-size: ${l.theme.fontSize.s};
  color: ${l.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:n})=>s.default.createElement("a",{className:d,href:n},s.default.createElement(c.SvgLogo,{width:60}),s.default.createElement("div",{className:u},s.default.createElement("h1",{className:m},"Oats ",(0,i.isNil)(e)?null:s.default.createElement("span",{className:h},e)),t&&s.default.createElement("span",{className:p},"v",r.version)))},19187:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LogoContainer=void 0;const a=n(18592),r=o(n(67294)),i=n(80887),s=n(19446),l=a.css`
  margin: ${s.theme.spacing.m} ${s.theme.spacing.m} ${s.theme.spacing.xxxl} ${s.theme.spacing.m};
  @media ${i.breakpoints.phone} {
    margin: ${s.theme.spacing.m};
  }
`;t.LogoContainer=({children:e})=>r.default.createElement("div",{className:l},e)},40704:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownView=void 0;const s=n(18592),l=n(96486),c=r(n(67294)),d=r(n(23209)),u=i(n(34112)),m=n(82509),h=n(77255),p=n(19446),f=n(4074),g=n(3930),b=n(44702),x=n(66999),v=s.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.l};
  margin-top: ${p.theme.spacing.zero};
`,y=s.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.xm};
`,_=s.css`
  color: ${p.theme.colors.text};
  font-size: ${p.theme.fontSize.m};
`,$=s.css`
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
`,k=Object.values(m.markdownPages),w=e=>{const t=k.find((t=>e.startsWith(t.md)));return(0,l.isNil)(t)?e===encodeURIComponent("{{documentation}}")?h.links.docs():e===encodeURIComponent("{{editor}}")?h.links.editor():(0,d.uriTransformer)(e):h.links.doc(t.md)},S=[u.default];t.MarkdownView=({content:e,syntaxHighlighterProps:t={}})=>{const n=(0,c.useMemo)((()=>{return e=t,{h1:({children:e})=>c.default.createElement("h1",{className:v},e),h2:({children:e})=>c.default.createElement("h2",{className:y},e),h3:({children:e})=>c.default.createElement("h3",{className:_},e),table:({children:e})=>c.default.createElement(x.Table,null,e),tr:({children:e,isHeader:t})=>c.default.createElement(x.Tr,{isHeader:t},e),th:({children:e})=>c.default.createElement(x.Th,null,e),td:({children:e})=>c.default.createElement(x.Td,null,e),a:({href:e,children:t})=>c.default.createElement(g.Link,{href:e},t),code({node:t,inline:n,className:o,children:a,...r}){const i=/language-(\w+)/.exec(o||"");return null===i||n?c.default.createElement(f.Code,{...r},a):c.default.createElement(b.SyntaxHighlighter,{language:i[1],host:e.host??"docs",theme:e.theme??"medium",lineWrap:e.lineWrap??!1},String(a).replace(/\n$/,""))},blockquote:({children:e})=>c.default.createElement("div",{className:$},e)};var e}),[t.host,t.lineWrap,t.theme]);return c.default.createElement(d.default,{remarkPlugins:S,components:n,transformLinkUri:w},e??"")}},16507:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuBar=void 0;const a=n(18592),r=o(n(67294)),i=n(80887),s=n(19446),l=a.css`
  label: menu-bar;
  display: flex;
  flex-direction: row;
  padding: ${s.theme.spacing.zero};
  @media ${i.breakpoints.phone} {
    flex-direction: column;
    gap: ${s.theme.spacing.l};
  }
`;t.MenuBar=({children:e})=>r.default.createElement("ul",{className:l},e)},69585:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MenuItem=void 0;const a=n(18592),r=n(96486),i=o(n(67294)),s=n(80887),l=n(19446),c=a.css`
  label: active-menu-item;
  color: ${l.theme.colors.text};
`,d=a.css`
  label: menu-item-anchor;
  position: relative;
  text-decoration: none;
  color: ${l.theme.colors.muted};
  display: flex;
  gap: ${l.theme.spacing.s};
  align-items: center;
  transition: color 150ms linear;

  &:hover {
    color: ${l.theme.colors.text};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -${l.theme.spacing.xxs};
    left: 0;
    width: 100%;
    height: ${l.theme.spacing.xxxs};
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
`,u=a.css`
  label: menu-item;
  height: 100%;
  padding: ${l.theme.spacing.zero} ${l.theme.spacing.l};
  display: flex;
  gap: ${l.theme.spacing.s};
  align-items: center;
  cursor: pointer;
  color: ${l.theme.colors.text};
  font-size: ${l.theme.fontSize.m};
  @media ${s.breakpoints.phone} {
    padding: ${l.theme.spacing.zero} ${l.theme.spacing.m};
  }
`;t.MenuItem=({label:e,active:t,href:n,onClick:o,icon:s})=>{const l=(0,a.cx)(d,t?c:void 0),m=(0,r.isNil)(n)?o:void 0;return i.default.createElement("li",{className:u,onClick:m},i.default.createElement("a",{href:n,className:l},i.default.createElement(s,null),i.default.createElement("span",null,e)))}},7117:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProvideMobileContext=t.useMobileContext=t.MobileContext=void 0;const o=n(96486),a=n(67294);t.MobileContext=(0,a.createContext)({isMenuOpen:!1,setMenuOpen:o.noop}),t.useMobileContext=()=>(0,a.useContext)(t.MobileContext),t.useProvideMobileContext=()=>{const[e,t]=(0,a.useState)(!1);return{isMenuOpen:e,setMenuOpen:t}}},35625:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MobileHeader=void 0;const a=n(18592),r=o(n(67294)),i=n(19446),s=n(19187),l=n(66118),c=a.css`
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
`;t.MobileOverlay=({name:e,children:t,href:n,version:o})=>{const{isMenuOpen:s,setMenuOpen:m}=(0,l.useMobileContext)();return r.default.createElement("div",{className:(0,a.cx)(d,s?void 0:u)},r.default.createElement(c.MobileHeader,{href:n,actionIcon:i.HiXMark,onAction:()=>m(!1),name:e,version:o}),t)}},65601:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStartItem=void 0;const a=n(18592),r=o(n(67294)),i=n(19446),s=n(80887),l=n(40704),c=a.css`
  label: quick-start-item;
  display: flex;
  flex-direction: row;
  gap: ${i.theme.spacing.xxm};
  margin-top: ${i.theme.spacing.xxxl};
  width: 100%;
`,d=a.css`
  label: quick-start-item-circle;
  @media ${s.breakpoints.phone} {
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
`,u=a.css`
  label: quick-start-item-title;
  font-size: ${i.theme.fontSize.m};
  color: ${i.theme.colors.text};
  text-transform: uppercase;
`,m=a.css`
  label: quick-start-item-content;
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.m};
`,h=a.css`
  label: quick-start-item-container;
  width: 100%;
`,p={theme:"light",host:"docs",lineWrap:!0};t.QuickStartItem=({index:e,descriptor:t})=>r.default.createElement("div",{className:c},r.default.createElement("div",{className:d},e),r.default.createElement("div",{className:h},r.default.createElement("h3",{className:u},t.title),r.default.createElement("div",{className:m},r.default.createElement(l.MarkdownView,{content:t.content,syntaxHighlighterProps:p}))))},20519:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const a=o(n(67294)),r=n(19446),i=n(14757);t.SvgLogo=({color:e=r.theme.colors.green,width:t,height:n})=>{const[o,s]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,n);return a.default.createElement("svg",{width:o,height:s,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},44702:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,a)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SyntaxHighlighter=void 0;const s=n(18592),l=r(n(67294)),c=n(70077),d=i(n(86032)),u=n(74855),m=n(19446),h=n(69274),p=n(96486),f=n(98452),g={light:(0,f.createPrismTheme)(d.default,m.theme.colors.dark1),medium:(0,f.createPrismTheme)(d.default,m.theme.colors.dark2),dark:(0,f.createPrismTheme)(d.default,m.theme.colors.dark4)},b={light:m.theme.colors.dark2,medium:m.theme.colors.dark4,dark:m.theme.colors.dark1},x=s.css`
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
`,v=s.css`
  position: relative;
  flex-grow: ${m.theme.flex.grow};
  height: 100vh;

  pre {
    min-height: 100%;
  }

  .react-syntax-highlighter-line-number {
    color: rgba(255, 255, 255, 0.4) !important;
  }
`;t.SyntaxHighlighter=({children:e,language:t,lineWrap:n,theme:o,host:a,renderer:r})=>{const[i,d]=(0,l.useState)(!1),[f,y]=(0,l.useState)(void 0),_="editor"===a?v:x;return l.default.createElement("div",{className:_},l.default.createElement(c.Prism,{language:t,style:g[o],wrapLongLines:n,showLineNumbers:"editor"===a,...(0,p.isNil)(r)?{}:{renderer:r}},e),l.default.createElement(u.CopyToClipboard,{text:e,onCopy:(e,t)=>{(0,p.isNil)(f)||(clearTimeout(f),y(void 0)),d(t),y(setTimeout((()=>{d(!1)}),2e3))}},l.default.createElement("button",{className:($=b[o],s.css`
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
  background-color: ${$};
  color: ${m.theme.colors.text};
  box-shadow: rgba(0, 0, 0, 0.05) ${m.theme.spacing.zero} ${m.theme.spacing.xs} ${m.theme.spacing.s};
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`)},i?l.default.createElement(h.HiCheck,null):l.default.createElement(h.HiClipboard,null))));var $}},66999:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TBody=t.THead=t.Td=t.Th=t.Tr=t.Table=void 0;const a=n(18592),r=o(n(67294)),i=n(19446),s=a.css`
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
`;t.Td=({children:e,className:t,...n})=>r.default.createElement("td",{...n,className:(0,a.cx)(m,t)},e);const h=a.css`
  border-width: ${i.theme.spacing.zero};
`;t.THead=({children:e,className:t,...n})=>r.default.createElement("thead",{...n,className:(0,a.cx)(h,t)},e);const p=a.css`
  border-width: ${i.theme.spacing.zero};
`;t.TBody=({children:e,className:t,...n})=>r.default.createElement("tbody",{...n,className:(0,a.cx)(p,t)},e)},46161:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.containerStyle=void 0;const o=n(18592),a=n(80887),r=n(19446);t.containerStyle=o.css`
  label: container;
  display: flex;
  @media ${a.breakpoints.desktop} {
    width: 90%;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  @media ${a.breakpoints.tablet} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: ${r.theme.spacing.zero} ${r.theme.spacing.m};
    margin-left: auto;
    margin-right: auto;
  }

  @media ${a.breakpoints.phone} {
    max-width: 100vw;
    box-sizing: border-box;
    padding: ${r.theme.spacing.zero} ${r.theme.spacing.m};
    margin-left: auto;
    margin-right: auto;
  }
`},98452:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createPrismTheme=void 0;const o=n(96486),a=n(19446);t.createPrismTheme=function(e,t){const n={'pre[class*="language-"]':{backgroundColor:t,borderRadius:a.theme.spacing.zero,padding:a.theme.spacing.xxm,width:"100%",maxWidth:"100%",borderWidth:a.theme.spacing.zero,margin:a.theme.spacing.zero,fontSize:a.theme.fontSize.code,fontFamily:a.theme.fontFamily.monospace}},r=(0,o.cloneDeep)(e);return(0,o.values)(r).forEach((e=>{delete e.background,delete e.backgroundColor,e.textShadow=`rgb(0 0 0 / 30%) ${a.theme.spacing.zero} ${a.theme.spacing.zero} ${a.theme.spacing.xxs}`,e.fontSize=a.theme.fontSize.code,e.fontFamily=a.theme.fontFamily.monospace})),(0,o.merge)(r,n)}},14757:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,n,o){return void 0!==n&&void 0===o?[n,t/e*n]:void 0!==o&&void 0===n?[o,e/t*o]:void 0!==n&&void 0!==o?[n,o]:[e,t]}},63413:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const o=n(26729),a=n(80887),r=n(19446);t.globalStyles=o.css`
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
`},77255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,t.links={docs:()=>"/docs/documentation",doc:e=>`/docs/documentation/${e}`,editor:()=>"/docs/editor",index:()=>"/docs"}},82509:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.markdownPages=void 0,t.markdownPages={customGeneratorsPage:{bundle:"documentation-CustomGenerators",name:"Custom Generators",description:"In this guide you'll learn how to create custom generators using Oats",importPath:"src/bundles/documentation/DocumentationBundle_CustomGenerators.tsx",md:"CustomGenerators"},generatePage:{bundle:"documentation-Generate",name:"Generate",description:"In this guide you'll learn how the generator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Generate.tsx",md:"Generate"},openApi101Page:{bundle:"documentation-OpenAPI101",name:"OpenAPI 101",description:"In this guide I'll share some DOs and DON'Ts, when constructing an OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_OpenAPI101.tsx",md:"OpenAPI101"},readPage:{bundle:"documentation-Read",name:"Read",description:"In this guide you'll learn how the reader step works.",importPath:"src/bundles/documentation/DocumentationBundle_Read.tsx",md:"Read"},sdkErrorHandlingPage:{bundle:"documentation-SdkErrorHandling",name:"Error handling",description:"In this example you'll learn the recommended approach to handle errors when using the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkErrorHandling.tsx",md:"SdkErrorHandling"},sdkGettingStartedPage:{bundle:"documentation-SdkGettingStarted",name:"Getting started",description:"In this guide you'll learn how to generate an SDK and (necessary related code) based on your OpenAPI document.",importPath:"src/bundles/documentation/DocumentationBundle_SdkGettingStarted.tsx",md:"SdkGettingStarted"},sdkTypesPage:{bundle:"documentation-SdkTypes",name:"SDK related types",description:"This guide will showcase the main types generated for the client side.",importPath:"src/bundles/documentation/DocumentationBundle_SdkTypes.tsx",md:"SdkTypes"},sdkUsagePage:{bundle:"documentation-SdkUsage",name:"SDK usage",description:"In this guide you'll learn the basic usage of the generated SDK.",importPath:"src/bundles/documentation/DocumentationBundle_SdkUsage.tsx",md:"SdkUsage"},serverApiExamplePage:{bundle:"documentation-ServerApiExample",name:"Example API",description:"In this guide you'll see a basic API implementation using the book store example.",importPath:"src/bundles/documentation/DocumentationBundle_ServerApiExample.tsx",md:"ServerApiExample"},serverCorsPage:{bundle:"documentation-ServerCors",name:"Implement CORS",description:"In this guide you'll learn how to make your Oats and express based server CORS enabled.",importPath:"src/bundles/documentation/DocumentationBundle_ServerCors.tsx",md:"ServerCors"},serverGettingStartedPage:{bundle:"documentation-ServerGettingStarted",name:"Getting started",description:"This guide will help you getting started with generating server side code using Oats.",importPath:"src/bundles/documentation/DocumentationBundle_ServerGettingStarted.tsx",md:"ServerGettingStarted"},serverSetupPage:{bundle:"documentation-ServerSetup",name:"Express server setup",description:"In this guide you'll learn how to set up generated Oats code with your existing [express](https://expressjs.com) backend.",importPath:"src/bundles/documentation/DocumentationBundle_ServerSetup.tsx",md:"ServerSetup"},serverTypesPage:{bundle:"documentation-ServerTypes",name:"Server types",description:"This guide will showcase the main types generated for the server side.",importPath:"src/bundles/documentation/DocumentationBundle_ServerTypes.tsx",md:"ServerTypes"},validatePage:{bundle:"documentation-Validate",name:"Validate",description:"In this guide you'll learn how the validator step works.",importPath:"src/bundles/documentation/DocumentationBundle_Validate.tsx",md:"Validate"},welcomePage:{bundle:"documentation-Welcome",name:"Welcome to the docs!",description:"Oats in one sentence is a free and open source project, that can generate Typescript code from your OpenAPI documents.",importPath:"src/bundles/documentation/DocumentationBundle_Welcome.tsx",md:"Welcome"},writePage:{bundle:"documentation-Write",name:"Write",description:"In this guide you'll learn how the writer step works.",importPath:"src/bundles/documentation/DocumentationBundle_Write.tsx",md:"Write"}}},5973:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;const a=n(18592),r=o(n(67294)),i=n(46161),s=n(19446),l=n(80887),c=n(66118),d=n(26638),u=n(77255),m=a.css`
  label: header;
  width: 100%;
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  @media ${l.breakpoints.phone} {
    display: none;
  }
`,h=a.css`
  label: header-content;
  height: ${s.theme.spacing.xxh};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;t.Header=()=>r.default.createElement("header",{className:m},r.default.createElement("div",{className:(0,a.cx)(h,i.containerStyle)},r.default.createElement(c.Logo,{version:!1,href:u.links.index()}),r.default.createElement(d.LandingPageMenu,null)))},51442:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Headlines=void 0;const a=n(18592),r=o(n(67294)),i=n(69274),s=n(19446),l=n(78436),c=n(80887),d=n(77255),u=a.css`
  label: headlines;
  display: flex;
  flex-direction: row;
  gap: ${s.theme.spacing.l};

  @media ${c.breakpoints.phone} {
    flex-direction: column;
    gap: ${s.theme.spacing.h};
  }
`,m=a.css`
  label: headlines-items-container;
  color: ${s.theme.colors.muted};
  display: flex;
  flex-direction: column;
  flex: 1 0 1px;
  font-size: ${s.theme.fontSize.m};
`,h=a.css`
  label: headlines-item-header;
  display: flex;
  align-items: center;
  gap: ${s.theme.spacing.xs};
  text-transform: uppercase;
  color: ${s.theme.colors.text};
  font-size: ${s.theme.fontSize.m};
  margin-top: ${s.theme.spacing.zero};
`,p=a.css`
  label: headlines-item-content;
  margin-bottom: ${s.theme.spacing.l};
  flex: ${s.theme.flex.grow};
  flex-shrink: 0;
`;t.Headlines=()=>r.default.createElement("div",{className:u},r.default.createElement("div",{className:m},r.default.createElement("h3",{className:h},r.default.createElement(i.HiPuzzlePiece,null),"Generate an SDK"),r.default.createElement("section",{className:p},"Create an easy to use, statically typed SDK for interacting with your backend, with all the bells and whistles! Use it either in house, or expose it to your customers."),r.default.createElement(l.Button,{href:d.links.doc("SdkGettingStarted")},r.default.createElement(i.HiBookOpen,null),"Learn more")),r.default.createElement("div",{className:m},r.default.createElement("h3",{className:h},r.default.createElement(i.HiServerStack,null),"Generate the backend"),r.default.createElement("section",{className:p},"Generate all the tedious-to-maintain parts of your backend, like routing, CORS, parsing and serialization of parameters and bodies, and just implement moving data."),r.default.createElement(l.Button,{href:d.links.doc("ServerGettingStarted")},r.default.createElement(i.HiBookOpen,null),"Learn more")),r.default.createElement("div",{className:m},r.default.createElement("h3",{className:h},r.default.createElement(i.HiWrenchScrewdriver,null),"See it in action!"),r.default.createElement("section",{className:p},"Check out the configuration editor, right here in your browser! See the generated output in real time as you edit the configuration! ",r.default.createElement("br",null),r.default.createElement("b",null,"YOUR data stays in YOUR browser!")),r.default.createElement(l.Button,{href:d.links.editor()},r.default.createElement(i.HiCog6Tooth,null),"Go to editor")))},19388:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.HeroSection=void 0;const a=n(18592),r=o(n(67294)),i=n(19446),s=n(78436),l=n(80887),c=n(69274),d=n(3930),u=n(46161),m=n(77255),h=a.css`
  label: hero-section;
  width: 100%;
  margin: ${i.theme.spacing.zero};
  padding: ${i.theme.spacing.xh} ${i.theme.spacing.zero};
  @media ${l.breakpoints.desktop} {
    padding: ${i.theme.spacing.xxh} ${i.theme.spacing.zero};
  }
  @media ${l.breakpoints.tablet} {
    padding: ${i.theme.spacing.xh} ${i.theme.spacing.zero};
  }
`,p=a.css`
  label: hero-section-content;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: ${i.theme.spacing.xxm};
  height: 100%;
`,f=a.css`
  label: hero-text-1;
  font-size: ${i.theme.fontSize.xl};
  color: ${i.theme.colors.text};
  margin: ${i.theme.spacing.zero};
  text-align: center;
`,g=a.css`
  label: hero-text-2;
  color: ${i.theme.colors.muted};
  font-size: ${i.theme.fontSize.m};
  font-weight: 400;
  margin: ${i.theme.spacing.zero} ${i.theme.spacing.zero} ${i.theme.spacing.xxm} ${i.theme.spacing.zero};
  width: 70%;
  text-align: center;
  flex-shrink: 0;
`,b=a.css`
  label: hero-button-container;
  display: flex;
  gap: ${i.theme.spacing.m};
`;t.HeroSection=()=>r.default.createElement("div",{className:h},r.default.createElement("div",{className:(0,a.cx)(u.containerStyle,p)},r.default.createElement("h2",{className:f},"Generate TypeScript from OpenAPI, that makes sense."),r.default.createElement("h3",{className:g},"Customizable, extensible and ",r.default.createElement("b",null,"open source")," code generators, that output quality"," ",r.default.createElement(d.Link,{href:"https://www.typescriptlang.org"},"TypeScript"),", from your"," ",r.default.createElement(d.Link,{href:"https://www.openapis.org"},"OpenAPI")," definitions."),r.default.createElement("div",{className:b},r.default.createElement(s.Button,{variant:"primary",href:m.links.doc("SdkGettingStarted")},r.default.createElement(c.HiPlay,null)," Get Started"),r.default.createElement(s.Button,{href:"https://github.com/oats-ts/oats-ts"},r.default.createElement(c.HiCodeBracket,null)," Github"))))},802:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPage=void 0;const a=o(n(67294)),r=n(60488),i=n(18023),s=n(51442),l=n(19388),c=n(5973),d=n(10186),u=n(90120),m=n(8015),h=n(7117),p=n(80887),f=n(26638),g=n(77255),b=()=>{const e=(0,h.useProvideMobileContext)();return a.default.createElement(h.MobileContext.Provider,{value:e},a.default.createElement(m.MobileHeaderWithOverlay,{version:!1,href:g.links.index()},a.default.createElement(f.LandingPageMenu,null)))};t.LandingPage=()=>a.default.createElement(u.AppContainer,null,a.default.createElement(c.Header,null),a.default.createElement(p.BreakPoint,{Component:b,breakpoint:"phone"}),a.default.createElement(r.Content,null,a.default.createElement(l.HeroSection,null),a.default.createElement(s.Headlines,null),a.default.createElement(d.QuickStart,null)),a.default.createElement(i.Footer,null))},26638:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LandingPageMenu=void 0;const a=o(n(67294)),r=n(69274),i=n(16507),s=n(69585),l=n(77255);t.LandingPageMenu=()=>a.default.createElement(i.MenuBar,null,a.default.createElement(s.MenuItem,{label:"Home",icon:r.HiHome,href:l.links.index(),active:!0}),a.default.createElement(s.MenuItem,{label:"Documentation",icon:r.HiDocument,href:l.links.docs()}),a.default.createElement(s.MenuItem,{label:"Editor",icon:r.HiCog6Tooth,href:l.links.editor()}))},10186:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.QuickStart=void 0;const a=n(18592),r=o(n(67294)),i=n(69274),s=n(19446),l=n(65601),c=n(36002),d=a.css`
  label: quick-start;
  margin-bottom: ${s.theme.spacing.xxxl};
`,u=a.css`
  label: quick-start-title;
  font-size: ${s.theme.fontSize.xl};
  color: ${s.theme.colors.text};
  margin-top: ${s.theme.spacing.xh};
  margin-bottom: ${s.theme.spacing.zero};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s.theme.spacing.s};
`,m=[c.quickStart.installOatsDescriptor,c.quickStart.prepareInputDescriptor,c.quickStart.configureOatsDescriptor,c.quickStart.runOatsDescriptor,c.quickStart.verifyResultsDescriptor,c.quickStart.nextStepsDescriptor];t.QuickStart=()=>r.default.createElement(r.default.Fragment,null,r.default.createElement("h2",{className:u},r.default.createElement(i.HiBeaker,null)," Quick start"),r.default.createElement("div",{className:d},m.map(((e,t)=>r.default.createElement(l.QuickStartItem,{key:t,index:t+1,descriptor:e})))))},36002:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.quickStart=void 0;const a=o(n(57108)),r=o(n(47114)),i=o(n(52219)),s=o(n(43191)),l=o(n(67470)),c=o(n(29515)),d={title:"Configure Oats",content:a.default.substring(a.default.indexOf("\n")+1).trim()},u={title:"Install Oats",content:r.default.substring(r.default.indexOf("\n")+1).trim()},m={title:"Next steps",content:i.default.substring(i.default.indexOf("\n")+1).trim()},h={title:"Prepare your OpenAPI document",content:s.default.substring(s.default.indexOf("\n")+1).trim()},p={title:"Run Oats",content:l.default.substring(l.default.indexOf("\n")+1).trim()},f={title:"Verify results",content:c.default.substring(c.default.indexOf("\n")+1).trim()};t.quickStart={configureOatsDescriptor:d,installOatsDescriptor:u,nextStepsDescriptor:m,prepareInputDescriptor:h,runOatsDescriptor:p,verifyResultsDescriptor:f}},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444",transparentWhite:"rgba(255, 255, 255, 0.2)"},fontSize:{code:"1.1rem",xxs:"0.85rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=34553)}]);
//# sourceMappingURL=index.bundle.js.map