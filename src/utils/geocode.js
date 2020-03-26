const request = require('request')

// Geocode Request
const geocode = (address, callback) => {
    const geocodeUrl = encodeURI("https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiaGltdWFodWphMjQzIiwiYSI6ImNrODQ2dW9qcjAxMjYzbW1kc2FmZnRhemwifQ.nl9fXJglDRv42o32FmLVbw&linit=1")
    request({url: geocodeUrl, json: true}, (error, { body }) => {
        // Destructuring Body
        const { message, features } = body
        if (error) {
            callback("Unable to connect to Mapbox Server")
        } else if (message) { 
            callback(message)
        } else if ( features && features.length > 0 ) {
            const { center } = features[0]
            if (center.length > 1) {
                const longitude = center[0]
                const latitude = center[1]
                // Pass Lat Long in the callback
                callback(null, {latitude, longitude})
            } else {
                callback("No center found!")
            }
        } else {
            callback("No data found!")
        }
    })
}

module.exports = {
    geocode 
}
