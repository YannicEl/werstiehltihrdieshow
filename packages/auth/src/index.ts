import { generateId } from '@werstiehltihrdieshow/core/id';
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
				generateRandomEmail: () => {
					return `${generateId()}@werstiehltihrdieshow.com`;
				},
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
					before: async (user) => {
						// Modify user data before creation
						const [publicId] = user.email.split('@');
						return { data: { ...user, publicId } };
					},
				},
			},
		},
		user: {
			additionalFields: {
				color: {
					type: 'string',
					required: false,
				},
			},
		},
		telemetry: {
			enabled: false,
		},
	});
}
