import { Request, Response, NextFunction } from "express";
import { getProductsById, findProductById } from "../../service";

export default async (req: Request, res: Response, next: NextFunction) => {

    try {

        const id = +req.params.id

        const product = await getProductsById(id)

        if (!product) {
            return res.status(404).json({
                message: "Not found product this id"
            })
        }


        return res.status(200).json({
            message: `Retrive product by id ${id}`,
            product: {
                id:     product.id,
                name:   product.name,
                price:  product.price,
                image:  product.image,
                category: {
                    id:     product.category_id,
                    name:   product.category_name,
                    icon:   product.category_icon
                }
            }
        })

    } catch (error) {
        next(error)
    }

}