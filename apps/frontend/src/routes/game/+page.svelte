<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		// const eventSource = new EventSource('http://localhost:3100/sse');

		// eventSource.onmessage = (event) => {
		// 	console.log('data', JSON.parse(event.data));
		// };

		const abortController = new AbortController();
		const { signal } = abortController;
		const websocket = new WebSocket('ws://localhost:8787  ');

		websocket.addEventListener(
			'message',
			(event) => {
				console.log(event);
			},
			{ signal }
		);

		websocket.addEventListener(
			'close',
			(event) => {
				console.log('onclose');
			},
			{ signal }
		);

		websocket.addEventListener(
			'error',
			(event) => {
				console.log('on error');
			},
			{ signal }
		);

		setInterval(() => {
			websocket.send('hello');
		}, 1000);

		return () => {
			abortController.abort();
		};
	});
</script>

<div>
	<h1>Game</h1>
</div>
