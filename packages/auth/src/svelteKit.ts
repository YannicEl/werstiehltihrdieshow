import { getRequestEvent } from '$app/server';
import { anonymous } from 'better-auth/plugins';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { createAuth, type CreateAuthParams } from './index';
export { svelteKitHandler } from 'better-auth/svelte-kit';

export type CreateSvelteKitAuth = {} & Omit<CreateAuthParams, 'plugins'>;

export type SvelteKitAuth = Awaited<ReturnType<typeof createSvelteKitAuth>>;

export function createSvelteKitAuth({ db, secret, google }: CreateSvelteKitAuth) {
	return createAuth({
		db,
		secret,
		plugins: [
			anonymous({
				emailDomainName: 'werstiehltihrdie.show',
			}),
			sveltekitCookies(getRequestEvent),
		],
		google,
	});
}
