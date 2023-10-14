import { index, integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { company } from "./companies";
import { relations } from "drizzle-orm";

export const usersToCompanies = sqliteTable('users_to_companies', {
  userId: integer('user_id').notNull().references(() => users.id),
  companyId: integer('company_id').notNull().references(() => company.id),
  eloScore: integer('elo_score').notNull().default(1300),
}, (t) => ({
  pk: primaryKey(t.userId, t.companyId),
  userId: index('user_id_idx').on(t.userId),
  companyId: index('company_id_idx').on(t.companyId),
}),
);

export const usersToGroupsRelations = relations(usersToCompanies, ({ one }) => ({
	group: one(company, {
		fields: [usersToCompanies.companyId],
		references: [company.id],
	}),
	user: one(users, {
		fields: [usersToCompanies.userId],
		references: [users.id],
	}),
}));