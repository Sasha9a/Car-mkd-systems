const express = require('express');
const router = express.Router();
const Param = require('../models/Param');

router.get('/', (req, res) => {
	Param.findAll((err, params) => {
		if (err) throw err;
		res.json({
			allParams: params
		});
	});
});

router.post('/', (req, res) => {
	switch (req.body.task) {
		case 1:
			let newParam = new Param({
				name: req.body.name
			});
			Param.findByName(req.body.name, (err, param) => {
				if (err) throw err;
				if (param) {
					res.json({
						success: false,
						message: `Такая характеристика уже существует!`
					});
				} else {
					Param.addParam(newParam, (err, param) => {
						if (err) throw err;
						res.json({
							success: true,
							message: `Характеристика <b>${param.name}</b> успешно добавлена.`
						});
					});
				}
			});
			break;
		// case 2:
		// 	Param.findByName(req.body.name, (err, param) => {
		// 		if (err) throw err;
		// 		if (param) {
		// 			Param.deleteByName(req.body.oldName, (err) => {
		// 				if (err) throw err;
		// 			});
		// 		} else {
		// 			Param.updateParam(req.body.oldName, req.body.name, (err, param) => {
		// 				if (err) throw err;
		// 			});
		// 		}
		// 		res.json({
		// 			message: `Характеристика <b>${req.body.oldName}</b> успешно изменена на <b>${req.body.name}</b>.`
		// 		});
		// 	});
		// 	break;
		case 2:
			Param.deleteByName(req.body.name, (err) => {
				if (err) throw err;
				res.json({
					message: `Характеристика <b>${req.body.name}</b> успешно удалена.`
				});
			});
			break;
	}
});

module.exports = router;