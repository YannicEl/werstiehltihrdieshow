import * as v from 'valibot';

export const completeSignupSchema = v.strictObject({
	name: v.string(),
	avatarBlobId: v.string(),
});

export const generateAvatarSchema = v.strictObject({
	prompt: v.string(),
	image: v.file(),
});
