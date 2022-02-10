
function isLoggedIn(req, res, next) {
    if(!req.user) {
        res.status(401);
        next({
            name: "MissingUserError",
            message: "You must be logged in"
        });
    }
    next();
}

module.exports = { isLoggedIn };