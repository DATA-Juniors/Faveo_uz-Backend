import { client } from "../database/database"
import { ProductDto } from "../model/allModel-exports";

//         **GET** `/`
export const allProducts = async () => {
    // const sql = 'SELECT * FROM products JOIN category ON products.category_id = category.id ;'

    const sql = 'select products.id as id, products.name as name, products.price as price, products.image as image, products.category_id as category_id, category.name as category_name, category.icon as category_icon from products inner join category on products.category_id = category.id;'

    const result = await client.query(sql)

    return result.rows

};


// **GET** `/?category_id=1`
export const getProductByCategoryId = async (id: number) => {

    // const sql = 'SELECT * FROM products JOIN category ON products.category_id = category.id WHERE products.category_id = $1 ;'

    // const sql = 'select products.id as id, products.name as name, products.price as price, products.image as image, products.category_id as category_id, category.name as category_name, category.icon as category_icon from products inner join category on products.category_id = category.id;'    

    const sql = 'select products.id as id, products.name as name, products.price as price, products.image as image, products.category_id as category_id, category.name as category_name, category.icon as category_icon from products inner join category on products.category_id = category.id where category_id = $1;'

    const result = await client.query(sql, [id]);

    return result.rows[0]
};


//            **GET** `/:id`
export const getProductsById = async (id: number) => {
    
    const sql = 'select products.id as id, products.name as name, products.price as price, products.image as image, products.category_id as category_id, category.name as category_name, category.icon as category_icon from products inner join category on products.category_id = category.id where products.id = $1;'
   

    const result = await client.query(sql,[id]);

    return result.rows[0]
};


//       Find only 1 product by id
export const findProductById = async (id: number) => {
    const sql = 'SELECT * from products WHERE id = $1 ;'

    const result = await client.query(sql, [id])

    return result.rows[0]
}



//           **POST** `/`
export const createProduct = async (product: ProductDto, image: string ) => {
    
    const sql = 'INSERT INTO products (name, price, category_id, image) VALUES ($1, $2, $3, $4) RETURNING * ;'


    // const sql = 'select products.id as id, products.name as name, products.price as price, products.image as image, products.category_id as category_id, category.name as category_name, category.icon as category_icon from products inner join category on products.category_id = category.id;'

    // const sql = 'INSERT INTO products.name as name, products.price as price, products.image as image, products.category_id as category_id values $1, $2, $3, $4 RETURING * ;'


    const { name, price, category_id} = product

    const result = await client.query(sql, [name, price, category_id, image])

    return result.rows[0]
};


//          **PUT** `/:id`
export const updateProductById = async (id: number, product: ProductDto, image: string) => {

    const sql = 'UPDATE products SET name = $1, price = $2, category_id = $3, image = $4 WHERE id = $5 RETURNING *;'

    const { name, price, category_id } = product


    const result = await client.query(sql, [name, price, category_id, image, id])

    return result.rows[0]
};


//              **DELETE** `/:id`
export const deleteProductById = async (id: number) => {
    
    const sql = 'DELETE from products WHERE id = $1 RETURNING *;'

    // const sql = 'Delete from products '

    const result =await client.query(sql, [id])

    return result.rows[0]
};



