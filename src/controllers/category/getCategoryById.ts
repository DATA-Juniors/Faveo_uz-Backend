import { getCategoryById } from '../../service/category.service';
import {NextFunction, Request, Response} from 'express'


export default async(req: Request, res: Response, next: NextFunction) => {
    try{
        const id = +req.params.id

        const category = await getCategoryById(id)

        if(!category){
            return res.status(500).json({
                message: "There's no category with this id"
            })
        }

        return res.status(200).json({
            message: "Retrive category",
            category: {
                id: category.id,
                name: category.name,
                icon: category.icon
            }
        })


    }catch(error){
        next(error)
    }
}