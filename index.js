// Подключение библиотек
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');

const User = require('./models/User');

// Подключение конфигов
const db = require('./config/db');

// Создание сервера
const app = express();

// Настройка проекта
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize(undefined));
app.use(passport.session(undefined));
require('./config/passport')(passport);

// Контроллеры
const home = require('./controllers/home');
const editModels = require('./controllers/editModels');
const login = require('./controllers/login');

app.use('/', home);
app.use('/edit-models', editModels);
app.use('/login', login);

// Подключение к бд
mongoose.connect(db.db, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
	console.log('Успешное подключение к БД!');
	// Создание аккаунта
	User.findByLogin('michail', (err, user) => {
		if (err) {
			console.log('Не сработал запрос поиска аккаунта!');
		} else {
			if (!user) {
				let newUser = new User({
					login: 'michail',
					password: '123'
				});
				User.addUser(newUser, (err) => {
					if (err) console.log('Не удалось создать аккаунт!');
					else console.log('Аккаунт успешно создан!');
				});
			}
		}
	});
});

mongoose.connection.on('error', (err) => {
	console.log('Ошибка подключения к БД: ' + err);
});

// Запуск сервера
app.listen(port, () => {
	console.log("Сервер был запущен по порту: " + port);
});