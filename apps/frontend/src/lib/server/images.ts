import { getRequestEvent } from '$app/server';
import type { RequestEvent } from '@sveltejs/kit';

export async function useImages(event?: RequestEvent) {
	event = event ?? (await getRequestEvent());
	if (!event.locals.images) {
		if (!event.platform?.env?.IMAGES) throw new Error('Images binding not found');
		event.locals.images = event.platform.env.IMAGES;
	}

	return event.locals.images;
}
