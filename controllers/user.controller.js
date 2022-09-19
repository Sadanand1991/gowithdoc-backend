const { validationResult } = require("express-validator");

const User = require("../models/user.model");

exports.get = async (req, res, next) => {
	try {
		const result = await User.get(req.query, req);
		res.status(200).json(result);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
}