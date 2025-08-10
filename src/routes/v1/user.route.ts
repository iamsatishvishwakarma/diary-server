import { RequestHandler, Router } from 'express';
import { getAllUsersV1, getCurrentUserV1, registerUserV1 } from '../../controllers/v1/user.controller';
import { validateRequest } from '../../validators';
import { registerUserValidator } from '../../validators/user.validator';
import { authenticator } from '../../middleware/token-authenticator.middleware';
import { allowContentType } from '../../middleware/allowContentType';
import { isAccountVerified } from '../../middleware/v1/user.middleware';
import { withTransaction } from '../../middleware/withTransaction.middleware';
const router = Router();

router.post('/create', allowContentType(), registerUserValidator, validateRequest as RequestHandler, withTransaction(registerUserV1));
router.post('/list', authenticator, isAccountVerified, getAllUsersV1);
router.get('/me', authenticator, isAccountVerified, getCurrentUserV1);

export default router;
