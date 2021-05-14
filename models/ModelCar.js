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
	ModelCar.findOne(query, {_id: 0, __v: 0}, callback);
}

module.exports.findByFirm = function (firm, callback) {
	const query = {firm: firm};
	ModelCar.find(query, {_id: 0, __v: 0}, callback).sort({model: 1});
}

module.exports.findAll = function (callback) {
	ModelCar.find({}, {_id: 0, __v: 0}, callback).sort({firm: 1});
}

module.exports.deleteByFirm = function (firm, callback) {
	const query = {firm: firm};
	ModelCar.deleteMany(query, callback);
}

module.exports.deleteByModelAndFirm = function (model, firm, callback) {
	const query = {model: model, firm: firm};
	ModelCar.deleteOne(query, callback);
}

module.exports.addModelCar = function (modelCar, callback) {
	modelCar.save(callback);
}

module.exports.distinctFirm = function (callback) {
	ModelCar.distinct("firm", callback);
}

module.exports.updateFirmFromModel = function (oldFirm, newFirm, model, callback) {
	const query = {firm: oldFirm, model: model};
	const set = {firm: newFirm};
	ModelCar.updateMany(query, {$set: set}, callback);
}

module.exports.updateModel = function (oldModel, newModel, firm, callback) {
	const query = {model: oldModel, firm: firm};
	const set = {model: newModel};
	ModelCar.updateMany(query, {$set: set}, callback);
}