import { Router } from "express";
import { authCheck } from "../../middleware/auth-check";
import { getUserInfo, updateAppInfo }  from "../../controllers/app-info"

const router = Router()

.get('/', authCheck(false), getUserInfo)
.put('/', authCheck(true), updateAppInfo )

export default router