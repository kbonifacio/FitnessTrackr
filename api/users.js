const usersRouter = require("express").Router();
const jsonWebToken =require("jsonwebtoken");
const { jwt_Secret ="superDuperSecret"} = process.env

const { createUser, getAllRoutinesByUser, getPublicRoutinesByUser, getUserByUsername } = require("../db");

usersRouter.post("/register", async (req, res, next) =>{
    try {
        const { username, password } = req.body;
        const user = await getUserByUsername(username);

        if (user) {
            res.status(401);
            next({
                name: "UserAlreadyExistsError",
                message: "This username is already in use"
            })
        } else if (password.length < 8) {
            res.status(401)
            next({
                name: "PasswordTooShortError",
                message: "Password too short, please add more characters"
            })
        } else {
            const newUser = await createUser({
                username,
                password
            })
            const token = jsonWebToken.sign({
                id: user.id, username: user.username
            }, jwt_Secret, 
            { expiresIn: "1w"}
            )
            res.send({ newUser,message: "successful login", token})
        }
        
    } catch (error) {
        throw error
    }
})

usersRouter.get("/:username/routines", async (req, res, next )=> {
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