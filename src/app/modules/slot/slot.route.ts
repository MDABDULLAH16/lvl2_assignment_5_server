import express from 'express';
import { slotController } from './slot.controller';
const router = express.Router();

router.post('/', slotController.createSlotReq);
router.get('/', slotController.getAllSlotReq);
router.get('/availability', slotController.getAvailableSlot2);
router.get('/:_id', slotController.getSingleSlotWithServiceIdReq);
router.put('/:_id', slotController.updateSingleSlotReq);
export const SlotRoute = router;
