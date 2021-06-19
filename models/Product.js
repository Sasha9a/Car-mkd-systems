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
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.addProduct = function (product, callback) {
	product.save(callback);
}

module.exports.findCarModel = function (modelCarId, callback) {
	ModelCar.findById(modelCarId, callback);
}