import OpenAI from 'openai';

// Streams partial images to the client via Server-Sent Events (SSE).
export async function POST({ request }) {
	try {
		const openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const fromData = await request.formData();
		const prompt = fromData.get('prompt') as string;
		const image = fromData.get('image') as File;

		const stream = await openai.images.edit({
			prompt,
			image,
			background: 'transparent',
			output_format: 'png',
			model: 'gpt-image-1',
			stream: true,
			partial_images: 3,
		});

		const encoder = new TextEncoder();

		const readable = new ReadableStream({
			async start(controller) {
				try {
					for await (const event of stream) {
						console.log(event.type);

						controller.enqueue(
							encoder.encode(
								JSON.stringify({
									type: event.type,
									dataURL: `data:image/${event.output_format};base64,${event.b64_json}`,
								}) + '\n'
							)
						);
					}

					console.log('close');
					controller.close();
				} catch (error) {
					console.error({ error });
					controller.error(error);
				}
			},
		});

		return new Response(readable, {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive',
			},
		});
	} catch (error) {
		console.error(error);
	}
}
