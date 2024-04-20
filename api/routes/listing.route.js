import express from "express";
import { createListing, deleteListing, getListing, updateListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { validate } from "../middlewares/validator.js";
import { createListingSchema } from "../validators/listing.validator.js";

const router = express.Router();

router.post("/create",validate(createListingSchema), verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id",validate(createListingSchema), verifyToken, updateListing);
router.get("/get/:id", getListing);

export default router;
