import * as z from 'zod'

export const EnterSchema = z.object({
  name: z.string().min(3, { message: 'Имя должно быть длиннее 3х символов' }),
  title: z
    .string()
    .min(3, { message: 'Название должно быть длиннее 3х символов' }),
})
