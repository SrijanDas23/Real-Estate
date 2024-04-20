import { z } from "zod";

export const createListingSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, "Name must not exceed 255 characters"),

  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(2000, "Description must not exceed 2000 characters"),

  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(5, { message: "Address must be at least 5 characters" })
    .max(255, "Address must not exceed 255 characters"),

  regularPrice: z
    .number({ required_error: "Regular price is required" })
    .min(50, { message: "Regular price must be at least 5000" })
    .max(100000000, { message: "Regular price must not exceed 100,000,000" }),

  discountPrice: z
    .number({ required_error: "Discount price is required" })
    .min(0, { message: "Discount price must be at least 0" })
    .max(100000000, { message: "Discount price must not exceed 100,000,000" }),

  bathrooms: z
    .number({ required_error: "Bathrooms is required" })
    .min(1, { message: "Bathrooms must be at least 1" })
    .max(10, { message: "Bathrooms must not exceed 10" }),

  bedrooms: z
    .number({ required_error: "Bedrooms is required" })
    .min(1, { message: "Bedrooms must be at least 1" })
    .max(10, { message: "Bedrooms must not exceed 10" }),

  furnished: z.boolean(),

  parking: z.boolean(),

  type: z.enum(["rent", "sell"], { message: "Invalid type" }),

  offer: z.boolean(),

  imageUrls: z
    .array(z.string())
    .min(1, { message: "At least 1 image is required" })
    .max(6, { message: "Maximum 6 images allowed" }),

  userRef: z.string(),
});
