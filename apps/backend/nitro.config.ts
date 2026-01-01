import { defineConfig } from 'nitro';

export default defineConfig({
	serverDir: './',
	compatibilityDate: '2025-12-29',
	preset: 'cloudflare_module',
	cloudflare: {
		deployConfig: true,
		nodeCompat: true,
	},
});
