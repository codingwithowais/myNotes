const connectToMongo = require('./db');
var cors = require('cors')
const express = require('express')
connectToMongo();
const app = express()
const port = 200;
app.use(cors());
app.use(express.json());
app.use('/api/notes',require('./routes/notes'))
app.use('/api/auth',require('./routes/auth'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`stickynotes backend server listening on port ${port}`)
})
