const client = require('./client');

async function getRoutineActivityById(id){
    try {
        const { rows: [routine] } = client.query(`
        SELECT * FROM routine_activities
        WHERE id = $1

        RETURNING *
    `, [id])
    // console.log('routineActivityById',routine)
    return routine
    } catch (error) {
        throw error
    }
}

async function addActivityToRoutine({
    routineId,
    activityId,
    count,
    duration,
  }) {
    try {
      const { rows: [routineActivity] } = await client.query(`
      INSERT INTO routine_activities ( "routineId", "activityId", count , duration)
      VALUES($1, $2, $3, $4)
      ON CONFLICT ("routineId", "activityId") DO NOTHING
      RETURNING *;
        `, [ routineId, activityId, count, duration]);
      return routineActivity;
    } catch (error) {
      throw error;
    }
  }

async function updateRoutineActivity({id, ...fields}) {
    try {
        const toUpdate = {};
        let setStrings = [];
        let count = 1;
        for(let column in fields) {
        if(fields[column] !== undefined) {
            toUpdate[column] = fields[column];
            setStrings.push(`"${column}"=$${count}`)
            count++;
            };
        };
        const setStr = setStrings.join(',');
        const {rows: [routine]} = await client.query(`
            UPDATE routine_activities 
            SET ${setStr}
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(toUpdate));
        return routine;
    } catch (error) {
        throw error;
    };
};

async function destroyRoutineActivity(id) {
    try {
      const {rows: [routineActivity]} = await client.query(`
          DELETE FROM routine_activities 
          WHERE id = $1
          RETURNING *;
      `, [id]);
      return routineActivity;
    } catch (error) {
      throw error;
    }
  }

async function getRoutineActivitiesByRoutine({ id }){
    try {
        const { rows } = await client.query(`
            SELECT * FROM routine_activities
            WHERE "routineId" = ${id};
        `)
        return rows;
    } catch (error) {
        throw error
    }
}

module.exports = {
    addActivityToRoutine,
    getRoutineActivityById,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivitiesByRoutine
}