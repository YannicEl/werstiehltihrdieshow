import { getRequestEvent, query } from '$app/server';
import { user } from '@werstiehltihrdieshow/db/schema/user.schema';

export const getUsers = query(async () => {
	const event = await getRequestEvent();

	const t1 = performance.now();
	const users = await event.locals.db.query.user.findMany();
	const t2 = performance.now();

	return {
		select: t2 - t1,
		users,
	};
});

export const createUser = query(async () => {
	const event = await getRequestEvent();

	const t1 = performance.now();
	await event.locals.db.insert(user).values({
		email: `${Math.random()}@test.com`,
		name: 'Test User',
	});
	const t2 = performance.now();

	return {
		insert: t2 - t1,
	};
});
