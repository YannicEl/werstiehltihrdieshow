<script lang="ts">
	import AvatarImage from '$lib/components/AvatarImage.svelte';
	import WebcamVideo from '$lib/components/WebcamVideo.svelte';
	import { getSession } from '$lib/remote/session/get.remote';
	import { generateAvatar } from './data.remote';

	let session = $derived(await getSession());

	let prompt = $state('');
	let blobPublicId = $state('');
	let errorMessage = $state('');
	let image = $state<File | null>(null);

	async function handleCapture(file: File) {
		generateAvatar.fields.image.set(file);
	}

	generateAvatar.fields.prompt.set('mach mich schöner');
</script>

<div>
	<h1>Register</h1>

	{generateAvatar.pending}
	{generateAvatar.result}

	<div>
		<h2>Take Photo with Webcam</h2>
		<WebcamVideo onCapture={handleCapture} />
	</div>

	<div style="margin-top: 20px;">
		<form {...generateAvatar} enctype="multipart/form-data">
			<h2>Generate Image with AI</h2>
			<label>
				<input
					{...generateAvatar.fields.prompt.as('text')}
					bind:value={prompt}
					placeholder="Enter prompt"
				/>
			</label>

			<label>
				<input {...generateAvatar.fields.image.as('file')} placeholder="Select image" />
			</label>

			<button>Generate Image</button>
		</form>
	</div>

	{#if errorMessage}
		<div style="color: red; margin-top: 10px;">{errorMessage}</div>
	{/if}

	<AvatarImage userPublicId={session?.user?.publicId} class="size-12" />

	{#if generateAvatar.result?.blobPublicId}
		<div style="margin-top: 20px;">
			<h2>Your Avatar</h2>

			<AvatarImage userPublicId={session?.user?.publicId} />
		</div>
	{/if}
</div>
