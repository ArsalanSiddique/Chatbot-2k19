"use strict";
const functions = require('firebase-functions');
// Import the appropriate class
const { WebhookClient } = require('dialogflow-fulfillment');



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//



exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
    (request, response) => {

        //  Create an instance
        const _agent = new WebhookClient({ request, response });

        console.log(
            "Dialogflow Request headers: " + JSON.stringify(request.headers)
        );
        console.log("Dialogflow Request body: " + JSON.stringify(request.body));

        function welcome(agent) {
            agent.add(`Good day! What can I do for you today?`);
        }

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        
        function bookroom(agent) {
            agent.add(`I understood, booking a room for you.`);
        }
        

        // Run the proper handler based on the matched Dialogflow intent
        let intentMap = new Map();

        //  intentMap('Intent Name', Function Name)
        intentMap.set("Default Welcome Intent", welcome);
        intentMap.set("Default Fallback Intent", fallback);
        intentMap.set("roomBooking", bookroom);
        _agent.handleRequest(intentMap);

    }
);











// =========================================================================================================
//                  ABRAR CODE
// =========================================================================================================


// "use strict";

// const functions = require("firebase-functions");
// const { WebhookClient } = require("dialogflow-fulfillment");

// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
//   (request, response) => {
//     const _agent = new WebhookClient({ request, response });
//     console.log(
//       "Dialogflow Request headers: " + JSON.stringify(request.headers)
//     );
//     console.log("Dialogflow Request body: " + JSON.stringify(request.body));

//     function welcome(agent) {
//       agent.add(`Good day! What can I do for you today?`);
//     }

//     function fallback(agent) {
//       agent.add(`I didn't understand`);
//       agent.add(`I'm sorry, can you try again?`);
//     }


//     // Run the proper handler based on the matched Dialogflow intent
//     let intentMap = new Map();
//     intentMap.set("Default Welcome Intent", welcome);
//     intentMap.set("Default Fallback Intent", fallback);

//     _agent.handleRequest(intentMap);
//   }
// );




















