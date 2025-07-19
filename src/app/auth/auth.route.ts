import { Router } from "express";
import * as authController from "./auth.controller";
import verifyJwt from "../../middlewares/authMiddleware";

const router = Router();

router.post("/login", authController.login);
router.post("/refresh-token", authController.refresh);
router.post("/logout", verifyJwt, authController.logout);
router.post("/refresh-token", authController.refreshToken);

export default router;
