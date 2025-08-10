import { RequestHandler, Router } from 'express';
import { validateRequest } from '../../validators';
import { allowContentType } from '../../middleware/allowContentType';
import { getAllReceiptsWithUsersV1, registerMilkReceiptV1 } from '../../controllers/v1/milk.receipt.controller';
import { milkReceiptValidator } from '../../validators/milk.receipt.validator';
import { authenticator } from '../../middleware/token-authenticator.middleware';
const router = Router();

router.post('/create', authenticator, allowContentType(), milkReceiptValidator, validateRequest as RequestHandler, registerMilkReceiptV1);
router.post('/list', authenticator, getAllReceiptsWithUsersV1);

export default router;
