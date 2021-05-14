const express = require('express');
const router = express.Router();
const ModelCar = require('../models/ModelCar');

router.get('/', (req, res) => {
	ModelCar.findAll((err, modelsCar) => {
		if (err) throw err;
		ModelCar.distinctFirm((err, firms) => {
			if (err) throw err;
			res.json({
				success: true,
				modelsCar: modelsCar,
				distinctFirm: firms
			});
		});
	});
});

router.post('/', (req, res) => {
	switch (req.body.task) {
		case 1:
			let newModelCar = new ModelCar({
				model: req.body.model,
				firm: req.body.firm
			});
			ModelCar.addModelCar(newModelCar, (err, modelCar) => {
				if (err) throw err;
				res.json({
					success: true,
					message: `Модель ${modelCar.model} успешно добавлен.`
				});
			});
			break;
		case 2:
			ModelCar.findByFirm(req.body.oldFirm, (err, modelsCar) => {
				if (err) throw err;
				modelsCar.forEach((m) => {
					ModelCar.findByModelAndFirm(m.model, req.body.firm, (err, modelCar) => {
						if (err) throw err;
						if (modelCar) {
							ModelCar.deleteByModelAndFirm(m.model, req.body.oldFirm, (err) => {
								if (err) throw err;
							});
						} else {
							ModelCar.updateFirmFromModel(req.body.oldFirm, req.body.firm, m.model, (err) => {
								if (err) throw err;
							});
						}
					});
				});
				res.json({
					message: `Фирма ${req.body.oldFirm} успешно изменена на ${req.body.firm}.`
				});
			});
			break;
		case 3:
			ModelCar.deleteByFirm(req.body.firm, (err) => {
				if (err) throw err;
				res.json({
					message: `Фирма ${req.body.firm} успешно удалена.`
				});
			});
			break;
		case 4:
			ModelCar.findByModelAndFirm(req.body.model, req.body.firm, (err, modelCar) => {
				if (err) throw err;
				if (modelCar) {
					ModelCar.deleteByModelAndFirm(req.body.oldModel, req.body.firm, (err) => {
						if (err) throw err;
					});
				} else {
					ModelCar.updateModel(req.body.oldModel, req.body.model, req.body.firm, (err) => {
						if (err) throw err;
					});
				}
				res.json({
					message: `Модель ${req.body.oldModel} успешно изменена на ${req.body.model}.`
				});
			});
			break;
		case 5:
			ModelCar.deleteByModelAndFirm(req.body.model, req.body.firm, (err) => {
				if (err) throw err;
				res.json({
					message: `Модель ${req.body.model} успешно удалена.`
				});
			});
			break;
	}
});

module.exports = router;