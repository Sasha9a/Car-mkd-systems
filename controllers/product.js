const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ModelCar = require('../models/ModelCar');
const Param = require('../models/Param');
const fs = require('fs');
const uuid = require('uuid');

router.post('/new', (req, res) => {
	let product = new Product({
		name: req.body.name,
		stock: req.body.stock
	});
	Product.addProduct(product, (err, id) => {
		if (err) throw err;
		res.json({
			message: `Продукт <b>${id.name}</b> успешно добавлен.`,
			product: id
		});
	});
});

router.post('/:id', (req, res) => {
	if (req.files) {
		let arrImages = [];
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			arrImages = product.images;
			arrImages.forEach((i) => {
				fs.access('./public/images/' + i, fs.F_OK, (err) => {
					if (!err) {
						fs.unlink('./public/images/' + i, (err) => {
							if (err) {
								console.error(err);
								res.json({success: false});
								return false;
							}
						});
					}
				});
			});
			arrImages = [];
			let uud;
			if (req.files.images.length === undefined) {
				uud = uuid.v4();
				req.files.images.mv(__dirname + '/../public/images/' + uud + req.files.images.name, (err) => {
					if (err) {
						console.error(err);
						res.json({success: false});
						return false;
					}
				});
				arrImages.push(uud + req.files.images.name);
			} else {
				req.files.images.forEach((f) => {
					uud = uuid.v4();
					f.mv(__dirname + '/../public/images/' + uud + f.name, (err) => {
						if (err) {
							console.error(err);
							res.json({success: false});
							return false;
						}
					});
					arrImages.push(uud + f.name);
				});
			}
			Product.updateOne({_id: req.params.id}, {$set: {images: arrImages}}, (err) => {
				if (err) throw err;
			});
			res.json({success: true, images: arrImages});
		});
	} else if (req.body.task === 0) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			ModelCar.findAll((err, modelsCar) => {
				if (err) throw err;
				ModelCar.distinctFirm((err, allFirms) => {
					if (err) throw err;
					Param.findAll((err, allParams) => {
						if (err) throw err;
						Product.distinct("carModels.firm", {_id: req.params.id}, (err, activeFirms) => {
							if (err) throw err;
							res.json({
								success: true,
								product: product,
								allModels: modelsCar,
								allFirms: allFirms,
								allParams: allParams,
								activeFirms: activeFirms
							});
						}).sort();
					});
				});
			})
		});
	} else if (req.body.task === 1) {
		Product.updateOne({_id: req.params.id}, {$set: {stock: req.body.stock}}, (err) => {
			if (err) throw err;
			res.json({success: true, stock: req.body.stock});
		});
	} else if (req.body.task === 2) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			product.carModels.push(req.body.model);
			product.save((err) => {
				if (err) throw err;
				Product.distinct("carModels.firm", {_id: req.params.id}, (err, activeFirms) => {
					if (err) throw err;
					res.json({
						success: true,
						carModels: product.carModels,
						activeFirms: activeFirms
					});
				}).sort();
			});
		});
	} else if (req.body.task === 3) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			product.carModels = product.carModels.filter((el) =>
				el.model !== req.body.model.model || el.firm !== req.body.model.firm);
			product.save((err) => {
				if (err) throw err;
				Product.distinct("carModels.firm", {_id: req.params.id}, (err, activeFirms) => {
					if (err) throw err;
					res.json({
						success: true,
						carModels: product.carModels,
						activeFirms: activeFirms
					});
				}).sort();
			});
		});
	} else if (req.body.task === 4) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			let mods = product.mods.filter((m) => m.name === req.body.nameMod);
			if (mods.length !== 0) {
				res.json({
					success: false,
					message: `Модификация <b>${req.body.nameMod}</b> уже существует!`
				});
			} else {
				const mod = {
					name: req.body.nameMod,
					price: 0,
					discount: -1,
					params: []
				};
				product.mods.push(mod);
				product.save();
				res.json({
					success: true,
					mods: product.mods
				});
			}
		});
	} else if (req.body.task === 5) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			let mods = product.mods.filter((m) => m.name === req.body.nameMod);
			if (mods.length !== 0) {
				res.json({
					success: false,
					message: `Модификация <b>${req.body.nameMod}</b> уже существует!`
				});
			} else {
				try {
					product.mods.find((m) => m.name === req.body.oldNameMod).name = req.body.nameMod;
					product.markModified('mods');
					product.save();
					res.json({
						success: true,
						mods: product.mods
					});
				} catch (err) {
					res.json({
						success: false,
						message: `Произошла ошибка: ${err}`
					});
				}
			}
		});
	} else if (req.body.task === 6) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			try {
				product.mods = product.mods.filter((el) => el.name !== req.body.nameMod);
				product.save();
				res.json({
					success: true,
					mods: product.mods
				});
			} catch (err) {
				res.json({
					success: false,
					message: `Произошла ошибка: ${err}`
				});
			}
		});
	} else if (req.body.task === 7) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			try {
				product.mods.find((m) => m.name === req.body.nameMod).price = req.body.price;
				product.markModified('mods');
				product.save();
				res.json({
					success: true,
					mods: product.mods
				});
			} catch (err) {
				res.json({
					success: false,
					message: `Произошла ошибка: ${err}`
				});
			}
		});
	} else if (req.body.task === 8) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			try {
				product.mods.find((m) => m.name === req.body.nameMod).discount = req.body.discount;
				product.markModified('mods');
				product.save();
				res.json({
					success: true,
					mods: product.mods
				});
			} catch (err) {
				res.json({
					success: false,
					message: `Произошла ошибка: ${err}`
				});
			}
		});
	} else if (req.body.task === 9) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			try {
				product.mods.find((m) => m.name === req.body.nameMod).discount = -1;
				product.markModified('mods');
				product.save();
				res.json({
					success: true,
					mods: product.mods
				});
			} catch (err) {
				res.json({
					success: false,
					message: `Произошла ошибка: ${err}`
				});
			}
		});
	} else if (req.body.task === 10) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			try {
				if (product.mods.find((m) => m.name === req.body.nameMod) !== undefined) {
					if (product.mods.find((m) => m.name === req.body.nameMod).params
							.find((p) => p.name === req.body.nameParam) === undefined) {
						if (req.body.value !== '') {
							const param = {
								name: req.body.nameParam,
								value: req.body.value
							};
							product.mods.find((m) => m.name === req.body.nameMod).params.push(param);
						}
					} else {
						if (req.body.value !== '') {
							product.mods.find((m) => m.name === req.body.nameMod).params
								.find((p) => p.name === req.body.nameParam).value = req.body.value;
						} else {
							product.mods.find((m) => m.name === req.body.nameMod).params =
								product.mods.find((m) => m.name === req.body.nameMod).params
									.filter((p) => p.name !== req.body.nameParam);
						}
					}
					product.markModified('mods');
					product.save();
					res.json({
						success: true,
						mods: product.mods
					});
				} else {
					res.json({
						success: false,
						message: `Произошла ошибка!`
					});
				}
			} catch (err) {
				res.json({
					success: false,
					message: `Произошла ошибка: ${err}`
				});
			}
		});
	} else if (req.body.task === 11) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			product.isPublic = true;
			product.save();
			res.json({
				success: true,
				isPublic: true
			});
		});
	} else if (req.body.task === 12) {
		Product.findById(req.params.id, (err, product) => {
			if (err) throw err;
			product.images.forEach((i) => {
				fs.access('./public/images/' + i, fs.F_OK, (err) => {
					if (!err) {
						fs.unlink('./public/images/' + i, (err) => {
							if (err) {
								console.error(err);
								res.json({success: false});
								return false;
							}
						});
					}
				});
			});
			Product.deleteOne({_id: req.params.id}, (err) => {
				if (err) throw err;
				res.json({success: true});
			});
		})
	}
});

module.exports = router;