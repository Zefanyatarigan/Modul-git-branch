const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/api/produk', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produk ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/produk', async (req, res) => {
  try {
    const { nama_produk, harga, stok } = req.body;
    const result = await pool.query(
      'INSERT INTO produk (nama_produk, harga, stok) VALUES ($1, $2, $3) RETURNING *',
      [nama_produk, harga, stok]
    );
    res.json({
      message: 'Data berhasil ditambahkan',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend berjalan dengan baik' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di http://localhost:${process.env.PORT}`);
});
<<<<<<< HEAD

app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend berjalan dengan baik' });
});
=======
>>>>>>> origin/main
