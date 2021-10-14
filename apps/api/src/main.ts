// Импорт библиотек
import express from 'express';
import mongoose from "mongoose";
import { Config } from "./configs/config";

// Импорт роутов
import { accountRouter } from './routes/account.route';

const app = express();
const port = 3000;

mongoose.connect(Config.prototype.mongo, (err) => {
	if (err) {
		console.error(`Произошла ошибка при подключении к БД: ${err}`);
	}
});

app.use('/account', accountRouter);

app.listen(port, () => {
	console.log(`Сервер запущен по порту ${port}`);
});