import express from 'express';

import { paymentController } from './payment.controller';



const router = express.Router();

router.post(
  '/confirmation',
  // validateRequest(createOrderZodSchema)
paymentController.paymentConfirmation
)



export const PaymentRoute = router;