import { defineRelations, defineRelationsPart } from 'drizzle-orm';
import * as schema from './schema';

export const mainRelationPart = defineRelationsPart(schema);

export const relations = defineRelations(schema, (relation) => ({
	user: {
		accounts: relation.many.account(),
		sessions: relation.many.session(),
		rooms: relation.many.room(),
	},
	session: {
		user: relation.one.user({
			from: relation.session.userId,
			to: relation.user.id,
		}),
	},
	account: {
		user: relation.one.user({
			from: relation.account.userId,
			to: relation.user.id,
		}),
	},
	room: {
		users: relation.many.user({
			from: relation.room.id.through(relation.roomToUser.roomId),
			to: relation.user.id.through(relation.roomToUser.userId),
		}),
	},
	game: {
		user: relation.one.user({
			from: relation.game.userId,
			to: relation.user.id,
		}),
	},
}));
