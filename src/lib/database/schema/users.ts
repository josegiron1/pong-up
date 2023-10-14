import { relations } from 'drizzle-orm';
import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';
import { usersToCompanies } from './usersToCompanies';
 
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true}),
  uuid: text('uuid'),
  email: text('email'),
  fullName: text('full_name'),
}, (users) => {
  return {
    idIdx: index("id_idx").on(users.id),
    uuidIdx: index("uuid_idx").on(users.uuid),
  }
});

export const usersRelations = relations(users, ({ many }) => ({
	usersToGroups: many(usersToCompanies),
}));
 
export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert 