const request = require('request')

const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/6ff9533f742949357d54955a9b36aa8d/" + lat + "," + long
    console.log(url)
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to Weather Server")
        } else if (body.error) {
            callback(body.error)
        } else{
            callback(null, body.currently)
        }
    })
}

module.exports = {
    forecast
}