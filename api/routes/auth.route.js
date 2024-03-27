import express from "express";
import { signIn, signup } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.js";
import { signUpSchema } from "../validators/auth.validator.js";

const router = express.Router();


router.post("/signup",validate(signUpSchema), signup);
router.post("/signin", signIn);


export default router;
