CREATE TABLE `game_session` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`status` text DEFAULT 'waiting' NOT NULL,
	`current_round_number` integer,
	`current_question_index` integer,
	`game_id` integer NOT NULL,
	`room_id` integer NOT NULL,
	`host_user_id` integer NOT NULL,
	`started_at` integer,
	`completed_at` integer,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	CONSTRAINT `fk_game_session_game_id_game_id_fk` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`),
	CONSTRAINT `fk_game_session_room_id_room_id_fk` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`),
	CONSTRAINT `fk_game_session_host_user_id_user_id_fk` FOREIGN KEY (`host_user_id`) REFERENCES `user`(`id`)
);
--> statement-breakpoint
CREATE TABLE `player_answer` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`is_correct` integer,
	`points_awarded` integer DEFAULT 0 NOT NULL,
	`selected_option_id` integer,
	`session_player_id` integer NOT NULL,
	`question_id` integer NOT NULL,
	`answered_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	CONSTRAINT `fk_player_answer_selected_option_id_question_option_id_fk` FOREIGN KEY (`selected_option_id`) REFERENCES `question_option`(`id`),
	CONSTRAINT `fk_player_answer_session_player_id_session_player_id_fk` FOREIGN KEY (`session_player_id`) REFERENCES `session_player`(`id`),
	CONSTRAINT `fk_player_answer_question_id_question_id_fk` FOREIGN KEY (`question_id`) REFERENCES `question`(`id`)
);
--> statement-breakpoint
CREATE TABLE `question` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`type` text NOT NULL,
	`text` text NOT NULL,
	`order_index` integer NOT NULL,
	`round_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	CONSTRAINT `fk_question_round_id_round_id_fk` FOREIGN KEY (`round_id`) REFERENCES `round`(`id`)
);
--> statement-breakpoint
CREATE TABLE `question_option` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`question_id` integer NOT NULL,
	`text` text NOT NULL,
	`is_correct` integer DEFAULT false NOT NULL,
	`order_index` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	CONSTRAINT `fk_question_option_question_id_question_id_fk` FOREIGN KEY (`question_id`) REFERENCES `question`(`id`)
);
--> statement-breakpoint
CREATE TABLE `round` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`game_id` integer NOT NULL,
	`name` text NOT NULL,
	`round_number` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	CONSTRAINT `fk_round_game_id_game_id_fk` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`)
);
--> statement-breakpoint
CREATE TABLE `session_player` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`score` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`game_session_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`joined_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	CONSTRAINT `fk_session_player_game_session_id_game_session_id_fk` FOREIGN KEY (`game_session_id`) REFERENCES `game_session`(`id`),
	CONSTRAINT `fk_session_player_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);
--> statement-breakpoint
ALTER TABLE `game` RENAME COLUMN `user_id` TO `created_by_user_id`;--> statement-breakpoint
ALTER TABLE `game` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `game` ADD `description` text;--> statement-breakpoint
DROP INDEX IF EXISTS `game_user_id_index`;--> statement-breakpoint
CREATE INDEX `game_created_by_user_id_index` ON `game` (`created_by_user_id`);--> statement-breakpoint
CREATE INDEX `game_session_game_id_index` ON `game_session` (`game_id`);--> statement-breakpoint
CREATE INDEX `game_session_room_id_index` ON `game_session` (`room_id`);--> statement-breakpoint
CREATE INDEX `game_session_host_user_id_index` ON `game_session` (`host_user_id`);--> statement-breakpoint
CREATE INDEX `player_answer_session_player_id_index` ON `player_answer` (`session_player_id`);--> statement-breakpoint
CREATE INDEX `player_answer_question_id_index` ON `player_answer` (`question_id`);--> statement-breakpoint
CREATE INDEX `player_answer_selected_option_id_index` ON `player_answer` (`selected_option_id`);--> statement-breakpoint
CREATE INDEX `question_round_id_index` ON `question` (`round_id`);--> statement-breakpoint
CREATE INDEX `question_option_question_id_index` ON `question_option` (`question_id`);--> statement-breakpoint
CREATE INDEX `round_game_id_index` ON `round` (`game_id`);--> statement-breakpoint
CREATE INDEX `session_player_game_session_id_index` ON `session_player` (`game_session_id`);--> statement-breakpoint
CREATE INDEX `session_player_user_id_index` ON `session_player` (`user_id`);