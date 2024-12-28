import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BMdjA6Pa.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/blog.astro.mjs');
const _page1 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page2 = () => import('./pages/kariera.astro.mjs');
const _page3 = () => import('./pages/konicky/balet.astro.mjs');
const _page4 = () => import('./pages/konicky/cestovani.astro.mjs');
const _page5 = () => import('./pages/konicky.astro.mjs');
const _page6 = () => import('./pages/rss.xml.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/blog/index.astro", _page0],
    ["src/pages/blog/[...slug].astro", _page1],
    ["src/pages/kariera/index.astro", _page2],
    ["src/pages/konicky/balet.astro", _page3],
    ["src/pages/konicky/cestovani.astro", _page4],
    ["src/pages/konicky/index.astro", _page5],
    ["src/pages/rss.xml.js", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "e67c6881-f228-43b6-9a0b-bb1e9a6244eb"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
