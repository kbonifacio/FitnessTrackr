const activitiesRouter = require("express").Router();

const {
    getAllActivities
} = require("../db")

activitiesRouter.get("/activities", (req, res )=> {
    try {
        res.send('ACTIVITIES testing that all is well')
    } catch (error) {
        throw error
    }
    
})

activitiesRouter.get("/activities", async (req, res, next)=>{
    try {
        const activities = await getAllActivities();
        res.send(activities)
    } catch (error) {
        
    }
})


module.exports = activitiesRouter;