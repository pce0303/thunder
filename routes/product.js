const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const db = require('../db');
const cors = require('cors');

router.use(express.static(path.join(__dirname, '../public')));
router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다.'));
    }
  },
});

router.get('/:id', (req, res) => {
  const productId = req.params.id;
  if(!productId) return res.status(404).send('상품을 찾을 수 없습니다.');

  db.query(`SELECT * from product WHERE id = ?`, [productId], (err, result) => {
    if(err) return res.status(500).send('상품 조회 중 오류 발생');
    console.log(result);
    res.json(result[0]);
  })
})

// 상품 등록
router.post('/create', upload.single('image'), (req, res) => {
  const { name, price, detail, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !price || !category) {
    return res.status(400).send('이름, 가격, 카테고리는 필수 입력 항목입니다.');
  }

  const query = `INSERT INTO product (name, detail, category, created, price, image) VALUES (?, ?, ?, NOW(), ?, ?)`;
  db.query(query, [name, detail || null, category, price, imageUrl], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('상품 등록 중 오류가 발생했습니다.');
    }
    console.log('result: ', result);
    res.redirect(`/product/${result.insertId}`);
  });
});

// 상품 수정 
router.post('/update', upload.single('image'), (req, res) => {
  const { id, name, price, detail, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // 새로운 이미지 URL

  if (!id) {
    return res.status(400).send('상품 ID는 필수 입력 항목입니다.');
  }

  const query = `
    UPDATE product
    SET name=COALESCE(?, name),
        detail=COALESCE(?, detail),
        category=COALESCE(?, category),
        price=COALESCE(?, price),
        image=COALESCE(?, image)
    WHERE id=?
  `;

  db.query(query, [name, detail, category, price, imageUrl, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('상품 수정 중 오류가 발생했습니다.');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('수정할 상품을 찾을 수 없습니다.');
    }
    res.send({ message: '상품 수정 성공' });
  });
});

// 상품 삭제
router.post('/delete', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send('상품 ID는 필수 입력 항목입니다.');
  }

  const query = `DELETE FROM product WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('상품 삭제 중 오류가 발생했습니다.');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('삭제할 상품을 찾을 수 없습니다.');
    }
    res.send({ message: '상품 삭제 성공' });
  });
});

// 찜한 상품 조회
router.post('/like', (req, res) => {
  const { ids } = req.body; // 찜한 상품 ID 배열
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).send({ message: '찜한 상품 ID 목록이 비어 있습니다.' });
  }

  const likedID = ids.map(() => '?').join(',');
  db.query(
    `SELECT * FROM product WHERE id IN (${likedID})`,
    ids,
    (err, result) => {
      if (err) return res.status(500).send({ message: '상품 조회 중 오류 발생' });
      res.json(result);
    }
  );
});

router.get('/category/electronics', (req, res) => {
  console.log('here@!!!!', req, res);
  db.query(`SELECT * FROM product WHERE category = '전자제품'`, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '상품 데이터를 불러오는 중 오류가 발생했습니다.' });
    }

    console.log('Query Result:', result);
    res.send(result);
  });
});

router.get('/category/life', (req, res) => {
  db.query(`SELECT * FROM product WHERE category = '생활용품'`, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '상품 데이터를 불러오는 중 오류가 발생했습니다.' });
    }
    res.send(result);
  });
});


module.exports = router;