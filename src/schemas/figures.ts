import { z } from 'zod'

export const Figures = z.enum(['brush', 'circle', 'eraser', 'rect', 'line'])
