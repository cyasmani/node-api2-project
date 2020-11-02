const express = require('express')

const router = require('./router')

const server = express()
server.use(express.json())


server.use('/api/posts', router)


server.get('/', (req, res) => {
    res.send('We in here')
});

module.exports = server 