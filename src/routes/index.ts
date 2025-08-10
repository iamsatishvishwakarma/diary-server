import { Router } from 'express';
import v1Routes from './v1';

const router = Router();

// versioned routing
router.use('/v1', v1Routes);

export default router;