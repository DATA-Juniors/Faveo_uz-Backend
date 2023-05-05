CONTROLLERS dagi app-info ni kor

multer structure 

controller
middleware
service


               inner join
select products.id as id, products.name as name, products.price as price, products.image as image, products.category_id as category_id, category.name as category_name, category.icon as category_icon from products inner join category on products.category_id = category.id;




                         JOIN
SELECT * FROM products JOIN category ON products.category_id = category.id ;






SELECT
    o.id,
    p.id,
    p.name,
    p.price,
    p.image,
    p.category_id,
    b.quantity,
    o.date,
    sum(p.price * b.quantity) AS total_price,
    o.address,
    o.phone,
    o.name AS order_name,
    o.purchase_type
FROM
    Order o
    JOIN Basket b ON o.id = b.order_id
    JOIN Product p ON b.product_id = p.id
WHERE
    o.id = 213
GROUP BY
    o.id,
    p.id,
    b.quantity
.

/////////////////////////////////////////

import { Pool } from 'pg';

// Konfiguratsiya
const pool = new Pool({
  user: 'foydalanuvchi_nomi',
  host: 'localhost',
  database: 'ma`lumotlar_bazasi_nomi',
  password: 'foydalanuvchi_paroli',
  port: 5432,
});

// Kod yozish funksiyasi
async function getOrderDetails(orderId: number) {
  const orderQuery = `
    SELECT
      o.id,
      o.address,
      o.phone,
      o.name,
      o.purchasetype,
      o.date,
      SUM(p.price * b.quantity) AS total_price,
      SUM(b.quantity) AS total_quantity
    FROM
      "Order" o
      JOIN "Basket" b ON o.id = b.order_id
      JOIN "Product" p ON b.product_id = p.id
    WHERE
      o.id = $1
    GROUP BY
      o.id
  `;

  const productQuery = `
    SELECT
      p.id,
      p.name,
      p.price,
      p.image,
      p.category_id,
      b.quantity
    FROM
      "Basket" b
      JOIN "Product" p ON b.product_id = p.id
    WHERE
      b.order_id = $1
  `;

  const orderResult = await pool.query(orderQuery, [orderId]);
  const productResult = await pool.query(productQuery, [orderId]);

  const order = orderResult.rows[0];
  const products = productResult.rows;

  return {
    id: order.id,
    products: products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || null,
      category_id: product.category_id,
      quantity: product.quantity,
    })),
    date: order.date,
    total: {
      price: order.total_price || null,
      quantity: order.total_quantity || null,
    },
    address: order.address || null,
    phone: order.phone || null,
    name: order.name || null,
    purchase_type: order.purchasetype || null,
  };
}

////////////////////////////////////////

import { Pool } from 'pg';

const pool = new Pool({
  user: 'db_user',
  host: 'localhost',
  database: 'db_name',
  password: 'db_password',
  port: 5432,
});

async function getOrderById(id: number) {
  const orderQuery = `
    SELECT o.id, o.address, o.phone, o.name, o.purchasetype, o.date, 
      SUM(p.price * b.quantity) as total_price, 
      SUM(b.quantity) as total_quantity
    FROM "Order" o
    LEFT JOIN "Basket" b ON o.id = b.order_id
    LEFT JOIN "Product" p ON b.product_id = p.id
    WHERE o.id = $1
    GROUP BY o.id
  `;
  const orderResult = await pool.query(orderQuery, [id]);

  const productQuery = `
    SELECT p.id, p.name, p.price, p.image, p.category_id, b.quantity
    FROM "Basket" b
    LEFT JOIN "Product" p ON b.product_id = p.id
    WHERE b.order_id = $1
  `;
  const productResult = await pool.query(productQuery, [id]);

  const products = productResult.rows.map((row: any) => {
    return {
      id: row.id,
      name: row.name,
      price: row.price,
      image: row.image,
      category_id: row.category_id,
      quantity: row.quantity
    };
  });

  return {
    id: orderResult.rows[0].id,
    products: products,
    date: orderResult.rows[0].date,
    total: {
      price: orderResult.rows[0].total_price || null,
      quantity: orderResult.rows[0].total_quantity || null
    },
    address: orderResult.rows[0].address || null,
    phone: orderResult.rows[0].phone || null,
    name: orderResult.rows[0].name || null,
    purchase_type: orderResult.rows[0].purchasetype || null
  };
}


