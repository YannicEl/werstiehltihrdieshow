import { query } from '$app/server';
import { useDB } from '$lib/server/db';
import { inArray } from '@werstiehltihrdieshow/db/operators';
import { getUserAvatarBlobSchema } from './schema';

export const getUserAvatarBlob = query.batch(getUserAvatarBlobSchema, async (inputs) => {
	const db = await useDB();

	const userPublicIds = inputs.map((input) => input.userPublicId);

	const users = await db.query.user.findMany({
		where: {
			RAW: (table) => inArray(table.publicId, userPublicIds),
		},
		columns: {
			publicId: true,
		},
		with: {
			avatarBlob: {
				columns: {
					publicId: true,
				},
			},
		},
	});

	const lookup = new Map(users.map((user) => [user.publicId, user.avatarBlob?.publicId]));

	return ({ userPublicId }) => {
		const avatarBlobPublicId = lookup.get(userPublicId);
		if (!avatarBlobPublicId) {
			return undefined;
		} else {
			return {
				publicId: avatarBlobPublicId,
			};
		}
	};
});
