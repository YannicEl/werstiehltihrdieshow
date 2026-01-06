<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		onCapture?: (file: File) => void | Promise<void>;
		autoStart?: boolean;
	}

	let { onCapture, autoStart = true }: Props = $props();

	let videoStream: MediaStream | null = $state(null);
	let videoElement: HTMLVideoElement | null = $state(null);
	let canvasElement: HTMLCanvasElement | null = $state(null);
	let isCameraActive = $state(false);
	let errorMessage = $state('');

	onMount(() => {
		if (autoStart) {
			startCamera();
		}
		return () => {
			stopCamera();
		};
	});

	async function startCamera() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					facingMode: 'user',
					aspectRatio: 1,
					width: 1024,
					height: 1024,
				},
			});
			videoStream = stream;
			isCameraActive = true;
			errorMessage = '';

			if (videoElement) {
				videoElement.srcObject = stream;
			}
		} catch (err) {
			errorMessage =
				'Failed to access camera: ' + (err instanceof Error ? err.message : 'Unknown error');
			console.error('Camera error:', err);
		}
	}

	function stopCamera() {
		if (videoStream) {
			videoStream.getTracks().forEach((track) => track.stop());
			videoStream = null;
			isCameraActive = false;
		}
		if (videoElement) {
			videoElement.srcObject = null;
		}
	}

	async function captureImage() {
		if (!videoElement || !canvasElement || !videoStream) {
			return;
		}

		const context = canvasElement.getContext('2d');
		if (!context) {
			return;
		}

		// Set canvas dimensions to match video
		canvasElement.width = videoElement.videoWidth;
		canvasElement.height = videoElement.videoHeight;

		// Draw video frame to canvas (mirror it back for capture)
		context.save();
		context.scale(-1, 1);
		context.drawImage(videoElement, -canvasElement.width, 0);
		context.restore();

		// Convert canvas to blob
		canvasElement.toBlob(async (blob) => {
			if (!blob) {
				errorMessage = 'Failed to capture image';
				return;
			}

			// Convert blob to File
			const file = new File([blob], 'webcam-capture.png', { type: 'image/png' });

			if (onCapture) {
				try {
					await onCapture(file);
					errorMessage = '';
				} catch (err) {
					errorMessage =
						'Failed to process image: ' + (err instanceof Error ? err.message : 'Unknown error');
					console.error('Capture error:', err);
				}
			}
		}, 'image/png');
	}
</script>

<div>
	<video
		bind:this={videoElement}
		autoplay
		playsinline
		muted
		style="width: 100%; max-width: 640px; border: 1px solid #ccc; border-radius: 4px; background: #000; transform: scaleX(-1);"
	></video>
	<div style="margin-top: 10px;">
		{#if !isCameraActive}
			<button onclick={() => startCamera()}>Start Camera</button>
		{:else}
			<button onclick={() => captureImage()}>Capture Photo</button>
			<button onclick={() => stopCamera()}>Stop Camera</button>
		{/if}
	</div>
	<canvas bind:this={canvasElement} style="display: none;"></canvas>
	{#if errorMessage}
		<div style="color: red; margin-top: 10px;">{errorMessage}</div>
	{/if}
</div>
