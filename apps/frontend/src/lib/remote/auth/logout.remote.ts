import { form } from '$app/server';
import { useAuth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const login = form(async () => {
	const auth = await useAuth();

	await auth.api.signOut();

	redirect(307, '/');
});
