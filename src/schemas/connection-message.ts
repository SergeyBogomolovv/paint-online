import { z } from 'zod'
import { UserSchema } from './user'

export const ConnectionMessageSchema = z.object({
  name: z.string(),
  users: z.array(UserSchema),
})
