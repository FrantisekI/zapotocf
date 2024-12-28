import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://example.com',
    integrations: [mdx(), sitemap()],
    output: 'static',
    trailingSlash: 'never', // Ensures no trailing slashes
    build: {
        format: 'file', // Outputs as files with .html
    },
    vite: {
        plugins: [
            {
                name: 'rewrite-html-links',
                generateBundle(_, bundle) {
                    for (const fileName in bundle) {
                        const file = bundle[fileName];
                        if (file.type === 'asset' && file.fileName.endsWith('.html')) {
                            file.source = file.source.replace(
                                /href="([^"]+)(?<!\.html)(?<!\/)"/g,
                                'href="$1.html"'
                            );
                        }
                    }
                },
            },
        ],
    },
});
