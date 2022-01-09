const client = require('./client');

async function getActivityById(id){
    const { rows } = await client.query(`
        SELECT * FROM activities
        WHERE id = $1;
    `, [id])
    
    return rows;
}

async function getAllActivities(){
    const { rows } = await client.query(`
        SELECT id, name, description FROM activities;
    `,[])
    return rows;
}

async function createActivity({name, description}){
    const { rows: [activity] } = await client.query(`
        INSERT INTO activities(name, description)
        VALUES ($1, $2)

        RETURNING name, description
    `, [name, description])
    return activity;
}

async function updateActivity({ id, name, description }){
    const { rows:[newActivity] } = await client.query(`
        UPDATE activities
        SET name = $2, description = $3
        WHERE id = $1
        
        RETURNING id, name, description;
    `,[id, name, description])
    return newActivity;
}

async function addActivityToRoutine({routineId, activityId, count, duration}){
    const { rows: [addedRoutineActivities] } = await client.query(`
        INSERT INTO routine_activities("routineId", "activityId", count, duration)
        VALUES ($1, $2, $3, $4)

        RETURNING "routineId", "activityId", count, duration;
    `, [routineId, activityId, count, duration])
    return addedRoutineActivities;
}

module.exports = {
    getActivityById,
    getAllActivities, 
    createActivity,
    addActivityToRoutine,
    updateActivity
}