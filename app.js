const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('cookie-session')
const connectDB = require('./config/db')

//Load confid
dotenv.config({ path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars (middleware)
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', }))
app.set('view engine', '.hbs')

// Sessions
app.use(
    session({
     secret: 'keyboard',
     resave: false,
     saveUninitialized: true,
     cookie: { secure: true }
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    ) //tells server to listen for PORT and log if the port is running in production or development node environment