const express = require('express');
const router = express.Router();
const ModelCar = require('../models/ModelCar');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}, function () {}),
	(req, res) => {
	res.send('Редактирование моделей!');
});

router.post('/', (req, res) => {
	let newModelCar = new ModelCar({
		model: req.body.model,
		firm: req.body.firm
	});
	ModelCar.addModelCar(newModelCar, (err, modelCar) => {
		if (err) {
			res.json({
				success: false,
				message: "Произошла ошибка при добавлении модели!"
			});
		} else {
			res.json({
				success: true,
				message: `Модель ${modelCar.model} успешно добавлен.`
			});
		}
	});
});

module.exports = router;