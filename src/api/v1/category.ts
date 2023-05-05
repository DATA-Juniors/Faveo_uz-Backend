// import express from "express";
import { Router } from "express";

import { upload } from "../../middleware/upload";
import { authCheck } from "../../middleware/auth-check";



import allCategory from "../../controllers/category/allCategory";
import getCategoryById from "../../controllers/category/getCategoryById";
import createCategory from "../../controllers/category/createCategory";
import updateCategoryById from "../../controllers/category/updateCategoryById";
import deleteCategory from "../../controllers/category/deleteCategory";


const router = Router()

.get('/',       authCheck(false), allCategory)
.get('/:id',    authCheck(false), getCategoryById)
.post('/',      authCheck(true),  upload.single('file'), createCategory)
.put('/:id',    authCheck(true),upload.single('file'),  updateCategoryById)
.delete('/:id', authCheck(true),  deleteCategory)


export default router