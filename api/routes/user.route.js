import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { validate } from "../middlewares/validator.js";
import { updateUserSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id",validate(updateUserSchema),verifyToken,updateUser);

export default router;
