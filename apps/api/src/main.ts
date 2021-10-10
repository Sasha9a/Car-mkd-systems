// Импорт библиотек
import express from 'express';

// Импорт роутов
import { accountRouter } from './routes/account.route';

const app = express();
const port = 3000;

app.use('/account', accountRouter);

app.listen(port, () => {
	console.log(`Сервер запущен по порту ${port}`);
});