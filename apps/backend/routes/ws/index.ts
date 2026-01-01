import { defineEventHandler } from 'nitro/deps/h3';
import type { WebSocketServer } from '~/durable-objects/WebSocketServer';

export default defineEventHandler(async (event) => {
	const webSocketServer = event.context.cloudflare?.env
		.WEBSOCKET_SERVER! as DurableObjectNamespace<WebSocketServer>;

	const id = webSocketServer.idFromName('default');
	const stub = webSocketServer.get(id);

	console.log(stub);

	// Forward the request to the Durable Object
	const response = await stub.fetch('http://localhost:3100/ws');
	console.log(response);
	return response;
});
