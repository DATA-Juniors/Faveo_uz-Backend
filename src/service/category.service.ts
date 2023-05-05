import { CategoryDto } from "../model/allModel-exports"
import { client } from "../database/database"


export const allCategory = async () => {
    const sql = 'SELECT * from category'

    const result = await client.query(sql)

    return result.rows

};


export const getCategoryById = async (id: number) => {
    const sql = 'SELECT * from category WHERE id = $1 ;'

    const result = await client.query(sql, [id]);

    return result.rows[0]
};


export const getCategoryByName = async (name: string) => {
    const sql = `SELECT * FROM category WHERE name = $1 ;`
    const result = await client.query(sql, [name])

    return result.rows[0]
};


export const createCategory = async (name: string, icon: string) => {

    const sql = 'INSERT INTO category (name, icon) VALUES ($1, $2) RETURNING *;'

    // const { ,  } = category

    const result = await client.query(sql, [name, icon])

    return result.rows[0]
};


export const updateCategory = async (id: number, category: CategoryDto, image: string) => {
    const sql = 'UPDATE category SET name = $1, icon = $2 WHERE id = $3 RETURNING *;';

    const { name } = category

    const result = await client.query(sql, [name, image, id])

    return result.rows[0]
};


export const deleteCategory = async (id: number) => {
    const sql = 'DELETE from category WHERE id = $1;'

    const result = await client.query(sql, [id])

    return result.rows
}