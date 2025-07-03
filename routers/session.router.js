import { Router } from "express";
import { sessionClearController, sessionSetController } from "../controllers/session.controller.js";

const router = Router();

router.get('/page-view',sessionSetController);
router.get('/remove-session',sessionClearController);

export default router;