const healthRouter = require("express").Router();

healthRouter.get("/", (req, res )=> {
    try {
        res.send({
            message:"testing that all is well"
        })
    } catch (error) {
        throw error
    }
    
})


module.exports = healthRouter;