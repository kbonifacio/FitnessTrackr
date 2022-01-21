const routine_ActivitiesRouter = require("express").Router();

routine_ActivitiesRouter.get("/routine_activities", (req, res )=> {
    try {
        res.send('ROUTINE_ACTIVITIES testing that all is well')
    } catch (error) {
        throw error
    }
    
})


module.exports = routine_ActivitiesRouter;