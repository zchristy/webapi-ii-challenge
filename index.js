const express = require('express');

const router = require('./router');

const server = express();

server.use('/api/posts', router)

server.use('/', (req, res) => {
  res.send('Home Page')
})

server.listen(8000, () => {
  console.log('App is running on port 8000')
})
