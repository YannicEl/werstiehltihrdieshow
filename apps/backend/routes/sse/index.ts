import { createEventStream, defineEventHandler, handleCors } from 'nitro/deps/h3';

export default defineEventHandler(async (event) => {
	const didHandleCors = handleCors(event, {
		origin: '*',
		preflight: {
			statusCode: 204,
		},
		methods: '*',
	});
	if (didHandleCors) return;

	const eventStream = createEventStream(event);

	const interval = setInterval(async () => {
		await eventStream.push({
			id: crypto.randomUUID(),
			data: JSON.stringify({ value: new Date().toLocaleTimeString() }),
		});
	}, 1000);

	eventStream.onClosed(async () => {
		clearInterval(interval);
		await eventStream.close();
	});

	return eventStream.send();
});
