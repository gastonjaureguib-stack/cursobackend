import { z } from 'zod';

export const createServiceSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'El nombre es obligatorio' }).min(2, 'El nombre debe tener al menos 2 caracteres'),
    description: z.string({ required_error: 'La descripción es obligatoria' }),
    duration: z.number({ required_error: 'La duración es obligatoria' }).positive('La duración debe ser mayor a 0'),
    price: z.number({ required_error: 'El precio es obligatorio' }).nonnegative('El precio no puede ser negativo'),
    category: z.string({ required_error: 'La categoría es obligatoria' }),
    available: z.boolean().optional()
  })
});

export const updateServiceSchema = z.object({
  body: createServiceSchema.shape.body.partial()
});