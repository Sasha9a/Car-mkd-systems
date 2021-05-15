const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

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
		console.log(id);
	});
});

router.get('/:id', (req, res) => {

});

module.exports = router;