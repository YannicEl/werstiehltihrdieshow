<script lang="ts">
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
</script>

<h1>Join {params.roomId}</h1>
