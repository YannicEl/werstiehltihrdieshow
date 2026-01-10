<script lang="ts">
	import { logout } from '$lib/remote/auth/logout.remote';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<header class="flex items-center justify-between p-4">
	<div>
		Logged in as {data.user.email}
	</div>

	<form {...logout}>
		<button type="submit">Logout</button>
	</form>
</header>

{@render children()}
