import { z } from 'zod'

export const DisconnectionMessageSchema = z.object({
  name: z.string(),
  id: z.string(),
})
