const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const User = require('../models/User');

router.post('/', (req, res) => {
	const login = req.body.login;
	const password = req.body.password;

	User.findByLogin(login, (err, user) => {
		if (err) throw err;
		if (!user) {
			res.json({success: false, message: "Пользователь был не найден!"});
		} else {
			User.comparePassword(password, user.password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					const token = jwt.sign(user.toJSON(), config.secret, {
						expiresIn: 3600 * 24
					});
					res.json({
						success: true,
						token: 'JWT ' + token,
						user: {
							id: user._id,
							login: user.login
						}
					});
				} else {
					res.json({success: false, message: "Неверный пароль!"});
				}
			});
		}
	});
});

module.exports = router;