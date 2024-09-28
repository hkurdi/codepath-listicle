require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./config/db");


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("<h1>Business Guide API</h1>");
});

app.get("/api/items", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/api/items/:id", async (req, res) => {
  const itemId = parseInt(req.params.id);
  try {
    const result = await pool.query("SELECT * FROM items WHERE id = $1", [itemId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
