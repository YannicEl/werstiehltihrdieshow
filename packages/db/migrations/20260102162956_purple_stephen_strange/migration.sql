CREATE TABLE `blob` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`name` text NOT NULL,
	`key` text NOT NULL UNIQUE,
	`size` integer NOT NULL,
	`mime_type` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer
);
--> statement-breakpoint
ALTER TABLE `user` ADD `avatar_blob_id` integer REFERENCES blob(id);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_game` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`user_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	CONSTRAINT `fk_game_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_game`(`id`, `public_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) SELECT `id`, `public_id`, `user_id`, `created_at`, `updated_at`, `deleted_at` FROM `game`;--> statement-breakpoint
DROP TABLE `game`;--> statement-breakpoint
ALTER TABLE `__new_game` RENAME TO `game`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_room` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_room`(`id`, `public_id`, `created_at`, `updated_at`, `deleted_at`) SELECT `id`, `public_id`, `created_at`, `updated_at`, `deleted_at` FROM `room`;--> statement-breakpoint
DROP TABLE `room`;--> statement-breakpoint
ALTER TABLE `__new_room` RENAME TO `room`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_room_to_user` (
	`id` integer PRIMARY KEY,
	`public_id` text UNIQUE,
	`user_id` integer NOT NULL,
	`room_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	CONSTRAINT `fk_room_to_user_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
	CONSTRAINT `fk_room_to_user_room_id_room_id_fk` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_room_to_user`(`id`, `public_id`, `user_id`, `room_id`, `created_at`, `updated_at`, `deleted_at`) SELECT `id`, `public_id`, `user_id`, `room_id`, `created_at`, `updated_at`, `deleted_at` FROM `room_to_user`;--> statement-breakpoint
DROP TABLE `room_to_user`;--> statement-breakpoint
ALTER TABLE `__new_room_to_user` RENAME TO `room_to_user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `game_user_id_index` ON `game` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_avatar_blob_id_index` ON `user` (`avatar_blob_id`);