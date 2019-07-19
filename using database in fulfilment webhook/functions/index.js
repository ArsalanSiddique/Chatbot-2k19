const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.webhook = functions.https.onRequest((request, response) => {

    switch (request.body.queryResult.action) {
        case 'bookRoom':
            console.log("request.body.result.parameters: ", request.body.queryResult.parameters);

            let params = request.body.queryResult.parameters;
            firestore.collection("orders").add(params)
                .then(() => {
                    response.send({
                        fulfillmentText:
                            `${params.name} your hotel booking request for ${params.persons} persons, we will contact you on ${params.email} soon - type of room: ${params.roomType}`
                    });

                    return res.status(200);
                })
                .catch((e) => {
                    response.send({
                        fulfillmentText: "Something went wrong when writing in database."
                    });
                });
            break;

        case 'showBooking':
            firestore.collection('orders').get()
                .then((querySnapshot) => {

                    var orders = [];
                    querySnapshot.forEach((doc) => { orders.push(doc.data()) });

                    var speech = `You have ${params.length} orders \n`;

                    orders.forEach((eachOrder, index) => {
                        speech += `number ${index + 1} is ${params.roomType} room for ${params.persons} persons, ordered by ${params.name} and contact email is ${params.email} \n`;
                    })

                    response.send({
                        fulfillmentText: speech
                    });
                    return res.status(200);
                })
                .catch((err) => {
                    console.log('Error in reading data from database.', err);
                    response.send({
                        fulfillmentText: "Something went wrong while reading data."
                    })
                })

            break;

        default:
            response.send({
                fulfillmentText: 'No action matched in webHook.'
            });
    }




});
