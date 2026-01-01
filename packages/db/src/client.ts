import type { AnyD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';
import { relations } from './schema/relation';

export type { AnyD1Database };
export type DB = ReturnType<typeof createDrizzleClient>;

export function createDrizzleClient(d1: AnyD1Database) {
	return drizzle(d1, {
		casing: 'snake_case',
		relations,
	});
}
