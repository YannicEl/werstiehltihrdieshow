<script lang="ts">
	import { getBlobDownloadURL } from '$lib/blobDownload';
	import { getUserAvatarBlob } from '$lib/remote/user/avatar/get.remote';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import MdiAccount from '~icons/mdi/account';

	type Props = {
		userPublicId?: string;
	} & SvelteHTMLElements['div'];

	let { userPublicId, ...props }: Props = $props();

	let avatarBlob = $derived(userPublicId ? await getUserAvatarBlob({ userPublicId }) : undefined);
</script>

<div {...props} class={['aspect-square', props.class]}>
	{#if avatarBlob}
		<img
			src={getBlobDownloadURL(avatarBlob.publicId)}
			alt="Avatar"
			class="aspect-square h-full w-full"
			width="1024"
			height="1024"
		/>
	{:else}
		<MdiAccount class="h-full w-full" />
	{/if}
</div>
