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
        }
        if(_user){
            res.status(409)
            next({
                name: "UserExists",
                message: "A user by that username already exists"
            })
        }
        if(password.length < 8) {
            res.status(406)
            next({
                name: "PWLengthError",
                message: "Password must be longer than 8 characters"
            })
        }

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
            token, user})

    } catch (error) {
        next(error)
    }

})

usersRouter.post("/login", async (req, res, next) => { 
    console.log("in userRouter.post")
    const {username, password} = req.body;
    // username is coming up undefined
    console.log(req.body) 
    res.send("Hello World")
    // if (!username || !password) {
    //     res.status(406)
    //     next({
    //         name: "NotEnoughInformation",
    //         message: "Please supply both a name and password"
    //     })
    // }
    // try {
    //     const user = await getUser(username, password);
    //     console.log("user25:", user)
    //     if (!user) {
    //         next({
    //             name: "InvalidCredentials",
    //             message: "Incorrect username or password"
    //         })
    //     } else { 
    //         if(username && password){
    //             const token = jwt.sign(
    //                 { 
    //                     id: user.id, 
    //                     username
    //                 }, process.env.JWT_SECRET, {
    //                 expiresIn: '1w'
    //             });
    
    //             res.send({
    //                 message: "Successfully logged in", 
    //                 token})
    //         }
    //     } 
    // } catch (error) {
    //     next(error)
    // }
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