import * as sqlite from 'drizzle-orm/sqlite-core';
import { ids, timestamp } from './utils';

export type DbVerification = typeof verification.$inferSelect;

export const verification = sqlite.sqliteTable('verification', {
	...ids,

	identifier: sqlite.text().notNull(),
	value: sqlite.text().notNull(),

	expiresAt: timestamp().notNull(),
	createdAt: timestamp().notNull(),
	updatedAt: timestamp().notNull(),
});
