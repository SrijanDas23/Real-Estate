import express from "express";
import { google, signIn, signOut, signup } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.js";
import { signInSchema, signUpSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/signup", validate(signUpSchema), signup);
router.post("/signin", validate(signInSchema), signIn);
router.post("/google", google);
router.get("/signout", signOut);

export default router;
