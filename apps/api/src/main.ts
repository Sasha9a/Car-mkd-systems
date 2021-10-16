import express from 'express';
import mongoose from "mongoose";
import config from "./configs/config";
import { AccountRouter } from "./routes/account.route";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api/account', AccountRouter);

mongoose.connect(config.mongodb, (error) => {
	if (error) {
		console.log(`Не удалось подключиться к БД: ${error}`);
	}
});

mongoose.connection.on("connected", () => {
	console.log("Успешное подключение к БД");
});

app.listen(port, () => {
	console.log(`Сервер запущен по порту ${port}`);
});