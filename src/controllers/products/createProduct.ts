import { Request, Response, NextFunction } from "express";
import { ProductDto } from "../../model/allModel-exports";
import { createProduct, getCategoryById } from "../../service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: ProductDto = req.body

        if (!req.file) {
            return res.status(400).json({
                message: "File not uploaded"
            })
        }

        const image = req.file.filename

        const product = await createProduct(data, image)
        

        return res.status(200).json({
            message: "Product created",
            product: {
                id:     product.id,
                name:   product.name,
                price:  product.price,
                image:  product.image,
                category: {
                    id: product.category_id,
                    name: product.category_name,
                    icon: product.category_icon
                }
            }
        })

    } catch (error) {
        next(error)
    }
}