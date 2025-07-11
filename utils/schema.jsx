import { integer, pgTable, serial, varchar, timestamp, numeric } from "drizzle-orm/pg-core"; // Import necessary functions
import { sql } from 'drizzle-orm'; // Import sql for raw SQL expressions

export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull(), // Changed to numeric
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull(),
});

export const Expenses = pgTable('expenses', {
    id: integer('id').primaryKey(),
    name: varchar('name'),
    amount: numeric('amount'), // Changed to numeric
    budgetId: integer('budgetId'),
    createdBy: varchar('createdBy'),
    createdat: timestamp('createdat').default(sql`CURRENT_TIMESTAMP`), // Use sql to set default timestamp
});
