import { getRequestEvent } from '$app/server';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { createAuth, type CreateAuthParams } from './index';
export { svelteKitHandler } from 'better-auth/svelte-kit';

export type CreateSvelteKitAuth = {} & Omit<CreateAuthParams, 'plugins'>;

export type SvelteKitAuth = Awaited<ReturnType<typeof createSvelteKitAuth>>;

export function createSvelteKitAuth({ db, secret }: CreateSvelteKitAuth) {
	return createAuth({
		db,
		secret,
		plugins: [sveltekitCookies(getRequestEvent)],
	});
}
