export const load = async ({ locals: { session, auth } }) => {
	if (!session) {
		await auth.api.signInAnonymous();
	}
};
