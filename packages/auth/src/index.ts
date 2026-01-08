import type { DB } from '@werstiehltihrdieshow/db/client';
import * as schema from '@werstiehltihrdieshow/db/schema/schema';
import type { BetterAuthPlugin } from 'better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export type CreateAuthParams = {
	db: DB;
	secret: string;
	google?: {
		clientId: string;
		clientSecret: string;
	};
	plugins?: BetterAuthPlugin[];
};

export function createAuth({ db, secret, google, plugins = [] }: CreateAuthParams) {
	const isProd = process.env.NODE_ENV === 'production';

	return betterAuth({
		baseURL: isProd ? 'https://werstiehltihrdie.show' : 'http://localhost:3000',
		basePath: '/_auth',
		appName: 'Wer stiehlt ihr die Show',
		secret,
		database: drizzleAdapter(db, {
			provider: 'sqlite',
			camelCase: false,
			usePlural: false,
			schema,
		}),
		plugins,
		session: {
			cookieCache: {
				enabled: true,
			},
		},
		emailAndPassword: {
			enabled: false,
		},
		socialProviders: {
			google,
		},
		advanced: {
			database: {
				generateId: 'serial',
			},
			cookiePrefix: 'auth',
			crossSubDomainCookies: {
				enabled: true,
				domain: isProd ? 'werstiehltihrdie.show' : 'localhost',
			},
		},
		trustedOrigins: isProd
			? ['https://werstiehltihrdie.show', 'https://api.werstiehltihrdie.show']
			: ['http://localhost:3000', 'http://localhost:8787'],
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
