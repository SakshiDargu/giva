const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const { Pool } = require('pg');

const PORT =  5000;

  const app = express();
  app.use(cors());
  app.use(express.json())

const pool = new Pool({
    connectionString: 'postgresql://postgresql_database_241i_user:0wkUt5HAqGWwv9tQajnFCjBF37lRQRAC@dpg-cseciau8ii6s7390vn0g-a/postgresql_database_241i',  
    ssl: {
      rejectUnauthorized: false, 
    },
  });
  
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price FLOAT,
    quantity INTEGER,
    image TEXT
  );
`;

async function dropProductsTable() {
  const dropQuery = `DROP TABLE IF EXISTS products;`; // SQL query to drop the products table

  try {
    await pool.query(dropQuery);
    console.log('Table "products" dropped successfully.');
  } catch (error) {
    console.error('Error dropping table:', error);
  }
}

// dropProductsTable();

async function createTable() {
  try {
    await pool.query(createTableQuery);
    console.log("Table 'products' created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createTable();  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET operation
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
    console.log(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST operation
app.post('/api/products', async (req, res) => {
  const { name, description, price, quantity, image } = req.body;
  console.log(name, description, price, quantity, image)
  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, quantity, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, quantity, image]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT operation
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, image } = req.body;

  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4, image = $6 WHERE id = $5 RETURNING *',
      [name, description, price, quantity, id, image]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE operation
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
