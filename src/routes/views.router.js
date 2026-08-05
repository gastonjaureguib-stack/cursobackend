import { Router } from 'express';
import { renderServicesView, renderAvailabilityView } from '../controllers/views.controller.js';

const router = Router();

router.get('/services', renderServicesView);
router.get('/availability', renderAvailabilityView); 

export default router;