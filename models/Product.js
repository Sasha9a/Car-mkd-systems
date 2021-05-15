const mongoose = require('mongoose');

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
		type: [Number]
	},
	discount: {
		type: [Number]
	},
	images: {
		type: [String]
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