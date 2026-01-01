import { form } from '$app/server';
import { requireLogin, useAuth } from '$lib/server/auth';
import { completeSignupSchema } from './schema';

export const completeSignup = form(completeSignupSchema, async (data) => {
	const {} = await requireLogin();

	const auth = await useAuth();

	await auth.api.updateUser({
		body: {
			name: formData.get('name'),
			image: formData.get('image'),
			color: formData.get('color'),
		},
	});
});
