import { form, getRequestEvent } from '$app/server';
import { useAuth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const logout = form(async () => {
	const event = await getRequestEvent();
	const auth = await useAuth();

	await auth.api.signOut({
		headers: event.request.headers,
	});

	redirect(307, '/');
});
