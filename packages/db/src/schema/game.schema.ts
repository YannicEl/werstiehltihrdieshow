import * as sqlite from 'drizzle-orm/sqlite-core';
import { user } from './user.schema';
import { ids, timestamps } from './utils';

export type DbGame = typeof game.$inferSelect;

export const game = sqlite.sqliteTable(
	'game',
	{
		...ids,

		userId: sqlite
			.integer()
			.references(() => user.id)
			.notNull(),

		...timestamps,
	},
	(table) => [sqlite.index('game_user_id_index').on(table.userId)]
);
