import {Request , Response, NextFunction} from 'express'
import { updateDetails , findUserById} from '../../service'
import { UpdateUserDetail } from '../../model/users.model';

export default async(req:Request, res:Response, next: NextFunction) => {
    try{
        const id = +req.params.id
        const user: UpdateUserDetail = req.body

        const oldUser = await findUserById(id)

        if(!oldUser){
            return res.status(403).json({
                message: "There's no user with this id"
            })
        }

        if(user == null){
            return res.status(403).json({
                message: "Please make sure u complited all params"
            })
        }

    
        const updatedUser = await updateDetails(user, id)

        return res.status(200).json({
            message: "User info updated",
            User: {
                id,
                email: updatedUser.email,
                name: updatedUser.name,
                surname: updatedUser.surname,
                birthday: updatedUser.birthday,
                phone: updatedUser.phone,
                role: oldUser.role
            }
        })

    }catch(error){
        console.log(error);
        next(error)
    }
}