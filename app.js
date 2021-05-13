const express = require('express')
const morgan = require('morgan')

const { db } = require('./controllers/controller-user')
const user = require('./routes/router-user')


const PORT = process.env.PORT || 5000

app = express()


db
  .then((result) => {
    console.log('connected to database')
  
    // listen for request only after connection to database has been established
    app.listen(PORT, ()=> {
      console.log(`server is up and running on port ${PORT}`)
    })
  })
  .catch((err) => { console.log(err) })



// parse request payload
app.use(express.urlencoded({ extended:false }))
// parse json
app.use(express.json())
// logger
//app.use(morgan('dev'))
// route our "/user/*" request through router-user
app.use('/api/users', user) 

// handle all 404 errors
app.all('/*', (req, res) => {
  res.status(404).json({error: "endpoint does not exist, please see readme at https://github.com/NoStackDev/crudApp for api documentation"})
})
