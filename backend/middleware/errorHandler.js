const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    let type;

    switch (statusCode) {
        case 400:
            type = "Validation Failed";
            break;

        case 401:
            type = "Unauthorized";
            break;

        case 403:
            type = "Forbidden";
            break;

        case 404:
            type = "Not Found";
            break;

        default:
            type = "Server Error";
    }

    res.status(statusCode).json({
        success: false,
        type,
        message: err.message || "Something went wrong",

        ...(process.env.NODE_ENV === "development" && {
            errorStack: err.stack,
        }),
    });
};

module.exports = errorHandler;