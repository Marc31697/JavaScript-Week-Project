const form = document.querySelector('#testDataForm');
form.addEventListener('submit', ( event ) =>{
    event.preventDefault()
    let query = document.querySelector('#city')
    load_data(getData(query.value))
})

// Get Data from API
const getData = async (city) => {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=7a51411bc6a74f99b53389471b4aa51d`)
    const data = await response.json()
    return data
}


// create Constrants to hold DOM elements
const DOM_elements = {
    weather : '.weather'
}

// Creation of the racer List HTML

const add_table = (main) => {
    const html = `<a class="list-group-item list-group-item-action list-group-item-light tab-space"> ${main}</a>`
    document.querySelector(DOM_elements.weather).insertAdjacentHTML('beforeend', html)
    
}
// Function to Load Data and Display HTML

const load_data = async (info) => {
    const weather = await info;
    var d = new Date();
    var datetime = d.toLocaleString('default', {weekday: 'long'}) + ', ' + d.getDate() + ' ' + d.toLocaleString('default', {month: 'long' }) + ' ' + d.getFullYear();
    document.getElementById('Card-City').innerHTML = weather.name
    document.getElementById('Card-Cast').innerHTML = weather.weather[0].main
    document.getElementById('Card-Temp').innerHTML = weather.main.temp + '&#176';

    if(d.getHours() >= 13){
        let current_hour = d.getHours() - 12;
        if(d.getHours() == 24){
            document.getElementById("Card-Time").innerHTML = current_hour + ':' + d.getMinutes() + ' AM'
        } else{
            document.getElementById("Card-Time").innerHTML = current_hour + ':' + d.getMinutes() + ' PM'
        }
    } else{
        document.getElementById("Card-Time").innerHTML = d.getHours() + ':' + d.getMinutes()
    }
    document.getElementById("Card-Day").innerHTML = datetime;
    console.log(weather.weather[0].main)

}