///////////////////////////

import express from "express";
import pg from "pg";

const app = express();

const pool = new pg.Pool({
  user: "your_postgres_username",
  password: "your_postgres_password",
  host: "your_postgres_host",
  database: "your_postgres_database",
  port: your_postgres_port,
});

app.get("/", async (req, res) => {
  try {
    const { rows: orders } = await pool.query(`
      SELECT
        o.id,
        o.address,
        o.phone,
        o.name,
        o.purchasetype,
        o.date,
        json_build_object(
          'price', COALESCE(SUM(p.price * b.quantity), 0),
          'quantity', COALESCE(SUM(b.quantity), 0)
        ) AS total,
        json_agg(json_build_object(
          'id', p.id,
          'name', p.name,
          'price', p.price,
          'image', p.image,
          'category_id', p.category_id,
          'quantity', b.quantity
        )) AS products
      FROM "Order" AS o
      LEFT JOIN "Basket" AS b ON o.id = b.order_id
      LEFT JOIN "Product" AS p ON b.product_id = p.id
      GROUP BY o.id
    `);

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


///////////////////////////

import { Pool, PoolClient } from 'pg';

// PostgreSQL bazasiga ulanish uchun Pool yaratamiz
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // default port
});

async function createOrder(client: PoolClient, order: any) {
  try {
    await client.query('BEGIN');

    // Orders table uchun insert query
    const orderQuery = `
      INSERT INTO orders (id, address, phone, name, purchase_type, date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    // Orders table ga ma'lumotlarni insert qilamiz va response ni olish uchun await qilamiz
    const { rows: [newOrder] } = await client.query(orderQuery, [order.id, order.address, order.phone, order.name, order.purchase_type, order.date]);

    // Inner join query Basket va Product tablitsalari bilan
    const productQuery = `
      SELECT p.id, p.name, p.price, p.image, p.category_id, b.quantity
      FROM basket b
      INNER JOIN product p ON b.product_id = p.id
      WHERE b.order_id = $1
    `;

    // Basket va Product tablitsalaridan ma'lumotlarni olish uchun query ni yaratamiz va response ni olish uchun await qilamiz
    const { rows: products } = await client.query(productQuery, [order.id]);

    // Umumiy narx va miqdorni hisoblash uchun total object ini yaratamiz
    const total = products.reduce((acc: any, product: any) => {
      acc.price += product.price * product.quantity;
      acc.quantity += product.quantity;
      return acc;
    }, { price: 0, quantity: 0 });

    // Orders table ga yana update query
    const updateQuery = `
      UPDATE orders
      SET total_price = $1, total_quantity = $2
      WHERE id = $3
      RETURNING *
    `;

    // Orders table ni yangilash va response ni olish uchun await qilamiz
    const { rows: [updatedOrder] } = await client.query(updateQuery, [total.price, total.quantity, newOrder.id]);

    await client.query('COMMIT');
    console.log('Transaction is completed successfully.');

    // Result ni olib return qilamiz
    return {
      id: updatedOrder.id,
      products: products,
      date: updatedOrder.date,
      total: {
        price: total.price,
        quantity: total.quantity,
      },
      address: updatedOrder.address,
      phone: updatedOrder.phone,
      name: updatedOrder.name,
      purchase_type: updatedOrder.purchase_type,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Transaction is rolled back.', error);
    throw error;
  } finally {
    // Pool dan client ni release qilamiz
    client.release();
  }
}

// Asosiy funksiyamizni test qilamiz
async function main() {
  const client = await pool.connect();

  try {
    const order = {
      id: 'order_001




