import { Request, Response, NextFunction } from "express";
import { updateCategory, getCategoryById } from "../../service"
import { CategoryDto } from '../../model/category.model'
import fs from 'fs'


// const path = '../../../uploads'

export default async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id = +req.params.id
        const name = req.body

        if (!req.file) {
            return res.status(400).json({
                message: "File not uploaded"
            })
        }

        const oldCategory = await getCategoryById(id)
        
        if (!oldCategory) {
            return res.status(500).json({
                message: "No category found for this id"
            })
        }
        
        
        const icon = req.file.filename


        const newCategory = await updateCategory(id, name, icon)

        return res.status(200).json({
            message: "Category updated",
            category: {
                id: newCategory.id,
                name: newCategory.name,
                icon: newCategory.icon
            }
        })
    } catch (error) {
        next()
    }
}