CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text,
	`full_name` text
);
--> statement-breakpoint
CREATE TABLE `users_to_companies` (
	`user_id` integer NOT NULL,
	`group_id` integer NOT NULL,
	`elo_score` integer DEFAULT 1300 NOT NULL,
	PRIMARY KEY(`group_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`group_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
