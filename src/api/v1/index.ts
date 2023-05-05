import { Router } from "express";

// v1 imports
import authRoutes from "./auth"
import usersRoutes from "./users" 
import infoRoutes from "./info"
import category  from "./category"
import products  from "./products"
import orders   from "./orders"

const router = Router()

.use('/auth',     authRoutes)
.use('/info',     infoRoutes)
.use('/users',    usersRoutes)
.use('/category', category)
.use('/products', products)
.use('/orders', orders)

export default router