import { Request, Response, NextFunction } from "express";
import { deleteProductById, findProductById } from "../../service/products.service";


export default async ( req: Request, res: Response, next: NextFunction) => {

    try {
        
        const id = +req.params.id
        const find = await findProductById(id)
        

        if(!find) {
            res.status(404).json({
                message: 'Product not found this id or alredy deleted'
            })
        } 

        const deleted =  await deleteProductById(id)

        return res.status(200).json({
            message: "Product deleted",
            product: {
                id:             deleted.id,
                name:           deleted.name,
                price:          deleted.price,
                image:          deleted.image,
                category_id:    deleted.category_id
            }
        })

    } catch (error) {
      next(error)
    }

}