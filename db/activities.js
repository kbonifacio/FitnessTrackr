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
    try {
        const { rows:[newActivity] } = await client.query(`
            UPDATE activities
            SET name = $2, description = $3
            WHERE id = $1
            
            RETURNING id, name, description;
        `,[id, name, description])
        return newActivity;
    } catch (error) {
        
    }
}

module.exports = {
    getActivityById,
    getAllActivities, 
    createActivity,
    updateActivity
}