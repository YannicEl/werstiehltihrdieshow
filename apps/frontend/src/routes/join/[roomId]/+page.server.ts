import { requireLogin } from '$lib/server/auth.js';
import { useDB } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export const load = async ({ params, locals: { session } }) => {
	const { user } = await requireLogin();

	const db = await useDB();

	const room = db.query.room.findFirst({
		where: {
			publicId: params.roomId,
		},
	});

	if (!room) {
		return json({
			data: 'Room not found',
		});
	}

	// await db.insert(roomToUser).values({
	//   "roomId": room.id,

	// })
};
