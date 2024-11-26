const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
const PORT = 3000;
const cors = require('cors');
const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use('/api/product', productRouter);
app.use('/auth', authRouter);

app.listen(PORT, (req, res) => {
  console.log(`server open ${PORT}`);
});

app.get('/api/products', (req, res) => {
  db.query(`SELECT * FROM product ORDER BY created DESC LIMIT 9`, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '상품 데이터를 불러오는 중 오류가 발생했습니다.' });
    }
    res.json(result);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/main.html'));
});


app.get('/product/create', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/create.html'));
});

app.get('/product/like', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/like.html'));
});
app.get('/product/life', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/life.html'));
});

app.get('/product/electronics', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/elec.html'));
});

app.get('/product/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/detail.html'));
});