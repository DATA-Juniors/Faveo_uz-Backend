import { Request, Response, NextFunction } from "express";
import { getProductByCategoryId } from "../../service";



export default async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const id = +req.params.id

        const find = await getProductByCategoryId(id)

        if (!find) {
            return res.status(404).json({
                message: "No product found for this category id"
            })
        } 

        return res.status(200).json({
            message: `Retrive products by category id ${id}`,
            products: {
                id:     find.id,
                name:   find.name,
                price:  find.price,
                image:  find.image,
                category: {
                    id:     find.category_id,
                    name:   find.category_name,
                    icon:   find.category_icon
                }
            }
        })


    } catch (error) {
        next()
    }

}