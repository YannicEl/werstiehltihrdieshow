<script lang="ts">
	import { getBlobDownloadURL } from '$lib/blobDownload';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = {
		blobPublicId: string;
	} & Omit<SvelteHTMLElements['img'], 'src'>;

	let { blobPublicId, ...props }: Props = $props();

	let src = $derived(getBlobDownloadURL(blobPublicId));
</script>

<img {...props} {src} />
