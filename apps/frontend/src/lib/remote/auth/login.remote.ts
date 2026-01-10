import { form, getRequestEvent } from '$app/server';
import { useAuth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const login = form(async () => {
	const event = await getRequestEvent();
	const auth = await useAuth();

	const callbackURL = new URL('/profile', event.url.origin).toString();

	const result = await auth.api.signInSocial({
		body: {
			provider: 'google',
			callbackURL,
		},
	});

	if (result.url) {
		return redirect(307, result.url);
	}
});
