import { Router } from 'express';
import { UserRouter } from '../modules/user/user.router';
import { AuthRoutes } from '../Auth/auth.route';
import { ServiceRoute } from '../modules/services/service.route';
import { SlotRoute } from '../modules/slot/slot.route';
import { BookingsRoute } from '../modules/bookings/booking.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRouter,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/services',
    route: ServiceRoute,
  },
  {
    path: '/slots',
    route: SlotRoute,
  },
  {
    path: '/bookings',
    route: BookingsRoute,
  },
  {
    path: '/',
    route: BookingsRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
// moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
