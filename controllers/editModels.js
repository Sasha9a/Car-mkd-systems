const express = require('express');
const router = express.Router();
const ModelCar = require('../models/ModelCar');
const Product = require('../models/Product');

router.post('/', (req, res) => {
	switch (req.body.task) {
		case 0:
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
			break;
		case 1:
			let newModelCar = new ModelCar({
				model: req.body.model,
				firm: req.body.firm
			});
			ModelCar.findByModelAndFirm(req.body.model, req.body.firm, (err, modelCar) => {
				if (err) throw err;
				if (modelCar) {
					res.json({
						success: false,
						message: `Такая модель уже существует!`
					});
				} else {
					ModelCar.addModelCar(newModelCar, (err, modelCar) => {
						if (err) throw err;
						res.json({
							success: true,
							message: `Модель ${modelCar.model} успешно добавлен.`
						});
					});
				}
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
				Product.find({"carModels.firm" : req.body.firm}, (err, products) => {
					if (err) throw err;
					products.forEach((p) => {
						p.carModels = p.carModels.filter((el) => el.firm !== req.body.firm);
						p.save();
					});
					res.json({
						message: `Фирма ${req.body.firm} успешно удалена.`
					});
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
				Product.find({
					"carModels.firm" : req.body.firm,
					"carModels.model" : req.body.model
				}, (err, products) => {
					if (err) throw err;
					products.forEach((p) => {
						p.carModels = p.carModels.filter((el) => el.firm !== req.body.firm || el.model !== req.body.model);
						p.save();
					});
					res.json({
						message: `Модель ${req.body.model} успешно удалена.`
					});
				});
			});
			break;
	}
});

module.exports = router;