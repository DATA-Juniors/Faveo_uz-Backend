import { Request, Response, NextFunction } from "express";
import { updateProductById,findProductById } from "../../service";
import { ProductDto } from "../../model/allModel-exports";


export default async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const id = +req.params.id
        const detail: ProductDto = req.body

        if (!req.file) {
            return res.status(400).json({
                message: "File not uploaded"
            })
        }

        const oldProduct = await findProductById(id)

        if(!oldProduct) {
            return res.status(500).json({
                message: "No product found for this id"
            })
        }

        const filename = req.file.filename
        
        const updated = await updateProductById(id, detail, filename)

        return res.status(200).json({
            message: "Product updated",
            product: {
                id:     updated.id,
                name:   updated.name,
                price:  updated.price,
                image:  updated.image,
                category: {
                    id:     updated.category_id,
                    name:   updated.category_name,
                    icon:   updated.category_icon
                }
            }
        })
      

    } catch (error) {
        next(error)
    }

}