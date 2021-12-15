import { Router } from "express";
import pool from "../../utils/db/connect.js";
import moment from 'moment'

const productRouter = Router();
//1 
productRouter.post("/", async (req, res, next) => {
  try {
    const { product_name, product_description, product_brand,product_price,product_category} = req.body;
    const result = await pool.query(
      "INSERT INTO products (product_name, product_description, product_brand, product_price, product_category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [product_name, product_description, product_brand, product_price, product_category]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//2.
productRouter.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM products;");
    res.send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
 
//3 
productRouter.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE product_id = $1;",
      [req.params.id]
    );
    if (result.rows[0]) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send(`Product with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//4.
 
productRouter.put("/:id", async (req, res, next) => {
  try {
    const updateStatement = Object.entries(req.body)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");
    const updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");
    const query = `UPDATE products SET ${updateStatement} ,updated_at='${updatedAt}' WHERE product_id = ${req.params.id} RETURNING *;`;
    const result = await pool.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
 
//5.

productRouter.delete("/:id", async (req, res, next) => {
  try {
    const query = `DELETE FROM products WHERE product_id = ${req.params.id};`;
    await pool.query(query);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default productRouter;