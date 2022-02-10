const usersRouter = require("express").Router();
const { isLoggedIn } = require("./utils")
const jsonWebToken =require("jsonwebtoken");
const { createUser, getUserByUsername, getPublicRoutinesByUser } = require("../db");


usersRouter.post("/login", async (req, res, next) => { 
    const {username, password} = req.body;
    // username is coming up undefined

    if (!username || !password) {
        next({
            name: "InvalidCredentials",
            message: "A username and password are required"
        })
        res.send(406)
    }

    try {
        const user = await getUserByUsername({username});
        if (username && password) {

            const token = jwt.sign({ 
                id: user.id, 
                username
                }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({message: "Successfully logged in", token})
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Name or password is incorrect"
            })
            res.send(409)
        }
    } catch (error) {
        next(error)
    }
})

//
usersRouter.get("/me", isLoggedIn, async (req, res, next) =>{
    if(isLoggedIn){
        try {
            res.send(req.user);
        } catch (error) {
            next (error);
        }
    }

} )

usersRouter.get("/:username/routines", async (req, res, next )=> {
    const username = req.params
    try {
        const allUserRoutines = await getPublicRoutinesByUser({username:req.params.username})
        if (allUserRoutines) {
            res.send(allUserRoutines)
        }
    } catch ({name, message}) {
        next ({name, message})
    }
    
})

usersRouter.get("/users/:username/routines", async (req, res, next) => {
    const { username } = req.params.username
    try {
        const userRoutines = await getPublicRoutinesByUser({username})
        if(userRoutines) {
            res.send(userRoutines)
        }
    } catch (error) {
        throw error
    }
})


module.exports = usersRouter;