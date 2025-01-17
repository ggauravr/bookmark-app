// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-netlify';

// SETUP: Add this to use <style> tags in your Svelte components as PostCSS
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			edge: false,
			split: true
		})
	},
	// SETUP: Add this here to use <style> tags in your Svelte components as PostCSS
	preprocess: vitePreprocess()
};

export default config;
