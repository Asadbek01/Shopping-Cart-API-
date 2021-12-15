import { Router } from "express";
import pool from "../../utils/db/connect.js";
import moment from 'moment'

const reviewRouter = Router();
//1 
reviewRouter.post("/", async (req, res, next) => {
  try {
    const { comment, rate, product_id,cover } = req.body;
    
    const result = await pool.query(
      "INSERT INTO review (comment, rate, product_id, cover) VALUES ($1, $2, $3, $4) RETURNING *",
      [comment, rate,  product_id, cover]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//2.
reviewRouter.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM review;");
    res.send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
 
//3 
reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM review WHERE review_id = $1;",
      [req.params.id]
    );
    if (result.rows[0]) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send(`Review with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//4.
 
reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const updateStatement = Object.entries(req.body)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");
    const updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");
    const query = `UPDATE review SET ${updateStatement} ,updated_at='${updatedAt}' WHERE review_id = ${req.params.id} RETURNING *;`;
    const result = await pool.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
 
//5.

reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const query = `DELETE FROM review WHERE review_id = ${req.params.id};`;
    await pool.query(query);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default reviewRouter;