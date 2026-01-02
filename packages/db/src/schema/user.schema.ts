import * as sqlite from 'drizzle-orm/sqlite-core';
import { blob } from './blob.schema';
import { boolean, ids, timestamp } from './utils';

export type DbUser = typeof user.$inferSelect;

export const user = sqlite.sqliteTable(
	'user',
	{
		...ids,

		email: sqlite.text().unique().notNull(),
		emailVerified: boolean().notNull().default(false),
		name: sqlite.text().notNull(),
		image: sqlite.text(),
		isAnonymous: boolean().notNull().default(false),

		avatarBlobId: sqlite.integer().references(() => blob.id),

		createdAt: timestamp().notNull(),
		updatedAt: timestamp().notNull(),
	},
	(table) => [sqlite.index('user_avatar_blob_id_index').on(table.avatarBlobId)]
);
