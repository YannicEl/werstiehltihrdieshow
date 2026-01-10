import * as sqlite from 'drizzle-orm/sqlite-core';
import { round } from './round.schema';
import { ids, timestamps } from './utils';

export type DbQuestion = typeof question.$inferSelect;

export const questionType = ['multiple_choice'] as const;
export type QuestionType = (typeof questionType)[number];

export const question = sqlite.sqliteTable(
	'question',
	{
		...ids,

		type: sqlite.text({ enum: questionType }).notNull(),
		text: sqlite.text().notNull(),
		orderIndex: sqlite.integer().notNull(),

		roundId: sqlite
			.integer()
			.references(() => round.id)
			.notNull(),

		...timestamps,
	},
	(table) => [sqlite.index('question_round_id_index').on(table.roundId)]
);
