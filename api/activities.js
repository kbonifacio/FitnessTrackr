const activitiesRouter = require("express").Router();
const { isLoggedIn } = require("./utils")
const {
    getAllActivities, 
    getActivityById,
    createActivity,
    updateActivity,
    getPublicRoutinesByActivity
} = require("../db")


// activity name is undefined
activitiesRouter.get("/", async (req, res, next)=>{
    console.log("api router")
    try {
        const activities = await getAllActivities();
        res.send(activities)
    } catch (error) {
        throw error;
    }
})

// isLoggedIn error = req.user is undefined
activitiesRouter.post("/", isLoggedIn, async (req, res, next) =>{
    const { name, description } = req.body;
    
    if(!name || !description) {
        next({
            name: "NotEnoughInformation",
            message: "Both and name and description are required. Please complete both"
        })
    }else{
        try {
            const newActivity = await createActivity({name, description});
            if(newActivity) {
                res.send(newActivity)
            }
        } catch (error) {
            throw error
        }
    }
})

activitiesRouter.get("/:activityId/routines", async (req, res, next)=> {
    const { id } = req.params.activityId
    try {
        const routines = await getPublicRoutinesByActivity({id})
        if (routines) {
            res.send(routines);
          } else {
            throw({
              name: "NoneFound",
              message: `No Routines were found with Activity ${id}`,
            })
        }
    } catch (error) {
        
    }
})
// activitiesRouter.patch("/:activityId", async (req,res,next) => {
//     const { name, description } = req. body;
//     const { id } = req.params.activityId;
//     try {
//         const updatedActivity = await updateActivity({id, name, description})
//         if (updatedActivity){
//             res.send(updatedActivity)
//         }
//     } catch (error) {
//         throw error
        
//     }

// })


module.exports = activitiesRouter;