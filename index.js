// Подключение библиотек
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const User = require('./models/User');
const ModelCar = require('./models/ModelCar');
const Product = require('./models/Product');

// Подключение конфигов
const db = require('./config/db');

// Создание сервера
const app = express();

// Настройка проекта
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize(undefined));
app.use(passport.session(undefined));
require('./config/passport')(passport);
app.use(fileUpload({
	createParentPath: true
}));

// Контроллеры
const home = require('./controllers/home');
const editModels = require('./controllers/editModels');
const login = require('./controllers/login');
const params = require('./controllers/editParams');
const product = require('./controllers/product');

app.use('/', home);
app.use('/edit-models', editModels);
app.use('/login', login);
app.use('/edit-params', params);
app.use('/product', product);

app.get('/images/:id', (req, res) => {
	fs.access(path.resolve('./public/images/', req.params.id), fs.F_OK, (err) => {
		if (err) {
			console.error(err);
		} else {
			fs.createReadStream(path.resolve('./public/images/', req.params.id)).pipe(res);
		}
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

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
					password: '$2a$11$9n46v15spzs7KfbyZxhE8.w23gjb9.v76ip5LvWlX3Jmd4C3u7iUW'
				});
				newUser.save((err) => {
					if (err) console.log('Не удалось создать аккаунт!');
					else console.log('Аккаунт успешно создан!');
				});
			}
		}
	});
	// Изменение на новую версию БД в Моделях с v1.2
	Product.find({}, (err, products) => {
		if (err) return console.error(err);
		ModelCar.findAll((err, modelsCar) => {
			if (err) return console.error(err);
			products.forEach((p) => {
				let array = [];
				p.carModels.forEach((m) => {
					if (m.model) {
						if (modelsCar.find((el) => m.model === el.model && m.firm === el.firm)) {
							array.push(modelsCar.find((el) => m.model === el.model && m.firm === el.firm)._id);
						}
					}
				});
				if (array.length > 0) {
					p.carModels = array;
					p.save();
				}
			});
		});
	})
});

mongoose.connection.on('error', (err) => {
	console.log('Ошибка подключения к БД: ' + err);
});

// Запуск сервера
app.listen(port, () => {
	console.log("Сервер был запущен по порту: " + port);
});