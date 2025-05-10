const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Datastore = require('nedb');
const cors = require('cors');  // Подключаем CORS

// Инициализация Express и базы данных
const app = express();
const PORT = 3000;
const db = new Datastore({ filename: 'products.db', autoload: true });

// Настройка CORS
app.use(cors());

// Подключение middleware для обработки JSON-запросов
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Настройка статичных файлов для загрузки изображений
app.use('/uploads', express.static('uploads'));

// Настройка Multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Получаем список всех продуктов
app.get('/api/products', (req, res) => {
  db.find({}, (err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при получении списка продуктов' });
    }
    res.json(products); // Возвращаем список продуктов
  });
});

// Добавление нового продукта
app.post('/api/products', upload.array('photos', 5), (req, res) => {
  const { name, price, description } = req.body;
  const photos = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  const newProduct = { name, price, description, photos };

  db.insert(newProduct, (err, addedProduct) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка добавления продукта' });
    } else {
      res.status(201).json(addedProduct);
    }
  });
});

// Обновление продукта по ID
app.put('/api/products/:id', upload.array('photos', 5), (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const photos = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  const updatedProduct = { name, price, description, photos };

  db.update({ _id: id }, { $set: updatedProduct }, {}, (err, numReplaced) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка обновления продукта' });
    }

    if (numReplaced === 0) {
      return res.status(404).json({ error: 'Продукт не найден' });
    }

    res.json(updatedProduct);  // Возвращаем обновленные данные продукта
  });
});

// Удаление продукта по ID
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  db.remove({ _id: productId }, {}, (err, numRemoved) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка удаления продукта' });
    } else if (numRemoved === 0) {
      res.status(404).json({ error: 'Продукт не найден' });
    } else {
      res.json({ message: 'Продукт удалён!' });
    }
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});
