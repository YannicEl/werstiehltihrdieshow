import { getRequestEvent } from '$app/server';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { createSvelteKitAuth } from '@werstiehltihrdieshow/auth/svelteKit';
import { useDB } from './db';

export type Session = {
	user: {
		id: number;
		publicId: string;
		email: string;
	};
};

export async function createAuth(event: RequestEvent) {
	const db = await useDB();

	return createSvelteKitAuth({
		db,
		secret: process.env.BETTER_AUTH_SECRET,
	});
}

export async function useAuth(event?: RequestEvent) {
	event = event ?? (await getRequestEvent());
	if (!event.locals.auth) {
		event.locals.auth = await createAuth(event);
	}

	return event.locals.auth;
}

export async function requireLogin() {
	const { locals, url } = await getRequestEvent();

	if (!locals.session) {
		const params = new URLSearchParams();
		params.append('redirectTo', `${url.pathname}${url.searchParams.toString()}`);

		return redirect(307, `/register/`);
	}

	return locals.session;
}
