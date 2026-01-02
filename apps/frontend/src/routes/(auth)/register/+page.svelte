<script lang="ts">
	import { generateImageAction } from './data.remote';

	let prompt = $state('');
	let blobPublicId = $state('');

	async function generateImage() {
		console.log(prompt);
		const image = await generateImageAction({ prompt });
		console.log(image);
		blobPublicId = image.blobPublicId;
	}
</script>

<div>
	<h1>Register</h1>
	<input type="text" bind:value={prompt} />
	<button onclick={() => generateImage()}>Generate Image</button>

	{#if blobPublicId}
		<img src="/api/blob/download/{blobPublicId}" alt="Avatar" />
	{/if}
</div>
