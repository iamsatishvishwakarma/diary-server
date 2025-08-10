import { RequestHandler, Router } from 'express';
import { loginUserV1, otpVerificationV1 } from '../../controllers/v1/auth.controller';
import { loginValidator, otpVerificationValidator } from '../../validators/auth.validator';
import { validateRequest } from '../../validators';
import { allowContentType } from '../../middleware/allowContentType';
import { authenticator } from '../../middleware/token-authenticator.middleware';
import { withTransaction } from '../../middleware/withTransaction.middleware';
const router = Router();

router.post('/login', allowContentType(), loginValidator, validateRequest as RequestHandler, loginUserV1);
router.post('/otp-verification', authenticator, allowContentType(), otpVerificationValidator, validateRequest as RequestHandler, withTransaction(otpVerificationV1));

export default router;
