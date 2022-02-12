const express = require('express')
require('dotenv').config();
const server = express();

server.use(express.json())

const cors = require('cors')
server.use(cors())

const client = require('./db/client')
client.connect();

const apiRouter = require('./api')
server.use('/api', apiRouter)

const { PORT = 3000 } = process.env;
server.listen(PORT, function() {
    console.log(`listening at http://localhost:${PORT}`)
})




