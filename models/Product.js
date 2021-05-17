const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	stock: {
		type: Number,
		default: 0
	},
	price: {
		type: [Number],
		default: []
	},
	discount: {
		type: [Number],
		default: []
	},
	images: {
		type: [String],
		default: []
	},
	carModels: {
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