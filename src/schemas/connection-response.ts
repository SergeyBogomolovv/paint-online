import { z } from 'zod'

export const ConnectionResponseSchema = z.object({
  data: z.string(),
  title: z.string(),
  id: z.string(),
})
