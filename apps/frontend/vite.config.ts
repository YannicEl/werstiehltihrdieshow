import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnvFile } from 'node:process';
import unocss from 'unocss/vite';
import icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

loadEnvFile('./.dev.vars');

export default defineConfig({
	plugins: [sveltekit(), unocss(), icons({ compiler: 'svelte' })],
});
