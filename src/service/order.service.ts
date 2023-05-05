import { client } from "../database/database";
import { orderDto } from "../model/order.model";


// // POST `/`
export const createOrder = async (order: orderDto) => {

    const sql = 'INSERT INTO orders (address, phone, name, purchase_type, created) VALUES ($1, $2, $3, $4, $5) RETURNING * ;'


    const { address, phone, name, purchase_type } = order


    const result = await client.query(sql, [address, phone, name, purchase_type, new Date()])

    return result.rows[0]
}


export const selectBasProd = async (id: number) => {

    const sql = 'SELECT products.id, products.name, products.price, products.image, products.category_id, basket.quantity FROM basket  INNER JOIN products ON basket.product_id = products.id WHERE basket.order_id = $1;'

    const result = await client.query(sql, [id])

    return result.rows[0]
}


// export const create = async (order: orderDto) => {

//     try {

//         // Orders table uchun insert query
//         const orderQuery = `
//          INSERT INTO orders (id, address, phone, name, purchase_type, date)
//          VALUES ($1, $2, $3, $4, $5, $6)
//          RETURNING *
//        `;

//         // Orders table ga ma'lumotlarni insert qilamiz va response ni olish uchun await qilamiz
//         // const { rows: [newOrder] } = await client.query(orderQuery, [order.id, order.address, order.phone, order.name, order.purchase_type, order.date]);

//         // Inner join query Basket va Product tablitsalari bilan
//         const productQuery = `
//         SELECT p.id, p.name, p.price, p.image, p.category_id, b.quantity
//         FROM basket b
//         INNER JOIN product p ON b.product_id = p.id
//         WHERE b.order_id = $1
//       `;


//         // Basket va Product tablitsalaridan ma'lumotlarni olish uchun query ni yaratamiz va response ni olish uchun await qilamiz
//         const { rows: products } = await client.query(productQuery, [order.id]);

//         // Umumiy narx va miqdorni hisoblash uchun total object ini yaratamiz
//         const total = products.reduce((acc: any, product: any) => {
//             acc.price += product.price * product.quantity;
//             acc.quantity += product.quantity;
//             return acc;
//         }, { price: 0, quantity: 0 });

//         // Orders table ga yana update query
//         const updateQuery = `
//         UPDATE orders
//         SET total_price = $1, total_quantity = $2
//         WHERE id = $3
//         RETURNING *
//       `;

//         // Orders table ni yangilash va response ni olish uchun await qilamiz
//         const { rows: [updatedOrder] } = await client.query(updateQuery, [total.price, total.quantity, newOrder.id]);

//         await client.query('COMMIT');
//         console.log('Transaction is completed successfully.');

//         // Result ni olib return qilamiz
//         return {
//             id: updatedOrder.id,
//             products: products,
//             date: updatedOrder.date,
//             total: {
//                 price: total.price,
//                 quantity: total.quantity,
//             },
//             address: updatedOrder.address,
//             phone: updatedOrder.phone,
//             name: updatedOrder.name,
//             purchase_type: updatedOrder.purchase_type,
//         };
//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.log('Transaction is rolled back.', error);
//         throw error;
//     } finally {
//         // Pool dan client ni release qilamiz
//         // client.release();
//     }
// }





