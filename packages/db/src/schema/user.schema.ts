import * as sqlite from 'drizzle-orm/sqlite-core';
import { boolean, ids, timestamp } from './utils';

export type DbUser = typeof user.$inferSelect;

export const user = sqlite.sqliteTable('user', {
	...ids,

	email: sqlite.text().unique().notNull(),
	emailVerified: boolean().notNull().default(false),
	name: sqlite.text().notNull(),
	image: sqlite.text(),
	isAnonymous: boolean().notNull().default(false),
	color: sqlite.text().notNull().default('#000000'),

	createdAt: timestamp().notNull(),
	updatedAt: timestamp().notNull(),
});
