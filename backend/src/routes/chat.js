import { Router } from 'express';
import chatController from '../controlllers/chat.controller.js';

const router = Router();

router.post('/', chatController.handleMessage);

export default router;
