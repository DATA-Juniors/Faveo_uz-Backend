import {Request , Response , NextFunction} from 'express'
import { deleteUser, findUserById } from '../../service/user.service'

export default async (req: Request, res: Response, next: NextFunction) => {
    try{

        // parametrdan id ni olamiz
        const id = +req.params.id
        const token = req.header('authorization')?.split(' ')[1]
        const user  = await findUserById(id)

        if(!user){
            return res.status(403).json({
                message: "There's no users with this id"
            })
        } else if(token === user.token) {
            return res.status(400).json({
                message: `jorka damingni ol sanda dostup yoq ozingni ozing ochirisha!`
            })   
        }

        await deleteUser(id)

        return res.status(200).json({
            message: `User with id: ${user.id} deleted`,
            deletedUser: {
                id: user.id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                birthday: user.birthday,
                phone: user.phone,
                role: user.role
            }
        })

    }catch(error){
        console.log(error);
        next(error)
    }
}