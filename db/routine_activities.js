const client = require('./client');

async function addActivityToRoutine({routineId, activityId, count, duration}){
    const { rows: [addedRoutineActivities] } = await client.query(`
        INSERT INTO routine_activities("routineId", "activityId", count, duration)
        VALUES ($1, $2, $3, $4)

        RETURNING "routineId", "activityId", count, duration;
    `, [routineId, activityId, count, duration])
    return addedRoutineActivities;
}

module.exports = {
    addActivityToRoutine
}