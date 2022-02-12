const client = require('./client');

async function getActivityById(id){
    try {
        const { rows } = await client.query(`
        SELECT * FROM activities
        WHERE id = $1;
    `, [id])
    return rows;
    } catch (error) {
        throw error
    }
}

async function getAllActivities(){
    const { rows } = await client.query(`
        SELECT * FROM activities;
    `)
    return rows;
}

async function createActivity({name, description}){
    try {
        const { rows: [activity] } = await client.query(`
            INSERT INTO activities(name, description)
            VALUES ($1, $2)
    
            RETURNING *;
        `, [name, description])
        return activity;
    } catch (error) {
        
    }
}

async function updateActivity({ id, name, description }){
    try {
        const { rows:[newActivity] } = await client.query(`
            UPDATE activities
            SET name = $2, description = $3
            WHERE id = $1
            
            RETURNING *;
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