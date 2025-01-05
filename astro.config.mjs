// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// import netlify from '@astrojs/netlify';

// https://astro.build/config

export default defineConfig({
  site: 'https://www.ms.mff.cuni.cz',
  base: '/~zapotocf',
  integrations: [mdx(), sitemap()],
  output: 'static',
  build: {
    assets: 'assets'
  },
  // trailingSlash: 'always' // This helps with consistent path handling
});
/*export default defineConfig({
  site: 'https://www.ms.mff.cuni.cz/~zapotocf/',
  integrations: [mdx(), sitemap()],
  // adapter: netlify(),

  server: {
    host: '0.0.0.0',
    port: 3003
  },
  base: '/',
});*/

// import { defineConfig } from 'astro/config';

// export default defineConfig({
//   output: 'static' // This is actually the default
// });


// import { defineConfig } from 'astro/config';
// import deno from '@deno/astro-adapter';

// export default defineConfig({
//   output: 'server',
//   adapter: deno(),
// });