const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


exports.webhook = functions.https.onRequest((request, response) => {

    console.log("request.body.result.parameters: ", request.body.queryResult.parameters);

    let params = request.body.queryResult.parameters;
    firestore.collection("orders").add(params)
        .then(()=> {
            response.send({
                fulfillmentText:
                `${params.name} your hotel booking request for ${params.persons} persons, we will contact you on ${params.email} soon - type of room: ${params.roomType}`
            });

            return res.status(200);
        })
        .catch((e)=> {
            response.send({
                fulfillmentText: "Something went wrong when writing in database."
            });
        });

});
