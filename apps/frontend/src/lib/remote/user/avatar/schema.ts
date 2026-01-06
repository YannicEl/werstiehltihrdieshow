import * as v from 'valibot';

export const getUserAvatarBlobSchema = v.strictObject({
	userPublicId: v.string(),
});
