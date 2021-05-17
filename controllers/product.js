const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ModelCar = require('../models/ModelCar');
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

router.get('/:id', (req, res) => {
	Product.findById(req.params.id, (err, product) => {
		if (err) throw err;
		ModelCar.findAll((err, modelsCar) => {
			if (err) throw err;
			ModelCar.distinctFirm((err, allFirms) => {
				if (err) throw err;
				Product.distinct("carModels.firm", {_id: req.params.id}, (err, activeFirms) => {
					if (err) throw err;
					res.json({
						product: product,
						allModels: modelsCar,
						allFirms: allFirms,
						activeFirms: activeFirms
					});
				}).sort();
			});
		})
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
	} else if (req.body.task === 1) {
		Product.updateOne({_id: req.params.id}, {$set: {stock: req.body.stock}}, (err) => {
			if (err) throw err;
		});
		res.json({success: true});
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
	}
});

module.exports = router;