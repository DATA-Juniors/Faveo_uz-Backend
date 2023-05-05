import { client } from "../database/database";
import { BasketDto } from "../model/basket";


export const createBasket = async (basket: BasketDto) => {

    const sql = 'INSERT INTO basket (order_id, product_id,  quantity) VALUES ($1, $2, $3) RETURNING * ;'
    
    const {order_id, product_id, quantity} = basket

    const result = await client.query(sql, [order_id, product_id, quantity])

    return result.rows[0]
}


export const findBasketById = async (id: number) => {

    const sql = 'SELECT * FROM basket WHERE id = $1;'

    const result = await client.query(sql, [id])

    return result.rows[0]
}



export const findAllBasket = async () => {
    const sql = 'SELECT * FROM basket'

    const result = await client.query(sql)

    return result.rows
}


export const deleteBasketById = async (id: number) => {
    const sql = 'DELETE from basket WHERE id = $1 RETURNING *;'
    
    const result = await client.query(sql, [id])

    return result.rows[0]
}