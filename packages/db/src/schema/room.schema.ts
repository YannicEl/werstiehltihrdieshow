import * as sqlite from 'drizzle-orm/sqlite-core';
import { ids, timestamps } from './utils';

export type DbRoom = typeof room.$inferSelect;

export const room = sqlite.sqliteTable('room', {
	...ids,

	...timestamps,
});
