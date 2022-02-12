const usersRouter = require("express").Router();
const isLoggedIn = require("./utils")
const jwt =require("jsonwebtoken");
const { createUser, getUserByUsername, getPublicRoutinesByUser, getUser } = require("../db");
const { JWT_SECRET = "cookies" } = process.env;

usersRouter.post("/register", async (req, res, next) => {
    const {username, password} = req.body;
    const _user = await getUserByUsername(username);
    try {
        if (!username || !password) {
            next({
                name: "NotEnoughInformation",
                message: "A username and password are required"
            })
        } else if(_user){
            res.status(409)
            next({
                name: "UserExists",
                message: "A user by that username already exists"
            })
        } else if(password.length < 8) {
            res.status(406)
            next({
                name: "PWLengthError",
                message: "Password must be longer than 8 characters"
            })
        } else {
            const user = await createUser({
                username: username, 
                password: password 
            });

            const token = jwt.sign({
                id: user.id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            })
            res.send({
                message: "Thank you for registering",
                token, user
            })
        }
    } catch (error) {
        next(error)
    }
})

usersRouter.post("/login", async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        next({
            name: "CredentialsMissing",
            message: "Please supply both a name and password"
        })
        res.send(406)
    }

    try {
        const user = await getUserByUsername(username);
        if (username && password) {

            const token = jwt.sign({ 
                id: user.id, 
                username
                }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({message: "You're logged in!", token})
        } else {
            next({
                name: "InvalidCredentials",
                message: "Name or password is incorrect"
            })
            res.send(409)
        }
    } catch (error) {
        next(error)
    }
})


usersRouter.get("/me", isLoggedIn, async (req, res, next) =>{
    const { username, password } = req.body
        try {
            const user = await getUser(username, password)
            console.log("user98:", user)
            res.send(user);
        } catch (error) {
           next(error);
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



module.exports = usersRouter;