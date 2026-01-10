import * as sqlite from 'drizzle-orm/sqlite-core';
import { question } from './question.schema';
import { boolean, ids, timestamps } from './utils';

export type DbQuestionOption = typeof questionOption.$inferSelect;

export const questionOption = sqlite.sqliteTable(
	'question_option',
	{
		...ids,

		questionId: sqlite
			.integer()
			.references(() => question.id)
			.notNull(),

		text: sqlite.text().notNull(),
		isCorrect: boolean().notNull().default(false),
		orderIndex: sqlite.integer().notNull(),

		...timestamps,
	},
	(table) => [sqlite.index('question_option_question_id_index').on(table.questionId)]
);
