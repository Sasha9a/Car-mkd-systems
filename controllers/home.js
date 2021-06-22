const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ModelCar = require('../models/ModelCar');

router.post('/', (req, res) => {
	Product.find({}, (err, products) => {
		if (err) throw err;
		ModelCar.findAll((err, models) => {
			if (err) throw err;
			ModelCar.distinctFirm((err, firms) => {
				if (err) throw err;
				res.json({
					success: true,
					products: products,
					firms: firms,
					models: models
				});
			});
		});
	}).sort({isPublic: 1, stock: -1});
});

module.exports = router;