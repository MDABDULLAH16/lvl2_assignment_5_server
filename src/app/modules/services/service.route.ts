import express from 'express';
import { serviceController } from './service.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import {
  validateCreateService,
  validateUpdateService,
} from './service.validation';
import { slotController } from '../slot/slot.controller';

const router = express.Router();

router.post(
  '/',
  validateCreateService,
  auth(USER_ROLE.admin),
  serviceController.crateService
);
router.get('/', serviceController.getAllServiceReq);
router.get('/:_id', serviceController.getSingleServiceReq);
router.put(
  '/:_id',
  validateUpdateService,
  auth(USER_ROLE.admin),
  serviceController.updateSingleServiceReq
);
router.delete(
  '/:_id',

  auth(USER_ROLE.admin),
  serviceController.deleteSingleServiceReq
);
router.post(
  '/slots',

  auth(USER_ROLE.admin),
  slotController.createSlotReq
);

export const ServiceRoute = router;
