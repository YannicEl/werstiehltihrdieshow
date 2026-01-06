export function getBlobDownloadURL(blobPublicId: string) {
	return `/api/blob/download/${blobPublicId}`;
}
