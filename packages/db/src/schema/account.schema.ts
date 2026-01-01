import * as sqlite from 'drizzle-orm/sqlite-core';
import { user } from './user.schema';
import { ids, timestamp } from './utils';

export type DbAccount = typeof account.$inferSelect;

export const account = sqlite.sqliteTable('account', {
	...ids,

	accountId: sqlite.text().notNull(),
	providerId: sqlite.text().notNull(),
	accessToken: sqlite.text(),
	refreshToken: sqlite.text(),
	accessTokenExpiresAt: timestamp(),
	refreshTokenExpiresAt: timestamp(),
	scope: sqlite.text(),
	idToken: sqlite.text(),
	password: sqlite.text(),

	userId: sqlite
		.integer()
		.references(() => user.id)
		.notNull(),

	createdAt: timestamp().notNull(),
	updatedAt: timestamp().notNull(),
});
