import express from 'express';
import { slotController } from './slot.controller';
const router = express.Router();

// router.post('/slots', slotController.createSlotReq);
router.get('/', slotController.getAllSlotReq);
router.get('/availability', slotController.getAvailableSlot2);

export const SlotRoute = router;
