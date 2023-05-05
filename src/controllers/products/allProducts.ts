import { allProducts } from "../../service/index";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const details = await allProducts()

        const mapped = details.map(detail => {
            return {
                id:     detail.id,
                name:   detail.name,
                price:  detail.price,
                image:  detail.image,
                category: {
                    id:     detail.category_id,
                    name:   detail.category_name,
                    icon:   detail.category_icon
                }
            }
        })
        
        return res.status(200).json({
            message: "Retrive all products",
            products: mapped
        })

    } catch (error) {
        next(error)
    }

}



