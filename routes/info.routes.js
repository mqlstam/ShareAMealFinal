// routes/info.routes.js
import express from 'express';
import infoController from '../controllers/info.controller.js';

const router = express.Router();

router.get('/info', infoController.getInfo);

export default router;
