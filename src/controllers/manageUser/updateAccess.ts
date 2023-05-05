import {Request, Response , NextFunction} from 'express'
import { findUserById, updateAccess } from '../../service'
import { UpdateUserAccess } from '../../model/allModel-exports'


export default async (req: Request, res:  Response, next: NextFunction) => {
    try{
        const id  = +req.params.id
        const user: UpdateUserAccess = req.body

        const oldUer = await findUserById(id)
        if(!oldUer){
            return res.status(500).json({
                message: "There's no user with this id"
            })
        }

        if(user == null){
            return res.status(500).json({
                message: "Please complete all inputs"
            })
        }

        const updatedUser = await updateAccess(user, id)


        return res.status(201).json({
            message: "User access credentials updated",
            user: {
                id,
                email: oldUer.email,
                name: oldUer.name,
                surname: oldUer.surname,
                birthday: oldUer.birthday,
                phone: oldUer.phone,
                role: updatedUser.role
            }
        })

    }catch(error){
        next(error)
    }
}