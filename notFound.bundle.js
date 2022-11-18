"use strict";(self.webpackChunk_oats_ts_gh_docs=self.webpackChunk_oats_ts_gh_docs||[]).push([[449],{80887:function(e,t,o){var r=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var a=Object.getOwnPropertyDescriptor(t,o);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,a)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&r(t,e,o);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.BreakPoint=t.breakpoints=void 0;const i=n(o(67294));t.breakpoints={desktop:"(orientation: landscape) and (min-width: 1201px)",tablet:"(orientation: landscape) and (min-width: 856px) and (max-width: 1200px) ",phone:"(orientation: portrait), (max-width: 855px)"},t.BreakPoint=({Component:e,breakpoint:o})=>{const[r,a]=(0,i.useState)((()=>window.matchMedia(t.breakpoints[o]).matches));return(0,i.useEffect)((()=>{window.matchMedia(t.breakpoints[o]).addEventListener("change",(e=>a(e.matches)))}),[]),r?i.default.createElement(e,null):null}},21771:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(o(67294)),n=o(20745),i=o(69274),l=o(90120),s=o(37904);(0,n.createRoot)(document.getElementById("root")).render(a.default.createElement(l.AppContainer,null,a.default.createElement(s.NotFoundPage,{icon:i.HiLink,text:"404 - The page doesn't exist",logo:!0})))},90120:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppContainer=void 0;const a=o(18592),n=o(26729),i=r(o(67294)),l=o(63413),s=o(19446),c=a.css`
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
`;t.AppContainer=({children:e})=>i.default.createElement(i.default.Fragment,null,i.default.createElement(n.Global,{styles:l.globalStyles}),i.default.createElement("div",{className:c},e))},66118:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logo=void 0;const a=o(18592),n=o(67535),i=o(96486),l=r(o(67294)),s=o(19446),c=o(20519),d=a.css`
  label: side-bar-logo;
  display: flex;
  gap: ${s.theme.spacing.m};
  align-items: center;
  text-decoration: none;
`,m=a.css`
  display: flex;
  flex-direction: column;
`,u=a.css`
  label: menu-oats-label;
  font-weight: 700;
  margin: ${s.theme.spacing.zero};
  padding: ${s.theme.spacing.zero};
  font-size: ${s.theme.fontSize.l};
  color: ${s.theme.colors.text};
`,f=a.css`
  color: ${s.theme.colors.muted};
`,h=a.css`
  font-size: ${s.theme.fontSize.s};
  color: ${s.theme.colors.muted};
`;t.Logo=({name:e,version:t,href:o})=>l.default.createElement("a",{className:d,href:o},l.default.createElement(c.SvgLogo,{width:60}),l.default.createElement("div",{className:m},l.default.createElement("h1",{className:u},"Oats ",(0,i.isNil)(e)?null:l.default.createElement("span",{className:f},e)),t&&l.default.createElement("span",{className:h},"v",n.version)))},37904:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.NotFoundPage=void 0;const a=o(18592),n=r(o(67294)),i=o(77255),l=o(19446),s=o(66118),c=a.css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${l.theme.spacing.l};
  font-size: ${l.theme.fontSize.l};
  color: ${l.theme.colors.muted};
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
`,d=a.css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${l.theme.spacing.s};
`;t.NotFoundPage=({text:e,logo:t,icon:o})=>n.default.createElement("div",{className:c},t&&n.default.createElement(s.Logo,{href:i.links.index()}),n.default.createElement("div",{className:d},n.default.createElement(o,null),n.default.createElement("span",null,e)))},20519:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SvgLogo=void 0;const a=r(o(67294)),n=o(19446),i=o(14757);t.SvgLogo=({color:e=n.theme.colors.green,width:t,height:o})=>{const[r,l]=(0,i.getSizeWithAspectRatio)(172.439,111.543,t,o);return a.default.createElement("svg",{width:r,height:l,viewBox:"0 0 45.624 29.512",xmlSpace:"preserve",xmlns:"http://www.w3.org/2000/svg"},a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.264583,strokeOpacity:1},d:"M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z",transform:"translate(-159.982 -111.963)"}),a.default.createElement("path",{style:{fill:e,fillOpacity:1,stroke:e,strokeWidth:.330775,strokeOpacity:1},d:"M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z",transform:"translate(-159.982 -111.963)"}))}},14757:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSizeWithAspectRatio=void 0,t.getSizeWithAspectRatio=function(e,t,o,r){return void 0!==o&&void 0===r?[o,t/e*o]:void 0!==r&&void 0===o?[r,e/t*r]:void 0!==o&&void 0!==r?[o,r]:[e,t]}},63413:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.globalStyles=void 0;const r=o(26729),a=o(80887),n=o(19446);t.globalStyles=r.css`
  #root {
    margin: ${n.theme.spacing.zero};
    padding: ${n.theme.spacing.zero};
    width: 100vw;
    height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${n.theme.fontFamily.sansSerif};
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
    scrollbar-color: ${n.theme.colors.dark2} ${n.theme.colors.dark5};
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 14px;
    height: 14px;
  }

  *::-webkit-scrollbar-track {
    background: ${n.theme.colors.dark5};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${n.theme.colors.dark2};
    border-radius: 7px;
    border: 2px solid ${n.theme.colors.dark5};
  }
  *::-webkit-scrollbar-corner {
    background: ${n.theme.colors.dark5};
  }
`},77255:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.links=void 0,t.links={docs:()=>"/docs/documentation",doc:e=>`/docs/documentation/${e}`,editor:()=>"/docs/editor",index:()=>"/docs"}},19446:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.theme=void 0,t.theme={colors:{transparent:"transparent",dark1:"#323232",dark2:"#212121",dark3:"#1e1e1e",dark4:"#181818",dark5:"#111111",darkHighlight:"#292929",text:"#ffffff",muted:"#aaaaaa",placeholder:"#777777",green:"#238636",buttonHover:"#444444",transparentWhite:"rgba(255, 255, 255, 0.2)"},fontSize:{code:"1.1rem",xxs:"0.85rem",xs:"0.95rem",s:"1rem",m:"1.2rem",xm:"1.4rem",l:"1.8rem",xl:"2rem",xxl:"2.4rem"},fontFamily:{monospace:"'Source Code Pro', monospace",sansSerif:"'Montserrat', sans-serif"},spacing:{zero:"0rem",xxxs:"0.125rem",xxs:"0.25rem",xs:"0.375rem",s:"0.5rem",m:"0.75rem",xm:"1rem",xxm:"1.125rem",l:"1.5rem",xl:"1.625rem",xxl:"2.125rem",xxxl:"2.5rem",h:"3.75rem",xh:"5rem",xxh:"6.25rem"},flex:{grow:"1 1 1px"}}}},e=>{e(e.s=21771)}]);
//# sourceMappingURL=notFound.bundle.js.map