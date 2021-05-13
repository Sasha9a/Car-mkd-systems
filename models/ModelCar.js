const mongoose = require('mongoose');

const ModelCarSchema = mongoose.Schema({
	model: {
		type: String,
		required: true
	},
	firm: {
		type: String,
		required: true
	}
});

const ModelCar = module.exports = mongoose.model('ModelCar', ModelCarSchema);

module.exports.findByModelAndFirm = function (model, firm, callback) {
	const query = {model: model, firm: firm};
	ModelCar.findOne(query, callback);
}

module.exports.deleteByFirm = function (firm, callback) {
	const query = {firm: firm};
	ModelCar.deleteMany(query, callback);
}

module.exports.addModelCar = function (modelCar, callback) {
	modelCar.save(callback);
}