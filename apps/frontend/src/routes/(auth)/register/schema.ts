import * as v from 'valibot';

export const completeSignupSchema = v.strictObject({
	name: v.string(),
	image: v.file(),
	color: v.string(),
});
