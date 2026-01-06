import { query } from '$app/server';
import { useDB } from '$lib/server/db';
import { getUserSchema } from './schema';

export const getUser = query(getUserSchema, async (data) => {
	const db = await useDB();

	const user = await db.query.user.findFirst({
		where:
			'userId' in data
				? {
						id: data.userId,
					}
				: {
						publicId: data.userPublicId,
					},
		with: {
			avatarBlob: true,
		},
	});

	return user;
});
