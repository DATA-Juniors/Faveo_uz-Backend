
import { RegisterDto, Users, Role, UpdateUserDetail, UpdateUserAccess  } from "../model/allModel-exports"
import md5 from "md5"
import { client } from "../database/database"


export const createUser = async (user: RegisterDto): Promise<Users> => {

    const sql =
        'INSERT INTO users (email, password, name, surname, birthday, phone, token, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;'

    const role: Role = 'none'

    const token: string = md5(user.email + user.password)

    const result = await client.query(sql, [user.email, user.password, user.name, user.surname, user.birthday, user.phone, token, role])

    if (result.rowCount == 0) {
        throw Error('Error while create user: rowsCount = 0')
    }

    const createdUser: Users = result.rows[0]

    return createdUser
}

export const findUserByemail = async (email: string): Promise<Users | null> => {
    const sql = 'Select * from users WHERE email = $1'

    const result = await client.query(sql, [email])

    if (result.rowCount > 0) {
        return result.rows[0] as Users
    }

    // const user: Users = result.rows[0]
    return null
}

export const findUserByToken = async (token: string): Promise<Users | null> => {
    const sql = 'SELECT * from users WHERE token = $1'

    console.log(token);

    const result = await client.query(sql, [token])

    console.log(result.rows);

    if (result.rowCount > 0) {
        return result.rows[0] as Users
    }

    return null
}

export const findUserById = async (id: number): Promise<Users | null> => {
    const sql = 'SELECT * from users WHERE id = $1'

    const result = await client.query(sql, [id])

    if (result.rowCount > 0) {
        return result.rows[0] as Users
    }

    return null
}


export const excistUser = async (email: string): Promise<boolean> => {
    const sql = 'SELECT id, token from users WHERE email = $1'

    const result = await client.query(sql, [email])

    console.log(result.rows)

    return result.rowCount !== 0
}

export const verifiedUser = async (userId: number, token: string, role: Role): Promise<Users> => {

    const sql = 'UPDATE users SET token = $1, role = $2 WHERE id = $3 RETURNING *'

    const result = await client.query(sql, [token, role, userId])

    return result.rows[0]
}




//get all users function "/"
// manage user service
export const allUser = async () => {
    const sql = 'SELECT * from users'

    const result = await client.query(sql)

    return result.rows

}

export const deleteUser = async (id: number) => {
    const sql =  `delete from users where id = $1`

    const result = await client.query(sql,[id])

    return result.rows

}


export const updateDetails = async (userDetail: UpdateUserDetail, id: number) => {
    const sql = `UPDATE users SET email = $1, name = $2, surname = $3, birthday = $4, phone = $5 WHERE id = $6 RETURNING *`

    const {email, name, surname,birthday, phone} = userDetail

    const result = await client.query(sql, [email,name,surname,birthday,phone, id])

    return result.rows[0]
}

export const updateAccess = async (userAcces: UpdateUserAccess, id: number) => {

    const sql = 'UPDATE users SET password = $1, role = $2 WHERE id = $3 RETURNING *'

    const {password, role} = userAcces

    const result = await client.query(sql, [password, role, id])

    return result.rows[0]
}


