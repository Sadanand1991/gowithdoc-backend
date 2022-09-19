const express = require("express");
const { body } = require("express-validator");
const auth = require("../helpers/auth.helper");

const router = express.Router();
const userController = require("../controllers/user.controller");

router.get('/',
    [
        auth
    ], userController.get
);

module.exports = router;