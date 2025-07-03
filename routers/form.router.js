import express from 'express';
import { formController } from '../controllers/form.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

//this route has file input
router.post('/new-issue',upload.single('image'), formController);

export default router;