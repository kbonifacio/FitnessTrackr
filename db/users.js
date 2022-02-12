const client = require('./client');
const bcrypt = require('bcrypt');
const { user } = require('pg/lib/defaults');
const SALT_COUNT = 5;
// 1) createUser 


async function createUser({username, password}) {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
      const {rows: [user]} = await client.query(`
        INSERT INTO users (username, password) 
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `, [username, hashedPassword]);
      delete user.password
      return user;
    } catch (error) {
      throw error;
    }
  }

async function getUser({username, password}){
    try {
        const {rows: [user]} = await client.query(`
            SELECT * FROM users WHERE username=$1
        `,[username]);

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (passwordsMatch) {
            delete user.password;
            return user;
        }
    } catch (error) {
        throw error
    }
}

async function getUserById(id){
    try {
        const { rows:[user] } = await client.query(`
            SELECT * FROM users
            WHERE id = $1;
        `,[id])

        if (!user) return null;

        delete user.password
        return user;
    } catch (error) {
        throw error
    }   
}

async function getUserByUsername(username){
    try {
        const { rows:[user] } = await client.query(`
            SELECT * FROM users 
            WHERE username = $1;
        `,[username])
        delete user.password
        return user;
    } catch (error) {
        
    }
}


module.exports = { 
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
}