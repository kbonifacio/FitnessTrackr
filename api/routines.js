const routinesRouter = require("express").Router();

routinesRouter.get("/routines", (req, res )=> {
    try {
        res.send('ROUTINES testing that all is well')
    } catch (error) {
        throw error
    }
    
})


module.exports = routinesRouter;