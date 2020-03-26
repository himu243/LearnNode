const express = require('express')
const path = require('path')
const hbs = require('hbs')
const validator = require('validator')
// Express
const app = express()
const port = process.env.PORT || 3000
// API Caller
const geocodeAPI = require('./utils/geocode')
const forcastAPI = require('./utils/forecast')

// Path Setups for Express Configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup Handle-bars engine and views location
app.set('view engine', 'hbs')
// hbs looks for 'views' folder by default in the root-directory
// In case, we want to setup our own. We can do it as follows
app.set('views', viewPath)

// Setup public directory path
app.use(express.static(publicDirectoryPath))
// Register Partials
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Himanshu Ahuja",
    })
})

// About
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        imagePath: '/img/me.jpg',
        name: 'Himanshu Ahuja',
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help Page",
        name: "Himanshu Ahuja",
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address || validator.default.isEmpty(address)) {
        res.send({error: "Address needed"})
        return
    }
    geocodeAPI.geocode(address, (error, { latitude, longitude} = {}) => {
        if(error) {
            res.send({ error })
        } else {
            let response = {}
            forcastAPI.forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    response = { error }
                } else {
                    response = forecastData
                }
                res.send(response)
            })
        }
    })

})

app.get('/help/*', (req, res) => {
    res.render("error404", {
        title: "404 error",
        errorMessage: "Help articles not found (404)",
        name: "Himanshu Ahuja",
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: "404 Error",
        errorMessage: "Error 404. Page not found",
        name: "Himanshu Ahuja",
    })
})
//
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
