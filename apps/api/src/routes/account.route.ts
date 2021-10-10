import express from "express";
export const accountRouter = express.Router();

accountRouter.get('', (req, res) => {
	res.send('Hello');
});