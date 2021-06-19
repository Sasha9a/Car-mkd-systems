const express = require('express');
const router = express.Router();
const ModelCar = require('../models/ModelCar');
const Product = require('../models/Product');

router.post('/', (req, res) => {
	switch (req.body.task) {
		case 0:
			ModelCar.findAll((err, modelsCar) => {
				if (err) return console.error(err);
				ModelCar.distinctFirm((err, firms) => {
					if (err) return console.error(err);
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
				firm: req.body.firm,
				model: req.body.model
			});
			ModelCar.findByModelAndFirm(req.body.model, req.body.firm, (err, modelCar) => {
				if (err) return console.error(err);
				if (modelCar) {
					res.json({
						success: false,
						message: `Такая модель уже существует!`
					});
				} else {
					ModelCar.addModelCar(newModelCar, (err, modelCar) => {
						if (err) return console.error(err);
						ModelCar.findAll((err, modelsCar) => {
							if (err) return console.error(err);
							ModelCar.distinctFirm((err, firms) => {
								if (err) return console.error(err);
								res.json({
									success: true,
									message: `Модель ${modelCar.model} успешно добавлен.`,
									modelsCar: modelsCar,
									distinctFirm: firms
								});
							});
						});
					});
				}
			});
			break;
		case 2:
			ModelCar.findByFirm(req.body.oldFirm, (err, modelsCar) => {
				if (err) return console.error(err);
				let count = modelsCar.length;
				modelsCar.forEach((m) => {
					ModelCar.findByModelAndFirm(m.model, req.body.firm, (err, modelCar) => {
						if (err) return console.error(err);
						if (modelCar) {
							ModelCar.deleteByModelAndFirm(m.model, req.body.oldFirm, (err) => {
								if (err) return console.error(err);
								count--;
							});
						} else {
							ModelCar.updateFirmFromModel(req.body.oldFirm, req.body.firm, m.model, (err) => {
								if (err) return console.error(err);
								count--;
							});
						}
					});
				});
				const timer = setInterval(() => {
					if (count === 0) {
						clearInterval(timer);
						ModelCar.findAll((err, modelsCar) => {
							if (err) return console.error(err);
							ModelCar.distinctFirm((err, firms) => {
								if (err) return console.error(err);
								res.json({
									message: `Фирма ${req.body.oldFirm} успешно изменена на ${req.body.firm}.`,
									modelsCar: modelsCar,
									distinctFirm: firms
								});
							});
						});
					}
				}, 500);
			});
			break;
		case 3:
			ModelCar.findByFirm(req.body.firm, (err, modelsCar) => {
				if (err) return console.error(err);
				ModelCar.deleteByFirm(req.body.firm, (err) => {
					if (err) return console.error(err);
					modelsCar.forEach((mc) => {
						Product.find({carModels: mc._id}, (err, products) => {
							if (err) return console.error(err);
							products.forEach((p) => {
								p.carModels = p.carModels.filter((el) => el !== mc._id);
								p.save();
							});
						});
					});
					ModelCar.findAll((err, modelsCar) => {
						if (err) return console.error(err);
						ModelCar.distinctFirm((err, firms) => {
							if (err) return console.error(err);
							res.json({
								message: `Фирма ${req.body.firm} успешно удалена.`,
								modelsCar: modelsCar,
								distinctFirm: firms
							});
						});
					});
				});
			});
			break;
		case 4:
			ModelCar.findByModelAndFirm(req.body.model, req.body.firm, (err, modelCar) => {
				if (err) return console.error(err);
				let count = 1;
				if (modelCar) {
					ModelCar.deleteByModelAndFirm(req.body.oldModel, req.body.firm, (err) => {
						if (err) return console.error(err);
						count--;
					});
				} else {
					ModelCar.updateModel(req.body.oldModel, req.body.model, req.body.firm, (err) => {
						if (err) return console.error(err);
						count--;
					});
				}
				const timer = setInterval(() => {
					if (count === 0) {
						clearInterval(timer);
						ModelCar.findAll((err, modelsCar) => {
							if (err) return console.error(err);
							ModelCar.distinctFirm((err, firms) => {
								if (err) return console.error(err);
								res.json({
									message: `Модель ${req.body.oldModel} успешно изменена на ${req.body.model}.`,
									modelsCar: modelsCar,
									distinctFirm: firms
								});
							});
						});
					}
				}, 500);
			});
			break;
		case 5:
			ModelCar.findByModelAndFirm(req.body.model, req.body.firm, (err, modelCar) => {
				if (err) return console.error(err);
				ModelCar.deleteByModelAndFirm(req.body.model, req.body.firm, (err) => {
					if (err) return console.error(err);
					Product.find({ carModels: modelCar._id }, (err, products) => {
						if (err) return console.error(err);
						products.forEach((p) => {
							p.carModels = p.carModels.filter((el) => el !== modelCar._id);
							p.save();
						});
						ModelCar.findAll((err, modelsCar) => {
							if (err) return console.error(err);
							ModelCar.distinctFirm((err, firms) => {
								if (err) return console.error(err);
								res.json({
									message: `Модель ${req.body.model} успешно удалена.`,
									modelsCar: modelsCar,
									distinctFirm: firms
								});
							});
						});
					});
				});
			});
			break;
	}
});

module.exports = router;