import{Request, Response, NextFunction} from 'express'
import { createCategory, getCategoryByName } from '../../service'


export default async(req: Request, res: Response, next: NextFunction) => {
    try{

        const name = req.body.name
        
        const category  = await getCategoryByName(name)

        if (category) {
            return res.status(404).json({
                message: "Category alredy created"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: "File not uploaded"
            })
        }
        
        const icon = req.file.filename

        const newCategory = await createCategory(name, icon)
        

        return res.status(200).json({
            message: "Category created",
            category: {
                id: newCategory.id,
                name: newCategory.name,
                icon: newCategory.icon
            }
        })

    }catch(error){
       next(error)
    }
}