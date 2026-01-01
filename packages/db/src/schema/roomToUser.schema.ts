import * as sqlite from 'drizzle-orm/sqlite-core';
import { room } from './room.schema';
import { user } from './user.schema';
import { ids, timestamps } from './utils';

export type DbRoomToUser = typeof roomToUser.$inferSelect;

export const roomToUser = sqlite.sqliteTable('room_to_user', {
	...ids,

	userId: sqlite
		.integer()
		.references(() => user.id)
		.notNull(),

	roomId: sqlite
		.integer()
		.references(() => room.id)
		.notNull(),

	...timestamps,
});
