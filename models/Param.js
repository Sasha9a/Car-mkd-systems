const mongoose = require('mongoose');

const ParamSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	}
}, { versionKey: false });

const Param = module.exports = mongoose.model('Param', ParamSchema);

module.exports.findAll = function (callback) {
	Param.find({}, {_id: 0, __v: 0}, callback);
}

module.exports.findByName = function (name, callback) {
	const query = {name: name};
	Param.findOne(query, {_id: 0, __v: 0}, callback);
}

module.exports.addParam = function (param, callback) {
	param.save(callback);
}

module.exports.updateParam = function (oldName, newName, callback) {
	const query = {name: oldName};
	const set = {name: newName};
	Param.updateOne(query, {$set: set}, callback);
}

module.exports.deleteByName = function (name, callback) {
	const query = {name: name};
	Param.deleteOne(query, callback);
}