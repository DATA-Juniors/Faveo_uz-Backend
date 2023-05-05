import { Request, Response, NextFunction } from "express";
import { deleteCategory, getCategoryById } from "../../service"

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const detail = await getCategoryById(id)

        if(!detail) {
            res.status(403).json({
                message: "No category found for this id"
            })
        } 

        await deleteCategory(id)

        return res.status(200).json({
            message: "Category deleted",
            category: {
                id: detail.id,
                name: detail.name,
                icon: detail.icon
            }
        })


    } catch (error) {
        next(error)
    }
}