import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createBookingSchema = z.object({
    body: z.object({
        client: z.string({ 
            required_error: 'El nombre del cliente es obligatorio' 
        }).min(1, 'El nombre del cliente no puede estar vacío'),

        clientEmail: z.string({ 
            required_error: 'El email del cliente es obligatorio' 
        }).email('El formato del email no es válido'),

        date: z.string({ 
            required_error: 'La fecha es obligatoria' 
        }).min(1, 'La fecha no puede estar vacía'),

        time: z.string({ 
            required_error: 'La hora es obligatoria' 
        }).min(1, 'La hora no puede estar vacía'),

        status: z.enum(['pending', 'confirmed', 'cancelled', 'pendiente', 'confirmada', 'cancelada']).optional(),

        services: z.array(
            z.object({
                service: z.string().regex(objectIdRegex, 'ID de servicio inválido'),
                quantity: z.number().int().positive('La cantidad debe ser mayor a 0').default(1)
            })
        ).optional()
    })
});

export const addServiceToBookingSchema = z.object({
    params: z.object({
        bid: z.string().regex(objectIdRegex, 'ID de reserva inválido'),
        sid: z.string().regex(objectIdRegex, 'ID de servicio inválido')
    })
});