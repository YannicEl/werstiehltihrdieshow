import * as sqlite from 'drizzle-orm/sqlite-core';
import { user } from './user.schema';
import { ids, timestamp } from './utils';

export type DbSession = typeof session.$inferSelect;

export const session = sqlite.sqliteTable(
	'session',
	{
		...ids,

		token: sqlite.text().notNull(),
		ipAddress: sqlite.text(),
		userAgent: sqlite.text(),

		userId: sqlite
			.integer()
			.references(() => user.id)
			.notNull(),

		expiresAt: timestamp().notNull(),
		createdAt: timestamp().notNull(),
		updatedAt: timestamp().notNull(),
	},
	(table) => [
		sqlite.index('session_user_id_index').on(table.userId),
		sqlite.index('session_token_index').on(table.token),
	]
);
