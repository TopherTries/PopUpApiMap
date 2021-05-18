// Hello friends!
//these variables are set to require packages and routes that we will use throughout our 
//document, and makes them easy to find
const express = require('express')
const app = express()
const flash = require('express-flash')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/database')
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const postRoutes = require('./routes/post')

// Loads the environment variables from the .env file
require('dotenv').config({ path: './config/.env' })

// Passport config
// Loads the passport module we created and passes the passport module to it as an argument
require('./config/passport')(passport)

// connect to DB
// runs method in config/database
connectDB()

//sets view engine to ejs, which parses html
app.set('view engine', 'ejs')
//allows to use the public directory, which contains a main.js and style.css file
app.use(express.static('public'))
//middleware body parser- parses json and urls
app.use(express.urlencoded({ extended: true }))
//allows us to access json
app.use(express.json())

// Method override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


// Sessions
//middleware that lets us know where to store our active sessions, which we are storing
//in mongodb
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// Passport middleware - allows us to perform authentication
app.use(passport.initialize())
app.use(passport.session())

app.use(flash());

//telling our document where to find home routes, auth routes, and todo routes 
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/post', postRoutes);

//connects to PORT, lets us know server is running 
app.listen(process.env.PORT, () => {
  console.log(`Running server on port ${process.env.PORT}`)
})