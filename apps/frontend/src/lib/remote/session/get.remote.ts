import { getRequestEvent, query } from '$app/server';

export const getSession = query(async () => {
	const event = await getRequestEvent();

	return event.locals.session;
});
