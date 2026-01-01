export const load = async ({ locals: { auth } }) => {
	await auth.api.signInAnonymous();
};
