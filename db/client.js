// build and export your unconnected client here >> connect to the fitness-dev db 
// and then import into your individual files. 

const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/fitnesstrackr');

module.exports = client;
