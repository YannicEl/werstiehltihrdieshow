export { WebSocketServer } from './durable-objects/WebSocketServer';

export default {
	fetch: async (request: Request, env: Env) => {
		console.log('hi');
		// Check if this is a WebSocket upgrade request
		const upgradeHeader = request.headers.get('Upgrade');
		const connectionHeader = request.headers.get('Connection');

		if (
			upgradeHeader?.toLowerCase() === 'websocket' &&
			connectionHeader?.toLowerCase().includes('upgrade')
		) {
			// Get the Durable Object stub for WebSocketServer
			// Using a name-based approach to get a consistent instance
			const id = env.WEBSOCKET_SERVER.idFromName('default');
			const stub = env.WEBSOCKET_SERVER.get(id);

			// Forward the request to the Durable Object
			return stub.fetch(request);
		}

		// For non-WebSocket requests, return a default response
		// You may want to forward these to Nitro or handle them differently
		return new Response('Hello, world!');
	},
} satisfies ExportedHandler<Env>;
