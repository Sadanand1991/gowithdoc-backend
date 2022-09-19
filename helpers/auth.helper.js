// const jwt = require("jsonwebtoken");
const Common = require("./common.helper");

module.exports = (req, res, next) => {
    /* const origin = req.get("Site-Origin");
    if(!origin){
        const error = new Error("Fraudulent Activity Detected");
        error.statusCode = 451;
        throw error;
    }
    if (Common.isEmpty(req.query, "unauth")) {
        const authHreader = req.get("Authorization");

        if (!authHreader) {
            const error = new Error("Unauthorized access!");
            error.statusCode = 401;
            throw error;
        }

        const token = authHreader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'secretefortoken');
        } catch (err) {
            err.statusCode = 500;
            throw err
        }

        if (!decodedToken) {
            const error = new Error("Unauthorized access!");
            error.statusCode = 401;
            throw error;
        }

        req.isLoggedIn = true;
        req.user_id = decodedToken.user_id;
        req.email = decodedToken.email;
        req.role_id = decodedToken.role_id;
    } */
    next();
}