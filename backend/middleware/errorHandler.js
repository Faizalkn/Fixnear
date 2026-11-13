const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || (err.code === 11000 ? 409 : err.name === "MulterError" ? 400 : 500);
    const message = err.code === 11000
        ? "Email or phone number already exists"
        : err.code === "LIMIT_FILE_SIZE"
            ? "Each uploaded file must be 5 MB or smaller"
            : err.message;

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
        case 409:
            type = "Conflict";
            break;

        default:
            type = "Server Error";
    }

    res.status(statusCode).json({
        success: false,
        type,
        message: message || "Something went wrong",

        ...(process.env.NODE_ENV === "development" && {
            errorStack: err.stack,
        }),
    });
};

module.exports = errorHandler;
