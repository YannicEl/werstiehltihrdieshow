<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_WEBSOCKET_URL } from '$env/static/public';
	import { login } from '$lib/remote/auth/login.remote';

	onMount(() => {
		const websocket = new WebSocket(PUBLIC_WEBSOCKET_URL);
		websocket.onmessage = (event) => {
			console.log(event);
		};

		websocket.onerror = (event) => {
			console.log('error', event);
		};
	});
</script>

<form {...login}>
	<button type="submit">Login</button>
</form>
