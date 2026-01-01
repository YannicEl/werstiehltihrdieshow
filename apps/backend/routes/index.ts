import { defineEventHandler } from 'nitro/deps/h3';

export default defineEventHandler(async (event) => {
	let stub = await event.context.cloudflare?.env.WEBSOCKET_SERVER.getByName('foo');
	console.log(stub);
	// return stub(event.req);
});
