const routinesRouter = require("express").Router();
const {
    getAllPublicRoutines
} = require("../db")


routinesRouter.get("/", async (req, res, next) => {
    try {
        const routines = await getAllPublicRoutines();
        res.send(routines)
    } catch (error) {
        throw error
    }
})

module.exports = routinesRouter;