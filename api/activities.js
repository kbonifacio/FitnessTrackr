const activitiesRouter = require("express").Router();

activitiesRouter.get("/activities", (req, res )=> {
    try {
        res.send('ACTIVITIES testing that all is well')
    } catch (error) {
        throw error
    }
    
})


module.exports = activitiesRouter;