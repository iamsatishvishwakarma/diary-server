import { Router } from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import milkReceiptRoutes from './milk.receipt.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/milk-receipt', milkReceiptRoutes);

export default router;
