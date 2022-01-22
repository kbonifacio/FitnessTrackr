const activitiesRouter = require("express").Router();

const {
    getAllActivities
} = require("../db")

// activitiesRouter.get("/", (req, res )=> {
//     try {
//         res.send('ACTIVITIES testing that all is well')
//     } catch (error) {
//         throw error
//     }
    
// })

activitiesRouter.get("/", async (req, res, next)=>{
    try {
        const activities = await getAllActivities();
        console.log(activities)
        res.send(activities)
    } catch (error) {
        
    }
})


module.exports = activitiesRouter;