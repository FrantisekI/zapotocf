import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_CItOd-EH.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/zapot/Documents/programov%C3%A1n%C3%AD/weby-frontend/mff%20osobni%20stranka/zapotocf/","adapterName":"@astrojs/netlify","routes":[{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"kariera/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/kariera","isIndex":true,"type":"page","pattern":"^\\/kariera\\/?$","segments":[[{"content":"kariera","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/kariera/index.astro","pathname":"/kariera","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"konicky/balet/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/konicky/balet","isIndex":false,"type":"page","pattern":"^\\/konicky\\/balet\\/?$","segments":[[{"content":"konicky","dynamic":false,"spread":false}],[{"content":"balet","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/konicky/balet.astro","pathname":"/konicky/balet","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"konicky/cestovani/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/konicky/cestovani","isIndex":false,"type":"page","pattern":"^\\/konicky\\/cestovani\\/?$","segments":[[{"content":"konicky","dynamic":false,"spread":false}],[{"content":"cestovani","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/konicky/cestovani.astro","pathname":"/konicky/cestovani","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"konicky/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/konicky","isIndex":true,"type":"page","pattern":"^\\/konicky\\/?$","segments":[[{"content":"konicky","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/konicky/index.astro","pathname":"/konicky","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://example.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/kariera/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/konicky/balet.astro",{"propagation":"none","containsHead":true}],["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/konicky/cestovani.astro",{"propagation":"none","containsHead":true}],["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/konicky/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/index.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/kariera/index@_@astro":"pages/kariera.astro.mjs","\u0000@astro-page:src/pages/konicky/balet@_@astro":"pages/konicky/balet.astro.mjs","\u0000@astro-page:src/pages/konicky/cestovani@_@astro":"pages/konicky/cestovani.astro.mjs","\u0000@astro-page:src/pages/konicky/index@_@astro":"pages/konicky.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BMdjA6Pa.mjs","C:\\Users\\zapot\\Documents\\programování\\weby-frontend\\mff osobni stranka\\zapotocf\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Users\\zapot\\Documents\\programování\\weby-frontend\\mff osobni stranka\\zapotocf\\.astro\\content-modules.mjs":"chunks/content-modules_DlGf2uRE.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_Bi9WsPbS.mjs","C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BBSjFMIy.mjs","C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/content/blog/using-mdx.mdx?astroPropagatedAssets":"chunks/using-mdx_DhYwsj3X.mjs","C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/content/blog/using-mdx.mdx":"chunks/using-mdx_Bvnw_O5g.mjs","C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/konicky/balet.astro?astro&type=script&index=0&lang.ts":"_astro/balet.astro_astro_type_script_index_0_lang.l0sNRNKZ.js","C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/node_modules/@astro-community/astro-embed-vimeo/Vimeo.astro?astro&type=script&index=0&lang.ts":"_astro/Vimeo.astro_astro_type_script_index_0_lang.CgRsrQuG.js","C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/node_modules/@astro-community/astro-embed-youtube/YouTube.astro?astro&type=script&index=0&lang.ts":"_astro/YouTube.astro_astro_type_script_index_0_lang.Dkyb9mLy.js","C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/konicky/cestovani.astro?astro&type=script&index=0&lang.ts":"_astro/cestovani.astro_astro_type_script_index_0_lang.l0sNRNKZ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/konicky/balet.astro?astro&type=script&index=0&lang.ts",""],["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/node_modules/@astro-community/astro-embed-vimeo/Vimeo.astro?astro&type=script&index=0&lang.ts","class t extends HTMLElement{constructor(){super(...arguments),this.videoId=encodeURIComponent(this.dataset.id)}static{this.preconnected=!1}connectedCallback(){this.addEventListener(\"pointerover\",t.warmConnections,{once:!0}),this.addEventListener(\"click\",e=>this.addIframe(e));const c=this.querySelector(\"a\");if(c){const e=document.createElement(\"button\");e.classList.add(...c.classList.values()),e.setAttribute(\"aria-label\",c.getAttribute(\"aria-label\")),c.replaceWith(e)}}static addPrefetch(c,e){const a=document.createElement(\"link\");a.rel=c,a.href=e,document.head.append(a)}static warmConnections(){t.preconnected||(t.addPrefetch(\"preconnect\",\"https://player.vimeo.com\"),t.addPrefetch(\"preconnect\",\"https://i.vimeocdn.com\"),t.addPrefetch(\"preconnect\",\"https://f.vimeocdn.com\"),t.addPrefetch(\"preconnect\",\"https://fresnel.vimeocdn.com\"),t.preconnected=!0)}addIframe(c){if(this.classList.contains(\"ltv-activated\"))return;c.preventDefault(),this.classList.add(\"ltv-activated\");const e=encodeURIComponent(this.dataset.t||\"0m\"),a=new URLSearchParams(this.dataset.params||[]),n=document.createElement(\"iframe\");n.width=\"640\",n.height=\"360\",n.allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\",n.allowFullscreen=!0,n.src=`https://player.vimeo.com/video/${this.videoId}?${a.toString()}#t=${e}`,this.append(n)}}customElements.get(\"lite-vimeo\")||customElements.define(\"lite-vimeo\",t);"],["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/node_modules/@astro-community/astro-embed-youtube/YouTube.astro?astro&type=script&index=0&lang.ts","class i extends HTMLElement{connectedCallback(){this.videoId=this.getAttribute(\"videoid\");let e=this.querySelector(\".lty-playbtn\");if(this.playLabel=e&&e.textContent.trim()||this.getAttribute(\"playlabel\")||\"Play\",this.dataset.title=this.getAttribute(\"title\")||\"\",this.style.backgroundImage||(this.style.backgroundImage=`url(\"https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg\")`,this.upgradePosterImage()),e||(e=document.createElement(\"button\"),e.type=\"button\",e.classList.add(\"lty-playbtn\"),this.append(e)),!e.textContent){const t=document.createElement(\"span\");t.className=\"lyt-visually-hidden\",t.textContent=this.playLabel,e.append(t)}this.addNoscriptIframe(),e.nodeName===\"A\"&&(e.removeAttribute(\"href\"),e.setAttribute(\"tabindex\",\"0\"),e.setAttribute(\"role\",\"button\"),e.addEventListener(\"keydown\",t=>{(t.key===\"Enter\"||t.key===\" \")&&(t.preventDefault(),this.activate())})),this.addEventListener(\"pointerover\",i.warmConnections,{once:!0}),this.addEventListener(\"focusin\",i.warmConnections,{once:!0}),this.addEventListener(\"click\",this.activate),this.needsYTApi=this.hasAttribute(\"js-api\")||navigator.vendor.includes(\"Apple\")||navigator.userAgent.includes(\"Mobi\")}static addPrefetch(e,t,a){const r=document.createElement(\"link\");r.rel=e,r.href=t,a&&(r.as=a),document.head.append(r)}static warmConnections(){i.preconnected||(i.addPrefetch(\"preconnect\",\"https://www.youtube-nocookie.com\"),i.addPrefetch(\"preconnect\",\"https://www.google.com\"),i.addPrefetch(\"preconnect\",\"https://googleads.g.doubleclick.net\"),i.addPrefetch(\"preconnect\",\"https://static.doubleclick.net\"),i.preconnected=!0)}fetchYTPlayerApi(){window.YT||window.YT&&window.YT.Player||(this.ytApiPromise=new Promise((e,t)=>{var a=document.createElement(\"script\");a.src=\"https://www.youtube.com/iframe_api\",a.async=!0,a.onload=r=>{YT.ready(e)},a.onerror=t,this.append(a)}))}async getYTPlayer(){return this.playerPromise||await this.activate(),this.playerPromise}async addYTPlayerIframe(){this.fetchYTPlayerApi(),await this.ytApiPromise;const e=document.createElement(\"div\");this.append(e);const t=Object.fromEntries(this.getParams().entries());this.playerPromise=new Promise(a=>{let r=new YT.Player(e,{width:\"100%\",videoId:this.videoId,playerVars:t,events:{onReady:n=>{n.target.playVideo(),a(r)}}})})}addNoscriptIframe(){const e=this.createBasicIframe(),t=document.createElement(\"noscript\");t.innerHTML=e.outerHTML,this.append(t)}getParams(){const e=new URLSearchParams(this.getAttribute(\"params\")||[]);return e.append(\"autoplay\",\"1\"),e.append(\"playsinline\",\"1\"),e}async activate(){if(this.classList.contains(\"lyt-activated\"))return;if(this.classList.add(\"lyt-activated\"),this.needsYTApi)return this.addYTPlayerIframe(this.getParams());const e=this.createBasicIframe();this.append(e),e.focus()}createBasicIframe(){const e=document.createElement(\"iframe\");return e.width=560,e.height=315,e.title=this.playLabel,e.allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\",e.allowFullscreen=!0,e.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${this.getParams().toString()}`,e}upgradePosterImage(){setTimeout(()=>{const e=`https://i.ytimg.com/vi_webp/${this.videoId}/sddefault.webp`,t=new Image;t.fetchPriority=\"low\",t.referrerpolicy=\"origin\",t.src=e,t.onload=a=>{a.target.naturalHeight==90&&a.target.naturalWidth==120||(this.style.backgroundImage=`url(\"${e}\")`)}},100)}}customElements.define(\"lite-youtube\",i);"],["C:/Users/zapot/Documents/programování/weby-frontend/mff osobni stranka/zapotocf/src/pages/konicky/cestovani.astro?astro&type=script&index=0&lang.ts",""]],"assets":["/_astro/chrome.f1eQSm4k.svg","/_astro/edge.B7O1xshw.svg","/_astro/firefox.CMmddY9p.svg","/_astro/safari.CdqjFDzc.svg","/_astro/balet.DI5Tvdpn.css","/blog-placeholder-1.jpg","/blog-placeholder-2.jpg","/blog-placeholder-3.jpg","/blog-placeholder-4.jpg","/blog-placeholder-5.jpg","/blog-placeholder-about.jpg","/discord.svg","/email.svg","/favicon.svg","/ja.jpg","/linkedin.svg","/bigfiles/na_lovu.mp4","/bigfiles/posledni_zacatek.mp4","/bigfiles/spanelak.mp4","/fonts/atkinson-bold.woff","/fonts/atkinson-regular.woff","/blog/index.html","/kariera/index.html","/konicky/balet/index.html","/konicky/cestovani/index.html","/konicky/index.html","/rss.xml","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"ebX/C4hl0qnY62lSogLqlHErBpAV4uHbtNF6VpTd9IE="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
