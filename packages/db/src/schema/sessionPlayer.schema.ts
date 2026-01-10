import * as sqlite from 'drizzle-orm/sqlite-core';
import { gameSession } from './gameSession.schema';
import { user } from './user.schema';
import { boolean, ids, timestamp, timestamps } from './utils';

export type DbSessionPlayer = typeof sessionPlayer.$inferSelect;

export const sessionPlayer = sqlite.sqliteTable(
	'session_player',
	{
		...ids,

		score: sqlite.integer().notNull().default(0),
		isActive: boolean().notNull().default(true),

		gameSessionId: sqlite
			.integer()
			.references(() => gameSession.id)
			.notNull(),

		userId: sqlite
			.integer()
			.references(() => user.id)
			.notNull(),

		joinedAt: timestamp().notNull(),

		...timestamps,
	},
	(table) => [
		sqlite.index('session_player_game_session_id_index').on(table.gameSessionId),
		sqlite.index('session_player_user_id_index').on(table.userId),
	]
);
