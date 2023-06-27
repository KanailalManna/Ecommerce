const ErrorHander = require("../utils/errorhander");


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // 500 is internal server error
    err.message = err.message || "Internal Server Error";


    // Wrong Mongodb Id error
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message,400);
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // error: err.stack, 
    });
}

