import { relations } from 'drizzle-orm';
import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';
import { usersToCompanies } from './usersToCompanies';
 
export const company = sqliteTable('companies', {
  id: integer('id').primaryKey(),
  name: text('name'),
}, (company) => {
  return {
    idIdx: index("id_idx").on(company.id),
  }
});

export const companiesRelations = relations(company, ({ many }) => ({
	usersToGroups: many(usersToCompanies),
}));
 
export type Company = typeof company.$inferSelect
export type InsertUser = typeof company.$inferInsert 