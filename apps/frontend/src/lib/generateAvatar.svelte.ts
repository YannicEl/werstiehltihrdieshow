import * as v from 'valibot';

export const GENERATE_AVATAR_EVENT_TYPES = ['partial_image', 'complete_image'];

export const generateAvatarEventSchema = v.strictObject({
	type: v.picklist(GENERATE_AVATAR_EVENT_TYPES),
	dataURL: v.pipe(v.string()),
});

export type GenerateAvatarParams = {
	prompt: string;
	image: File;
};

export class GenerateAvatar {
	dataURL = $state<string>();

	async generate({ prompt, image }: GenerateAvatarParams) {
		const formData = new FormData();
		formData.append('prompt', prompt);
		formData.append('image', image);

		const response = await fetch('/api/ai/generate-avatar', {
			method: 'POST',
			body: formData,
		});

		console.log('response');

		const reader = response.body?.getReader();
		if (!reader) throw new Error('No Reader');

		const decoder = new TextDecoder();
		let buffer = '';

		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				// Flush any remaining decoder buffer on stream end.
				buffer += decoder.decode();
			} else {
				// Keep the decoder in streaming mode so we don't drop partial UTF-8 sequences.
				buffer += decoder.decode(value, { stream: true });
			}

			// Split on newline (NDJSON from the server). The last chunk may be incomplete.
			const parts = buffer.split('\n');
			buffer = parts.pop() ?? '';

			for (const part of parts) {
				if (!part.trim()) continue;
				try {
					const event = JSON.parse(part);
					console.log('event', event);
					this.dataURL = event.dataURL;
					// TODO: handle event.type === 'partial_image' | 'complete_image' here.
				} catch (error) {
					console.error('Failed to parse chunk', { part, error });
				}
			}

			if (done) {
				console.log('done');
				break;
			}
		}
	}
}
