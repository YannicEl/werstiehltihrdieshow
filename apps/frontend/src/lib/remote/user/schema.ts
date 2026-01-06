import * as v from 'valibot';

export const getUserSchema = v.union([
	v.strictObject({
		userId: v.number(),
	}),
	v.strictObject({
		userPublicId: v.string(),
	}),
]);
