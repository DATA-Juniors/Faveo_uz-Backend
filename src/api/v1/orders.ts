import { Router } from "express";

import { authCheck } from "../../middleware/auth-check";

import createOrder from "../../controllers/orders/create-order";


const router = Router()

    router.post('/', authCheck(true), createOrder)



export default router