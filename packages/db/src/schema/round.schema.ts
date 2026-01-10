import * as sqlite from 'drizzle-orm/sqlite-core';
import { game } from './game.schema';
import { ids, timestamps } from './utils';

export type DbRound = typeof round.$inferSelect;

export const round = sqlite.sqliteTable(
	'round',
	{
		...ids,

		gameId: sqlite
			.integer()
			.references(() => game.id)
			.notNull(),

		name: sqlite.text().notNull(),
		roundNumber: sqlite.integer().notNull(),

		...timestamps,
	},
	(table) => [sqlite.index('round_game_id_index').on(table.gameId)]
);
