import { Info, Phones } from "../model/allModel-exports"
import { client } from "../database/database"



export const createAppInfo = async (info: Info) => {

    const sql = 'INSERT INTO info (name, location_geo, location_address) VALUES ($1, $2, $3) RETURNING *;'

    const { name, location_geo, location_address } = info

    const result = await client.query(sql, [name, location_geo, location_address])

    return result.rows[0]
}

export const createAppPhone = async (phone: string) => {

    const sql = 'INSERT INTO phones (phone) VALUES ($1) RETURNING *;'

    const result = await client.query(sql, [phone])

    return result.rows
}

export const clearPhones = async () => {
    const result = await client.query('DELETE FROM phones;')
    return result.rows
}

export const updateAppInfo = async (info: Info, id: number) => {
    const sql = 'UPDATE info SET name = $1, location_geo = $2, location_address = $3 WHERE id=$4 RETURNING *'
    const { name, location_geo, location_address } = info

    const result = await client.query(sql, [name, location_geo, location_address, id])

    return result.rows[0]
}


export const updatePhone = async (phone: Phones) => {
    const sql = 'UPDATE phones SET phone = $1 WHERE id=$2 RETURNING *'
   
    const result = await client.query(sql, [phone.phone, phone.id])

    return result.rows
}

export const getInfo = async () => {
    const sql = 'select * from Info;'

    const result = await client.query(sql)

    return result.rows[0]
}


export const getInfoById = async (id: number)=> {
    const sql = 'select * from Info where id=$1;'

    const result = await client.query(sql, [id])

    return result.rows[0]
}




export const getPhone = async () => {
    const sql = 'select * from Phones';

    const result = await client.query(sql)

    return result.rows
}




