const routinesRouter = require("express").Router();
const {
    getAllPublicRoutines
} = require("../db")

routinesRouter.get("/routines", (req, res )=> {
    try {
        res.send('ROUTINES testing that all is well')
    } catch (error) {
        throw error
    }
    
})

routinesRouter.get("/", async (req, res, next)=>{
    try {
        const routines = await getAllPublicRoutines();
        res.send(routines)
    } catch (error) {
        
    }
})

module.exports = routinesRouter;