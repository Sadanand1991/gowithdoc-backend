exports.get404 = (req, res, next) => {
    const error = new Error("API Not Found");
    error.statusCode = 404;
    next(error);
}

exports.get500 = (error, req, res, next) => {
    const data = error.data;
    res.status(error.statusCode || 500);
    res.statusMessage = error.message;
    res.json({
        errors:[{
            msg: error.message,
            data: data
        }]
    });
}