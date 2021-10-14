import mongoose from "mongoose";
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
}, { versionKey: false });

export const accountModule = mongoose.model<AccountDto>('account', accountSchema);

