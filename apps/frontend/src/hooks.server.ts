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

	const session = await auth.api.getSession({
		headers: event.request.headers,
	});

	console.log(session);

	// if (session) {

	// 	if (user) {
	// 		event.locals.session = {
	// 			user: {
	// 				id: user.id,
	// 				publicId: user.publicId,
	// 				email: user.email,
	// 				firstName: user.firstName,
	// 				lastName: user.lastName,
	// 				emailVerified: session.user.emailVerified,
	// 				twoFactorEnabled: session.user.twoFactorEnabled,
	// 			},
	// 			organisation: {
	// 				id: user.rootOrganisation.id,
	// 				publicId: user.rootOrganisation.publicId,
	// 			},
	// 		};
	// 	}
	// }

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle = sequence(main, autHandle);
