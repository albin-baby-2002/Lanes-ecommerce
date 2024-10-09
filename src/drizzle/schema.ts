import {pgTable, uuid, varchar} from 'drizzle-orm/pg-core'

export const users = pgTable('users',{
 id:uuid('id').defaultRandom(),
 kindeId: varchar({length:256}).notNull().unique(),
 email: varchar({length:256}).notNull().unique(),
 firstName:varchar({length:256}),
 lastName:varchar({length:256})
})