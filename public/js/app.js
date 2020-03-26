
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// Messages
let messageOne = document.querySelector("#message-1")
let messageTwo = document.querySelector("#message-2")

messageOne.textContent = ""
messageTwo.textContent = ""

const fetchForecast = (address) => {
    const forecastUrl =  encodeURI("/weather?address="+address)
    console.log(forecastUrl)
    fetch(forecastUrl)
    .then((data) => {
        data.json().then((response) => {
            if(response.error) {
                setMessages(response.error, "")
            } else {
                setMessages("For Address: " + address + " Forecast summary is: " + response.summary + " and Precip type is: " + response.precipType, "")
            }
        })
    })
}
const setMessages = (msg1, msg2) => {
    messageOne.textContent = msg1
    messageTwo.textContent = msg2
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    setMessages('Loading...', "")

    if(location && location !== "") {
        fetchForecast(location)
    } else {
        setMessages('Location cannot be empty', "")
    }
})