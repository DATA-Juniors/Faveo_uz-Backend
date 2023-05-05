import { Request, Response, NextFunction } from "express";
import { orderDto } from "../../model/order.model";
import { createOrder, selectBasProd } from "../../service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: orderDto = req.body        

        const order = await createOrder(data)

        const select = await selectBasProd(order.id)

        return res.status(200).json({
            message: "Order created",
            order: {
                id: order.id,
                products: {
                    id:     select.id,
                    name:   select.name,
                    price:  select.price,
                    image:  select.price,
                    category_id:    select.category_id,
                    quantity:   select.quantity
                },
                address: order.address,
                phone:  order.phone,
                name:   order.name,
                purchase_type:   order.purchase_type,
                date:   order.created
            }
        })

    } catch (error) {
        next(error)
    }
}