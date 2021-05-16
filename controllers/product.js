const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fs = require('fs');

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
		res.json({
			product: product
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
				fs.unlink('./public/images/' + i, (err) => {
					if (err) {
						console.error(err);
						res.json({success: false});
						return false;
					}
				});
			});
			arrImages = [];
			if (req.files.images.length === undefined) {
				req.files.images.mv(__dirname + '/../public/images/' + req.files.images.md5 + req.files.images.name, (err) => {
					if (err) {
						console.error(err);
						res.json({success: false});
						return false;
					}
				});
				arrImages.push(req.files.images.md5 + req.files.images.name);
			} else {
				req.files.images.forEach((f) => {
					f.mv(__dirname + '/../public/images/' + f.md5 + f.name, (err) => {
						if (err) {
							console.error(err);
							res.json({success: false});
							return false;
						}
					});
					arrImages.push(f.md5 + f.name);
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
	}
});

module.exports = router;