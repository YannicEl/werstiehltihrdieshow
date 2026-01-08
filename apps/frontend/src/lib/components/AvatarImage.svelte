<script lang="ts">
	import { getUserAvatarBlob } from '$lib/remote/user/avatar/get.remote';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import MdiAccount from '~icons/mdi/account';
	import BlobImg from './BlobImg.svelte';

	type Props = {
		userPublicId: string;
	} & SvelteHTMLElements['div'];

	let { userPublicId, ...props }: Props = $props();

	let avatarBlob = $derived(await getUserAvatarBlob({ userPublicId }));
</script>

<div {...props} class={['aspect-square', props.class]}>
	{#if avatarBlob}
		<BlobImg
			blobPublicId={avatarBlob.publicId}
			alt="Avatar"
			class="aspect-square h-full w-full"
			width="1024"
			height="1024"
		/>
	{:else}
		<MdiAccount class="h-full w-full" />
	{/if}
</div>
