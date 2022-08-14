// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
    }),
    prerender: {
      default: true,
    },
  },
  extensions: ['.svelte', '.md'],
  preprocess: [
    sveltePreprocess(),
    mdsvex({
      extensions: ['.md'],
      layout: {
        blog: 'src/routes/blog/postLayout.svelte',
      },
    }),
  ],
};

export default config;
