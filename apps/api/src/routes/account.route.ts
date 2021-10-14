import express from "express";
export const accountRouter = express.Router();
import { accountModule } from '../models/account.module';

accountRouter.get(':id', (req, res) => {

	accountModule.findById(req.params, null, null, (err, account) => {
		if (err) throw err;
		res.json(account);
	});
});