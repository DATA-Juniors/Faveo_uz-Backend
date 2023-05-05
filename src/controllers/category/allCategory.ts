import { allCategory } from "../../service";
import { Request, Response, NextFunction } from "express";


export default async (req: Request, res: Response, next: NextFunction) => {

    try {
        const options = await allCategory()

        const mapped = options.map(option => {
            return {
                id: option.id,
                name: option.name,
                icon: option.icon
            }
        })

        return res.status(200).json({
            message: "Retrive all categories",
            categories: mapped
        })


    } catch (error) {
        next(error)
    }

}
