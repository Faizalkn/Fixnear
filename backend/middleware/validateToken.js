const jwt = require("jsonwebtoken");

const validate = (req, res, next) => {
    const authHead = req.headers.authorization;

    if (!authHead || !authHead.startsWith("Bearer ")) {
        const error = new Error("Please login to access");
        error.statusCode = 401;
        return next(error);
    }

    const token = authHead.split(" ")[1];

    if (!token) {
        const error = new Error("Token is missing");
        error.statusCode = 401;
        return next(error);
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                const error = new Error("Invalid or expired token");
                error.statusCode = 401;
                return next(error);
            }

            req.user = {
                userId: decoded.userId,
                role: decoded.role
            };

            next();
        }
    );
};

module.exports = validate;