import { getRequestEvent } from '$app/server';
import type { RequestEvent } from '@sveltejs/kit';

export async function useBucket(event?: RequestEvent) {
	event = event ?? (await getRequestEvent());
	if (!event.locals.bucket) {
		if (!event.platform?.env?.BUCKET) throw new Error('R2Bucket not found');
		event.locals.bucket = event.platform.env.BUCKET;
	}

	return event.locals.bucket;
}
