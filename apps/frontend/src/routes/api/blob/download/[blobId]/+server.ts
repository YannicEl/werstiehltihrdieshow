import { getRequestEvent } from '$app/server';
import { requireLogin } from '$lib/server/auth';
import { useBucket } from '$lib/server/bucket';
import { useDB } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function GET() {
	const {} = await requireLogin();

	const event = await getRequestEvent();
	const bucket = await useBucket();
	const db = await useDB();

	const { blobId } = event.params;
	if (!blobId) {
		throw error(400, 'Blob ID is required');
	}

	const blob = await db.query.blob.findFirst({
		where: {
			publicId: blobId,
		},
	});

	if (!blob) {
		throw error(404, 'Blob not found');
	}

	const r2Object = await bucket.get(blob.key);
	if (!r2Object) throw error(404, 'Blob not found');

	return new Response(r2Object.body, {
		headers: {
			'Content-Type': blob.mimeType,
			'Content-Length': blob.size.toString(),
			'Cache-Control': 'public, max-age=31536000, immutable',
			'Content-Disposition': `attachment; filename="${blob.name}"`,
		},
	});
}
