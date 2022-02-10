const express = require('express')
const server = express();

const cors = require('cors')
server.use(cors())

const client = require('./db/client')
client.connect();

server.get('/',(req, res)=>{
    res.send('Hello world!')
})

const apiRouter = require('./api')
server.use('/api', apiRouter)

server.use(express.json())

const PORT = 3000;
server.listen(PORT, function() {
    console.log(`listening at http://localhost:${PORT}`)
})




