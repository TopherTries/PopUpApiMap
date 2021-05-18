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


function initMap(){
    // Map options
    let options = {
        zoom: 13,
        center: {lat: 29.951065, lng: -90.071533}
    }
    // New map
    const map = new google.maps.Map(document.getElementById('map'), options)

    /* <-- Static Marker -->
    // Add Marker
    let marker = new google.maps.Marker({
        position: {lat: 29.951065, lng: -90.071533},
        map: map,
        // icon: add custom icon here
    })

    // Creates an information window for map marker
    let infoWindow = new google.maps.infoWindow({
        content:'<h1>New Orleans, LA</h1>'
    })


    // Function that sets the above info window for specified marker
    marker.addListener('click', function (){
        infoWindow.open(map, marker)
    }) 
    */

    addMarker({
        coords:{lat: 29.951065, lng: -90.071533},
        iconImage: 0,// add custom icon here 
        content: none
    })

    // Add Marker Function
    function addMarker(coords){
        let marker = new google.maps.Marker({
        position: props.coords,
        map: map,
        // icon: props.iconImage (idea: add flags so that proprieters can denote the nationalities of their popup's cuisine)
    })

    // Check for custom icon
    if(props.iconImage){
        //set icon image
        marker.setIcon(props.iconImage)
    }

    // Check content
    if(props.content){
        let infoWindow = new google.maps.infoWindow({
        content: props.content
    })

    marker.addListener('click', function (){
        infoWindow.open(map, marker)
    })
    }
    }
}