const authorizeRole = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            const error = new Error("Access denied");
            error.statusCode = 403;
            return next(error);
        }

        next();
    };
};

module.exports = authorizeRole;



// router.get(
//     '/admin/dashboard',
//     validate,
//     authorizeRole('admin'),
//     adminController
// );

// router.get(
//     '/employee/dashboard',
//     validate,
//     authorizeRole('employee'),
//     employeeController
// );
// router.get(
//     '/user/dashboard',
//     validate,
//     authorizeRole('user'),
//     userController
// );