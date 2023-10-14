/*
 SQLite does not support "Set autoincrement to a column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE users ADD `uuid` text;--> statement-breakpoint
CREATE INDEX `id_idx` ON `companies` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `users` (`id`);--> statement-breakpoint
CREATE INDEX `uuid_idx` ON `users` (`uuid`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `users_to_companies` (`user_id`);--> statement-breakpoint
CREATE INDEX `company_id_idx` ON `users_to_companies` (`group_id`);