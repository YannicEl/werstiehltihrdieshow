import type { DB } from '@werstiehltihrdieshow/db/client';
import * as schema from '@werstiehltihrdieshow/db/schema/schema';
import type { BetterAuthPlugin } from 'better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { anonymous } from 'better-auth/plugins';

export type CreateAuthParams = {
	db: DB;
	secret: string;
	plugins?: BetterAuthPlugin[];
};

export function createAuth({ db, secret, plugins = [] }: CreateAuthParams) {
	return betterAuth({
		baseURL: import.meta.env.PROD ? 'https://werstiehltihrdie.show' : 'http://localhost:3000',
		basePath: '_auth',
		appName: 'Wer stiehlt ihr die Show',
		secret,
		database: drizzleAdapter(db, {
			provider: 'sqlite',
			camelCase: false,
			usePlural: false,
			schema,
		}),
		plugins: [
			anonymous({
				emailDomainName: 'werstiehltihrdie.show',
			}),
			...plugins,
		],
		session: {
			cookieCache: {
				enabled: true,
			},
		},
		emailAndPassword: {
			enabled: false,
		},
		advanced: {
			database: {
				generateId: 'serial',
			},
			cookiePrefix: 'auth',
		},
		databaseHooks: {
			user: {
				create: {
					// before: async (user) => {
					// 	// Modify user data before creation
					// 	const [publicId] = user.email.split('@');
					// 	return { data: { ...user, publicId } };
					// },
				},
			},
		},
		user: {
			additionalFields: {
				publicId: {
					type: 'string',
					required: true,
					input: false,
					index: true,
					unique: true,
				},
				avatarBlobId: {
					type: 'number',
					required: false,
					input: false,
					index: true,
					unique: true,
				},
			},
		},
		telemetry: {
			enabled: false,
		},
	});
}
