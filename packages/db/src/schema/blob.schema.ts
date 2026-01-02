import * as sqlite from 'drizzle-orm/sqlite-core';
import { ids, timestamps } from './utils';

export type DBBlob = typeof blob.$inferSelect;

export const blob = sqlite.sqliteTable(
	'blob',
	{
		...ids,

		name: sqlite.text().notNull(),
		key: sqlite.text().notNull().unique(),
		size: sqlite.integer().notNull(),
		mimeType: sqlite.text().notNull(),

		...timestamps,
	}
	// (table) => [sqlite.index('blob_user_id_index').on(table.userId)]
);
