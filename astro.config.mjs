// // @ts-check
// import { defineConfig } from 'astro/config';
// import mdx from '@astrojs/mdx';
// import sitemap from '@astrojs/sitemap';

// // https://astro.build/config
// export default defineConfig({
// 	site: 'https://example.com',
// 	integrations: [mdx(), sitemap()],
// });

// import { defineConfig } from 'astro/config';

// export default defineConfig({
//   output: 'static' // This is actually the default
// });

import { defineConfig } from 'astro/config';
import deno from '@deno/astro-adapter';

export default defineConfig({
  output: 'server',
  adapter: deno(),
});