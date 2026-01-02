import { form, query } from '$app/server';
import { openai } from '$lib/ai/provider';
import { requireLogin, useAuth } from '$lib/server/auth';
import { useBucket } from '$lib/server/bucket';
import { useDB } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { blob as blobSchema } from '@werstiehltihrdieshow/db/schema/blob.schema';
import { generateImage } from 'ai';
import { completeSignupSchema, generateImageSchema } from './schema';

export const completeSignup = form(completeSignupSchema, async (data) => {
	const {} = await requireLogin();

	const auth = await useAuth();

	await auth.api.updateUser({
		body: {
			name: data.name,
			image: data.image,
			color: data.color,
		},
	});
});

export const generateImageAction = query(generateImageSchema, async (data) => {
	const { user } = await requireLogin();

	const { image } = await generateImage({
		model: openai.image('dall-e-3'),
		prompt: data.prompt,
		size: '1024x1024',
	});

	const dataUrl = `data:${image.mediaType};base64,${image.base64}`;

	const bucket = await useBucket();
	const db = await useDB();
	const r2Object = await bucket.put(`${user.publicId}/avatar.png`, image.uint8Array);
	if (!r2Object) {
		throw error(500);
	}

	const [blob] = await db
		.insert(blobSchema)
		.values({
			name: `avatar.png`,
			key: r2Object.key,
			size: r2Object.size,
			mimeType: 'image/png',
		})
		.returning();

	if (!blob) {
		throw error(500);
	}

	return {
		blobPublicId: blob.publicId,
	};
});
