const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ModelUser = mongoose.Schema({
	login: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const User = module.exports = mongoose.model('User', ModelUser);

module.exports.addUser = function (newUser, callback) {
	bcrypt.genSalt(11, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

module.exports.findByLogin = function (login, callback) {
	const query = {login: login};
	User.findOne(query, callback);
}

module.exports.comparePassword = function (pass, hashPass, callback) {
	bcrypt.compare(pass, hashPass, (err, isMatch) => {
		if (err) throw err;
		callback(null, isMatch);
	});
}

