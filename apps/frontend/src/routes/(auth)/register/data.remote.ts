import { form, getRequestEvent } from '$app/server';
import { requireLogin, useAuth } from '$lib/server/auth';
import { useDB } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { eq } from '@werstiehltihrdieshow/db/operators';
import { user as userSchema } from '@werstiehltihrdieshow/db/schema/user.schema';
import OpenAI from 'openai';
import { completeSignupSchema, generateAvatarSchema } from './schema';
export const completeSignup = form(completeSignupSchema, async (data) => {
	const { user } = await requireLogin();

	const event = await getRequestEvent();
	const auth = await useAuth();
	await auth.api.updateUser({
		body: {
			name: data.name,
		},
		headers: event.request.headers,
	});

	const db = await useDB();
	const blob = await db.query.blob.findFirst({
		where: {
			publicId: data.avatarBlobId,
		},
	});
	if (!blob) {
		throw error(400, 'Avatar blob not found');
	}

	await db
		.update(userSchema)
		.set({
			avatarBlobId: blob.id,
		})
		.where(eq(userSchema.id, user.id));
});

export const generateAvatar = form(generateAvatarSchema, async (data) => {
	const { user } = await requireLogin();

	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const stream = await openai.images.generate({
		prompt: data.prompt,
		background: 'transparent',
		output_format: 'png',
		model: 'gpt-image-1',
		stream: true,
		partial_images: 2,
	});

	for await (const event of stream) {
		if (event.type === 'image_generation.partial_image') {
			const idx = event.partial_image_index;
			const imageBase64 = event.b64_json;
			const imageBuffer = Buffer.from(imageBase64, 'base64');
			fs.writeFileSync(`river${idx}.png`, imageBuffer);
		}
	}

	// const { image } = await generateImage({
	// 	model: openai.image('gpt-image-1.5'),
	// 	prompt: {
	// 		text: data.prompt,
	// 		images: [await data.image.arrayBuffer()],
	// 	},
	// 	size: '1024x1024',
	// 	providerOptions: {
	// 		openai: {
	// 			quality: 'high',
	// 			background: 'transparent',
	// 			output_format: 'png',
	// 		},
	// 	},
	// });

	// const bucket = await useBucket();
	// const db = await useDB();
	// const key = `${user.publicId}/avatar.png`;
	// await db.delete(blobSchema).where(eq(blobSchema.key, key));
	// const r2Object = await bucket.put(key, image.uint8Array);
	// if (!r2Object) {
	// 	throw error(500);
	// }

	// const [blob] = await db
	// 	.insert(blobSchema)
	// 	.values({
	// 		name: `avatar.png`,
	// 		key: r2Object.key,
	// 		size: r2Object.size,
	// 		mimeType: 'image/png',
	// 	})
	// 	.returning();

	// if (!blob) {
	// 	throw error(500);
	// }

	// return {
	// 	blobPublicId: blob.publicId,
	// };
});
