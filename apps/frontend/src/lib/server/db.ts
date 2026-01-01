import { getRequestEvent } from '$app/server';
import type { RequestEvent } from '@sveltejs/kit';
import { createDrizzleClient } from '@werstiehltihrdieshow/db/client';

export async function useDB(event?: RequestEvent) {
	event = event ?? (await getRequestEvent());
	if (!event.locals.db) {
		if (!event.platform?.env?.DB) throw new Error('D1Database not found');
		event.locals.db = createDrizzleClient(event.platform.env.DB);
	}

	return event.locals.db;
}
