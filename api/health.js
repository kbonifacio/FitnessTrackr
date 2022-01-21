const healthRouter = require("express").Router();

healthRouter.get("/health", (req, res )=> {
    try {
        res.send('testing that all is well')
    } catch (error) {
        throw error
    }
    
})


module.exports = healthRouter;