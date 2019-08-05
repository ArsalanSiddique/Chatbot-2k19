const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { bodyParser } = require('body-parser');
var request = require("request");



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const _agent = new WebhookClient({ request, response });

    console.log(
        "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));
    var weatherApi = 'aeef3d2ed53e72fbe6c0a8309db31f61';


    function city_weather(agent) {
        const city = agent.parameters.city;
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherApi}`;

        request(url, agent => {
            var weather = JSON.parse(body)
            if (weather.main === undefined) {
                agent.add("something went wrong while getting result.")
            } else {
                var temCelcius = Math.round(((weather.main.temp - 32) * 5 / 9));
                var weatherTemp = `${temCelcius}`;
                var name = `${weather.name}`;
                var weatherTxt = 'It is ' + `${temCelcius}` + '&#8451; in ' + `${weather.name}` + '.';
                agent.add(` weather: ${weatherTxt}, error: null, temperature: ${weatherTemp}, city: ${name}`);
            }
        })
    }

    function fallback(agent) {
        agent.add("I didn;t understand.");
        agent.add("Please try again.");
    }

    function welcome(agent) {
        agent.add("Welcome! Please type your country name.");
    }

    let intentMap = new Map();
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('city', city_weather);

    _agent.handleRequest(intentMap);
});
