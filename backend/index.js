const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "kobby-wears",
  password: "facultyf",
  port: 5432,
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the shopping app backend!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
