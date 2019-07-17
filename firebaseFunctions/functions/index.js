const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello World Function!");
});

exports.helloWorld2 = functions.https.onRequest((request, response) => {
    response.send("Hello World2 Function!");
});

exports.helloWorld3 = functions.https.onRequest((request, response) => {
    response.send("Hello World3 Function!");
});

