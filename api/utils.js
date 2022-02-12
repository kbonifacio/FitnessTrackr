
function isLoggedIn(req, res, next) {
    console.log("isLoggedIn:", req.user)
    if(!req.user) {
        res.status(401);
        next({
            name: "MissingUserError",
            message: "You must be logged in"
        });
    }
    next();
}

module.exports =  isLoggedIn ;