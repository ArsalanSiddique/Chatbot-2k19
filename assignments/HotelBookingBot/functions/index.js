
const functions = require('firebase-functions');
// Import the appropriate class
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require("dialogflow-fulfillment");



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
            agent.add(`Good day! Welcome to the Westin Hotel`);
            agent.add(new Suggestion('Custom booking'));
            agent.add(new Suggestion('Show packages'));
        }

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }

        function bookroom(agent) {

            // getting user info
            const name = agent.parameters.name;
            const date = agent.parameters.date;
            const mobile = agent.parameters.mobile;
            const duration = agent.parameters.duration;
            const peoples = agent.parameters.peoples;


            if (typeof peoples === 'number') {
                if (peoples > 1) {

                    agent.add(" would you like a single rooom? ")
                    agent.add(new Suggestion('Yes'));
                    agent.add(new Suggestion('No'));

                } else {
                    agent.add(`Alright, ${name}, your reservation has been made, we will contact you.`)
                }
            } else if (peoples !== "One" || peoples !== "one") {
                agent.add(" would you like a single rooom? ")
            } else {
                agent.add(`Alright, ${name}, your reservation has been made, we will contact you.`)
            }

        }

        function bookroom_yes(agent) {
            agent.add(`Alright, your reservation has been made, we will contact you.`)
        }
        function bookroom_no(agent) {
            const number = agent.parameters.number;
            agent.add(`Alright, your reservation has been made for ${number}, we will contact you.`)
        }

        function packages(agent) {
            // const parms = agent.queryResult.queryText;

            // agent.add(`${parms}`);


            // if (parms === "summer special") {
            //     agent.add("Your selected package is Summer special, we will contact you soon")
            // } else if (parms === "suite deal") {
            //     agent.add("Your selected package is Suite deal, we will contact you soon")
            // } else if (parms === "luxury suite") {
            //     agent.add("Your selected package is Luxury suite, we will contact you soon")
            // } else {

            agent.add(
                new Card({
                    title: `Summer special`,
                    imageUrl: `https://www.edenhotels.nl/media/images/shutterstock_1433028059.2e16d0ba.original.fill-1280x960.jpg`,
                    text: ` 1 x overnight stay in a comfortable room \n
                                Based on two persons`,
                    buttonText: `See full Package`,
                    buttonUrl: `https://www.themanorhotelamsterdam.com/en/packages/summer-package/?_ga=2.209328790.587124662.1564954816-1563133300.1564954816`,
                })
            );

            agent.add(
                new Card({
                    title: `Luxury suite package`,
                    imageUrl: `https://www.edenhotels.nl/media/images/EH---CROWN-HOTEL-EINDHOV.2e16d0ba.original.fill-1280x960_ILr7duC.jpg`,
                    text: ` 1 x overnight stay in a suite \n
                                Based on two persons`,
                    buttonText: `See full Package`,
                    buttonUrl: `https://www.crownhoteleindhoven.com/en/packages/luxury-suite-package/?_ga=2.209328790.587124662.1564954816-1563133300.1564954816`,
                })
            );

            agent.add(
                new Card({
                    title: `Suite deal`,
                    imageUrl: `https://www.edenhotels.nl/media/images/designhotel-maastricht_3.2e16d0ba.original.fill-1280x960_xC91B0X.jpg`,
                    text: ` 1 x overnight stay in deluxe room \n
                                Based on two persons`,
                    buttonText: `See full Package`,
                    buttonUrl: `https://www.designhotelmaastricht.com/en/packages/suite-deal-package/?_ga=2.209328790.587124662.1564954816-1563133300.1564954816`,

                })

            );

            agent.add(new Suggestion('summer special'));
            agent.add(new Suggestion('Luxury suite'));
            agent.add(new Suggestion('Suite deal'));
            agent.add(new Suggestion('Custom Booking'));

        }


        // function show_images(agent) {
        //     agent.add(
        //         new Card({
        //             title: `Your Room`,
        //             imageUrl: `http://www.bestwesternmemphis.com/content/images/roombanner.jpg`,
        //             text: `txt`,
        //             buttonText: `Click To Book`,
        //             buttonUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxsHOtHwyFbPN4DvKNWiD6JNWGgFI4H09GtzLmcuPSRnWYAwpt`,
        //         })
        //     );

        //     agent.add(new Suggestion('Book This'));
        //     agent.add(new Suggestion('Another Room'));
        // }

        // Run the proper handler based on the matched Dialogflow intent
        let intentMap = new Map();

        //  intentMap('Intent Name', Function Name)
        intentMap.set("Default Welcome Intent", welcome);
        intentMap.set("Default Fallback Intent", fallback);
        intentMap.set("client info", bookroom);
        intentMap.set("packages", packages);
        intentMap.set("client info - yes", bookroom_yes);
        intentMap.set("client info - no", bookroom_no);

        //intentMap.set("room pictures", show_images);
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




















