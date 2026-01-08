import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnvFile } from 'node:process';
import unocss from 'unocss/vite';
import icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

if (process.env.NODE_ENV === 'development') {
	loadEnvFile('./.env');
}

export default defineConfig({
	plugins: [sveltekit(), unocss(), icons({ compiler: 'svelte' })],
});
