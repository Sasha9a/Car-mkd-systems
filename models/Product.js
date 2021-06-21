const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ModelCar = require('./ModelCar');

const ProductSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	stock: {
		type: Number,
		default: 0
	},
	images: {
		type: [String],
		default: []
	},
	carModels: {
		type: [mongoose.ObjectId],
		default: []
	},
	mods: {
		type: [Schema.Types.Mixed],
		default: []
	},
	isPublic: {
		type: Boolean,
		default: false
	}
}, { versionKey: false });

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.addProduct = function (product, callback) {
	product.save(callback);
}

module.exports.getAllCarModel = function (product, callback) {
	let res = [];
	let arr = [];
	let count = product.carModels.length;
	product.carModels.forEach((m) => {
		ModelCar.findById(m, (err, model) => {
			if (err) return console.error(err);
			arr.push(model);
			count--;
		});
	});
	const timer = setInterval(() => {
		if (count === 0) {
			clearInterval(timer);
			arr.sort((a, b) => {
				if (a.firm > b.firm) {
					return 1;
				} else if (a.firm < b.firm) {
					return -1;
				}
				return 0;
			});
			arr.forEach((el) => {
				if (res.find((element) => { return element.firm === el.firm; }) === undefined) {
					const template = {
						firm: el.firm,
						models: []
					};
					res.push(template);
				}
				res.find((element) => { return element.firm === el.firm; }).models.push(el.model);
			});
			callback(res);
		}
	}, 500);
}