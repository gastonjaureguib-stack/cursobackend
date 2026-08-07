import { Router } from 'express';
import {
    getAllBookings,
    createBooking,
    getBookingById,
    addServiceToBooking
} from '../controllers/bookings.controller.js';

import { validate } from '../middlewares/validate.middleware.js';
import { createBookingSchema, addServiceToBookingSchema } from '../schemas/bookings.schema.js';

const router = Router();

router.get('/', getAllBookings);
router.get('/:bid', getBookingById);

router.post('/', validate(createBookingSchema), createBooking);
router.post('/:bid/services/:sid', validate(addServiceToBookingSchema), addServiceToBooking);

export default router;