import express from "express";
import {AccountDto} from "../../../../libs/shared/src/dto/account.dto";
import * as AccountModel from "../models/account.model";
export const AccountRouter = express.Router();

AccountRouter.post('', (req, res) => {
	const account = <AccountDto>{
		name: req.body.name,
		password: req.body.password
	};
	AccountModel.createUser(account, (err: any, account: AccountDto) => {
		if (err) {
			res.json({ error: err });
		} else {
			res.json({ account: account });
		}
	});
});