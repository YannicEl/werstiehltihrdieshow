import { building } from '$app/environment';
import { useDB } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from '@werstiehltihrdieshow/auth/svelteKit';
import { useAuth } from './lib/server/auth';

const main: Handle = async ({ event, resolve }) => {
	event.locals.db = await useDB();
	event.locals.auth = await useAuth();

	return resolve(event);
};

const autHandle: Handle = async ({ event, resolve }) => {
	const auth = await useAuth(event);

	const result = await auth.api.getSession({
		headers: event.request.headers,
	});

	if (result) {
		const { user } = result;
		event.locals.session = {
			user: {
				id: Number(user.id),
				publicId: user.publicId,
				email: user.email,
			},
		};
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle = sequence(main, autHandle);
