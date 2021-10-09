// Подключение библиотек
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Подключение конфигов
const db = require('./configs/db');

// Подключение роутов
const accountRoute = require('./routes/accountRoute');

const app = express();
const port = 3000;

// Настройка проекта
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));

// Привязка роутов
app.use('/account', accountRoute);

mongoose.connect(db.db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.error(`Не удалось подключиться к БД: ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Сервер был запущен по порту ${port}`);
});
