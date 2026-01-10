import * as sqlite from 'drizzle-orm/sqlite-core';
import { game } from './game.schema';
import { room } from './room.schema';
import { user } from './user.schema';
import { ids, timestamp, timestamps } from './utils';

export type DbGameSession = typeof gameSession.$inferSelect;

export const gameSessionStatus = ['waiting', 'in_progress', 'completed'] as const;
export type GameSessionStatus = (typeof gameSessionStatus)[number];

export const gameSession = sqlite.sqliteTable(
	'game_session',
	{
		...ids,

		status: sqlite.text({ enum: gameSessionStatus }).notNull().default('waiting'),
		currentRoundNumber: sqlite.integer(),
		currentQuestionIndex: sqlite.integer(),

		gameId: sqlite
			.integer()
			.references(() => game.id)
			.notNull(),

		roomId: sqlite
			.integer()
			.references(() => room.id)
			.notNull(),

		hostUserId: sqlite
			.integer()
			.references(() => user.id)
			.notNull(),

		startedAt: timestamp(),
		completedAt: timestamp(),
		...timestamps,
	},
	(table) => [
		sqlite.index('game_session_game_id_index').on(table.gameId),
		sqlite.index('game_session_room_id_index').on(table.roomId),
		sqlite.index('game_session_host_user_id_index').on(table.hostUserId),
	]
);
