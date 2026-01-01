import adapter from '@sveltejs/adapter-cloudflare';
import type { Config } from '@sveltejs/kit';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			platformProxy: {
				environment: 'dev',
				remoteBindings: true,
				persist: false,
			},
		}),
		experimental: {
			remoteFunctions: true,
		},
	},
	compilerOptions: {
		experimental: {
			async: true,
		},
	},
} satisfies Config;
