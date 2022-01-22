const express = require('express')
const server = express();

const apiRouter = require('./api')
server.use('/api', apiRouter)

const cors = require('cors')

const PORT = 3000;
server.listen(PORT, function() {
    console.log(`listening at http://localhost:${PORT}`)
})

const client = require('./db/client')
client.connect();

server.use(cors())
server.get('/',(req, res)=>{
    res.send('Hello world!')
})
