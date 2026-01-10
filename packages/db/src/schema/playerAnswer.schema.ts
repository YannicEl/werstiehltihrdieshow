import * as sqlite from 'drizzle-orm/sqlite-core';
import { question } from './question.schema';
import { questionOption } from './questionOption.schema';
import { sessionPlayer } from './sessionPlayer.schema';
import { boolean, ids, timestamp, timestamps } from './utils';

export type DbPlayerAnswer = typeof playerAnswer.$inferSelect;

export const playerAnswer = sqlite.sqliteTable(
	'player_answer',
	{
		...ids,

		isCorrect: boolean(),
		pointsAwarded: sqlite.integer().notNull().default(0),

		selectedOptionId: sqlite.integer().references(() => questionOption.id),

		sessionPlayerId: sqlite
			.integer()
			.references(() => sessionPlayer.id)
			.notNull(),

		questionId: sqlite
			.integer()
			.references(() => question.id)
			.notNull(),

		answeredAt: timestamp().notNull(),
		...timestamps,
	},
	(table) => [
		sqlite.index('player_answer_session_player_id_index').on(table.sessionPlayerId),
		sqlite.index('player_answer_question_id_index').on(table.questionId),
		sqlite.index('player_answer_selected_option_id_index').on(table.selectedOptionId),
	]
);
