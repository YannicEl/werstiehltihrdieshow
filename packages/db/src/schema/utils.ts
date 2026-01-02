import { generateId } from '@werstiehltihrdieshow/core/id';
import { sql } from 'drizzle-orm';
import * as sqlite from 'drizzle-orm/sqlite-core';

export const ids = {
	id: sqlite.integer().primaryKey(),
	publicId: sqlite.text().unique().$defaultFn(generateId),
};

export function boolean() {
	return sqlite.integer({ mode: 'boolean' });
}
export function timestamp() {
	return sqlite.integer({ mode: 'timestamp_ms' });
}

export const timestamps = {
	createdAt: timestamp()
		.notNull()
		.default(sql`(unixepoch() * 1000)`),
	updatedAt: timestamp(),
	deletedAt: timestamp(),
};
