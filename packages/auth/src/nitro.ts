import { createAuth, type CreateAuthParams } from './index';

export type CreateNitroAuth = {} & Omit<CreateAuthParams, 'plugins'>;

export type NitroAuth = Awaited<ReturnType<typeof createNitroAuth>>;
export function createNitroAuth({ db, secret }: CreateNitroAuth) {
	return createAuth({
		db,
		secret,
	});
}
