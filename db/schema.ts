import { pgTable, json, uuid, date } from 'drizzle-orm/pg-core';

export const tokenData = pgTable('token-data', {
  id: uuid('id').primaryKey(),
  data: json('data'),
  create_at: date('create_at', { mode: 'date' }),
});
