const client = require('./client');

async function getRoutineById(id) {
    const { rows: [routineById] } = await client.query(`
        SELECT "creatorId", "isPublic", name, goal FROM routines 
        WHERE id = $1;
        `, [id])
    return routineById;
}

async function createRoutine ({ creatorId, isPublic, name, goal }) {
    const { rows:[routine] } = await client.query(`
        INSERT INTO routines("creatorId", "isPublic", name, goal)
        VALUES ($1, $2, $3, $4)

        RETURNING *
    `, [creatorId, isPublic, name, goal])
    
    return routine;
}

async function getRoutinesWithoutActivities(){
    const { rows } = await client.query(`
        SELECT id, "creatorId", "isPublic", name, goal FROM routines;
    `,[])
    return rows;
}

async function getAllRoutines() {
    try {
        const {rows: routines} = await client.query(`
            SELECT *, users.username AS "creatorName" FROM routines
            JOIN users ON routines."creatorId" = users.id
        `)
        // console.log(routines)
        const {rows: activities} = await client.query(`
            SELECT * FROM activities
            JOIN routine_activities ON activities.id = routine_activities."activityId"
        `)
        // console.log(activities)
        routines.forEach(routine => {
            routine.activities = activities.filter(activity => activity.id === routine.id);
        });
        return routines;
    } catch (error) {
        throw error;
    }
}

async function getAllPublicRoutines(){
    try {
        const {rows: routines} = await client.query(`
            SELECT *, users.username AS "creatorName" FROM routines
            JOIN users ON routines."creatorId" = users.id
            WHERE "isPublic" = true;
        `)
        // console.log(routines)
        const {rows: activities} = await client.query(`
            SELECT * FROM activities
            JOIN routine_activities ON activities.id = routine_activities."activityId"
        `)
        // console.log(activities)
        routines.forEach(routine => {
            routine.activities = activities.filter(activity => activity.id === routine.id);
        });
        return routines;
    } catch (error) {
        throw error;
    }
}

async function getAllRoutinesByUser({ username }){
    try {
        const {rows: routines} = await client.query(`
            SELECT *, users.username AS "creatorName" FROM routines
            JOIN users ON "creatorId" = users.id
            WHERE username = $1;
        `,[username])
        console.log(routines)
        const {rows: activities} = await client.query(`
            SELECT * FROM activities
            JOIN routine_activities ON activities.id = routine_activities."activityId"
        `)
        // console.log(activities)
        routines.forEach(routine => {
            routine.activities = activities.filter(activity => activity.id === routine.id);
        });
        return routines;
    } catch (error) {
        throw error;
    }
}

async function getPublicRoutinesByUser({ username }){
    try {
        const {rows: routines} = await client.query(`
            SELECT *, users.username AS "creatorName" FROM routines
            JOIN users ON "creatorId" = users.id
            WHERE users.username = $1 AND "isPublic" = true
        `,[username])
        console.log(routines)
        const {rows: activities} = await client.query(`
            SELECT * FROM activities
            JOIN routine_activities ON activities.id = routine_activities."activityId"
        `)
        // console.log(activities)
        routines.forEach(routine => {
            routine.activities = activities.filter(activity => activity.id === routine.id);
        });
        return routines;
    } catch (error) {
        throw error;
    }
}

async function getPublicRoutinesByActivity(){
    try {
        const {rows: routines} = await client.query(`
            SELECT *, users.username AS "creatorName" FROM routines
            JOIN users ON routines."creatorId" = users.id
            WHERE "isPublic" = true;
        `)
        // console.log(routines)
        const {rows: activities} = await client.query(`
            SELECT * FROM activities
            JOIN routine_activities ON activities.id = routine_activities."activityId"
        `)
        // console.log(activities)
        routines.forEach(routine => {
            routine.activities = activities.filter(activity => activity.id === routine.id);
        });
        return routines;
    } catch (error) {
        throw error;
    }
}

async function updateRoutine({}){

}


module.exports = {
    createRoutine,
    getRoutinesWithoutActivities,
    getRoutineById,
    getAllRoutines,
    getAllRoutinesByUser,
    getAllPublicRoutines,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity
}