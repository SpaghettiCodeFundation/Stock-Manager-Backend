import express from "express";

import {
  index,
  create,
  update,
  destroy,
  destroy_all
} from "../controllers/categories.controller";
import { handleFormErrors } from "../middleware/handleFormErrors";
import {
  createCategoryValidate,
  deleteRecordsCategoriesValidate,
  updateCategoryValidate,
} from "../validators/category.validators";
import { handleGetCategory } from "../middleware/categories/handleGetCategory";
import {
  index_permission,
  create_permission,
  destroy_permission,
  update_permission,
} from "../middleware/categories/categories.permissions";

const router = express.Router();

router.get("", index_permission, index);
router.post(
  "",
  create_permission,
  createCategoryValidate,
  handleFormErrors,
  create
);
router.put(
  "/:pk",
  handleGetCategory,
  update_permission,
  updateCategoryValidate,
  handleFormErrors,
  update
);
router.delete("/delete-records", deleteRecordsCategoriesValidate, handleFormErrors, destroy_permission, destroy_all);
router.delete("/:pk", handleGetCategory, destroy_permission, destroy);

export default router;
