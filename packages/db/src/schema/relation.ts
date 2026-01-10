import { defineRelations, defineRelationsPart } from 'drizzle-orm';
import * as schema from './schema';

export const mainRelationPart = defineRelationsPart(schema);

export const relations = defineRelations(schema, (relation) => ({
	user: {
		accounts: relation.many.account(),
		sessions: relation.many.session(),
		rooms: relation.many.room(),
		avatarBlob: relation.one.blob({
			from: relation.user.avatarBlobId,
			to: relation.blob.id,
		}),
		createdGames: relation.many.game(),
		hostedGameSessions: relation.many.gameSession(),
		sessionPlayers: relation.many.sessionPlayer(),
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
		gameSessions: relation.many.gameSession(),
	},
	game: {
		createdBy: relation.one.user({
			from: relation.game.createdByUserId,
			to: relation.user.id,
		}),
		rounds: relation.many.round(),
		gameSessions: relation.many.gameSession(),
	},
	round: {
		game: relation.one.game({
			from: relation.round.gameId,
			to: relation.game.id,
		}),
		questions: relation.many.question(),
	},
	question: {
		round: relation.one.round({
			from: relation.question.roundId,
			to: relation.round.id,
		}),
		options: relation.many.questionOption(),
		playerAnswers: relation.many.playerAnswer(),
	},
	questionOption: {
		question: relation.one.question({
			from: relation.questionOption.questionId,
			to: relation.question.id,
		}),
	},
	gameSession: {
		game: relation.one.game({
			from: relation.gameSession.gameId,
			to: relation.game.id,
		}),
		room: relation.one.room({
			from: relation.gameSession.roomId,
			to: relation.room.id,
		}),
		host: relation.one.user({
			from: relation.gameSession.hostUserId,
			to: relation.user.id,
		}),
		players: relation.many.sessionPlayer(),
	},
	sessionPlayer: {
		gameSession: relation.one.gameSession({
			from: relation.sessionPlayer.gameSessionId,
			to: relation.gameSession.id,
		}),
		user: relation.one.user({
			from: relation.sessionPlayer.userId,
			to: relation.user.id,
		}),
		answers: relation.many.playerAnswer(),
	},
	playerAnswer: {
		sessionPlayer: relation.one.sessionPlayer({
			from: relation.playerAnswer.sessionPlayerId,
			to: relation.sessionPlayer.id,
		}),
		question: relation.one.question({
			from: relation.playerAnswer.questionId,
			to: relation.question.id,
		}),
		selectedOption: relation.one.questionOption({
			from: relation.playerAnswer.selectedOptionId,
			to: relation.questionOption.id,
		}),
	},
}));
