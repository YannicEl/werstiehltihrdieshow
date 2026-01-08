import { createNitroAuth } from '@werstiehltihrdieshow/auth/nitro';
import { createDrizzleClient } from '@werstiehltihrdieshow/db/client';

export { WebSocketServer } from './durable-objects/WebSocketServer';

export default {
	fetch: async (request, env) => {
		const db = createDrizzleClient(env.DB);
		const auth = await createNitroAuth({
			db,
			secret: env.BETTER_AUTH_SECRET,
		});

		const session = await auth.api.getSession({
			headers: request.headers,
		});

		if (!session) {
			return new Response('Unauthorized', {
				status: 401,
			});
		}

		if (request.url.endsWith('/websocket')) {
			// Expect to receive a WebSocket Upgrade request.
			// If there is one, accept the request and return a WebSocket Response.
			const upgradeHeader = request.headers.get('Upgrade');
			if (!upgradeHeader || upgradeHeader !== 'websocket') {
				return new Response('Worker expected Upgrade: websocket', {
					status: 426,
				});
			}

			if (request.method !== 'GET') {
				return new Response('Worker expected GET method', {
					status: 400,
				});
			}

			// Since we are hard coding the Durable Object ID by providing the constant name 'foo',
			// all requests to this Worker will be sent to the same Durable Object instance.
			let id = env.WEBSOCKET_SERVER.idFromName('default');
			let stub = env.WEBSOCKET_SERVER.get(id);

			return stub.fetch(request);
		}

		return new Response(
			`Supported endpoints:
/websocket: Expects a WebSocket upgrade request`,
			{
				status: 200,
				headers: {
					'Content-Type': 'text/plain',
				},
			}
		);
	},
} satisfies ExportedHandler<Env>;
