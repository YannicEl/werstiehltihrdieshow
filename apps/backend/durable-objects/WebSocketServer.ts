import { DurableObject } from 'cloudflare:workers';

export class WebSocketServer extends DurableObject {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
	}

	override async fetch(request: Request): Promise<Response> {
		// Creates two ends of a WebSocket connection.
		const webSocketPair = new WebSocketPair();
		const [client, server] = [webSocketPair[0], webSocketPair[1]];

		// Calling `accept()` tells the runtime that this WebSocket is to begin terminating
		// request within the Durable Object. It has the effect of "accepting" the connection,
		// and allowing the WebSocket to send and receive messages.
		server.accept();

		server.addEventListener('message', (event) => {
			console.log('message', event.data);
			server.send(event.data);
		});

		// If the client closes the connection, the runtime will close the connection too.
		server.addEventListener('close', () => {
			console.log('close');
			server.close(1000, 'Durable Object is closing WebSocket');
		});

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	}
}
