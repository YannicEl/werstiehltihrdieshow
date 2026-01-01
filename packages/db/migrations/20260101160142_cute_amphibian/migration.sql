CREATE TABLE `account` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`id_token` text,
	`password` text,
	`user_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT `fk_account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);
--> statement-breakpoint
CREATE TABLE `game` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`user_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	CONSTRAINT `fk_game_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);
--> statement-breakpoint
CREATE TABLE `room` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE TABLE `room_to_user` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`user_id` integer NOT NULL,
	`room_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	CONSTRAINT `fk_room_to_user_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
	CONSTRAINT `fk_room_to_user_room_id_room_id_fk` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`token` text NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT `fk_session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`email` text NOT NULL UNIQUE,
	`email_verified` integer DEFAULT false NOT NULL,
	`name` text NOT NULL,
	`image` text,
	`is_anonymous` integer DEFAULT false NOT NULL,
	`color` text DEFAULT '#000000' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `game_user_id_index` ON `game` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_user_id_index` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_token_index` ON `session` (`token`);