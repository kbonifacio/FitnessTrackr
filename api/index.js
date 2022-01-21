const express = require("express");
const apiRouter = express.Router();

const healthRouter = require("./health");
apiRouter.use("/health", healthRouter);

const activitiesRouter = require("./activities");
apiRouter.use("/activities", activitiesRouter)

const routinesRouter = require("./routines");
apiRouter.use("/routines", routinesRouter)

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const routine_ActivitiesRouter = require("./routine_activities");
apiRouter.use("/routine_activities", routine_ActivitiesRouter);


apiRouter.use((error, req, res, next)=>{
    res.send(error);
});


module.exports = apiRouter;
