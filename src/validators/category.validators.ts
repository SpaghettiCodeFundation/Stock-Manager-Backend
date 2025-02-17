import { body } from "express-validator";

export const createCategoryValidate = [
  body("name").notEmpty().withMessage("Is required").trim(),
  body("description").notEmpty().withMessage("Is required").trim(),
];

export const updateCategoryValidate = [
  body("name").optional().trim(),
  body("description").optional().trim(),
];

export const deleteRecordsCategoriesValidate = [
  body("categories")
    .isArray()
    .withMessage("This is fields is array")
    .custom((value) => {
      if (!value.every(Number.isInteger)) {
        throw new Error("This array must have numeric elements");
      }
      return true;
    }),
];
