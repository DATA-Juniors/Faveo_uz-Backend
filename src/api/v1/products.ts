import { Router } from "express";

import { upload } from "../../middleware/upload";
import { authCheck } from "../../middleware/auth-check";



import allProducts from "../../controllers/products/allProducts";
import createProduct from "../../controllers/products/createProduct";
import deleteProduct from "../../controllers/products/deleteProduct";

import findProducts from "../../controllers/products/getProductById"

import findProductByCategoryId from "../../controllers/products/findProductByCategoryId";
import updateProduct from "../../controllers/products/updateProduct";

const router = Router()

    .get('/', authCheck(false), allProducts)
    .get('/:category_id', authCheck(false), findProductByCategoryId)
    .get('/:id', authCheck(false), findProducts)
    .post('/', authCheck(true), upload.single('file'), createProduct)
    .put('/:id', authCheck(true), upload.single('file'), updateProduct)
    .delete('/:id', authCheck(true), deleteProduct)


export default router