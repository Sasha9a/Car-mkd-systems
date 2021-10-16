import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { AccountDto } from "../../../../libs/shared/src/dto/account.dto";

const accountSchema = new mongoose.Schema<AccountDto>({
	name: {
		type: "string",
		required: true
	},
	password: {
		type: "string",
		required: true
	}
});

export const AccountModel = mongoose.model<AccountDto>('Account', accountSchema);

export const createUser = (body: AccountDto, callback: any) => {
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return console.error(err);
		bcrypt.hash(body.password, salt, (err, hash) => {
			if (err) return console.error(err);
			body.password = hash;
			const account = new AccountModel(body);
			account.save(callback);
		});
	});
};