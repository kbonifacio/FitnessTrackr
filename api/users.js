const usersRouter = require("express").Router();

usersRouter.get("/users", (req, res )=> {
    try {
        res.send('USERS testing that all is well')
    } catch (error) {
        throw error
    }
    
})


module.exports = usersRouter;