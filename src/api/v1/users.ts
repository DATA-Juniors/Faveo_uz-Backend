import { Router } from "express";

// v1 imports
import allUsers from "../../controllers/manageUser/all-users";
import deleteUsers from "../../controllers/manageUser/delete-users";
import updateUserDetails from "../../controllers/manageUser/updateDetails";
import updateAccess from "../../controllers/manageUser/updateAccess";
import { authCheck } from "../../middleware/auth-check";

const router = Router()

.use(authCheck(true))

.get('/', allUsers)
.delete('/:id', deleteUsers)
.put('/:id/details', updateUserDetails)
.put('/:id/access', updateAccess)

export default router